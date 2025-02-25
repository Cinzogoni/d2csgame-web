import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [`vi`, `en`, `ru`],

  // Used when no locale matches
  defaultLocale: `vi`,
  pathnames: {
    "/": {
      vi: "/trang-tru",
      en: "/home",
      ru: "home",
    },
    "/user/[userName]": {
      vi: "/user/[userName]",
      en: "/user/[userName]",
      ru: "/user/[userName]",
    },
    "/authentication": {
      vi: "/xac-thuc",
      en: "/authentication",
      ru: "/authentication",
    },
    "/buying": {
      vi: "/mua-hang",
      en: "/buying",
      ru: "/покупка",
    },
    "/selling": {
      vi: "/ban-hang",
      en: "/selling",
      ru: "/продажа",
    },
    "/payment": {
      vi: "/thanh-toan",
      en: "/payment",
      ru: "/оплата",
    },
    "/fan-page": {
      vi: "https://www.facebook.com/profile.php?id=61572222907515",
      en: "https://www.facebook.com/profile.php?id=61572222907515",
      ru: "https://www.facebook.com/profile.php?id=61572222907515",
    },
    "/policy": {
      vi: "/chinh-sach",
      en: "/policy",
      ru: "/политика",
    },
    "/guide": {
      vi: "/huong-dan",
      en: "/guide",
      ru: "/инструкция",
    },
    "/support": {
      vi: "/ho-tro",
      en: "/support",
      ru: "/Поддержка",
    },
    "/qna": {
      vi: "/hoi-dap",
      en: "/q-n-a",
      ru: "/bиo",
    },
    "/contact": {
      vi: "/lien-he",
      en: "/contact",
      ru: "/контакты",
    },
    "/new-revival": {
      vi: "/vua-cap-nhat",
      en: "/new-revival",
      ru: "/новое-воскрешение",
    },
    "/new-revival/[name]": {
      vi: "/vua-cap-nhat/[name]",
      en: "/new-revival/[name]",
      ru: "/новое-воскрешение/[name]",
    },
    "/heros": {
      vi: "/tuong",
      en: "/heros",
      ru: "/герои",
    },

    "/steam": {
      vi: "/steam",
      en: "/steam",
      ru: "/steam",
    },
    "/others": {
      vi: "/khac",
      en: "/others",
      ru: "/другие",
    },
    "/shopping-cart": {
      vi: "/gio-hang",
      en: "/shopping-cart",
      ru: "/корзина",
    },
    "/others/weather-effects": {
      vi: "/others/thoi-tiet",
      en: "/others/weather-effects",
      ru: "/другие/погодные",
    },
    "/others/terrain": {
      vi: "/others/dia-hinh",
      en: "/others/terrain",
      ru: "/другие/группы",
    },
    "/others/music-pack": {
      vi: "/others/goi-nhac",
      en: "/others/music-pack",
      ru: "/другие/группы-музыкальных",
    },
    "/others/courier": {
      vi: "/others/courier",
      en: "/others/courier",
      ru: "/другие/группы",
    },
    "/others/weather-effects/[name]": {
      vi: "/others/thoi-tiet/[name]",
      en: "/others/weather-effects/[name]",
      ru: "/другие/погодные/[name]",
    },
    "/others/terrain/[name]": {
      vi: "/others/dia-hinh/[name]",
      en: "/others/terrain/[name]",
      ru: "/другие/группы/[name]",
    },
    "/others/music-pack/[name]": {
      vi: "/others/goi-nhac/[name]",
      en: "/others/music-pack/[name]",
      ru: "/другие/группы-музыкальных/[name]",
    },
    "/others/courier/[name]": {
      vi: "/others/courier/[name]",
      en: "/others/courier/[name]",
      ru: "/другие/группы/[name]",
    },
    "/others/[theClassify]": {
      vi: "/others/[theClassify]",
      en: "/others/[theClassify]",
      ru: "/другие/[theClassify]",
    },
    "/others/[theClassify]/[theClass]": {
      vi: "/others/[theClassify]/[theClass]",
      en: "/others/[theClassify]/[theClass]",
      ru: "/другие/[theClassify]/[theClass]",
    },
    "/steam/[theClassify]": {
      vi: "/steam/[theClassify]",
      en: "/steam/[theClassify]",
      ru: "/steam/[theClassify]",
    },
    "/steam/[theClassify]/[theClass]": {
      vi: "/steam/[theClassify]/[theClass]",
      en: "/steam/[theClassify]/[theClass]",
      ru: "/steam/[theClassify]/[theClass]",
    },
    "/steam/wallet": {
      vi: "/steam/wallet",
      en: "/steam/wallet",
      ru: "/steam/wallet",
    },
    "/steam/point": {
      vi: "/steam/point",
      en: "/steam/point",
      ru: "/steam/point",
    },
    "/steam/wallet/[name]": {
      vi: "/steam/wallet/[name]",
      en: "/steam/wallet/[name]",
      ru: "/steam/wallet/[name]",
    },
    "/steam/point/[name]": {
      vi: "/steam/point/[name]",
      en: "/steam/point/[name]",
      ru: "/steam/point/[name]",
    },
    "/set-categories": {
      vi: "/set-categories",
      en: "/set-categories",
      ru: "/set-categories",
    },
    "/set-categories/[theClassify]": {
      vi: "/set-categories/[theClassify]",
      en: "/set-categories/[theClassify]",
      ru: "/set-categories/[theClassify]",
    },
    "/set-categories/[theClassify]/[theClass]": {
      vi: "/set-categories/[theClassify]/[theClass]",
      en: "/set-categories/[theClassify]/[theClass]",
      ru: "/set-categories/[theClassify]/[theClass]",
    },
    "/item-categories": {
      vi: "/item-categories",
      en: "/item-categories",
      ru: "/item-categories",
    },
    "/item-categories/[theClassify]": {
      vi: "/item-categories/[theClassify]",
      en: "/item-categories/[theClassify]",
      ru: "/item-categories/[theClassify]",
    },
    "/item-categories/[theClassify]/[theClass]": {
      vi: "/item-categories/[theClassify]/[theClass]",
      en: "/item-categories/[theClassify]/[theClass]",
      ru: "/item-categories/[theClassify]/[theClass]",
    },

    "/heros/[heroName]": {
      vi: "/tuong/[heroName]",
      en: "/heros/[heroName]",
      ru: "/герои/[heroName]",
    },
    "/heros/[heroName]/sets/[name]": {
      vi: "/tuong/[heroName]/bo/[name]",
      en: "/heros/[heroName]/sets/[name]",
      ru: "/герои/[heroName]/наборы/[name]",
    },
    "/heros/[heroName]/items/[name]": {
      vi: "/tuong/[heroName]/vat-pham/[name]",
      en: "/heros/[heroName]/items/[name]",
      ru: "/герои/[heroName]/предметы/[name]",
    },
    "/heros/[heroName]/arcana/[name]": {
      vi: "/tuong/[heroName]/arcana/[name]",
      en: "/heros/[heroName]/arcana/[name]",
      ru: "/герои/[heroName]/аркана/[name]",
    },
    "/heros/[heroName]/taunt/[name]": {
      vi: "/tuong/[heroName]/taunt/[name]",
      en: "/heros/[heroName]/taunt/[name]",
      ru: "/герои/[heroName]/насмешка/[name]",
    },
  },
});

const useNavigate = (
  pathname: string,
  params: Record<string, string | undefined>
): string => {
  return pathname
    .split("/")
    .map((segment) => {
      if (segment.startsWith("[") && segment.endsWith("]")) {
        const paramName = segment.slice(1, -1);
        if (!(paramName in params)) {
          throw new Error(`Missing parameter: ${paramName}`);
        }
        return params[paramName];
      }
      return segment;
    })
    .join("/");
};

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
export { useNavigate };
