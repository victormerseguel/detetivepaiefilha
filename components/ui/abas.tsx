import { CardList } from "@/constants/lists";
import { EvilIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const coverIndex = {
  suspeitos: 0,
  armas: 1,
  locais: 2,
};

type CardPressProps = {
  checked: boolean;
  cleared: boolean;
  question: boolean;
};

export default function Abas({
  titulo,
  list,
  setList,
  acusacao,
}: {
  titulo: string;
  list: CardList[];
  setList: React.Dispatch<React.SetStateAction<CardList[]>>;
  acusacao?: boolean;
}) {
  const [hasSomeCardChecked, setHasSomeCardChecked] = useState(false);

  useEffect(() => {
    setHasSomeCardChecked(list.some((card) => card.checked === true));
  }, [list]);

  const onPress = (index: number) => {
    if (!acusacao && !hasSomeCardChecked) {
      const updatedState = [...list];
      updatedState[index].cleared = !updatedState[index].cleared;
      setList(updatedState);
    }
  };

  const onLongPress = (index: number) => {
    const cardChecked = !hasSomeCardChecked
      ? true
      : list[index].checked
      ? true
      : false;
    if (!acusacao && cardChecked) {
      setList((prevList) =>
        prevList.map((card, idx) => ({
          ...card,
          longPressed: idx === index ? !card.longPressed : false,
        }))
      );
    }
  };

  const onIconPress = (index: number, icon: keyof CardPressProps) => {
    const updatedState = [...list];
    const anotherIcon = icon === "checked" ? "question" : "checked";
    updatedState[index][icon] = !updatedState[index][icon];
    updatedState[index][anotherIcon] =
      updatedState[index][icon] === true && false;
    updatedState[index].longPressed = false;

    setList(updatedState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{titulo}</Text>
      <View style={styles.wrapper}>
        <View style={styles.cards}>
          {list.map((item: any, indx: number) => (
            <TouchableOpacity
              key={item.name + indx}
              onPress={() => !item.checked && onPress(indx)}
              onLongPress={() => onLongPress(indx)}
              style={styles.card}
            >
              <Image
                source={
                  !item?.cleared && (!hasSomeCardChecked || item?.checked)
                    ? item.img
                    : item.imgPb
                }
                style={styles.image}
              />

              {item?.checked && !acusacao && (
                <Image
                  source={require("../../assets/images/check.png")}
                  style={[styles.image, styles.absolute, styles.checked]}
                />
              )}
              {!item?.cleared && item?.question && (
                <Image
                  source={require("../../assets/images/interrogacao.png")}
                  style={[styles.image, styles.absolute, styles.checked]}
                />
              )}
              {!item?.checked && item?.cleared && (
                <Image
                  source={require("../../assets/images/wrong.png")}
                  style={[styles.image, styles.absolute, styles.cleared]}
                />
              )}
              {list[indx].longPressed && (
                <View style={[styles.absolute]}>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => onIconPress(indx, "checked")}
                  >
                    <Image
                      source={require("../../assets/images/icon-check.png")}
                      style={[
                        styles.iconCheck,
                        item.checked ? { tintColor: "#b0b0b0" } : {},
                      ]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => onIconPress(indx, "question")}
                  >
                    <Image
                      source={require("../../assets/images/icon-interrogation.png")}
                      style={[
                        styles.iconInterrogation,
                        item.question ? { tintColor: "#b0b0b0" } : {},
                      ]}
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
                      const longPressedUpdate = [...list];
                      longPressedUpdate[indx].longPressed = false;
                      setList(longPressedUpdate);
                    }}
                  >
                    <EvilIcons name="close-o" size={35} color={"#fff"} />
                  </TouchableOpacity>
                </View>
              )}
              {acusacao && item?.checked && (
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
    position: "sticky",
    top: 0,
    zIndex: 1,
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
