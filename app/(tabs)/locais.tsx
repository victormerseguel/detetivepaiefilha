import Abas from "@/components/ui/abas";
import { locais, locaisPb } from "@/constants/lists";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function Armas() {
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
