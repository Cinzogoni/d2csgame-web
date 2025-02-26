"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiHomePageResources from "src/api/fakeApi/apiHomePageResources";

import { useFetchApiProductResources } from "src/api/api.list.ts";

function WeatherEffects() {
  const { name } = useParams();
  const { dataHomePageResources } = useFetchApiProductResources();

  const weatherEffectName =
    typeof name === "string" ? decodeURIComponent(name) : "";

  //lam_dev thay apiHomePageResources === dataHomePageResources
  const weatherEffects = apiHomePageResources.categories
    .map((category) => category)
    .find((weather) => weather.name === weatherEffectName);

  const anotherWeatherEffects = apiHomePageResources.categories
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
      //@ts-ignore
      apiMapping={weatherEffects}
    />
  );
}

export default WeatherEffects;
