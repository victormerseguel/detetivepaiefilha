import { useGlobalContext } from "@/providers/context";
import { EvilIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CardPressProps = {
  checked: boolean;
  cleared: boolean;
  question: boolean;
};

export default function Abas({
  titulo,
  lista,
  listaPb,
  acusacao,
}: {
  titulo: string;
  lista: string[];
  listaPb: string[];
  acusacao?: boolean;
}) {
  const [cardPressed, setCardPressed] = useState<CardPressProps[]>(
    lista.map(() => ({ checked: false, cleared: false, question: false }))
  );
  const [longCardPressed, setLongCardPressed] = useState<boolean[]>(
    lista.map(() => false)
  );

  const { data } = useGlobalContext();

  const [hasSomeCardChecked, setHasSomeCardChecked] = useState(false);

  useEffect(() => {
    setHasSomeCardChecked(cardPressed.some((card) => card.checked === true));
    cardPressed.forEach((item, index) => {
      if (item.checked) {
        data.guilties.push(lista[index]);
      } else {
        const listWithoutItem = data.guilties.filter((guilt: any) => {
          guilt !== lista[index];
        });
        data.guilties = listWithoutItem;
      }
    });
  }, [cardPressed]);

  const onPress = (index: number) => {
    if (!acusacao && !hasSomeCardChecked) {
      const updatedState = [...cardPressed];
      updatedState[index].cleared = !updatedState[index].cleared;
      setCardPressed(updatedState);
    }
  };

  const onLongPress = (index: number) => {
    const cardChecked = !hasSomeCardChecked
      ? true
      : cardPressed[index].checked
      ? true
      : false;
    if (!acusacao && cardChecked) {
      const longPressedUpdate = [...longCardPressed];
      longPressedUpdate[index] = !longPressedUpdate[index];
      setLongCardPressed(longPressedUpdate);
    }
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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{titulo}</Text>
      <View style={styles.wrapper}>
        <View style={styles.cards}>
          {lista.map((item: any, indx: number) => (
            <TouchableOpacity
              key={item + indx}
              onPress={() => !cardPressed[indx].checked && onPress(indx)}
              onLongPress={() => onLongPress(indx)}
              style={styles.card}
            >
              <Image
                source={
                  !cardPressed[indx]?.cleared &&
                  (!hasSomeCardChecked || cardPressed[indx]?.checked)
                    ? item
                    : listaPb[indx]
                }
                style={styles.image}
              />

              {cardPressed[indx]?.checked && (
                <Image
                  source={require("../../assets/images/check.png")}
                  style={[styles.image, styles.absolute, styles.checked]}
                />
              )}
              {!cardPressed[indx]?.cleared && cardPressed[indx]?.question && (
                <Image
                  source={require("../../assets/images/interrogacao.png")}
                  style={[styles.image, styles.absolute, styles.checked]}
                />
              )}
              {!cardPressed[indx]?.checked && cardPressed[indx]?.cleared && (
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
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      backgroundColor: "transparent",
                      borderRadius: "50%",
                      top: 10,
                      right: 10,
                    }}
                    onPress={() => {
                      const longPressedUpdate = [...longCardPressed];
                      longPressedUpdate[indx] = false;
                      setLongCardPressed(longPressedUpdate);
                    }}
                  >
                    <EvilIcons name="close-o" size={35} color={"#fff"} />
                  </TouchableOpacity>
                </View>
              )}
              {acusacao && (
                <View style={styles.check}>
                  <Image
                    source={require("@/assets/images/icon-check.webp")}
                    style={styles.checkImage}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const imageWidth = 165;
const imageHeight = imageWidth * 1.53;

const checkWidth = 50;
const checkHeight = checkWidth * 1.12;

const styles = StyleSheet.create({
  container: { flex: 1 },
  wrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
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
  check: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 50,
  },
  checkImage: {
    width: checkWidth,
    height: checkHeight,
  },
});
