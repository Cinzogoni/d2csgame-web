"use client";

import ProductGroupsTemplate from "src/app/components/ProductGroupsTemplate/ProductGroupsTemplate";
import apiProductCategories from "src/api/fakeApi/apiProductCategories";
import { useParams } from "next/navigation";
import { useState, useLayoutEffect } from "react";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function ItemClass() {
  // const { dataProductCategories } = useFetchApiProductResources();
  const { theClassify, theClass } = useParams();
  const [classifyTitle, setClassifyTitle] = useState<string>("");
  const [classTitle, setClassTitle] = useState<string>("");

  const decodedClassify =
    typeof theClassify === "string" ? decodeURIComponent(theClassify) : "";
  const decodedClass =
    typeof theClass === "string" ? decodeURIComponent(theClass) : "";

  // lam_dev thay apiProductCategories === dataProductCategories
  const itemCategories = apiProductCategories.itemCategories.map(
    (detail) => detail
  );
  const isClass = itemCategories.map((c) => c.classify.class);

  const allClasses = itemCategories
    .map((item) => item.classify?.title)
    .filter((className): className is string => Boolean(className));

  const firstTitle = allClasses.includes("Immortal") ? ["Immortal"] : [];

  const secondTitle = allClasses.includes("Arcana") ? ["Arcana"] : [];

  const thirdTitle = allClasses.includes("Dota Plus") ? ["Dota Plus"] : [];

  useLayoutEffect(() => {
    const foundClassify = itemCategories
      .flatMap((category) => category.classify)
      .find(
        (classify) =>
          classify.title === decodedClassify && classify.class === decodedClass
      );

    if (foundClassify) {
      setClassifyTitle(foundClassify.title);
      setClassTitle(foundClassify.class);
    }
  }, [decodedClassify, decodedClass, itemCategories]);
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
      theClass={classTitle}
    />
  );
}

export default ItemClass;
