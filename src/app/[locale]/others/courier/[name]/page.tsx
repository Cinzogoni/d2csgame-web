"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiFakeHomePageResources from "src/api/fakeApi/apiFakeHomePageResources";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function Courier() {
  const { name } = useParams();
  // const { dataHomePageResources } = useFetchApiProductResources();

  const courierName = typeof name === "string" ? decodeURIComponent(name) : "";

  //lam_dev thay apiFakeHomePageResources === dataHomePageResources
  const courier = apiFakeHomePageResources.categories
    .map((category) => category)
    .find((music) => music.name === courierName);

  const anotherCourier = apiFakeHomePageResources.categories
    .map((category) => category)
    .filter(
      (music) => music.name !== courierName && music.productType === "COURIER"
    );
  return (
    <ProductTemplate
      characterName={courierName}
      anotherProduct={anotherCourier}
      //@ts-expect-error: Checked Used OK
      apiMapping={courier}
    />
  );
}

export default Courier;
