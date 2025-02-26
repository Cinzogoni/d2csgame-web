"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiHomePageResources from "src/api/fakeApi/apiHomePageResources";

import { useFetchApiProductResources } from "src/api/api.list.ts";

function SteamPoint() {
  const { name } = useParams();
  const { dataHomePageResources } = useFetchApiProductResources();

  const steamPointName =
    typeof name === "string" ? decodeURIComponent(name) : "";

  //lam_dev thay apiHomePageResources === dataHomePageResources
  const steamPoint = apiHomePageResources.steam
    .map((steam) => steam)
    .find((point) => point.name === steamPointName);

  const anotherSteamPoint = apiHomePageResources.steam
    .map((steam) => steam)
    .filter(
      (point) =>
        point.name !== steamPointName && point.productType === "STEAM_POINT"
    );
  return (
    <ProductTemplate
      characterName={steamPointName}
      anotherProduct={anotherSteamPoint}
      //@ts-ignore
      apiMapping={steamPoint}
    />
  );
}

export default SteamPoint;
