import ProductGroupsTemplate from "src/app/components/ProductGroupsTemplate/ProductGroupsTemplate";
import apiProductCategories from "src/api/fakeApi/apiProductCategories";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function SetCategoryGroups() {
  // const { dataProductCategories } = useFetchApiProductResources();
  // lam_dev thay apiProductCategories === dataProductCategories
  const setCategories = apiProductCategories.setCategories.map(
    (detail) => detail
  );

  const isClass = setCategories.map((classify) => classify.classify.class);

  const allClasses = setCategories
    .map((set) => set.classify?.title)
    .filter((className): className is string => Boolean(className));

  const firstTitle = allClasses.includes("Collector's cache")
    ? ["Collector's cache"]
    : [];

  const secondTitle = allClasses.includes("Mix set") ? ["Mix set"] : [];

  const thirdTitle = allClasses.includes("Infused") ? ["Infused"] : [];

  const fourTitle = allClasses.includes("Arcana") ? ["Arcana"] : [];

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
      theClassify=""
      theClass=""
    />
  );
}

export default SetCategoryGroups;
