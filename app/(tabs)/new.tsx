import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { useMemos } from '@/hooks/useMemos';
import { useTheme } from '@/providers/ThemeProvider';

export default function NewMemoScreen() {
  const [content, setContent] = useState('');
  const { createMemo } = useMemos();
  const { isDark } = useTheme();

  const handleSubmit = async () => {
    if (content.trim()) {
      await createMemo(content);
      router.back();
    }
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <TextInput
        style={[
          styles.input,
          isDark && styles.inputDark,
          { color: isDark ? '#fff' : '#000' },
        ]}
        placeholder="What's on your mind?"
        placeholderTextColor={isDark ? '#666' : '#999'}
        value={content}
        onChangeText={setContent}
        multiline
        autoFocus
      />
      <TouchableOpacity
        style={[
          styles.button,
          !content.trim() && styles.buttonDisabled,
          isDark && styles.buttonDark,
        ]}
        onPress={handleSubmit}
        disabled={!content.trim()}
      >
        <Text style={styles.buttonText}>Post Memo</Text>
      </TouchableOpacity>
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
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  inputDark: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDark: {
    backgroundColor: '#FFD700',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
