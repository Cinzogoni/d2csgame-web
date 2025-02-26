"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiHomePageResources from "src/api/fakeApi/apiHomePageResources";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function HeroTaunt() {
  const { heroName, name } = useParams();
  // const { dataHomePageResources } = useFetchApiProductResources();

  const heroNameString =
    typeof heroName === "string" ? decodeURIComponent(heroName) : "";

  const productNameString =
    typeof name === "string" ? decodeURIComponent(name) : "";

  // lam_dev thay apiHomePageResources === dataHomePageResources
  const heroTaunt = apiHomePageResources.taunt
    .map((taunt) => taunt)
    .find(
      (hero) =>
        hero.character.name === heroNameString &&
        hero.name === productNameString
    );

  const anotherTaunt = apiHomePageResources.taunt
    .map((taunt) => taunt)
    .filter(
      (hero) =>
        hero.character.name === heroNameString &&
        hero.name !== productNameString
    );

  return (
    <ProductTemplate
      characterName={heroNameString}
      anotherProduct={anotherTaunt}
      //@ts-expect-error: Checked Used OK
      apiMapping={heroTaunt}
    />
  );
}

export default HeroTaunt;
