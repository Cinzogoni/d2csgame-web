"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiFakeHomePageResources from "src/api/fakeApi/apiFakeHomePageResources";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function WeatherEffects() {
  const { name } = useParams();
  // const { dataHomePageResources } = useFetchApiProductResources();

  const weatherEffectName =
    typeof name === "string" ? decodeURIComponent(name) : "";

  //lam_dev thay apiFakeHomePageResources === dataHomePageResources
  const weatherEffects = apiFakeHomePageResources.categories
    .map((category) => category)
    .find((weather) => weather.name === weatherEffectName);

  const anotherWeatherEffects = apiFakeHomePageResources.categories
    .map((category) => category)
    .filter(
      (weather) =>
        weather.name !== weatherEffectName &&
        weather.productType === "WEATHER_EFFECTS"
    );

  return (
    <ProductTemplate
      characterName={weatherEffectName}
      anotherProduct={anotherWeatherEffects}
      //@ts-expect-error: Checked Used OK
      apiMapping={weatherEffects}
    />
  );
}

export default WeatherEffects;
