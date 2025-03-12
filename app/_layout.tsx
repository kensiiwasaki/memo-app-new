import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/providers/AuthProvider';
import { SupabaseProvider } from '@/providers/SupabaseProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <SafeAreaProvider>
      <SupabaseProvider>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#ffffff',
              },
              contentStyle: {
                backgroundColor: '#ffffff',
              },
            }}
          >
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
          <StatusBar style="auto" />
        </AuthProvider>
      </SupabaseProvider>
    </SafeAreaProvider>
  );
}
