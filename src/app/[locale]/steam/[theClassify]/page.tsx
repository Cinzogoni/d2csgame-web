"use client";

import ProductGroupsTemplate from "src/app/components/ProductGroupsTemplate/ProductGroupsTemplate";
import apiProductCategories from "src/api/fakeApi/apiProductCategories";

import { useParams } from "next/navigation";
import { useState, useLayoutEffect } from "react";

import { dataProductCategories } from "src/api/api.list.ts";

function SteamClassify() {
  const { theClassify } = useParams();
  const [classifyTitle, setClassifyTitle] = useState<string>("");
  const decodedClassify =
    typeof theClassify === "string" ? decodeURIComponent(theClassify) : "";

  // lam_dev thay apiProductCategories === dataProductCategories
  const steam = apiProductCategories.steamCategories.map((detail) => detail);
  const isClass = steam.map((c) => c.classify.class);

  const allClasses = steam
    .map((steam) => steam.classify?.title)
    .filter((className): className is string => Boolean(className));

  const firstTitle = allClasses.includes("Steam Wallet")
    ? ["Steam Wallet"]
    : [];

  const secondTitle = allClasses.includes("Steam Point") ? ["Steam Point"] : [];

  const productType = "STEAM_WALLET" && "STEAM_POINT";

  useLayoutEffect(() => {
    const foundClassify = steam
      .flatMap((category) => category.classify)
      .find((classify) => classify.title === decodedClassify);

    if (foundClassify) {
      setClassifyTitle(foundClassify.title);
    }
  }, [decodedClassify]);

  return (
    <ProductGroupsTemplate
      productType={productType}
      isClass={isClass}
      //@ts-ignore
      apiProductCategories={steam}
      firstTitle={firstTitle}
      secondTitle={secondTitle}
      thirdTitle={undefined}
      fourTitle={undefined}
      theClassify={classifyTitle}
      theClass=""
    />
  );
}

export default SteamClassify;
