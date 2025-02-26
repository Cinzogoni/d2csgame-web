"use client";

import styles from "../Items/Items.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Link, isNavigate } from "src/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import useSlider from "src/app/hooks/useSlider";
import useScroll from "src/app/hooks/useScroll";
import GridSystem from "../GridSystem/GridSystem";

import apiFakeHomePageResources from "src/api/fakeApi/apiFakeHomePageResources";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function Items() {
  const tPrimary = useTranslations("Primary");
  const tHeros = useTranslations("Heros");
  const [windowWidth, setWindowWidth] = useState(0);
  // const { dataHomePageResources } = useFetchApiProductResources();

  //lam_dev thay apiFakeHomePageResources === dataHomePageResources

  const items = apiFakeHomePageResources.items.map((item) => item);
  const outstandingItems = items.filter((item) => item.rate === true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const { handleScroll, transformValue, activeScroll } = useScroll(
    items,
    windowWidth
  );

  const { transformSlideValue } = useSlider(
    outstandingItems,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    13500,
    windowWidth
  );

  const handleItemLink = (heroName: string, name: string) => {
    const dynamicLink = `/heros/[heroName]/items/[name]`;

    return isNavigate(dynamicLink, { heroName: heroName, name: name });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("outstanding")}>
        <div className={cx("heading")}>
          <h4 className={cx("title")}>{tPrimary("outstandingItems")}</h4>
        </div>

        <div className={cx("scenes")}>
          <GridSystem rowClass={cx("row")}>
            <div
              className={cx("box")}
              style={{
                transition: "transform 0.3s ease-in-out",
                transform: transformSlideValue(),
              }}
            >
              {outstandingItems.map((outs, index) => {
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
                    <div className={cx("item")}>
                      <Link
                        //@ts-expect-error: Map Link OK
                        href={handleItemLink(outs.character.name, outs.name)}
                        target="_blank"
                      >
                        {outs.images[0] && (
                          <div className={cx("img-box")}>
                            {/* eslint-disable @next/next/no-img-element */}
                            <img
                              className={cx("img")}
                              src={outs.images[0].filePath}
                              alt={outs.name}
                            />
                          </div>
                        )}

                        <div className={cx("info")}>
                          <h6 className={cx("outstanding-name")}>
                            {outs.name}
                          </h6>
                          <h6 className={cx("outstanding-hero")}>
                            - {outs.character.name} -
                          </h6>
                          <h6 className={cx("outstanding-price")}>
                            {outs.price}
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

      <div className={cx("items")}>
        <div className={cx("heading")}>
          <h4 className={cx("title")}>{tHeros("items")}</h4>
          <Link href="/item-categories" target="_blank">
            <h5 className={cx("view-all")}>{tPrimary("viewAll")}</h5>
          </Link>
        </div>

        <div className={cx("frame")}>
          <div className={cx("slide")} onClick={() => handleScroll("prev")}>
            <ArrowBackIosNewIcon
              style={{
                fontSize: "48",
                transition: "transition: transform 0.25s ease-in-out",
                transform: activeScroll === "prev" ? "scale(1.2)" : "scale(1)",
              }}
            />
          </div>
          <div className={cx("slide")} onClick={() => handleScroll("next")}>
            <ArrowForwardIosIcon
              style={{
                fontSize: "48",
                transition: "transition: transform 0.25s ease-in-out",
                transform: activeScroll === "next" ? "scale(1.2)" : "scale(1)",
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
                {/* //lam_dev thay items === isListItem để map */}
                {items.map((item, index) => {
                  return (
                    <GridSystem
                      key={index}
                      colClass={cx("col")}
                      colL={cx("l-2")}
                      colML={cx("ml-3")}
                      colM={cx("m-4")}
                      colSM={cx("sm-6")}
                      colS={cx("s-4")}
                      colMo={cx("mo-6")}
                      colMi={cx("mi-12")}
                    >
                      <Link
                        //@ts-expect-error: Map Link Ok
                        href={handleItemLink(item.character.name, item.name)}
                        target="_blank"
                      >
                        <div className={cx("item")}>
                          {item.saleOff !== 0 && (
                            <div className={cx("note")}>
                              <h6 className={cx("desc")}>
                                {tPrimary("saleOff")}
                              </h6>
                            </div>
                          )}
                          {item.images[0] && (
                            <div className={cx("img-box")}>
                              {/* eslint-disable @next/next/no-img-element */}
                              <img
                                className={cx("img")}
                                src={item.images[0].filePath}
                                alt={item.name}
                              />
                            </div>
                          )}

                          <div className={cx("info")}>
                            <h6 className={cx("name")}>{item.name}</h6>
                            <h6 className={cx("hero")}>
                              - {item.character.name} -
                            </h6>
                            <h6 className={cx("price")}>{item.price}</h6>
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
  );
}

export default Items;
