"use client";

import styles from "../Sets/Sets.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Link, useNavigate } from "src/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import useSlider from "src/app/hooks/useSlider";
import useScroll from "src/app/hooks/useScroll";
import GridSystem from "../GridSystem/GridSystem";

import apiHomePageResources from "src/api/fakeApi/apiHomePageResources";

import { dataHomePageResources } from "src/api/api.list.ts";

function Sets() {
  const tPrimary = useTranslations("Primary");
  const tHeros = useTranslations("Heros");
  const [windowWidth, setWindowWidth] = useState(0);

  //lam_dev thay apiHomePageResources === dataHomePageResources
  const sets = apiHomePageResources.sets.map((set) => set);
  const outstandingSets = sets.filter((set) => set.rate === true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const { handleScroll, transformValue, activeScroll } = useScroll(
    sets,
    windowWidth
  );

  const { transformSlideValue } = useSlider(
    outstandingSets,
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

  const handleSetLink = (heroName: string, name: string) => {
    const dynamicLink = `/heros/[heroName]/sets/[name]`;

    return useNavigate(dynamicLink, { heroName: heroName, name: name });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("outstanding")}>
        <div className={cx("heading")}>
          <h4 className={cx("title")}>{tPrimary("outstandingSets")}</h4>
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
              {outstandingSets.map((outs, index) => {
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
                    <div className={cx("set")}>
                      <Link
                        //@ts-ignore
                        href={handleSetLink(outs.character.name, outs.name)}
                      >
                        {outs.images[0]?.filePath && (
                          <div className={cx("img-box")}>
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

      <div className={cx("sets")}>
        <div className={cx("heading")}>
          <h4 className={cx("title")}>{tHeros("sets")}</h4>
          <Link
            //@ts-ignore
            href="/set-categories"
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
                {sets.map((set, index) => {
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
                        //@ts-ignore
                        href={handleSetLink(set.character.name, set.name)}
                        target="_blank"
                      >
                        <div className={cx("set")}>
                          {set.saleOff !== 0 && (
                            <div className={cx("note")}>
                              <h6 className={cx("desc")}>
                                {tPrimary("saleOff")}
                              </h6>
                            </div>
                          )}
                          {set.images[0]?.filePath && (
                            <div className={cx("img-box")}>
                              <img
                                className={cx("img")}
                                src={set.images[0].filePath}
                                alt={set.name}
                              />
                            </div>
                          )}

                          <div className={cx("info")}>
                            <h6 className={cx("name")}>{set.name}</h6>
                            <h6 className={cx("hero")}>
                              - {set.character.name} -
                            </h6>
                            <h6 className={cx("price")}>{set.price}</h6>
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

export default Sets;
