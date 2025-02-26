import ProductGroupsTemplate from "src/app/components/ProductGroupsTemplate/ProductGroupsTemplate";
import apiProductCategories from "src/api/fakeApi/apiProductCategories";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function ItemCategoryGroups() {
  // const { dataProductCategories } = useFetchApiProductResources();
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
      theClassify=""
      theClass=""
    />
  );
}

export default ItemCategoryGroups;
