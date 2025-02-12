"use client";

import ProductGroupsTemplate from "src/app/components/ProductGroupsTemplate/ProductGroupsTemplate";
import apiProductCategories from "src/api/fakeApi/apiProductCategories";
import { useParams } from "next/navigation";
import { useState, useLayoutEffect } from "react";

import { dataProductCategories } from "src/api/api.list.ts";

function SetClass() {
  const { theClassify, theClass } = useParams();
  const [classifyTitle, setClassifyTitle] = useState<string>("");
  const [classTitle, setClassTitle] = useState<string>("");

  const decodedClassify =
    typeof theClassify === "string" ? decodeURIComponent(theClassify) : "";
  const decodedClass =
    typeof theClass === "string" ? decodeURIComponent(theClass) : "";

  // lam_dev thay apiProductCategories === dataProductCategories
  const setCategories = apiProductCategories.setCategories.map(
    (detail) => detail
  );
  const isClass = setCategories.map((c) => c.classify.class);

  const allClasses = setCategories
    .map((set) => set.classify?.title)
    .filter((className): className is string => Boolean(className));

  const firstTitle = allClasses.includes("Collector's cache")
    ? ["Collector's cache"]
    : [];

  const secondTitle = allClasses.includes("Mix set") ? ["Mix set"] : [];

  const thirdTitle = allClasses.includes("Infused") ? ["Infused"] : [];

  const fourTitle = allClasses.includes("Arcana") ? ["Arcana"] : [];

  useLayoutEffect(() => {
    const foundClassify = setCategories
      .flatMap((category) => category.classify)
      .find(
        (classify) =>
          classify.title === decodedClassify && classify.class === decodedClass
      );

    if (foundClassify) {
      setClassifyTitle(foundClassify.title);
      setClassTitle(foundClassify.class);
    }
  }, [decodedClassify, decodedClass]);

  return (
    <ProductGroupsTemplate
      productType="SET"
      isClass={isClass}
      //@ts-ignore
      apiProductCategories={setCategories}
      firstTitle={firstTitle}
      secondTitle={secondTitle}
      thirdTitle={thirdTitle}
      fourTitle={fourTitle}
      theClassify={classifyTitle}
      theClass={classTitle}
    />
  );
}

export default SetClass;
