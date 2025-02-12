"use client";

import styles from "../HeroList/HeroList.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import useDebounce from "src/app/hooks/useDebounce";
import Select from "react-select";
import GridSystem from "../GridSystem/GridSystem";
import { Link, useNavigate } from "src/i18n/routing";

import apiHeroCategories from "src/api/fakeApi/apiHeroCategories";

function HeroList() {
  const t = useTranslations("Heros");
  const [isClient, setIsClient] = useState<boolean>(false);
  const [selectedHero, setSelectedHero] = useState<any | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const debouncedSearchInput = useDebounce(searchInput, 250);

  const heros = Array.from(
    new Map(
      apiHeroCategories.heros.map((hero) => [hero.character.name, hero])
    ).values()
  );

  const options = heros.map((hero) => ({
    value: hero.character.name,
    label: hero.character.name,
  }));

  const filteredHeros = selectedHero
    ? heros.filter((hero) => hero.character.name === selectedHero.value)
    : heros.filter((hero) =>
        hero.character.name
          .toLowerCase()
          .includes(debouncedSearchInput.toLowerCase())
      );

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleProductLink = (heroName: string) => {
    const dynamicPath = "/heros/[heroName]";

    return useNavigate(dynamicPath, { heroName: heroName });
  };

  return (
    <div className={cx("wrapper")}>
      <h2 style={{ fontSize: "2.4rem" }}>{t("herosTitle")}</h2>
      <p style={{ fontSize: "1.6rem", textAlign: "center" }}>
        {t("herosDesc")}
      </p>

      <div className={cx("search")}>
        <Select
          options={options}
          placeholder="Tìm kiếm hero..."
          value={selectedHero}
          onInputChange={(value) => setSearchInput(value)}
          onChange={setSelectedHero}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          isClearable
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
            }),
            placeholder: (provided) => ({
              ...provided,
              fontSize: "1.6rem",
              visibility: isFocused ? "hidden" : "visible",
            }),
            menu: (provided) => ({
              ...provided,
              display: "none",
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

      <div className={cx("list")}>
        {filteredHeros.map((hero, index) => {
          return (
            <GridSystem
              key={index}
              colClass={cx("col")}
              colL={cx("l-2")}
              colML={cx("ml-3")}
              colM={cx("m-3")}
              colSM={cx("sm-6")}
              colS={cx("s-6")}
              colMo={cx("mo-12")}
              colMi={cx("mi-12")}
            >
              <Link
                //@ts-ignore
                href={handleProductLink(hero.character.name)}
                target="_blank"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className={cx("box")}>
                  <div className={cx("img-box")}>
                    <img
                      src={hero.character.avatar}
                      alt={hero.character.name}
                      className={cx("img")}
                    />
                  </div>

                  <h3 className={cx("hero-name")}>- {hero.character.name} -</h3>
                </div>
              </Link>
            </GridSystem>
          );
        })}
      </div>
    </div>
  );
}

export default HeroList;
