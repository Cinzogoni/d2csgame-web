import ProductGroupsTemplate from "src/app/components/ProductGroupsTemplate/ProductGroupsTemplate";
import apiProductCategories from "src/api/fakeApi/apiProductCategories";

import { useFetchApiProductResources } from "src/api/api.list.ts";

function SteamCategoryGroups() {
  const { dataProductCategories } = useFetchApiProductResources();
  // lam_dev thay apiProductCategories === dataProductCategories
  const steam = apiProductCategories.steamCategories.map((detail) => detail);

  const allClasses = steam
    .map((steam) => steam.classify?.title)
    .filter((className): className is string => Boolean(className));

  const firstTitle = allClasses.includes("Steam Wallet")
    ? ["Steam Wallet"]
    : [];

  const secondTitle = allClasses.includes("Steam Point") ? ["Steam Point"] : [];

  const productType = "STEAM_WALLET" && "STEAM_POINT";

  return (
    <ProductGroupsTemplate
      productType={productType}
      isClass={[]}
      //@ts-ignore
      apiProductCategories={steam}
      firstTitle={firstTitle}
      secondTitle={secondTitle}
      thirdTitle={undefined}
      fourTitle={undefined}
      theClassify=""
      theClass=""
    />
  );
}

export default SteamCategoryGroups;
