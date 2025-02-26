"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiHomePageResources from "src/api/fakeApi/apiHomePageResources";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function HeroItem() {
  const { heroName, name } = useParams();
  // const { dataHomePageResources } = useFetchApiProductResources();

  const heroNameString =
    typeof heroName === "string" ? decodeURIComponent(heroName) : "";

  const productNameString =
    typeof name === "string" ? decodeURIComponent(name) : "";

  // lam_dev thay apiHomePageResources === dataHomePageResources
  const heroItem = apiHomePageResources.items
    .map((item) => item)
    .find(
      (hero) =>
        hero.character.name === heroNameString &&
        hero.name === productNameString
    );

  const anotherItem = apiHomePageResources.items
    .map((item) => item)
    .filter(
      (hero) =>
        hero.character.name === heroNameString &&
        hero.name !== productNameString
    );

  return (
    <ProductTemplate
      characterName={heroNameString}
      anotherProduct={anotherItem}
      //@ts-expect-error: Checked Used OK
      apiMapping={heroItem}
    />
  );
}

export default HeroItem;
