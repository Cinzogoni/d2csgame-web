"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiFakeHomePageResources from "src/api/fakeApi/apiFakeHomePageResources";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function MusicPack() {
  const { name } = useParams();
  // const { dataHomePageResources } = useFetchApiProductResources();

  const musicPackName =
    typeof name === "string" ? decodeURIComponent(name) : "";

  //lam_dev thay apiFakeHomePageResources === dataHomePageResources
  const musicPack = apiFakeHomePageResources.categories
    .map((category) => category)
    .find((music) => music.name === musicPackName);

  const anotherMusicPack = apiFakeHomePageResources.categories
    .map((category) => category)
    .filter(
      (music) =>
        music.name !== musicPackName && music.productType === "MUSIC_PACK"
    );
  return (
    <ProductTemplate
      characterName={musicPackName}
      anotherProduct={anotherMusicPack}
      //@ts-expect-error: Checked Used OK
      apiMapping={musicPack}
    />
  );
}

export default MusicPack;
