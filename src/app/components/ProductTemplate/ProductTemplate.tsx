"use client";

import styles from "../ProductTemplate/ProductTemplate.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useState, useEffect } from "react";
import { Link, isNavigate } from "src/i18n/routing";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { ProductCategories } from "src/app/types/dataType";
import useScroll from "src/app/hooks/useScroll";
import ButtonAddToCart from "../ButtonAddToCart/ButtonAddToCart";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ReactPlayer from "react-player";
import GridSystem from "../GridSystem/GridSystem";

type ProductTemplateProps = {
  characterName: string;
  apiMapping: ProductCategories;
  anotherProduct: ProductCategories[];
};

function ProductTemplate({
  characterName,
  apiMapping,
  anotherProduct,
}: ProductTemplateProps) {
  const tHeros = useTranslations("Heros");
  const tPrimary = useTranslations("Primary");
  const [isClient, setIsClient] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const { handleScroll, transformValue, activeScroll } = useScroll(
    anotherProduct,
    windowWidth
  );

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

  const handleCharacterLink = (heroName: string, productType: string) => {
    const steamProductType =
      productType === "STEAM_WALLET" || productType === "STEAM_POINT";

    if (steamProductType) {
      return "/steam";
    }

    const otherProductType =
      productType === "WEATHER_EFFECT" ||
      productType === "TERRAIN" ||
      productType === "MUSIC_PACK" ||
      productType === "COURIER";

    if (otherProductType) {
      return "/others";
    }

    return `/heros/${heroName}`;
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("information")}>
        <div className={cx("info")}>
          <div className={cx("hero")}>
            <h4 className={cx("hero-name")}>
              {tHeros("heroProducts")}{" "}
              <strong style={{ fontWeight: "bold" }}>{characterName}</strong>
            </h4>
            <Link
              // @ts-ignore
              href={handleCharacterLink(characterName, apiMapping.productType)}
              style={{ height: "100%", display: "flex", alignItems: "center" }}
            >
              <img
                src={apiMapping.character.avatar}
                alt={characterName}
                className={cx("hero-avatar")}
              />
            </Link>
          </div>

          <div className={cx("product-avatar")}>
            {Array.isArray(apiMapping.images) &&
              apiMapping.images
                .filter(
                  (image) => image.filePath && image.filePath.trim() !== ""
                )
                .map((img, index) => {
                  return (
                    <img
                      key={index}
                      className={cx("product-img", {
                        selected: selectedImage === index + 1,
                      })}
                      src={img.filePath}
                      alt={apiMapping.name}
                      onClick={() => handleImageClick(index + 1)}
                    />
                  );
                })}
          </div>

          <div className={cx("video")}>
            {isClient && (
              <ReactPlayer
                url={apiMapping.demo}
                width="100%"
                height="100%"
                style={{ borderRadius: "6px" }}
                controls={true}
              />
            )}
          </div>
        </div>

        <div className={cx("description")}>
          <div className={cx("top")}>
            <h1 className={cx("heading")}>
              {tHeros("heroProductInfo")}{" "}
              <strong className={cx("heading-strong")}>
                {apiMapping.name}
              </strong>
            </h1>
          </div>

          <div className={cx("body")}>
            <div className={cx("buy-sell")}>
              <div className={cx("price")}>
                <h4 className={cx("money")}>
                  {tHeros("heroProductPrice")}{" "}
                  <strong className={cx("money-strong")}>
                    {apiMapping.price}
                  </strong>{" "}
                  VND
                </h4>
              </div>

              <div className={cx("cart")}>
                <ButtonAddToCart quantity={apiMapping.quantity} />
              </div>
            </div>

            <div className={cx("desc")}>
              {(apiMapping.description || "").split("\n").map((line, index) => (
                <Fragment key={index}>
                  <p className={cx("line")}>{line}</p>
                  <br />
                </Fragment>
              ))}
            </div>

            <div className={cx("note")}>
              <p className={cx("note-text")}>
                <strong>{tHeros("heroProductNote")} </strong>
                Đơn hàng sẽ xử lý từ 1 phút đến 10 phút, các bạn có thể kiểm tra
                tình trạng đơn hàng trong trang cá nhân. Thời gian xử lý đơn
                hàng từ 8h sáng đến 22h tối, sau thời gian này mong các bạn chờ
                tới thời gian hôm sau để được xử lý.
              </p>
            </div>
          </div>
        </div>
      </div>

      {anotherProduct.length >= 1 && (
        <div className={cx("another")}>
          <div className={cx("another-product")}>
            <div className={cx("heading")}>
              <h4 className={cx("title")}>{tHeros("similarProducts")}</h4>

              <Link
                //@ts-ignore
                href={isNavigate("/heros/[heroName]", {
                  heroName: characterName,
                })}
                target="_blank"
              >
                <h5 className={cx("view-all")}>{tPrimary("viewAll")}</h5>
              </Link>
            </div>

            <div className={cx("frame")}>
              <div className={cx("slide")} onClick={() => handleScroll("prev")}>
                <ArrowBackIosNewIcon
                  style={{
                    fontSize: "48",
                    transition: "transition: transform 0.25s ease-in-out",
                    transform:
                      activeScroll === "prev" ? "scale(1.2)" : "scale(1)",
                  }}
                />
              </div>
              <div className={cx("slide")} onClick={() => handleScroll("next")}>
                <ArrowForwardIosIcon
                  style={{
                    fontSize: "48",
                    transition: "transition: transform 0.25s ease-in-out",
                    transform:
                      activeScroll === "next" ? "scale(1.2)" : "scale(1)",
                  }}
                />
              </div>

              <div className={cx("boxes")}>
                <GridSystem rowClass={cx("row")}>
                  <div
                    className={cx("box")}
                    style={{
                      transition: "transform 0.3s ease-in-out",
                      transform: transformValue(),
                    }}
                  >
                    {anotherProduct.map((another, index) => {
                      return (
                        <GridSystem
                          key={index}
                          colClass={cx("col")}
                          colL={cx("l-2")}
                          colML={cx("ml-2")}
                          colM={cx("m-3")}
                          colSM={cx("sm-3")}
                          colS={cx("s-4")}
                          colMo={cx("mo-6")}
                          colMi={cx("mi-12")}
                        >
                          <Link
                            //@ts-ignore
                            href={handleProductLink(
                              characterName,
                              another.name,
                              another.productType
                            )}
                            target="_blank"
                          >
                            <div className={cx("products")}>
                              <div className={cx("img-box")}>
                                <img
                                  className={cx("img")}
                                  src={another.images[0].filePath}
                                  alt={another.name}
                                />
                              </div>

                              <div className={cx("info")}>
                                <h6 className={cx("name")}>{another.name}</h6>
                                <h6 className={cx("type")}>
                                  {another.productType === "STEAM_WALLET"
                                    ? `- ${another.character.name} -`
                                    : another.productType === "STEAM_POINT"
                                    ? `- ${another.character.name} -`
                                    : another.productType === "SET"
                                    ? `- ${characterName} -`
                                    : another.productType === "ITEM"
                                    ? `- ${characterName} -`
                                    : `- ${another.character.name} -`}
                                </h6>
                                <h6 className={cx("price")}>{another.price}</h6>
                              </div>
                            </div>
                          </Link>
                        </GridSystem>
                      );
                    })}
                  </div>
                </GridSystem>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductTemplate;
