"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiFakeHomePageResources from "src/api/fakeApi/apiFakeHomePageResources";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function SteamPoint() {
  const { name } = useParams();
  // const { dataHomePageResources } = useFetchApiProductResources();

  const steamPointName =
    typeof name === "string" ? decodeURIComponent(name) : "";

  //lam_dev thay apiFakeHomePageResources === dataHomePageResources
  const steamPoint = apiFakeHomePageResources.steam
    .map((steam) => steam)
    .find((point) => point.name === steamPointName);

  const anotherSteamPoint = apiFakeHomePageResources.steam
    .map((steam) => steam)
    .filter(
      (point) =>
        point.name !== steamPointName && point.productType === "STEAM_POINT"
    );
  return (
    <ProductTemplate
      characterName={steamPointName}
      //@ts-ignore
      anotherProduct={anotherSteamPoint}
      //@ts-expect-error: Checked Used OK
      apiMapping={steamPoint}
    />
  );
}

export default SteamPoint;
