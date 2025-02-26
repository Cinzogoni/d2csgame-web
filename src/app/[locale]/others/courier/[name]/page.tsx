"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiHomePageResources from "src/api/fakeApi/apiHomePageResources";

import { useFetchApiProductResources } from "src/api/api.list.ts";

function Courier() {
  const { name } = useParams();
  const { dataHomePageResources } = useFetchApiProductResources();

  const courierName = typeof name === "string" ? decodeURIComponent(name) : "";

  //lam_dev thay apiHomePageResources === dataHomePageResources
  const courier = apiHomePageResources.categories
    .map((category) => category)
    .find((music) => music.name === courierName);

  const anotherCourier = apiHomePageResources.categories
    .map((category) => category)
    .filter(
      (music) => music.name !== courierName && music.productType === "COURIER"
    );
  return (
    <ProductTemplate
      characterName={courierName}
      anotherProduct={anotherCourier}
      //@ts-ignore
      apiMapping={courier}
    />
  );
}

export default Courier;
