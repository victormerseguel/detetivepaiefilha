import {
  capas,
  CardList,
  locais as locations,
  suspeitos as suspects,
  armas as weapons,
} from "@/constants/lists";
import { useEffect, useState } from "react";

export const useContextStore = () => {
  const [suspeitos, setSuspeitos] = useState(suspects);
  const [armas, setArmas] = useState(weapons);
  const [locais, setLocais] = useState(locations);
  const [guilties, setGuilties] = useState<CardList[]>(capas);
  const [menu, setMenu] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const updatedSuspects = suspeitos
      .filter((card) => card.checked)
      .map((card) => ({ ...card, cleared: false }));
    const updatedWeapons = armas
      .filter((card) => card.checked)
      .map((card) => ({ ...card, cleared: false }));
    const updatedLocations = locais
      .filter((card) => card.checked)
      .map((card) => ({ ...card, cleared: false }));

    const susp = updatedSuspects.length > 0 ? updatedSuspects : [capas[0]];
    const arm = updatedWeapons.length > 0 ? updatedWeapons : [capas[1]];
    const loc = updatedLocations.length > 0 ? updatedLocations : [capas[2]];

    const updatedGuilties = [...susp, ...arm, ...loc];
    setGuilties(updatedGuilties);
  }, [suspeitos, armas, locais]);

  const resetCards = (cards: CardList[]) =>
    cards.map((card) => ({
      ...card,
      pressed: false,
      longPressed: false,
      checked: false,
      cleared: false,
      question: false,
    }));

  const resetAll = () => {
    setSuspeitos(resetCards(suspects));
    setArmas(resetCards(weapons));
    setLocais(resetCards(locations));
    setMenu(false);
    setReset(false);
  };

  return {
    data: {
      guilties,
      suspeitos,
      armas,
      locais,
      menu,
      reset,
    },
    actions: {
      setSuspeitos,
      setArmas,
      setLocais,
      setGuilties,
      setMenu,
      setReset,
      resetAll,
    },
  };
};
