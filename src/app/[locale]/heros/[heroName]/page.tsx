"use client";

import { useParams } from "next/navigation";
import HeroCategories from "src/app/components/HeroCategories/HeroCategories";
import apiCharacters from "src/api/fakeApi/apiFakeCharacters";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function HeroCategoryGroups() {
  const { heroName } = useParams() as { heroName: string };
  // const { dataCharacters } = useFetchApiProductResources();

  const heroNameString =
    typeof heroName === "string" ? decodeURIComponent(heroName) : "";

  // lam_dev thay apiCharacters === dataCharacters
  const heroCategories = apiCharacters.heros
    .map((heros) => heros)
    .filter((hero) => hero.character?.name === heroNameString);

  const avatar = heroCategories[0]?.character.avatar || "";

  return (
    <HeroCategories
      heroName={heroNameString}
      avatar={avatar}
      //@ts-expect-error: Checked Used OK
      heroCategories={heroCategories}
    />
  );
}

export default HeroCategoryGroups;
