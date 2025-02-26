"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiFakeHomePageResources from "src/api/fakeApi/apiFakeHomePageResources";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function HeroSet() {
  const { heroName, name } = useParams();
  // const { dataHomePageResources } = useFetchApiProductResources();

  const heroNameString =
    typeof heroName === "string" ? decodeURIComponent(heroName) : "";

  const productNameString =
    typeof name === "string" ? decodeURIComponent(name) : "";

  // lam_dev thay apiFakeHomePageResources === dataHomePageResources
  const heroSet = apiFakeHomePageResources.sets
    .map((set) => set)
    .find(
      (hero) =>
        hero.character.name === heroNameString &&
        hero.name === productNameString
    );

  const anotherSet = apiFakeHomePageResources.sets
    .map((set) => set)
    .filter(
      (hero) =>
        hero.character.name === heroNameString &&
        hero.name !== productNameString
    );

  return (
    <ProductTemplate
      characterName={heroNameString}
      //@ts-expect-error: Checked Used OK
      anotherProduct={anotherSet}
      //@ts-expect-error: Checked Used OK
      apiMapping={heroSet}
    />
  );
}

export default HeroSet;
