"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiHomePageResources from "src/api/fakeApi/apiHomePageResources";

import { useFetchApiProductResources } from "src/api/api.list.ts";

function HeroArcana() {
  const { heroName, name } = useParams();
  const { dataHomePageResources } = useFetchApiProductResources();

  const heroNameString =
    typeof heroName === "string" ? decodeURIComponent(heroName) : "";

  const productNameString =
    typeof name === "string" ? decodeURIComponent(name) : "";

  // lam_dev thay apiHomePageResources === dataHomePageResources
  const heroArcana = apiHomePageResources.arcana
    .map((arc) => arc)
    .find(
      (hero) =>
        hero.character.name === heroNameString &&
        hero.name === productNameString
    );

  const anotherArcana = apiHomePageResources.arcana
    .map((arc) => arc)
    .filter(
      (hero) =>
        hero.character.name === heroNameString &&
        hero.name !== productNameString
    );

  return (
    <ProductTemplate
      characterName={heroNameString}
      anotherProduct={anotherArcana}
      //@ts-ignore
      apiMapping={heroArcana}
    />
  );
}

export default HeroArcana;
