import * as React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
/* eslint-disable-next-line */
export interface UiProps {
  text: string;
}

export function Ui(props: UiProps) {
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 5, paddingBottom: 10 },
  text: { fontSize: 24, fontWeight: '500', color: '#45bc98' },
});

export default Ui;
