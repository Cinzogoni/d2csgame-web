"use client";

import { useParams } from "next/navigation";
import ProductTemplate from "src/app/components/ProductTemplate/ProductTemplate";

import apiHomePageResources from "src/api/fakeApi/apiHomePageResources";

import { dataHomePageResources } from "src/api/api.list.ts";

function SteamWallet() {
  const { name } = useParams();

  const steamWalletName =
    typeof name === "string" ? decodeURIComponent(name) : "";

  //lam_dev thay apiHomePageResources === dataHomePageResources
  const steamWallet = apiHomePageResources.steam
    .map((steam) => steam)
    .find((wallet) => wallet.name === steamWalletName);

  const anotherSteamWallet = apiHomePageResources.steam
    .map((steam) => steam)
    .filter(
      (wallet) =>
        wallet.name !== steamWalletName && wallet.productType === "STEAM_WALLET"
    );
  return (
    <ProductTemplate
      characterName={steamWalletName}
      anotherProduct={anotherSteamWallet}
      //@ts-ignore
      apiMapping={steamWallet}
    />
  );
}

export default SteamWallet;
