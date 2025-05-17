import Abas from "@/components/ui/abas";
import { suspeitos, suspeitosPb } from "@/constants/lists";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <>
      <View style={styles.wrap}>
        <Image
          source={require("@/assets/images/background.png")}
          style={{
            flex: 1,
            position: "absolute",
          }}
        />
      </View>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} style={styles.wrap}>
          <Abas titulo="Suspeitos" lista={suspeitos} listaPb={suspeitosPb} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 55,
    paddingHorizontal: 10,
    minHeight: "100%",
  },
  wrap: { flex: 1 },
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
});
