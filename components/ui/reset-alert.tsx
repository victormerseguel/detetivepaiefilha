import { useGlobalContext } from "@/providers/context";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const ResetAlert = () => {
  const { data, actions } = useGlobalContext();

  return (
    <>
      {data.reset && (
        <Pressable
          style={styles.container}
          onPress={() => actions.setReset(false)}
        >
          <View style={styles.content}>
            <Text style={styles.text}>Deseja reiniciar o jogo?</Text>
            <TouchableOpacity onPress={actions.resetAll}>
              <Text style={styles.button}>Sim</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000c5",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  content: {
    backgroundColor: "#ebeee7",
    width: "90%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    gap: 30,
  },
  text: {
    fontSize: 20,
  },
  button: {
    backgroundColor: "#d8e0cd",
    fontSize: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
