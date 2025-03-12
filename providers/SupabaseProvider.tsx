import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { LoadingScreen } from '@/components/LoadingScreen';
import { supabase } from '@/lib/supabase';

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Check if Supabase is properly initialized
        await supabase.auth.getSession();
        setIsInitialized(true);
      } catch (e) {
        setError(e as Error);
      }
    };

    init();
  }, []);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}