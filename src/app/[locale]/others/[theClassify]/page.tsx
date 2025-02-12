"use client";

import ProductGroupsTemplate from "src/app/components/ProductGroupsTemplate/ProductGroupsTemplate";
import apiProductCategories from "src/api/fakeApi/apiProductCategories";

import { useParams } from "next/navigation";
import { useState, useLayoutEffect } from "react";

import { dataProductCategories } from "src/api/api.list.ts";

function OthersClassify() {
  const { theClassify } = useParams();
  const [classifyTitle, setClassifyTitle] = useState<string>("");
  const decodedClassify =
    typeof theClassify === "string" ? decodeURIComponent(theClassify) : "";

  // lam_dev thay apiProductCategories === dataProductCategories
  const othersCategories = apiProductCategories.othersCategories.map(
    (detail) => detail
  );

  const isClass = othersCategories.map((c) => c.classify.class);

  const allClasses = othersCategories
    .map((others) => others.classify?.title)
    .filter((className): className is string => Boolean(className));

  const firstTitle = allClasses.includes("Weather Effects")
    ? ["Weather Effects"]
    : [];

  const secondTitle = allClasses.includes("Terrain") ? ["Terrain"] : [];

  const thirdTitle = allClasses.includes("Music Pack") ? ["Music Pack"] : [];

  const fourTitle = allClasses.includes("Courier") ? ["Courier"] : [];

  const productType =
    "WEATHER_EFFECTS" && "TERRAIN" && "MUSIC_PACK" && "COURIER";

  useLayoutEffect(() => {
    const foundClassify = othersCategories
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
      apiProductCategories={othersCategories}
      firstTitle={firstTitle}
      secondTitle={secondTitle}
      thirdTitle={thirdTitle}
      fourTitle={fourTitle}
      theClassify={classifyTitle}
      theClass=""
    />
  );
}

export default OthersClassify;
