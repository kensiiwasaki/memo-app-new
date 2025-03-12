import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

export function LoadingScreen() {
  const { isDark } = useTheme();

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <ActivityIndicator size="large" color="#FFD700" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFE0',
  },
  containerDark: {
    backgroundColor: '#000',
  },
});