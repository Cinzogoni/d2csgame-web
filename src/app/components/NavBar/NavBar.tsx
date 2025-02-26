"use client";

import styles from "./NavBar.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { Fragment, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, isNavigate } from "src/i18n/routing";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const handleMenuLink = (classify: string, productType: string) => {
  const paths: { [key: string]: string } = {
    SET: "/set-categories/[theClassify]",
    ITEM: "/item-categories/[theClassify]",
    STEAM_WALLET: "/steam/[theClassify]",
    STEAM_POINT: "/steam/[theClassify]",
    WEATHER_EFFECTS: "/others/[theClassify]",
    TERRAIN: "/others/[theClassify]",
    MUSIC_PACK: "/others/[theClassify]",
    COURIER: "/others/[theClassify]",
  };

  const dynamicPath = paths[productType] || "";

  if (dynamicPath) {
    return isNavigate(dynamicPath, {
      theClassify: classify,
    });
  }
};

const handleSubMenuLink = (
  classify: string,
  isClass: string,
  productType: string
) => {
  const paths: { [key: string]: string } = {
    SET: "/set-categories/[theClassify]/[theClass]",
    ITEM: "/item-categories/[theClassify]/[theClass]",
    STEAM_WALLET: "/steam/[theClassify]/[theClass]",
    STEAM_POINT: "/steam/[theClassify]/[theClass]",
    WEATHER_EFFECTS: "/others/[theClassify]/[theClass]",
    TERRAIN: "/others/[theClassify]/[theClass]",
    MUSIC_PACK: "/others/[theClassify]/[theClass]",
    COURIER: "/others/[theClassify]/[theClass]",
  };

  const dynamicPath = paths[productType] || "";

  if (dynamicPath) {
    return isNavigate(dynamicPath, {
      theClassify: classify,
      theClass: isClass,
    });
  }
};

type SubMenuType = {
  id: number;
  title: string;
  link: typeof handleSubMenuLink;
  productType: string;
};

type MenuType = {
  id: number;
  title: string;
  link: typeof handleMenuLink;
  productType: string;
  subMenu: SubMenuType[] | null;
};

type NavbarType = {
  id: number;
  title: string;
  link: string;
  menu: MenuType[] | null;
};

function NavBar() {
  const t = useTranslations("Heros");
  const [hoveredNavId, setHoveredNavId] = useState<number | null>(null);
  const [hoveredSubMenuId, setHoveredSubMenuId] = useState<number | null>(null);

  const navbar: NavbarType[] = [
    { id: 1, title: t("heros"), link: "/heros", menu: null },
    {
      id: 2,
      title: t("sets"),
      link: "/set-categories",
      menu: [
        {
          id: 1,
          title: "Collector's cache",
          productType: "SET",
          link: handleMenuLink,
          subMenu: [
            {
              id: 1,
              title: "The International 09",
              productType: "SET",
              link: handleSubMenuLink,
            },
            {
              id: 2,
              title: "The International 10",
              productType: "SET",
              link: handleSubMenuLink,
            },
            {
              id: 3,
              title: "Aghanim Cache",
              productType: "SET",
              link: handleSubMenuLink,
            },
            {
              id: 4,
              title: "Diretide 2022",
              productType: "SET",
              link: handleSubMenuLink,
            },
          ],
        },
        {
          id: 2,
          title: "Mix set",
          productType: "SET",
          link: handleMenuLink,
          subMenu: null,
        },
        {
          id: 3,
          title: "Infused",
          productType: "SET",
          link: handleMenuLink,
          subMenu: null,
        },
        {
          id: 4,
          title: "Arcana",
          productType: "SET",
          link: handleMenuLink,
          subMenu: null,
        },
      ],
    },
    {
      id: 3,
      title: t("items"),
      link: "/item-categories",
      menu: [
        {
          id: 1,
          title: "Immortal",
          productType: "ITEM",
          link: handleMenuLink,
          subMenu: [
            {
              id: 1,
              title: "The International 3",
              productType: "ITEM",
              link: handleSubMenuLink,
            },
            {
              id: 2,
              title: "The International 4",
              productType: "ITEM",
              link: handleSubMenuLink,
            },
            {
              id: 3,
              title: "The International 5",
              productType: "ITEM",
              link: handleSubMenuLink,
            },
            {
              id: 4,
              title: "Trove 2019",
              productType: "ITEM",
              link: handleSubMenuLink,
            },
            {
              id: 5,
              title: "Diretide 2020",
              productType: "ITEM",
              link: handleSubMenuLink,
            },
            {
              id: 6,
              title: "Golden",
              productType: "ITEM",
              link: handleSubMenuLink,
            },
          ],
        },
        {
          id: 2,
          title: "Arcana",
          productType: "ITEM",
          link: handleMenuLink,
          subMenu: null,
        },
        {
          id: 3,
          title: "Dota Plus",
          productType: "ITEM",
          link: handleMenuLink,
          subMenu: null,
        },
      ],
    },
    {
      id: 4,
      title: t("steam"),
      link: "/steam",
      menu: [
        {
          id: 1,
          title: "Steam Wallet",
          productType: "STEAM_WALLET",
          link: handleMenuLink,
          subMenu: null,
        },
        {
          id: 2,
          title: "Steam Point",
          productType: "STEAM_POINT",
          link: handleMenuLink,
          subMenu: null,
        },
      ],
    },
    {
      id: 5,
      title: t("others"),
      link: "/others",
      menu: [
        {
          id: 1,
          title: t("weatherEffects"),
          productType: "WEATHER_EFFECTS",
          link: handleMenuLink,
          subMenu: null,
        },
        {
          id: 2,
          title: t("terrain"),
          productType: "TERRAIN",
          link: handleMenuLink,
          subMenu: null,
        },
        {
          id: 3,
          title: t("musicPack"),
          productType: "MUSIC_PACK",
          link: handleMenuLink,
          subMenu: null,
        },
        {
          id: 4,
          title: t("courier"),
          productType: "COURIER",
          link: handleMenuLink,
          subMenu: null,
        },
      ],
    },
  ] as const;

  return (
    <nav className={cx("wrapper")}>
      {navbar.map((nav, index) => {
        return (
          <div
            key={index}
            className={cx("menu-container")}
            onMouseEnter={() => setHoveredNavId(nav.id)}
            onMouseLeave={() => setHoveredNavId(null)}
          >
            <Link
              //@ts-expect-error: Link Map OK
              href={nav.link}
              target="_blank"
            >
              <div className={cx("nav")}>
                <h3 className={cx("title")}>{nav.title}</h3>
              </div>
            </Link>

            <div className={cx("menu")}>
              {nav.menu && nav.menu.length > 0 && hoveredNavId === nav.id && (
                <div className={cx("menu-list")}>
                  <div className={cx("frame")}></div>
                  <div className={cx("menu-item")}>
                    {nav.menu.map((menu) => (
                      <Fragment key={menu.id}>
                        <Link
                          //@ts-expect-error: Link Map OK
                          href={menu.link(menu.title, menu.productType)}
                          className={cx("link")}
                          onMouseEnter={() => setHoveredSubMenuId(menu.id)}
                          onMouseLeave={() => setHoveredSubMenuId(null)}
                        >
                          <h4 className={cx("menu-title")}>{menu.title}</h4>
                          {["Collector's cache", "Immortal"].includes(
                            menu.title
                          ) && (
                            <KeyboardDoubleArrowRightIcon
                              className={cx("arrow")}
                            />
                          )}
                        </Link>

                        <div className={cx("sub-menu")}>
                          {menu.subMenu &&
                            menu.subMenu !== null &&
                            menu.subMenu.length > 0 &&
                            hoveredSubMenuId === menu.id && (
                              <div className={cx("sub-menu-list")}>
                                <div className={cx("sub-menu-item")}>
                                  {menu.subMenu?.map((subMenu) => {
                                    return (
                                      <Link
                                        //@ts-expect-error: Link Map OK
                                        href={subMenu.link(
                                          menu.title,
                                          subMenu.title,
                                          subMenu.productType
                                        )}
                                        key={subMenu.id}
                                        className={cx("sub-link")}
                                        onMouseEnter={() =>
                                          setHoveredSubMenuId(menu.id)
                                        }
                                        onMouseLeave={() =>
                                          setHoveredSubMenuId(null)
                                        }
                                      >
                                        <h4 className={cx("sub-menu-title")}>
                                          {subMenu.title}
                                        </h4>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

export default NavBar;
