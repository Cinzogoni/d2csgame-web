"use client";
import styles from "..//LanguagesSwitcher/LanguagesSwitcher.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useState, useLayoutEffect } from "react";
import {
  Locale,
  routing,
  usePathname,
  useRouter,
  useNavigate,
} from "src/i18n/routing";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

const flagMapping: Record<Locale, string> = {
  vi: "/assets/img/flag-of-VietNam.png",
  en: "/assets/img/flag-of-Us.png",
  ru: "/assets/img/flag-of-Russia.png",
};

function LanguagesSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLocale, setSelectedLocale] = useState<Locale>("vi");
  const { heroName, name } = useParams();

  const heroNameString = typeof heroName === "string" ? heroName : "";
  const heroProductString = typeof name === "string" ? name : "";

  const onSelectChange = (nextLocale: Locale) => {
    setSelectedLocale(nextLocale);

    const dynamicUrl = useNavigate(pathname, {
      heroName: heroNameString,
      name: heroProductString,
    });

    //@ts-ignore
    router.push(dynamicUrl, { locale: nextLocale });
    setIsOpen(false);
  };

  const toggleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useLayoutEffect(() => {
    if (["vi", "en", "ru"].includes(locale)) {
      setSelectedLocale(locale as Locale);
    }
  }, [locale]);

  return (
    <div className={cx("wrapper")} onClick={toggleSelect}>
      <div className={cx("arrow-down")} />
      <div className={cx("selected-flag")}>
        <img
          className={cx("flag-img")}
          src={flagMapping[selectedLocale]}
          alt={selectedLocale}
        />
      </div>
      {isOpen && (
        <div className={cx("select")}>
          {routing.locales.map((localeItem) => (
            <div
              className={cx("option")}
              key={localeItem}
              onClick={(e) => {
                e.stopPropagation(), onSelectChange(localeItem);
              }}
            >
              <img
                className={cx("opt-img")}
                src={flagMapping[localeItem]}
                alt={localeItem}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguagesSwitcher;
