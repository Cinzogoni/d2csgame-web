"use client";

import styles from "./Categories.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "../Button/Button";
import GridSystem from "../GridSystem/GridSystem";

import { Link, isNavigate } from "src/i18n/routing";

import apiHomePageResources from "src/api/fakeApi/apiHomePageResources";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

type IsCategoriesType = {
  id: number | null;
  name: string;
  productType: string;
  link: string;
};

function Categories() {
  const tPrimary = useTranslations("Primary");
  const tHeros = useTranslations("Heros");
  const [selectedId, setSelectedId] = useState<number | null>(1);
  // const { dataHomePageResources } = useFetchApiProductResources();

  const isCategories: IsCategoriesType[] = [
    {
      id: 1,
      name: tHeros("arcana"),
      productType: "ARCANA",
      link: "/arcana-categories",
    },
    {
      id: 2,
      name: tHeros("taunt"),
      productType: "TAUNT",
      link: "/taunt-categories",
    },
    {
      id: 3,
      name: tHeros("weatherEffects"),
      productType: "WEATHER_EFFECTS",
      link: "/others/weather-effects",
    },
    {
      id: 4,
      name: tHeros("terrain"),
      productType: "TERRAIN",
      link: "/others/terrain",
    },
    {
      id: 5,
      name: tHeros("musicPack"),
      productType: "MUSIC_PACK",
      link: "/others/music-pack",
    },
    {
      id: 6,
      name: tHeros("courier"),
      productType: "COURIER",
      link: "/others/courier",
    },
  ];

  const currentCategory = isCategories.find(
    (category) => category.id === selectedId
  );

  //lam_dev thay apiHomePageResources === dataHomePageResources
  const categories = apiHomePageResources.categories
    .map((category) => category)
    .filter((type) => type.productType === currentCategory?.productType);

  const handleCategoriesLink = (
    characterName: string,
    name: string,
    productType: string
  ) => {
    const paths: { [key: string]: string } = {
      ARCANA: "/heros/[heroName]/arcana/[name]",
      TAUNT: "/heros/[heroName]/taunt/[name]",
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

  return (
    <div className={cx("wrapper")}>
      <div className={cx("categories")}>
        <div className={cx("heading")}>
          {isCategories.map((category) => {
            return (
              <h4
                key={category.id}
                className={cx("title")}
                onClick={() =>
                  setSelectedId((prevId) =>
                    prevId === category.id ? null : category.id
                  )
                }
                style={{
                  transition: "all 0.5s ease",
                  backgroundColor:
                    selectedId === category.id
                      ? "rgb(44, 44, 53)"
                      : "transparent",
                  color:
                    selectedId === category.id
                      ? "rgba(255, 255, 255, 0.8)"
                      : "#34495e",
                  boxShadow:
                    selectedId === category.id
                      ? "0 0 5px rgb(35, 35, 35)"
                      : "none",
                  borderTopLeftRadius:
                    selectedId === category.id ? "6px" : "6px",
                  borderTopRightRadius:
                    selectedId === category.id ? "6px" : "6px",
                }}
              >
                {category.name}
                <span className={cx("partition")}></span>
              </h4>
            );
          })}
        </div>

        <div className={cx("category")}>
          {isCategories.map((category, index) => (
            <div
              key={index}
              className={cx("frame")}
              style={{
                opacity:
                  selectedId === category.id && category.productType ? 1 : 0,
                transform:
                  selectedId === category.id && category.productType
                    ? "translateY(0)"
                    : "translateY(100%)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              {categories.map((category, index) => (
                <GridSystem
                  key={index}
                  colClass={cx("col")}
                  colL={cx("l-2")}
                  colML={cx("ml-2")}
                  colM={cx("m-2")}
                  colSM={cx("sm-3")}
                  colS={cx("s-4")}
                  colMo={cx("mo-6")}
                  colMi={cx("mi-12")}
                >
                  <div className={cx("boxes")}>
                    <Link
                      //@ts-expect-error: Map Link Ok
                      href={handleCategoriesLink(
                        category.character.name,
                        category.name,
                        category.productType
                      )}
                      target="_blank"
                      style={{ height: "100%" }}
                    >
                      <div className={cx("box")}>
                        <div className={cx("category-img")}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className={cx("img")}
                            src={category.images[0].filePath}
                            alt={category.name}
                          />
                        </div>

                        <div className={cx("desc")}>
                          <h6 className={cx("name")}>{category.name}</h6>
                          <h6 className={cx("hero")}>
                            - {category.character.name} -
                          </h6>
                          <h6 className={cx("price")}>{category.price}</h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                </GridSystem>
              ))}
            </div>
          ))}
        </div>

        <div className={cx("viewAll")}>
          <Button link={currentCategory?.link}>
            {tPrimary("viewAll")} {currentCategory?.name}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Categories;
