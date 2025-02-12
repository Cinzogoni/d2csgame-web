"use client";

import styles from "../NewRevival/NewRevival.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useTranslations } from "next-intl";
import { useRef, useLayoutEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Link, useNavigate } from "src/i18n/routing";
import apiHomePageResources from "src/api/fakeApi/apiHomePageResources";

function NewRevival() {
  const t = useTranslations("Primary");

  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isPrevClicked, setIsPrevClicked] = useState<boolean>(false);
  const [isNextClicked, setIsNextClicked] = useState<boolean>(false);

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<HTMLElement | null>(null);

  const newUpdated = apiHomePageResources.newRevival.map(
    (newUpdate) => newUpdate
  );

  const onSwiper = (swiper: any) => {
    setSwiperInstance(swiper);
  };

  const handlePrevClick = () => {
    setIsPrevClicked(true);
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
    setTimeout(() => setIsPrevClicked(false), 250);
  };

  const handleNextClick = () => {
    setIsNextClicked(true);
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
    setTimeout(() => setIsNextClicked(false), 250);
  };

  useLayoutEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  useLayoutEffect(() => {
    if (swiperInstance && swiperRef.current) {
      const swiperElement = swiperRef.current;

      // Dừng autoplay khi di chuột vào
      swiperElement.addEventListener("mouseenter", () => {
        if (swiperInstance.autoplay) {
          swiperInstance.autoplay.stop();
        }
      });

      // Bật lại autoplay khi rời chuột ra
      swiperElement.addEventListener("mouseleave", () => {
        if (swiperInstance.autoplay) {
          swiperInstance.autoplay.start();
        }
      });

      // Cleanup: loại bỏ sự kiện khi component bị unmount
      return () => {
        swiperElement.removeEventListener("mouseenter", () => {});
        swiperElement.removeEventListener("mouseleave", () => {});
      };
    }
  }, [swiperInstance]);

  const handleLink = (name: string, productType: string) => {
    const paths: { [key: string]: string } = {
      SET: "/new-revival/[name]",
      ITEM: "/new-revival/[name]",
      ARCANA: "/new-revival/[name]",
      TAUNT: "/new-revival/[name]",
      WEATHER_EFFECTS: "/new-revival/[name]",
      TERRAIN: "/new-revival/[name]",
      MUSIC_PACK: "/new-revival/[name]",
      COURIER: "/new-revival/[name]",
      STEAM_POINT: "/new-revival/[name]",
      STEAM_WALLET: "/new-revival/[name]",
    };

    const dynamicPath = paths[productType] || "";

    if (dynamicPath) {
      return useNavigate(dynamicPath, {
        name: name,
      });
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("heading")}>
        <h2 className={cx("title")}>{t("newRevival")}</h2>
        <Link href="/new-revival" target="_blank">
          <h3 className={cx("view-all")}>{t("viewAll")}</h3>
        </Link>
      </div>

      <div className={cx("frame")}>
        <div
          className={cx("slide-prev")}
          ref={prevRef}
          onClick={handlePrevClick}
        >
          <ArrowBackIosNewIcon
            style={{
              fontSize: "48px",
              transform: isPrevClicked ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.25s ease",
            }}
          />
        </div>
        <div
          className={cx("slide-next")}
          ref={nextRef}
          onClick={handleNextClick}
        >
          <ArrowForwardIosIcon
            style={{
              fontSize: "48px",
              transform: isNextClicked ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.25s ease",
            }}
          />
        </div>

        <div className={cx("newItems")}>
          <Swiper
            // @ts-ignore
            ref={swiperRef}
            effect={"coverflow"}
            centeredSlides={true}
            loop={true}
            slidesPerView={5}
            spaceBetween={0}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: -66,
              depth: 110,
              modifier: 1.5,
              slideShadows: false,
            }}
            onSwiper={onSwiper}
            modules={[EffectCoverflow, Navigation, Autoplay]}
            breakpoints={{
              1919: {
                slidesPerView: 5,
              },
              1024: {
                slidesPerView: 5,
              },
              768: {
                slidesPerView: 2,
              },
              430: {
                slidesPerView: 1,
              },
              400: {
                slidesPerView: 1,
              },
            }}
          >
            {newUpdated.map((newUpdated, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className={cx("img-container")}>
                    {newUpdated.saleOff !== 0 && (
                      <div className={cx("note")}>
                        <h3 className={cx("desc")}>{t("saleOff")}</h3>
                      </div>
                    )}
                    <Link
                      //@ts-ignore
                      href={handleLink(newUpdated.name, newUpdated.productType)}
                      target="_blank"
                    >
                      <div className={cx("img-box")}>
                        <img
                          className={cx("img")}
                          src={newUpdated.images[0].filePath}
                          alt={newUpdated.name}
                        />
                      </div>

                      <div className={cx("info")}>
                        <h4 className={cx("name")}>{newUpdated.name}</h4>
                        <h4 className={cx("hero")}>
                          - {newUpdated.character.name} -
                        </h4>
                        <h4 className={cx("price")}>{newUpdated.price}</h4>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default NewRevival;
