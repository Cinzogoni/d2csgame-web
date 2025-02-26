"use client";

import ProductGroupsTemplate from "src/app/components/ProductGroupsTemplate/ProductGroupsTemplate";
import apiProductCategories from "src/api/fakeApi/apiProductCategories";

import { useParams } from "next/navigation";
import { useState, useLayoutEffect } from "react";

import { useFetchApiProductResources } from "src/api/api.list.ts";

function ItemClassify() {
  const { dataProductCategories } = useFetchApiProductResources();
  const { theClassify } = useParams();
  const [classifyTitle, setClassifyTitle] = useState<string>("");
  const decodedClassify =
    typeof theClassify === "string" ? decodeURIComponent(theClassify) : "";

  // lam_dev thay apiProductCategories === dataProductCategories
  const itemCategories = apiProductCategories.itemCategories.map(
    (detail) => detail
  );

  const isClass = itemCategories.map((classes) => classes.classify.class);

  const allClasses = itemCategories
    .map((item) => item.classify?.title)
    .filter((className): className is string => Boolean(className));

  const firstTitle = allClasses.includes("Immortal") ? ["Immortal"] : [];

  const secondTitle = allClasses.includes("Arcana") ? ["Arcana"] : [];

  const thirdTitle = allClasses.includes("Dota Plus") ? ["Dota Plus"] : [];

  useLayoutEffect(() => {
    const foundClassify = itemCategories
      .flatMap((category) => category.classify)
      .find((classify) => classify.title === decodedClassify);

    if (foundClassify) {
      setClassifyTitle(foundClassify.title);
    }
  }, [decodedClassify]);

  return (
    <ProductGroupsTemplate
      productType="ITEM"
      isClass={isClass}
      //@ts-ignore
      apiProductCategories={itemCategories}
      firstTitle={firstTitle}
      secondTitle={secondTitle}
      thirdTitle={thirdTitle}
      fourTitle={undefined}
      theClassify={classifyTitle}
      theClass=""
    />
  );
}

export default ItemClassify;
