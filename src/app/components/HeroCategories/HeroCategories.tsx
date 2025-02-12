import styles from "../HeroCategories/HeroCategories.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useNavigate } from "src/i18n/routing";
import { HeroCategoriesProps } from "src/app/types/dataType";

import GridSystem from "../GridSystem/GridSystem";

type ProductsType = {
  id: number | null;
  name: string;
  productType: string;
};

type HeroProps = {
  heroCategories: HeroCategoriesProps;
  heroName: string;
  avatar: string;
};

function HeroCategories({ heroCategories, heroName, avatar }: HeroProps) {
  const tHeros = useTranslations("Heros");
  const [selectedId, setSelectedId] = useState<number | null>(1);

  const products: ProductsType[] = [
    { id: 1, name: tHeros("sets"), productType: "SET" },
    { id: 2, name: tHeros("items"), productType: "ITEM" },
    {
      id: 3,
      name: tHeros("arcana"),
      productType: "ARCANA",
    },

    { id: 4, name: tHeros("taunt"), productType: "TAUNT" },
  ];

  const currentCategory = products.find((product) => product.id === selectedId);

  const filteredHeroCategories = Array.isArray(heroCategories)
    ? heroCategories.filter(
        (type) => type.productType === currentCategory?.productType
      )
    : [];

  const handleProductLink = (heroName: string, name: string) => {
    const currentCategory = products.find(
      (product) => product.id === selectedId
    );

    if (currentCategory) {
      let dynamicPath = "";

      switch (currentCategory.productType) {
        case "SET":
          dynamicPath = "/heros/[heroName]/sets/[name]";
          break;
        case "ITEM":
          dynamicPath = "/heros/[heroName]/items/[name]";
          break;
        case "ARCANA":
          dynamicPath = "/heros/[heroName]/arcana/[name]";
          break;
        case "TAUNT":
          dynamicPath = "/heros/[heroName]/taunt/[name]";
          break;
        default:
          return "";
      }

      return useNavigate(dynamicPath, {
        heroName: heroName,
        name: name,
      });
    }

    return "";
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("top")}>
        <h1 className={cx("title")}>
          {tHeros("heroProducts")}{" "}
          <strong style={{ fontWeight: "bold" }}>{heroName}</strong>
        </h1>
        <Link href="/heros" target="_blank">
          <img src={avatar} alt={heroName} className={cx("hero-avatar")} />
        </Link>
      </div>

      <div className={cx("products")}>
        <div className={cx("categories")}>
          <div className={cx("heading")}>
            {products.map((product) => {
              return (
                <h4
                  key={product.id}
                  className={cx("title")}
                  onClick={() =>
                    setSelectedId((prevId) =>
                      prevId === product.id ? null : product.id
                    )
                  }
                  style={{
                    transition: "all 0.5s ease",
                    backgroundColor:
                      selectedId === product.id
                        ? "rgb(44, 44, 53)"
                        : "transparent",
                    color:
                      selectedId === product.id
                        ? "rgba(255, 255, 255, 0.8)"
                        : "#34495e",
                    boxShadow:
                      selectedId === product.id
                        ? "0 0 5px rgb(35, 35, 35)"
                        : "none",
                    borderTopLeftRadius:
                      selectedId === product.id ? "6px" : "6px",
                    borderTopRightRadius:
                      selectedId === product.id ? "6px" : "6px",
                  }}
                >
                  {product.name}
                  <span className={cx("partition")}></span>
                </h4>
              );
            })}
          </div>

          <div className={cx("category")}>
            {products.map((product, index) => (
              <div
                key={index}
                className={cx("frame")}
                style={{
                  opacity:
                    selectedId === product.id && product.productType ? 1 : 0,
                  transform:
                    selectedId === product.id && product.productType
                      ? "translateY(0)"
                      : "translateY(100%)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                {filteredHeroCategories?.map(
                  (category, index) =>
                    category && (
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
                        <Link
                          //@ts-ignore
                          href={handleProductLink(heroName, category.name)}
                          target="_blank"
                        >
                          <div className={cx("boxes")}>
                            <div className={cx("box")}>
                              <div className={cx("category-img")}>
                                <img
                                  className={cx("img")}
                                  src={category.images[0].filePath}
                                  alt={category.character.name}
                                />
                              </div>

                              <div className={cx("desc")}>
                                <h6 className={cx("name")}>{category.name}</h6>
                                <h6 className={cx("hero")}>
                                  - {category.character.name} -
                                </h6>
                                <h6 className={cx("price")}>
                                  {category.price}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </GridSystem>
                    )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCategories;
