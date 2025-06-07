import {
  locais as locations,
  suspeitos as suspects,
  armas as weapons,
} from "@/constants/lists";

export const useContextStore = () => {
  const suspeitos = suspects;
  const armas = weapons;
  const locais = locations;
  let guilties: any = [];

  return { data: { guilties, suspeitos, armas, locais } };
};
