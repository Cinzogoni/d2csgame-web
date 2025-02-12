"use client";

import styles from "../ProductGroupsTemplate/ProductGroupsTemplate.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useState, useLayoutEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, useNavigate, usePathname } from "src/i18n/routing";

import { ProductCategories } from "src/app/types/dataType";
import ReactPlayer from "react-player";
import useSlider from "src/app/hooks/useSlider";
import GridSystem from "../GridSystem/GridSystem";
import PriceRangeFilter from "../PriceRangeFilter/PriceRangeFilter";

import REVIEWS from "src/api/fakeApi/apiProductCategories";

type ClassType = {
  id: number;
  title: string | undefined;
  productType: string;
};

type ClassifyType = ClassType[];

interface ProductGroupsTemplateType {
  productType: string;
  apiProductCategories: ProductCategories[];
  isClass: string[];
  firstTitle: string[];
  secondTitle: string[];
  thirdTitle: string[] | undefined;
  fourTitle: string[] | undefined;
  theClassify: string;
  theClass: string;
}

type ActiveOpacityState = {
  [key: string]: boolean;
};

function ProductGroupsTemplate({
  productType,
  apiProductCategories,
  isClass,
  firstTitle,
  secondTitle,
  thirdTitle,
  fourTitle,
  theClassify,
  theClass,
}: ProductGroupsTemplateType) {
  const tPrimary = useTranslations("Primary");
  const [selectTitle, setSelectTitle] = useState<string>("All");
  const [selectedClass, setSelectedClass] = useState<string[]>(isClass);
  const [windowWidth, setWindowWidth] = useState(0);
  const [activeOpacity, setActiveOpacity] = useState<ActiveOpacityState>({
    All: true,
    "Collector's cache": false,
    "Mix set": false,
    Infused: false,
    Arcana: false,
    Immortal: false,
    "Dota Plus": false,
    "Steam Wallet": false,
    "Steam Point": false,
    "Weather Effects": false,
    Terrain: false,
    "Music Pack": false,
    Courier: false,
  });
  const [range, setRange] = useState<[number, number]>([1000, 2000000]);
  const [filteredByPrice, setFilteredByPrice] = useState<
    ProductCategories[] | null
  >([]);
  const [isClient, setIsClient] = useState<boolean>(false);
  const pathname = usePathname();

  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  useLayoutEffect(() => {
    if (pathname === "/set-categories/[theClassify]") {
      handleSelected(theClassify);
    } else if (pathname === "/item-categories/[theClassify]") {
      handleSelected(theClassify);
    } else if (pathname === "/steam/[theClassify]") {
      handleSelected(theClassify);
    } else if (pathname === "/others/[theClassify]") {
      handleSelected(theClassify);
    }

    if (pathname === "/set-categories/[theClassify]/[theClass]") {
      handleSelected(theClassify);
      handleSelectedClass(theClassify, theClass);
    } else if (pathname === "/item-categories/[theClassify]/[theClass]") {
      handleSelected(theClassify);
      handleSelectedClass(theClassify, theClass);
    }
  }, [theClassify, theClass]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const name = e.target.name;

    setRange((prev) => {
      if (name === "min") {
        return [Math.min(value, prev[1] - 10000), prev[1]];
      } else {
        return [prev[0], Math.max(value, prev[0] + 10000)];
      }
    });
  };

  const classify: ClassifyType = [
    { id: 1, title: "All", productType: productType },
    { id: 2, title: firstTitle?.join(", "), productType: productType },
    { id: 3, title: secondTitle?.join(", "), productType: productType },
    { id: 4, title: thirdTitle?.join(", "), productType: productType },
    { id: 5, title: fourTitle?.join(", "), productType: productType },
  ];

  const filteredProducts = apiProductCategories.filter((product) => {
    if (selectTitle === "All") return true;

    return (
      product.classify?.title &&
      product.classify.title === selectTitle &&
      product.classify.class &&
      selectedClass.some((cls) => cls === product.classify.class)
    );
  });

  const filteredProductsSaleOff = apiProductCategories.filter(
    (product) => product.saleOff !== 0
  );

  const { transformSlideValue } = useSlider(
    filteredProductsSaleOff,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    10500,
    windowWidth
  );

  const handleSelected = (title: string) => {
    setSelectTitle(title);

    const newActiveOpacity: ActiveOpacityState = {
      All: false,
      "Collector's cache": false,
      "Mix set": false,
      Infused: false,
      Arcana: false,
      Immortal: false,
      "Dota Plus": false,
      "Steam Wallet": false,
      "Steam Point": false,
      "Weather Effects": false,
      Terrain: false,
      "Music Pack": false,
      Courier: false,
    };

    if (title === "All") {
      newActiveOpacity["All"] = true;
    } else if (title === "Collector's cache") {
      newActiveOpacity["Collector's cache"] = true;
    } else if (title === "Mix set") {
      newActiveOpacity["Mix set"] = true;
    } else if (title === "Infused") {
      newActiveOpacity["Infused"] = true;
    } else if (title === "Arcana") {
      newActiveOpacity["Arcana"] = true;
    } else if (title === "Immortal") {
      newActiveOpacity["Immortal"] = true;
    } else if (title === "Dota Plus") {
      newActiveOpacity["Dota Plus"] = true;
    } else if (title === "Steam Wallet") {
      newActiveOpacity["Steam Wallet"] = true;
    } else if (title === "Steam Point") {
      newActiveOpacity["Steam Point"] = true;
    } else if (title === "Weather Effects") {
      newActiveOpacity["Weather Effects"] = true;
    } else if (title === "Terrain") {
      newActiveOpacity["Terrain"] = true;
    } else if (title === "Music Pack") {
      newActiveOpacity["Music Pack"] = true;
    } else if (title === "Courier") {
      newActiveOpacity["Courier"] = true;
    }

    setActiveOpacity(newActiveOpacity);
  };

  const handleFilterByPrice = () => {
    const filtered = apiProductCategories.filter((product) => {
      const price = Number(product.price.replace(/\./g, ""));

      return price >= range[0] && price <= range[1];
    });

    setFilteredByPrice(filtered.length > 0 ? filtered : null);
  };

  const displayedProducts =
    filteredByPrice !== null && filteredByPrice.length > 0
      ? filteredByPrice
      : filteredProducts;

  const reviews = REVIEWS.reviews.map((url) => url);

  // xử lý cho các box product
  const handleProductLink = (
    characterName: string,
    name: string,
    productType: string
  ) => {
    const paths: { [key: string]: string } = {
      SET: "/heros/[heroName]/sets/[name]",
      ITEM: "/heros/[heroName]/items/[name]",
      STEAM_WALLET: "/steam/wallet/[name]",
      STEAM_POINT: "/steam/point/[name]",
      WEATHER_EFFECTS: "/others/weather-effects/[name]",
      TERRAIN: "/others/terrain/[name]",
      MUSIC_PACK: "/others/music-pack/[name]",
      COURIER: "/others/courier/[name]",
    };

    const dynamicPath = paths[productType] || "";

    if (dynamicPath) {
      return useNavigate(dynamicPath, {
        heroName: characterName,
        name: name,
      });
    }
  };

  const handleSelectedClass = (title: string, isClass: string) => {
    if (title === "Collector's cache" && isClass === "The International 09") {
      setSelectedClass(["The International 09"]);
    } else if (
      title === "Collector's cache" &&
      isClass === "The International 10"
    ) {
      setSelectedClass(["The International 10"]);
    } else if (title === "Collector's cache" && isClass === "Diretide 2022") {
      setSelectedClass(["Diretide 2022"]);
    } else if (title === "Collector's cache" && isClass === "Aghanim Cache") {
      setSelectedClass(["Aghanim Cache"]);
    } else if (title === "Immortal" && isClass === "The International 3") {
      setSelectedClass(["The International 3"]);
    } else if (title === "Immortal" && isClass === "The International 4") {
      setSelectedClass(["The International 4"]);
    } else if (title === "Immortal" && isClass === "The International 5") {
      setSelectedClass(["The International 5"]);
    } else if (title === "Immortal" && isClass === "Trove 2019") {
      setSelectedClass(["Trove 2019"]);
    } else if (title === "Immortal" && isClass === "Diretide 2020") {
      setSelectedClass(["Diretide 2020"]);
    } else if (title === "Immortal" && isClass === "Golden") {
      setSelectedClass(["Golden"]);
    }
  };

  return (
    <div className={cx("container")}>
      {productType === "SET" || productType === "ITEM" ? (
        <div className={cx("sidebar")}>
          <div className={cx("classify")}>
            {classify.map((title, index) => {
              return (
                <h4
                  key={index}
                  className={cx("classify-title", {
                    classifyTitleChange: selectTitle === title.title,
                  })}
                  onClick={() => handleSelected(title.title ?? "All")}
                >
                  {title.title}
                </h4>
              );
            })}
          </div>

          <div className={cx("price-bar")}>
            <h4
              style={{
                fontSize: "2.4rem",
              }}
            >
              {tPrimary("filterByPrice")}
            </h4>

            <PriceRangeFilter range={range} handleChange={handleChange} />

            <div className={cx("filter-price")}>
              <button className={cx("price-btn")} onClick={handleFilterByPrice}>
                {tPrimary("filterPrice")}
              </button>
            </div>
          </div>

          <div className={cx("discount")}>
            <h4
              style={{
                fontSize: "2.4rem",
              }}
            >
              {tPrimary("saleOff")}
            </h4>

            <div className={cx("scenes")}>
              <GridSystem rowClass={cx("row")}>
                <div
                  className={cx("box")}
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    transform: transformSlideValue(),
                  }}
                >
                  {filteredProductsSaleOff.map((sale, index) => {
                    return (
                      <GridSystem
                        key={index}
                        colClass={cx("col")}
                        colL={cx("l-12")}
                        colML={cx("ml-12")}
                        colM={cx("m-12")}
                        colSM={cx("sm-12")}
                        colS={cx("s-12")}
                        colMo={cx("mo-12")}
                        colMi={cx("mi-12")}
                      >
                        <div className={cx("img-frame")}>
                          <Link
                            //@ts-ignore
                            href={handleProductLink(
                              sale.character.name,
                              sale.name,
                              sale.productType
                            )}
                            target="_blank"
                            className={cx("link")}
                          >
                            {sale.images[0] && (
                              <div className={cx("img-box-sale")}>
                                <img
                                  className={cx("img-sale")}
                                  src={sale.images[0].filePath}
                                  alt={sale.name}
                                />
                              </div>
                            )}

                            <div className={cx("info")}>
                              <h6 className={cx("product-name")}>
                                {sale.name}
                              </h6>
                              <h6 className={cx("product-character")}>
                                - {sale.character.name} -
                              </h6>
                              <h6 className={cx("product-price")}>
                                {sale.price}
                              </h6>
                            </div>
                          </Link>
                        </div>
                      </GridSystem>
                    );
                  })}
                </div>
              </GridSystem>
            </div>
          </div>
        </div>
      ) : productType === "STEAM_WALLET" || productType === "STEAM_POINT" ? (
        <div className={cx("sidebar")}>
          <div className={cx("classify")}>
            {classify.map((title, index) => {
              return (
                <h4
                  key={index}
                  className={cx("classify-title", {
                    classifyTitleChange: selectTitle === title.title,
                  })}
                  onClick={() => handleSelected(title.title ?? "All")}
                >
                  {title.title}
                </h4>
              );
            })}
          </div>

          <div className={cx("reviews")}>
            <div className={cx("heading")}>
              <h4 className={cx("text")}>{tPrimary("reviews")}</h4>
            </div>

            {reviews.map((url, index) => {
              return (
                <div key={index} className={cx("video")}>
                  {isClient && (
                    <ReactPlayer
                      className={cx("react-player")}
                      url={url.demo}
                      width="100%"
                      height="100%"
                      style={{ borderRadius: "12px" }}
                      controls={true}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={cx("sidebar")}>
          <div className={cx("classify")}>
            {classify.map((title, index) => {
              return (
                <h4
                  key={index}
                  className={cx("classify-title", {
                    classifyTitleChange: selectTitle === title.title,
                  })}
                  onClick={() => handleSelected(title.title ?? "All")}
                >
                  {title.title}
                </h4>
              );
            })}
          </div>

          <div className={cx("reviews")}>
            <div className={cx("heading")}>
              <h4 className={cx("text")}>{tPrimary("reviews")}</h4>
            </div>

            {reviews.map((url, index) => {
              return (
                <div key={index} className={cx("video")}>
                  {isClient && (
                    <ReactPlayer
                      className={cx("react-player")}
                      url={url.demo}
                      width="100%"
                      height="100%"
                      style={{ borderRadius: "12px" }}
                      controls={true}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className={cx("products")}>
        {filteredByPrice === null && (
          <h1
            style={{
              width: "100%",
              textAlign: "center",
              position: "absolute",
              fontSize: "3.2rem",
            }}
          >
            {tPrimary("notFoundFilterPrice")}
          </h1>
        )}

        {selectTitle === firstTitle[0] && (
          <div className={cx("classes")}>
            {apiProductCategories
              .filter(
                (filter) =>
                  filter.classify.class !== "non" &&
                  filter.classify.class !== "Dota Plus" &&
                  filter.classify.class !== "Arcana" &&
                  filter.classify.class !== "Crown Fall" &&
                  filter.classify.class !== "Winter 2016 Treasure I" &&
                  filter.classify.class !== "Steam Wallet" &&
                  filter.classify.class !== "Steam Point" &&
                  filter.classify.class !== "Weather Effects" &&
                  filter.classify.class !== "Terrain" &&
                  filter.classify.class !== "Music Pack" &&
                  filter.classify.class !== "Courier"
              )
              .map((isClass, index) => {
                const isSelectedClass = Array.isArray(isClass.classify.class)
                  ? isClass.classify.class.some((classItem) =>
                      selectedClass.includes(classItem)
                    )
                  : selectedClass.includes(isClass.classify.class);

                return (
                  <div
                    className={cx("class")}
                    key={index}
                    style={{
                      backgroundColor: isSelectedClass
                        ? "#2c2c35"
                        : "transparent",
                    }}
                  >
                    <h4
                      className={cx("class-tag")}
                      onClick={() =>
                        handleSelectedClass(
                          isClass.classify.title,
                          isClass.classify.class
                        )
                      }
                      style={{
                        color: isSelectedClass ? "#ffffffcc" : "#34495e",
                      }}
                    >
                      {isClass.classify.class}
                    </h4>
                  </div>
                );
              })}
          </div>
        )}

        <GridSystem rowClass={cx("row-1")}>
          {filteredByPrice !== null && (
            <div className={cx("frame")}>
              {displayedProducts
                .filter(
                  (product) =>
                    product.images?.length > 0 && product.images[0].filePath
                )
                .map((product, index) => {
                  return (
                    <GridSystem
                      key={index}
                      colClass={cx("col")}
                      colL={cx("l-3")}
                      colML={cx("ml-3")}
                      colM={cx("m-4")}
                      colSM={cx("sm-6")}
                      colS={cx("s-12")}
                      colMo={cx("mo-12")}
                      colMi={cx("mi-12")}
                    >
                      <Link
                        //@ts-ignore
                        href={handleProductLink(
                          product.character.name,
                          product.name,
                          product.productType
                        )}
                        target="_blank"
                        style={{
                          opacity:
                            activeOpacity["All"] ||
                            activeOpacity[product.classify.title]
                              ? 1
                              : 0,
                          transition: "opacity 0.5s ease",
                        }}
                      >
                        <div className={cx("product")}>
                          {product.images[0] && (
                            <div className={cx("img-box")}>
                              <img
                                className={cx("img")}
                                src={product.images[0].filePath}
                                alt={product.name}
                              />
                            </div>
                          )}

                          <div className={cx("info")}>
                            <h6 className={cx("product-name")}>
                              {product.name}
                            </h6>
                            <h6 className={cx("product-character")}>
                              - {product.character.name} -
                            </h6>
                            <h6 className={cx("product-price")}>
                              {product.price}
                            </h6>
                          </div>
                        </div>
                      </Link>
                    </GridSystem>
                  );
                })}
            </div>
          )}
        </GridSystem>
      </div>
    </div>
  );
}

export default ProductGroupsTemplate;
