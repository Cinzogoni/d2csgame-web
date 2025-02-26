"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiHomePageResources from "src/api/fakeApi/apiHomePageResources";

import { useFetchApiProductResources } from "src/api/api.list.ts";

function MusicPack() {
  const { name } = useParams();
  const { dataHomePageResources } = useFetchApiProductResources();

  const musicPackName =
    typeof name === "string" ? decodeURIComponent(name) : "";

  //lam_dev thay apiHomePageResources === dataHomePageResources
  const musicPack = apiHomePageResources.categories
    .map((category) => category)
    .find((music) => music.name === musicPackName);

  const anotherMusicPack = apiHomePageResources.categories
    .map((category) => category)
    .filter(
      (music) =>
        music.name !== musicPackName && music.productType === "MUSIC_PACK"
    );
  return (
    <ProductTemplate
      characterName={musicPackName}
      anotherProduct={anotherMusicPack}
      //@ts-ignore
      apiMapping={musicPack}
    />
  );
}

export default MusicPack;
