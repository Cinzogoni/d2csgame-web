"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiHomePageResources from "src/api/fakeApi/apiHomePageResources";

import { useFetchApiProductResources } from "src/api/api.list.ts";

function Terrain() {
  const { name } = useParams();
  const { dataHomePageResources } = useFetchApiProductResources();

  const terrainName = typeof name === "string" ? decodeURIComponent(name) : "";

  //lam_dev thay apiHomePageResources === dataHomePageResources
  const terrain = apiHomePageResources.categories
    .map((category) => category)
    .find((terrain) => terrain.name === terrainName);

  const anotherTerrain = apiHomePageResources.categories
    .map((category) => category)
    .filter(
      (terrain) =>
        terrain.name !== terrainName && terrain.productType === "TERRAIN"
    );
  return (
    <ProductTemplate
      characterName={terrainName}
      anotherProduct={anotherTerrain}
      //@ts-ignore
      apiMapping={terrain}
    />
  );
}

export default Terrain;
