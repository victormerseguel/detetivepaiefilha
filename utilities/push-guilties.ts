import { guilties } from "@/constants/lists";

export const pushGuiltiesCardToList = (lista: any[], index: number) => {
  guilties.push(lista[index]);
};

export const removeGultiesCardFromList = (card: string) => {
  guilties.filter((item) => item !== card);
};
