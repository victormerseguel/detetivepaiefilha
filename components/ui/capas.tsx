import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type RotaTabs =
  | "/"
  | "/(tabs)/armas"
  | "/(tabs)/locais"
  | "/(tabs)/confidencial";

interface Capas {
  img: any;
  rota: RotaTabs;
}

const capas: Capas[] = [
  {
    img: require("../../assets/images/capa_cartas_suspeitos.png"),
    rota: "/",
  },
  {
    img: require("../../assets/images/capa_cartas_armas.png"),
    rota: "/(tabs)/armas",
  },
  {
    img: require("../../assets/images/capa_cartas_locais.png"),
    rota: "/(tabs)/locais",
  },
  {
    img: require("../../assets/images/capa_cartas_acusados.png"),
    rota: "/(tabs)/confidencial",
  },
];

export default function Capas({
  setShowCover,
}: {
  setShowCover: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  return (
    <View style={styles.ocultarScreen}>
      <Image
        source={require("@/assets/images/background.png")}
        style={{
          flex: 1,
          position: "absolute",
        }}
      />
      <View style={styles.wrapper}>
        <View style={styles.container}>
          {capas.map((capa, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                router.replace(capa.rota);
                setShowCover(false);
              }}
            >
              <Image source={capa.img} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const imageWidth = 165;
const imageHeight = imageWidth * 1.53;
const styles = StyleSheet.create({
  ocultarScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },

  image: {
    width: imageWidth,
    height: imageHeight,
    paddingBottom: "50%",
    borderRadius: 12,
  },
});
