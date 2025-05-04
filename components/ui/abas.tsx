import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import {
//   useFonts,
//   Tagesschrift_400Regular,
// } from "@expo-google-fonts/tagesschrift";

type CardPressProps = {
  checked: boolean;
  cleared: boolean;
  question: boolean;
};

export default function Abas({
  titulo,
  lista,
  listaPb,
}: {
  titulo: string;
  lista: string[];
  listaPb: string[];
}) {
  const [cardPressed, setCardPressed] = useState<CardPressProps[]>(
    lista.map(() => ({ checked: false, cleared: false, question: false }))
  );
  const [longCardPressed, setLongCardPressed] = useState<boolean[]>(
    lista.map(() => false)
  );

  // const [fontLoaded] = useFonts({
  //   Tagesschrift: Tagesschrift_400Regular,
  // });

  const onPress = (index: number) => {
    const updatedState = [...cardPressed];
    updatedState[index].cleared = !updatedState[index].cleared;
    setCardPressed(updatedState);
  };

  const onLongPress = (index: number) => {
    const longPressedUpdate = [...longCardPressed];
    longPressedUpdate[index] = !longPressedUpdate[index];
    setLongCardPressed(longPressedUpdate);
  };

  const onIconPress = (index: number, icon: keyof CardPressProps) => {
    const updatedState = [...cardPressed];
    const updatedlongCardPress = [...longCardPressed];
    const anotherIcon = icon === "checked" ? "question" : "checked";
    updatedState[index][icon] = !updatedState[index][icon];
    updatedState[index][anotherIcon] =
      updatedState[index][icon] === true && false;
    updatedlongCardPress[index] = false;

    setLongCardPressed(updatedlongCardPress);
    setCardPressed(updatedState);
  };

  // if (!fontLoaded) return null;

  return (
    <View>
      <Text style={styles.text}>{titulo}</Text>
      <View style={styles.cards}>
        {lista.map((item: any, indx: number) => (
          <TouchableOpacity
            key={item}
            onPress={() => !cardPressed[indx].checked && onPress(indx)}
            onLongPress={() => onLongPress(indx)}
            style={styles.card}
          >
            <Image
              source={
                !cardPressed[indx].cleared
                  ? item
                  : !cardPressed[indx].checked
                  ? listaPb[indx]
                  : item
              }
              style={styles.image}
            />

            {cardPressed[indx].checked && (
              <Image
                source={require("../../assets/images/check.png")}
                style={[styles.image, styles.absolute, styles.checked]}
              />
            )}
            {!cardPressed[indx].cleared && cardPressed[indx].question && (
              <Image
                source={require("../../assets/images/interrogacao.png")}
                style={[styles.image, styles.absolute, styles.checked]}
              />
            )}
            {!cardPressed[indx].checked && cardPressed[indx].cleared && (
              <Image
                source={require("../../assets/images/wrong.png")}
                style={[styles.image, styles.absolute, styles.cleared]}
              />
            )}
            {longCardPressed[indx] && (
              <View style={[styles.absolute]}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => onIconPress(indx, "checked")}
                >
                  <Image
                    source={require("../../assets/images/icon-check.png")}
                    style={styles.iconCheck}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => onIconPress(indx, "question")}
                >
                  <Image
                    source={require("../../assets/images/icon-interrogation.png")}
                    style={styles.iconInterrogation}
                  />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const imageWidth = 165;
const imageHeight = imageWidth * 1.53;

const styles = StyleSheet.create({
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    position: "relative",
    gap: 10,
  },
  text: {
    fontFamily: "Courier",
    color: "#feec5f",
    textTransform: "uppercase",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    opacity: 0.9,
    marginBottom: 25,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    paddingBottom: "50%",
    borderRadius: 12,
  },
  grayscaleBackground: {
    tintColor: "black",
    position: "absolute",
  },
  opacity: {
    opacity: 0.3,
  },
  absolute: {
    position: "absolute",
  },
  cleared: {
    opacity: 0.8,
  },
  checked: {
    opacity: 0.9,
  },
  iconContainer: {
    width: imageWidth,
    height: imageHeight / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333333bb",
  },
  iconCheck: {
    opacity: 0.8,
    width: "40%",
    height: "60%",
  },
  iconInterrogation: {
    width: "35%",
    height: "70%",
  },
});
