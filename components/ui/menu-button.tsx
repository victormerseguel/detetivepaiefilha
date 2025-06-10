import { useGlobalContext } from "@/providers/context";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

export const MenuButton = () => {
  const { data, actions } = useGlobalContext();

  return (
    <TouchableOpacity
      onPress={() => actions.setMenu(true)}
      style={styles.menuButton}
    >
      <Feather name="menu" size={33} color={"#e8e8e8"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 50,
    right: 30,
  },
});
