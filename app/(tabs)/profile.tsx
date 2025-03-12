import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Moon, Sun, Smartphone } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/providers/ThemeProvider';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { theme, setTheme, isDark } = useTheme();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.email, isDark && styles.textDark]}>{user?.email}</Text>
        
        <View style={styles.themeSection}>
          <Text style={[styles.themeTitle, isDark && styles.textDark]}>Theme</Text>
          <View style={styles.themeButtons}>
            <TouchableOpacity
              style={[
                styles.themeButton,
                theme === 'light' && styles.themeButtonActive,
                isDark && styles.themeButtonDark,
              ]}
              onPress={() => setTheme('light')}>
              <Sun size={20} color={theme === 'light' ? '#FFD700' : isDark ? '#fff' : '#000'} />
              <Text style={[
                styles.themeButtonText,
                theme === 'light' && styles.themeButtonTextActive,
                isDark && styles.textDark
              ]}>Light</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.themeButton,
                theme === 'dark' && styles.themeButtonActive,
                isDark && styles.themeButtonDark,
              ]}
              onPress={() => setTheme('dark')}>
              <Moon size={20} color={theme === 'dark' ? '#FFD700' : isDark ? '#fff' : '#000'} />
              <Text style={[
                styles.themeButtonText,
                theme === 'dark' && styles.themeButtonTextActive,
                isDark && styles.textDark
              ]}>Dark</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.themeButton,
                theme === 'system' && styles.themeButtonActive,
                isDark && styles.themeButtonDark,
              ]}
              onPress={() => setTheme('system')}>
              <Smartphone size={20} color={theme === 'system' ? '#FFD700' : isDark ? '#fff' : '#000'} />
              <Text style={[
                styles.themeButtonText,
                theme === 'system' && styles.themeButtonTextActive,
                isDark && styles.textDark
              ]}>System</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, isDark && styles.buttonDark]}
          onPress={handleSignOut}>
          <Text style={[styles.buttonText, isDark && styles.buttonTextDark]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFE0',
    padding: 16,
  },
  containerDark: {
    backgroundColor: '#000',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1a1a1a',
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  themeSection: {
    marginBottom: 20,
  },
  themeTitle: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: '500',
  },
  themeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  themeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    gap: 8,
  },
  themeButtonDark: {
    backgroundColor: '#333',
  },
  themeButtonActive: {
    backgroundColor: '#FFD700',
  },
  themeButtonText: {
    fontSize: 14,
    color: '#000',
  },
  themeButtonTextActive: {
    color: '#000',
    fontWeight: '500',
  },
  textDark: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDark: {
    backgroundColor: '#FFD700',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  buttonTextDark: {
    color: '#000',
  },
});