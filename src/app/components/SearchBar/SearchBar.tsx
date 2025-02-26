"use client";

import styles from "./SearchBar.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import useDebounce from "src/app/hooks/useDebounce";
import Select from "react-select";
import { Link, isNavigate } from "src/i18n/routing";

import apiSearchResult from "src/api/fakeApi/apiSearchResult";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function SearchBar() {
  const t = useTranslations("Primary");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isClient, setIsClient] = useState<boolean>(false);
  const debouncedSearchInput = useDebounce(searchInput, 250);
  // const { dataSearchResult } = useFetchApiProductResources();

  //lam_dev thay apiSearchResult === dataSearchResult
  const result = apiSearchResult.result.map((all) => all);

  const customFilter = (option: any, searchInput: string) => {
    if (!searchInput) return false;

    const search = searchInput.toLowerCase();
    const name = option.data?.name?.toLowerCase() || "";
    const character = option.data?.character?.name.toLowerCase() || "";
    const price = option.data?.price?.toLowerCase() || "";
    return (
      name.includes(search) ||
      character.includes(search) ||
      price.includes(search)
    );
  };

  const handleProductLink = (
    characterName: string,
    name: string,
    productType: string
  ) => {
    const paths: { [key: string]: string } = {
      SET: "/heros/[heroName]/sets/[name]",
      ITEM: "/heros/[heroName]/items/[name]",
      ARCANA: "/heros/[heroName]/arcana/[name]",
      TAUNT: "/heros/[heroName]/taunt/[name]",
      STEAM_WALLET: "/steam/wallet/[name]",
      STEAM_POINT: "/steam/point/[name]",
      WEATHER_EFFECTS: "/others/weather-effects/[name]",
      TERRAIN: "/others/terrain/[name]",
      MUSIC_PACK: "/others/music-pack/[name]",
      COURIER: "/others/courier/[name]",
    };

    const dynamicPath = paths[productType] || "";

    if (dynamicPath) {
      return isNavigate(dynamicPath, {
        heroName: characterName,
        name: name,
      });
    }
  };

  const customFormatOptionLabel = (products: any) => (
    <Link
      //@ts-expect-error: Checked Used OK
      href={handleProductLink(
        products.character.name,
        products.name,
        products.productType
      )}
      target="_blank"
    >
      <div className={cx("products")}>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src={products.images[0].filePath}
          alt={products.name}
          style={{
            width: "65px",
            height: "65px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <div>
          <h5 className={cx("name")}>{products.name}</h5>
          <h5 className={cx("character")}>{products.character.name}</h5>
          <h5 className={cx("price")}>{products.price}</h5>
        </div>
      </div>
    </Link>
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className={cx("wrapper")}>
      <Select
        options={result}
        placeholder={t("search")}
        formatOptionLabel={customFormatOptionLabel}
        filterOption={(option) => customFilter(option, debouncedSearchInput)}
        onInputChange={(inputValue) => setSearchInput(inputValue)}
        isClearable
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        styles={{
          container: (provided) => ({
            ...provided,
            width: "100%",
            height: "100%",
            borderRadius: "12px",
          }),
          control: (provided) => ({
            ...provided,
            height: "100%",
            borderRadius: "12px",
            fontSize: "1.6rem",
            "&:hover": {},
          }),
          placeholder: (provided) => ({
            ...provided,
            fontSize: "1.6rem",
            visibility: isFocused ? "hidden" : "visible",
          }),
          menu: (provided) => ({
            ...provided,
            fontSize: "1.6rem",
            backgroundColor: "rgb(44, 44, 53)",
          }),
          option: (provided) => ({
            ...provided,
            backgroundColor: "rgb(44, 44, 53)",
          }),
          singleValue: (provided) => ({
            ...provided,
            display: "none",
          }),
          indicatorsContainer: (provided) => ({
            ...provided,
            display: "none",
          }),
        }}
      />
    </div>
  );
}

export default SearchBar;
