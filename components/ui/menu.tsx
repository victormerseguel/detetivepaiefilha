import { useGlobalContext } from "@/providers/context";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export const Menu = () => {
  const { data, actions } = useGlobalContext();
  const [visible, setVisible] = useState(data.menu);

  const translateX = useSharedValue(-width);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (data.menu) {
      setVisible(true);
      translateX.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      translateX.value = withTiming(-width, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(setVisible)(false);
        }
      });
    }
  }, [data.menu]);

  const animatedMenuStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, animatedOverlayStyle]}>
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => actions.setMenu(false)}
      />
      <Animated.View
        style={[styles.content, animatedMenuStyle]}
        onStartShouldSetResponder={() => true}
      >
        <TouchableOpacity onPress={() => actions.setReset(true)}>
          <Text style={styles.item}>Reiniciar Jogo</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.item}>Configurações</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00000070",
    zIndex: 4,
    flexDirection: "row",
  },
  content: {
    width: "65%",
    height: "100%",
    backgroundColor: "#ebeee7",
    paddingTop: 90,
    paddingLeft: 20,
    gap: 25,
  },
  item: {
    fontSize: 20,
    textTransform: "uppercase",
  },
});
