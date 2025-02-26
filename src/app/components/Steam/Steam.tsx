"use client";

import styles from "../Steam/Steam.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Link, isNavigate } from "src/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import useScroll from "src/app/hooks/useScroll";
import GridSystem from "../GridSystem/GridSystem";

import apiFakeHomePageResources from "src/api/fakeApi/apiFakeHomePageResources";

// import { useFetchApiProductResources } from "src/api/api.list.ts";

function Steam() {
  const tPrimary = useTranslations("Primary");
  const tHeros = useTranslations("Heros");
  const [windowWidth, setWindowWidth] = useState(0);
  // const { dataHomePageResources } = useFetchApiProductResources();

  //lam_dev thay apiFakeHomePageResources === dataHomePageResources
  const steam = apiFakeHomePageResources.steam.map((allSteam) => allSteam);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const { handleScroll, transformValue, activeScroll } = useScroll(
    steam,
    windowWidth
  );

  const handleSteamLink = (name: string, productType: string) => {
    const paths: { [key: string]: string } = {
      STEAM_WALLET: "/steam/wallet/[name]",
      STEAM_POINT: "/steam/point/[name]",
    };

    const dynamicPath = paths[productType] || "";

    if (dynamicPath) {
      return isNavigate(dynamicPath, {
        name: name,
      });
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("steam-group")}>
        <div className={cx("heading")}>
          <h4 className={cx("title")}>{tHeros("steamProducts")}</h4>
          <Link href="/steam" target="_blank">
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
                {steam.map((steam, index) => {
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
                        //@ts-expect-error: Checked Used OK
                        href={handleSteamLink(steam.name, steam.productType)}
                        target="_blank"
                      >
                        <div className={cx("steam")}>
                          <div className={cx("img-box")}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              className={cx("img")}
                              src={steam.images[0].filePath}
                              alt={steam.name}
                            />
                          </div>
                          <div className={cx("info")}>
                            <h6 className={cx("name")}>{steam.name}</h6>
                            <h6 className={cx("type")}>
                              - {steam.character.name} -
                            </h6>
                            <h6 className={cx("price")}>{steam.price}</h6>
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

export default Steam;
