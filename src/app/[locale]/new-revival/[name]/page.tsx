"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiHomePageResources from "src/api/fakeApi/apiHomePageResources";

import { useFetchApiProductResources } from "src/api/api.list.ts";

function NewRevivalCategories() {
  const { characterName, name } = useParams();
  const { dataHomePageResources } = useFetchApiProductResources();

  const characterNameString =
    typeof characterName === "string" ? decodeURIComponent(characterName) : "";

  const productNameString =
    typeof name === "string" ? decodeURIComponent(name) : "";

  // lam_dev thay apiHomePageResources === dataHomePageResources
  const newRevival = apiHomePageResources.newRevival
    .map((newUpdated) => newUpdated)
    .find((isNew) => isNew.name === productNameString);

  const anotherNewRevival = apiHomePageResources.newRevival
    .map((newUpdated) => newUpdated)
    .filter(
      (isNew) =>
        isNew.character.name === characterNameString &&
        isNew.name !== productNameString
    );

  return (
    <ProductTemplate
      characterName=""
      anotherProduct={anotherNewRevival}
      //@ts-ignore
      apiMapping={newRevival}
    />
  );
}

export default NewRevivalCategories;
