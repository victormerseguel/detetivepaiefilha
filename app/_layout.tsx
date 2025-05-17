import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <View style={styles.ocultar}>
          <Text>Eu sou um ícone</Text>
        </View>
      </Stack>
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 55,
    paddingHorizontal: 10,
    minHeight: "100%",
  },
  wrap: {},
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 40,
  },
  ocultar: { backgroundColor: "#fff" },
});
