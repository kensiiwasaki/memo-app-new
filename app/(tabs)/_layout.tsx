import React from 'react';
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Chrome as Home,
  CirclePlus as PlusCircle,
  User,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function TabLayout() {
  const { isDark } = useTheme();

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: isDark ? '#000' : '#FFFFE0' }}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDark ? '#1a1a1a' : '#FFFFE0',
            borderTopColor: isDark ? '#333' : '#ddd',
          },
          tabBarActiveTintColor: isDark ? '#FFD700' : '#000',
          tabBarInactiveTintColor: isDark ? '#666' : '#666',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="new"
          options={{
            title: 'New Memo',
            tabBarIcon: ({ color, size }) => (
              <PlusCircle size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="memo/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </>
  );
}
