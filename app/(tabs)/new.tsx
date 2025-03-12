import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useMemos } from '@/hooks/useMemos';

export default function NewMemoScreen() {
  const [content, setContent] = useState('');
  const { createMemo } = useMemos();

  const handleSubmit = async () => {
    if (content.trim()) {
      await createMemo(content);
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={content}
        onChangeText={setContent}
        multiline
        autoFocus
      />
      <TouchableOpacity
        style={[styles.button, !content.trim() && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!content.trim()}>
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
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});