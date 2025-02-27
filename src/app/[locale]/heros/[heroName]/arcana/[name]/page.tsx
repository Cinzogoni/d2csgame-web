"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiFakeHomePageResources from "src/api/fakeApi/apiFakeHomePageResources";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function HeroArcana() {
  const { heroName, name } = useParams();
  // const { dataHomePageResources } = useFetchApiProductResources();

  const heroNameString =
    typeof heroName === "string" ? decodeURIComponent(heroName) : "";

  const productNameString =
    typeof name === "string" ? decodeURIComponent(name) : "";

  // lam_dev thay apiFakeHomePageResources === dataHomePageResources
  const heroArcana = apiFakeHomePageResources.arcana
    .map((arc) => arc)
    .find(
      (hero) =>
        hero.character.name === heroNameString &&
        hero.name === productNameString
    );

  const anotherArcana = apiFakeHomePageResources.arcana
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
      //@ts-expect-error: Checked Used OK
      apiMapping={heroArcana}
    />
  );
}

export default HeroArcana;
