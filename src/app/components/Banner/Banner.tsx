"use client";

import styles from "../Banner/Banner.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { Link } from "src/i18n/routing";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import GridSystem from "../GridSystem/GridSystem";
import useSlider from "src/app/hooks/useSlider";

const events = [
  {
    id: 1,
    eventTitle: "Tundra Esports stomp Gaimin Gladiators to win BLAST Slam II",
    eventPublished: "2025-09-02",
    imgUrl:
      "https://static.gosugamers.net/34/1b/7c/38452bc9bcdc4d4fb0a8c263543702c4db16b4106518fa6c93e3b59459.webp?w=1024",
    link: "https://www.gosugamers.net/dota2/news/74279-tundra-esports-stomp-gaimin-gladiators-to-win-blast-slam-ii",
  },
  {
    id: 2,
    eventTitle: "The International 2024 has concluded",
    eventPublished: "2024-08-08",
    imgUrl:
      "https://static.gosugamers.net/e3/8a/b5/3981867faa8e90f0ce36d1f9d37413a5c4d45addf6654b8c8881654dce.webp?w=1600",
    link: "https://www.dota2.com/esports/ti13/watch/16935/40/game1vod",
  },
  {
    id: 3,
    eventTitle:
      "As Crownfall gets archived, Dota 2 players resort to astronomy to determine upcoming patch date",
    eventPublished: "2025-02-07",
    imgUrl:
      "https://dotesports.com/wp-content/uploads/2025/02/dota-2-void-spirit-the-great-confluence.jpg",
    link: "https://dotesports.com/dota-2/news/as-crownfall-gets-archived-dota-2-players-resort-to-astronomy-to-determine-upcoming-patch-date",
  },
];

const sortedEvents = [...events].sort((a, b) => {
  return (
    new Date(b.eventPublished).getTime() - new Date(a.eventPublished).getTime()
  );
});

const services = [
  {
    id: 1,
    imgUrl:
      "https://s.yimg.com/ny/api/res/1.2/Vaa3A4D5hIEBjeBd3v6SNg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQzNQ--/https://o.aolcdn.com/hss/storage/midas/fe8ed22fb9384cf8089f9cf7d6224f6d/206521416/dota_plus_update_blog.png",
    title: "Dota Plus",
  },
  {
    id: 2,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTM6AzeYwvenLQbRnhmAC4BiLbxMrZ4rWJI8h_D9EgdVwDYgE2yNg3sgR75Bw6XdJadpM&usqp=CAU",
    title: "Cosmetic Items",
  },
  {
    id: 3,
    imgUrl:
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/11/14/15737203364472.jpg",
    title: "Customs",
  },
  {
    id: 4,
    imgUrl:
      "https://www.audio4fun.com/image-coupon/discount/200277217/steam-wallet-to.jpg",
    title: "Steam Wallet",
  },
];

function Banner() {
  const t = useTranslations("Primary");
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const { handleSlide, transformSlideValue, activeSlide } = useSlider(
    sortedEvents,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    5000,
    windowWidth
  );

  return (
    <div className={cx("wrapper")}>
      <section className={cx("events")}>
        <div className={cx("frame")}>
          <GridSystem rowClass={cx("row")}>
            <div
              className={cx("box")}
              style={{
                transition: "transform 0.3s ease-in-out",
                transform: transformSlideValue(),
              }}
            >
              {sortedEvents.map((event, index) => {
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
                    <Link
                      //@ts-expect-error: Map Link OK
                      href={event.link}
                      target="_blank"
                    >
                      <div className={cx("events-img")}>
                        {/* eslint-disable @next/next/no-img-element */}
                        <img
                          className={cx("events-banner")}
                          src={event.imgUrl}
                          alt={event.eventTitle}
                        />
                        <div className={cx("events-desc")}>
                          <h3 className={cx("event-title")}>
                            {event.eventTitle}
                          </h3>
                          <p className={cx("events-published")}>
                            {event.eventPublished}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </GridSystem>
                );
              })}
            </div>
          </GridSystem>

          <div className={cx("slider")}>
            <FaAngleLeft
              onClick={() => handleSlide("prev")}
              className={cx("slide")}
              style={{
                transition: "transition: transform 0.3s ease-in-out",
                transform: activeSlide === "prev" ? "scale(1.1)" : "scale(1)",
              }}
            />
            <FaAngleRight
              onClick={() => handleSlide("next")}
              className={cx("slide")}
              style={{
                transition: "transition: transform 0.3s ease-in-out",
                transform: activeSlide === "next" ? "scale(1.1)" : "scale(1)",
              }}
            />
          </div>
        </div>
      </section>

      <article className={cx("services")}>
        <h2 className={cx("services-title")}>{t("services")}</h2>

        <div className={cx("service")}>
          {services.map((service, index) => {
            return (
              <div key={index} className={cx("item")}>
                {/* eslint-disable @next/next/no-img-element */}
                <img
                  className={cx("service-img")}
                  src={service.imgUrl}
                  alt={service.title}
                />
                <div className={cx("service-desc")}>
                  <h4 className={cx("service-name")}>{service.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </article>
    </div>
  );
}

export default Banner;
