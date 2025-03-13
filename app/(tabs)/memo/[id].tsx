import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Heart, ArrowLeft, Send, Trash2 } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Memo, Comment } from '@/types';
import { useMemos } from '@/hooks/useMemos';
import { useTheme } from '@/providers/ThemeProvider';

export default function MemoDetailScreen() {
  const { id } = useLocalSearchParams();
  const [memo, setMemo] = useState<Memo | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { deleteMemo } = useMemos();
  const { isDark } = useTheme();

  useEffect(() => {
    fetchMemoAndComments();
    getCurrentUser();
  }, [id]);

  const getCurrentUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);
  };

  const fetchMemoAndComments = async () => {
    try {
      const { data: memoData, error: memoError } = await supabase
        .from('memos')
        .select('*')
        .eq('id', id)
        .single();

      if (memoError) throw memoError;

      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .eq('memo_id', id)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      setMemo(memoData);
      setComments(commentsData || []);
    } catch (error) {
      console.error('Error fetching memo and comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!memo) return;

    try {
      const { error } = await supabase
        .from('memos')
        .update({ likes: (memo.likes || 0) + 1 })
        .eq('id', memo.id);

      if (error) throw error;

      setMemo({ ...memo, likes: (memo.likes || 0) + 1 });
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('comments').insert({
        content: newComment.trim(),
        memo_id: id,
        user_id: user.id,
      });

      if (error) throw error;

      setNewComment('');
      fetchMemoAndComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteMemo = () => {
    Alert.alert('Delete Memo', 'Are you sure you want to delete this memo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteMemo(id as string);
            router.back();
          } catch (error) {
            console.error('Error deleting memo:', error);
            Alert.alert('Error', 'Failed to delete memo');
          }
        },
      },
    ]);
  };

  const handleDeleteComment = async (commentId: string) => {
    Alert.alert(
      'Delete Comment',
      'Are you sure you want to delete this comment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('comments')
                .delete()
                .eq('id', commentId);

              if (error) throw error;
              fetchMemoAndComments();
            } catch (error) {
              console.error('Error deleting comment:', error);
              Alert.alert('Error', 'Failed to delete comment');
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!memo) {
    return (
      <View style={[styles.container, isDark && styles.containerDark]}>
        <Text style={[styles.errorText, isDark && styles.textDark]}>
          Memo not found
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.header, isDark && styles.headerDark]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.textDark]}>
          Memo Detail
        </Text>
        {currentUserId === memo.user_id && (
          <TouchableOpacity
            onPress={handleDeleteMemo}
            style={styles.deleteButton}
          >
            <Trash2 size={20} color="#FF4444" />
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.memoCard, isDark && styles.cardDark]}>
        <Text style={[styles.memoContent, isDark && styles.textDark]}>
          {memo.content}
        </Text>
        <View style={[styles.memoActions, isDark && styles.borderDark]}>
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Heart size={20} color={isDark ? '#fff' : '#666'} />
            <Text style={[styles.actionText, isDark && styles.textDark]}>
              {memo.likes || 0}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.commentCard, isDark && styles.cardDark]}>
            <View style={styles.commentHeader}>
              <Text style={[styles.commentContent, isDark && styles.textDark]}>
                {item.content}
              </Text>
              {currentUserId === item.user_id && (
                <TouchableOpacity
                  onPress={() => handleDeleteComment(item.id)}
                  style={styles.commentDeleteButton}
                >
                  <Trash2 size={16} color="#FF4444" />
                </TouchableOpacity>
              )}
            </View>
            <Text style={[styles.commentDate, isDark && styles.textDark]}>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </View>
        )}
        style={styles.commentsList}
      />

      <View style={[styles.commentInput, isDark && styles.commentInputDark]}>
        <TextInput
          style={[
            styles.input,
            isDark && styles.inputDark,
            { color: isDark ? '#fff' : '#000' },
          ]}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add a comment..."
          placeholderTextColor={isDark ? '#666' : '#999'}
          multiline
        />
        <TouchableOpacity
          onPress={handleComment}
          style={[
            styles.sendButton,
            !newComment.trim() && styles.sendButtonDisabled,
          ]}
          disabled={!newComment.trim()}
        >
          <Send size={20} color={newComment.trim() ? '#FFD700' : '#999'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFE0',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  headerDark: {
    backgroundColor: '#1a1a1a',
    borderBottomColor: '#333',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  deleteButton: {
    padding: 8,
  },
  memoCard: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1a1a1a',
    shadowColor: '#fff',
  },
  memoContent: {
    fontSize: 16,
    marginBottom: 12,
  },
  memoActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  borderDark: {
    borderTopColor: '#333',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    color: '#666',
  },
  commentsList: {
    flex: 1,
    padding: 16,
  },
  commentCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  commentContent: {
    fontSize: 14,
    flex: 1,
  },
  commentDeleteButton: {
    padding: 4,
    marginLeft: 8,
  },
  commentDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  commentInputDark: {
    backgroundColor: '#1a1a1a',
    borderTopColor: '#333',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  inputDark: {
    backgroundColor: '#333',
    color: '#fff',
  },
  sendButton: {
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  textDark: {
    color: '#fff',
  },
});
