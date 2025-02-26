import ProductGroupsTemplate from "src/app/components/ProductGroupsTemplate/ProductGroupsTemplate";
import apiProductCategories from "src/api/fakeApi/apiProductCategories";

import { useFetchApiProductResources } from "src/api/api.list.ts";

function OtherCategoryGroups() {
  const { dataProductCategories } = useFetchApiProductResources();
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

  const productMapping = [
    { title: "Weather Effects", type: "WEATHER_EFFECTS" },
    { title: "Terrain", type: "TERRAIN" },
    { title: "Music Pack", type: "MUSIC_PACK" },
    { title: "Courier", type: "COURIER" },
  ];

  const matchedItem = productMapping.find((item) =>
    allClasses.includes(item.title)
  );

  const productType = matchedItem ? matchedItem.type : "";

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
      theClassify=""
      theClass=""
    />
  );
}

export default OtherCategoryGroups;
