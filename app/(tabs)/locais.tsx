import Abas from "@/components/ui/abas";
import { useGlobalContext } from "@/providers/context";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function Armas() {
  const { data } = useGlobalContext();
  const locais = data.locais.map((local) => local.img);
  const locaisPb = data.locais.map((local) => local.imgPb);
  return (
    <>
      <Image
        source={require("@/assets/images/background.png")}
        style={{
          flex: 1,
          position: "absolute",
        }}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} style={styles.wrap}>
          <Abas titulo="Locais" lista={locais} listaPb={locaisPb} />
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
});
