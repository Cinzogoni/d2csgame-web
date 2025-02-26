"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiFakeHomePageResources from "src/api/fakeApi/apiFakeHomePageResources";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function SteamWallet() {
  const { name } = useParams();
  // const { dataHomePageResources } = useFetchApiProductResources();

  const steamWalletName =
    typeof name === "string" ? decodeURIComponent(name) : "";

  //lam_dev thay apiFakeHomePageResources === dataHomePageResources
  const steamWallet = apiFakeHomePageResources.steam
    .map((steam) => steam)
    .find((wallet) => wallet.name === steamWalletName);

  const anotherSteamWallet = apiFakeHomePageResources.steam
    .map((steam) => steam)
    .filter(
      (wallet) =>
        wallet.name !== steamWalletName && wallet.productType === "STEAM_WALLET"
    );
  return (
    <ProductTemplate
      characterName={steamWalletName}
      //@ts-ignore
      anotherProduct={anotherSteamWallet}
      //@ts-expect-error: Checked Used OK
      apiMapping={steamWallet}
    />
  );
}

export default SteamWallet;
