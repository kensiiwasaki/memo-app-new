import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MessageCircle, Heart } from 'lucide-react-native';
import { router } from 'expo-router';
import { Memo } from '@/types';

interface MemoCardProps {
  memo: Memo;
}

export function MemoCard({ memo }: MemoCardProps) {
  const handlePress = () => {
    router.push(`/memo/${memo.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <Text style={styles.content}>{memo.content}</Text>
        <View style={styles.footer}>
          <View style={styles.action}>
            <MessageCircle size={18} color="#666" />
            <Text style={styles.actionText}>{memo.comments?.length || 0}</Text>
          </View>
          <View style={styles.action}>
            <Heart size={18} color="#666" />
            <Text style={styles.actionText}>{memo.likes || 0}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    fontSize: 16,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 4,
    color: '#666',
  },
});