"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiFakeHomePageResources from "src/api/fakeApi/apiFakeHomePageResources";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function NewRevivalCategories() {
  const { characterName, name } = useParams();
  // const { dataHomePageResources } = useFetchApiProductResources();

  const characterNameString =
    typeof characterName === "string" ? decodeURIComponent(characterName) : "";

  const productNameString =
    typeof name === "string" ? decodeURIComponent(name) : "";

  // lam_dev thay apiFakeHomePageResources === dataHomePageResources
  const newRevival = apiFakeHomePageResources.newRevival
    .map((newUpdated) => newUpdated)
    .find((isNew) => isNew.name === productNameString);

  const anotherNewRevival = apiFakeHomePageResources.newRevival
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
      //@ts-expect-error: Checked Used OK
      apiMapping={newRevival}
    />
  );
}

export default NewRevivalCategories;
