"use client";

import { useParams } from "next/navigation";
import HeroCategories from "src/app/components/HeroCategories/HeroCategories";
import apiHeroCategories from "src/api/fakeApi/apiHeroCategories";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function HeroCategoryGroups() {
  const { heroName } = useParams() as { heroName: string };
  // const { dataHeroCategories } = useFetchApiProductResources();

  const heroNameString =
    typeof heroName === "string" ? decodeURIComponent(heroName) : "";

  // lam_dev thay apiHeroCategories === dataHeroCategories
  const heroCategories = apiHeroCategories.heros
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
