"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiFakeHomePageResources from "src/api/fakeApi/apiFakeHomePageResources";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function Terrain() {
  const { name } = useParams();
  // const { dataHomePageResources } = useFetchApiProductResources();

  const terrainName = typeof name === "string" ? decodeURIComponent(name) : "";

  //lam_dev thay apiFakeHomePageResources === dataHomePageResources
  const terrain = apiFakeHomePageResources.categories
    .map((category) => category)
    .find((terrain) => terrain.name === terrainName);

  const anotherTerrain = apiFakeHomePageResources.categories
    .map((category) => category)
    .filter(
      (terrain) =>
        terrain.name !== terrainName && terrain.productType === "TERRAIN"
    );
  return (
    <ProductTemplate
      characterName={terrainName}
      anotherProduct={anotherTerrain}
      //@ts-expect-error: Checked Used OK
      apiMapping={terrain}
    />
  );
}

export default Terrain;
