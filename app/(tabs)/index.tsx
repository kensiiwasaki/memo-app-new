import { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useMemos } from '@/hooks/useMemos';
import { MemoCard } from '@/components/MemoCard';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useTheme } from '@/providers/ThemeProvider';

export default function HomeScreen() {
  const { memos, isLoading, fetchMemos } = useMemos();
  const { isDark } = useTheme();

  useEffect(() => {
    fetchMemos();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <FlatList
        data={memos}
        renderItem={({ item }) => <MemoCard memo={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        onRefresh={fetchMemos}
        refreshing={isLoading}
      />
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
  list: {
    padding: 16,
  },
});