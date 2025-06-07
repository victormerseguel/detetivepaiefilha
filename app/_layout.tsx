import Capas from "@/components/ui/capas";
import { ContextProvider } from "@/providers/context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const [hideScreen, setHideScreen] = useState(false);

  return (
    <ContextProvider>
      <View style={{ position: "relative", flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>

        {hideScreen && <Capas setShowCover={setHideScreen} />}

        <TouchableOpacity
          style={styles.ocultarBotao}
          onPress={() => setHideScreen(!hideScreen)}
        >
          <MaterialCommunityIcons
            name={!hideScreen ? "incognito" : "incognito-off"}
            size={33}
            color={"#000"}
          />
        </TouchableOpacity>
        <StatusBar style="light" />
      </View>
    </ContextProvider>
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
  ocultarBotao: {
    backgroundColor: "#d8e0cd",
    position: "absolute",
    bottom: 85,
    padding: 15,
    borderRadius: "50%",
    alignSelf: "center",
    zIndex: 1,
  },
  ocultarScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
