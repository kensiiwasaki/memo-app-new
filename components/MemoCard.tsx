import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MessageCircle, Heart } from 'lucide-react-native';
import { router } from 'expo-router';
import { Memo } from '@/types';
import { useTheme } from '@/providers/ThemeProvider';

interface MemoCardProps {
  memo: Memo;
}

export function MemoCard({ memo }: MemoCardProps) {
  const { isDark } = useTheme();

  const handlePress = () => {
    router.push(`/memo/${memo.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.content, isDark && styles.textDark]}>{memo.content}</Text>
        <View style={[styles.footer, isDark && styles.footerDark]}>
          <View style={styles.action}>
            <MessageCircle size={18} color={isDark ? '#fff' : '#666'} />
            <Text style={[styles.actionText, isDark && styles.textDark]}>
              {memo.comments?.length || 0}
            </Text>
          </View>
          <View style={styles.action}>
            <Heart size={18} color={isDark ? '#fff' : '#666'} />
            <Text style={[styles.actionText, isDark && styles.textDark]}>{memo.likes || 0}</Text>
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
  cardDark: {
    backgroundColor: '#1a1a1a',
    shadowColor: '#fff',
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
  footerDark: {
    borderTopColor: '#333',
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
  textDark: {
    color: '#fff',
  },
});