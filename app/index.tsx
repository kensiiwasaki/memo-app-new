import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {/* 
        注意: edgesプロパティで'top'を除外しています。
        これはヘッダーがある場合、二重のパディングを避けるためです。
        ヘッダーがない場合は、edges={['top', 'bottom', 'left', 'right']}を使用してください。
      */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
