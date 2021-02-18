import React from "react";
import SlickSlider from "react-slick";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";
import { observer } from "mobx-react-lite";
import { IAbout, IPortfolio, IService, ISettings } from "../types";
import { aboutsStores } from "../stores/aboutsStores";
import { settingsStores } from "../stores/settingsStores";
import { servicesStores } from "../stores/servicesStores";
import { portfolioStores } from "../stores/portfolioStores";

const Home: React.FC = observer(
  (): React.ReactElement => {
    const about: IAbout = aboutsStores.items;
    const settngs: ISettings = settingsStores.items;
    const service: IService[] = servicesStores.items;
    const portfolio: IPortfolio[] = portfolioStores.items;

    const [currentId, setCurrentId] = React.useState<string>("");
    const [currentSlide, setCurrentSlide] = React.useState<IPortfolio>();

    const settingsOne = {
      infinite: false,
      slidesToShow: 3.5,
      slidesToScroll: 1,
      dots: true,
      dotsClass: "slider_dots",
      draggable: false,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            arrows: false,
            slidesToShow: 2.5,
            draggable: true,
          },
        },
        {
          breakpoint: 500,
          settings: {
            arrows: false,
            slidesToShow: 1.5,
            draggable: true,
          },
        },
      ],
    };

    const settingsTwo = {
      infinite: false,
      slidesToShow: 4.5,
      slidesToScroll: 1,
      dots: true,
      dotsClass: "slider_dots",
      responsive: [
        {
          breakpoint: 900,
          settings: {
            arrows: false,
            slidesToShow: 2.5,
            draggable: true,
          },
        },
        {
          breakpoint: 500,
          settings: {
            arrows: false,
            slidesToShow: 1.5,
            draggable: true,
          },
        },
      ],
    };

    const WeedingRef = React.useRef<HTMLUListElement>(null);
    const NightRef = React.useRef<HTMLUListElement>(null);
    const DayRef = React.useRef<HTMLUListElement>(null);
    const current_slide = React.useRef<HTMLParagraphElement>(null);
    const quantity_slide = React.useRef<HTMLParagraphElement>(null);
    const reviewsVideo = React.useRef<HTMLDivElement>(null);
    const reviewsText = React.useRef<HTMLDivElement>(null);
    const Nav = React.useRef<HTMLUListElement>(null);
    const main_navMobil = React.useRef<HTMLUListElement>(null);

    const [headerNav, setHeaderNav] = React.useState(false);
    const navShow = React.useCallback(() => {
      setHeaderNav((prev) => !prev);
    }, []);

    const [services, setServices] = React.useState<Boolean>(true);
    const [courses, setCourses] = React.useState<Boolean>(false);

    const navAnimation = React.useCallback(() => {
      if (!headerNav) {
        Nav.current!.style.transform = "translate(40px, -50px)";
        Nav.current!.style.opacity = "0";
        main_navMobil.current!.style.transform = "translateY(-100vh)";
        main_navMobil.current!.style.opacity = "0";
      } else {
        Nav.current!.style.transform = "translate(40px, -20px)";
        Nav.current!.style.opacity = "1";
        main_navMobil.current!.style.transform = "translateY(0)";
        main_navMobil.current!.style.opacity = "1";
      }
    }, [headerNav]);
    const navTransition = React.useCallback(() => {
      var navServices = document
        .querySelector("#services")
        ?.getBoundingClientRect().top;
      var navAbout = document.querySelector("#about")?.getBoundingClientRect()
        .top;
      var navPortfolio = document
        .querySelector("#portfolio")
        ?.getBoundingClientRect().top;
      var navReviews = document
        .querySelector("#reviews")
        ?.getBoundingClientRect().top;
      var navCourses = document
        .querySelector("#courses")
        ?.getBoundingClientRect().top;
      var navSN = document.querySelector("#instagram")?.getBoundingClientRect()
        .top;
      for (let i = 0; i < 2; i++) {
        document
          .querySelectorAll("#navServices")
          [i]?.addEventListener("click", () => {
            window.scrollTo({
              top: navServices,
              behavior: "smooth",
            });
            console.log(navServices);
          });
        document
          .querySelectorAll("#navAbout")
          [i]?.addEventListener("click", () => {
            window.scrollTo({
              top: navAbout,
              behavior: "smooth",
            });
          });
        document
          .querySelectorAll("#navPortfolio")
          [i]?.addEventListener("click", () => {
            window.scrollTo({
              top: navPortfolio,
              behavior: "smooth",
            });
          });
        document
          .querySelectorAll("#navReviews")
          [i]?.addEventListener("click", () => {
            window.scrollTo({
              top: navReviews,
              behavior: "smooth",
            });
          });
        document
          .querySelectorAll("#navCourses")
          [i]?.addEventListener("click", () => {
            window.scrollTo({
              top: navCourses,
              behavior: "smooth",
            });
          });
        document
          .querySelectorAll("#navSN")
          [i]?.addEventListener("click", () => {
            window.scrollTo({
              top: navSN,
              behavior: "smooth",
            });
          });
      }
    }, []);

    const reviews_video = React.useRef<HTMLDivElement>(null);
    const reviews_text = React.useRef<HTMLDivElement>(null);
    const reviews_video_inp = React.useRef<HTMLInputElement>(null);
    const reviews_text_inp = React.useRef<HTMLInputElement>(null);

    const changePortfolio = (e: any): void => {
      setCurrentId(e);
      setCurrentSlide(
        portfolio && portfolio.filter((item) => item._id === e)[0]
      );
      //setTimeout(customSlider, 100)
    };
    const customSlider = React.useCallback(() => {
      var step: any;
      var quantity: any;
      var slideWidth: any;
      var currentSlide: any;
      var Weeding = document.querySelector("#labelWeeding");
      var customPrev = document.querySelector("#customPrev");
      var customNext = document.querySelector("#customNext");

      Weeding!.addEventListener("click", () => {
        document.getElementById("portfolio__weeding")!.style.display = "block";
        // document.getElementById("portfolio__night")!.style.display = "none";
        // document.getElementById("portfolio__day")!.style.display = "none";

        step = document.querySelector(
          "#portfolio__weeding > .port__slider > #ul > li"
        );
        quantity = document.querySelectorAll(
          "#portfolio__weeding > .port__slider > #ul > li"
        ).length;
        slideWidth = 0;
        currentSlide = 1;
        current_slide.current!.innerHTML = String(currentSlide);
        quantity_slide.current!.innerHTML = String(quantity);
        WeedingRef.current!.style.left = "0px";

        Weeding?.setAttribute("style", "color:#aa4d54");
      });

      customPrev!.addEventListener("click", () => {
        slideWidth -= step.offsetWidth;
        currentSlide -= 1;
        WeedingRef.current!.style.left = "-" + slideWidth + "px";
        // NightRef.current!.style.left = "-" + slideWidth + "px";
        // DayRef.current!.style.left = "-" + slideWidth + "px";
        if (currentSlide < 1) {
          slideWidth = step.offsetWidth * (quantity - 1);
          WeedingRef.current!.style.left = "-" + slideWidth + "px";
          NightRef.current!.style.left = "-" + slideWidth + "px";
          DayRef.current!.style.left = "-" + slideWidth + "px";
          currentSlide = quantity;
        }
        current_slide.current!.innerHTML = currentSlide;
      });

      customNext!.addEventListener("click", () => {
        slideWidth += step.offsetWidth;
        currentSlide += 1;
        WeedingRef.current!.style.left = "-" + slideWidth + "px";
        // NightRef.current!.style.left = "-" + slideWidth + "px";
        // DayRef.current!.style.left = "-" + slideWidth + "px";
        if (currentSlide > quantity) {
          WeedingRef.current!.style.left = "0px";
          NightRef.current!.style.left = "0px";
          DayRef.current!.style.left = "0px";
          currentSlide = 1;
          slideWidth = 0;
        }
        current_slide.current!.innerHTML = currentSlide;
      });

      reviewsVideo.current!.style.visibility = "visible";
      reviewsText.current!.style.visibility = "hidden";

      document.getElementById("labelWeeding")?.click(); // если не кликнуть на любой toogle, то цифры в слайдере не появятся (костыль, наверное)
      ///////////////////////////////////////////////////////////////
    }, []);

    const review = React.useCallback(() => {
      document.querySelector("#review_video")?.addEventListener("click", () => {
        reviewsVideo.current!.style.visibility = "visible";
        reviewsText.current!.style.visibility = "hidden";
        reviewsVideo.current!.style.opacity = "1";
        reviewsText.current!.style.opacity = "0";
      });
      document.querySelector("#review_text")?.addEventListener("click", () => {
        reviewsVideo.current!.style.visibility = "hidden";
        reviewsText.current!.style.visibility = "visible";
        reviewsVideo.current!.style.opacity = "0";
        reviewsText.current!.style.opacity = "1";
      });

      reviews_video.current?.addEventListener("click", () => {
        if (
          window.screen.availWidth < 900 &&
          reviews_video_inp.current?.checked
        ) {
          reviews_video.current!.style.background = "#F9F5F1";
          reviews_text.current!.style.background = "#fff";
        }
      });
      reviews_text.current?.addEventListener("click", () => {
        if (
          window.screen.availWidth < 900 &&
          reviews_text_inp.current?.checked
        ) {
          reviews_video.current!.style.background = "#fff";
          reviews_text.current!.style.background = "#F9F5F1";
        }
      });
      if (window.screen.availWidth < 900) {
        reviews_video.current!.style.background = "#F9F5F1";
        reviews_text.current!.style.background = "#fff";
      } // задний фон на toogle в отзывах на мобилке
    }, []);

    const whiteOpacity = React.useCallback(() => {
      var whiteOpacityBox = document.querySelectorAll(
        ".srvice__lastSlide_opacity"
      );
      var buttonSlidePrev = document.querySelectorAll(
        ".services__wrap > .slider> .slick-slider > .slick-prev"
      );
      var buttonSlideNext = document.querySelectorAll(
        ".services__wrap > .slider > .slick-slider > .slick-next"
      );
      for (let i = 0; i < buttonSlidePrev.length; i++) {
        buttonSlidePrev[i].addEventListener("click", () => {
          if (buttonSlidePrev[i].classList.contains("slick-disabled")) {
            whiteOpacityBox[i].setAttribute("style", "opacity: 0.6");
          } else {
            whiteOpacityBox[i].setAttribute("style", "opacity: 0");
            setTimeout(
              () => whiteOpacityBox[i].setAttribute("style", "opacity: 0.6"),
              400
            );
          }
        });
        buttonSlideNext[i].addEventListener("click", () => {
          if (buttonSlideNext[i].classList.contains("slick-disabled")) {
            whiteOpacityBox[i].setAttribute("style", "opacity: 0");
          } else {
            whiteOpacityBox[i].setAttribute("style", "opacity: 0");
            setTimeout(
              () => whiteOpacityBox[i].setAttribute("style", "opacity: 0.6"),
              400
            );
          }
        });
      }
    }, []);

    const BtnUp = React.useCallback(() => {
      var upBTN = document.querySelector("#scrollUp");
      var firstScreancoord = document.querySelector("#header");
      var footerCoord = document.querySelector("#footer");
      upBTN?.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
      document.addEventListener("scroll", () => {
        if (firstScreancoord!.getBoundingClientRect().bottom < 0) {
          upBTN?.setAttribute("style", "transform: translateX(0)");
        } else {
          upBTN?.setAttribute("style", "transform: translateX(-80px");
        }
        if (
          footerCoord!.getBoundingClientRect().top <
          upBTN!.getBoundingClientRect().bottom
        ) {
          upBTN?.setAttribute(
            "style",
            "background: #fff; transform: translateX(0)"
          );
        }
      });
    }, []);

    const distanceToForm = React.useCallback(() => {
      let distance =
        document.getElementById("header")?.offsetHeight! +
        document.getElementById("services")?.offsetHeight! +
        document.getElementById("portfolio")?.offsetHeight! +
        document.getElementById("courses")?.offsetHeight! +
        document.getElementById("about")?.offsetHeight! +
        document.getElementById("reviews")?.offsetHeight! +
        document.getElementById("instagram")?.offsetHeight!;
      return distance;
    }, []);

    const scrollToForm = React.useCallback(() => {
      window.scrollTo({
        top: distanceToForm(),
        behavior: "smooth",
      });
    }, [distanceToForm]);

    const showServicesForm: any = React.useCallback(() => {
      setServices(true);
      setCourses(false);
    }, []);
    const showCoursesForm: any = React.useCallback(() => {
      setServices(false);
      setCourses(true);
    }, []);

    const setCurrentSelectSevices = React.useCallback(() => {
      let boxHref: any;
      let boxTitle: any;
      let FormSelect: any;
      boxHref = document.querySelectorAll(
        ".services__box > .services__box_htmlForm"
      );
      boxTitle = document.querySelectorAll(
        ".services__box > .services__box__article"
      );
      FormSelect = document.querySelector("#FormSelect");
      for (let i = 0; i < boxHref.length; i++) {
        boxHref[i].addEventListener("click", () => {
          scrollToForm();
          if (services === false) {
            showServicesForm();
          } else {
            FormSelect.value = boxTitle[i].innerHTML;
          }
          boxHref[i].click();
        });
      }
    }, [scrollToForm, showServicesForm, services]);

    const setCurrentSelectCourses = React.useCallback(() => {
      let coursesBtn: any;
      let coursesTitle: any;
      let FormSelect: any;
      coursesBtn = document.querySelectorAll(".courses_btn");
      coursesTitle = document.querySelectorAll(
        ".courses__box > .courses__title"
      );
      FormSelect = document.querySelector("#FormSelect");
      for (let i = 0; i < coursesBtn.length; i++) {
        coursesBtn[i].addEventListener("click", () => {
          scrollToForm();
          if (courses === false) {
            showCoursesForm();
          } else {
            FormSelect.value = coursesTitle[i].innerHTML;
          }
          coursesBtn[i].click();
        });
      }
    }, [scrollToForm, showCoursesForm, courses]);

    React.useEffect(() => {
      setTimeout(() => {
        portfolio && customSlider();
      }, 100);

      portfolio && setCurrentId(portfolio[0]._id!);
      portfolio && setCurrentSlide(portfolio[0]!);
      review();
      whiteOpacity();
      BtnUp();
      navAnimation();
      setCurrentSelectSevices();
      setCurrentSelectCourses();
      distanceToForm();
      navTransition();
    }, [
      customSlider,
      review,
      whiteOpacity,
      BtnUp,
      navAnimation,
      setCurrentSelectSevices,
      setCurrentSelectCourses,
      distanceToForm,
      navTransition,
      portfolio,
    ]);
    return (
      <>
        <header>
          <div className="header__wrap" id="header">
            <div className="header__nav">
              <img src="/img/burger.svg" alt="" onClick={navShow} />

              <ul ref={Nav} id="main_nav" className="main_nav">
                <li id="navServices">Услуги</li>

                <li id="navAbout">О себе</li>

                <li id="navPortfolio">Портфолио</li>

                <li id="navReviews">Отзывы</li>

                <li id="navCourses">Курсы</li>
              </ul>
              <ul ref={main_navMobil} id="main_nav" className="main_navMobil">
                <li onClick={navShow} className="mobilMenuCross">
                  <img src="/img/mobil_cross_menu.svg" alt="" />
                </li>

                <a href="/">
                  <li>Услуги</li>
                </a>
                <a href="/">
                  <li>О себе</li>
                </a>
                <a href="/">
                  <li>Портфолио</li>
                </a>
                <a href="/">
                  <li>Отзывы</li>
                </a>
                <a href="/">
                  <li>Курсы</li>
                </a>
              </ul>

              <div className="header__main__language">
                <input id="EN" name="checkLang" type="radio" checked />
                <label htmlFor="EN">EN</label>
                <hr />
                <input id="RU" name="checkLang" type="radio" />
                <label htmlFor="RU">RU</label>
              </div>
            </div>

            <div className="header__main">
              <div className="header__main__text">
                <Slide left duration={1000}>
                  <img src="/img/logo_white.svg" alt="" />
                </Slide>
                <Slide left duration={1200}>
                  <p>Услуги визажиста и стилиста по прическам на выезд</p>
                </Slide>
                <Slide left duration={1100}>
                  <span onClick={scrollToForm}>Записаться</span>
                </Slide>
              </div>
              <Slide right duration={1000}>
                <img src="/img/main-girl.png" alt="" className="girl" />
              </Slide>
              <div className="header__main__sn">
                <Slide right cascade>
                  <div className="header__main__language">
                    <input id="EN" name="checkLang" type="radio" checked />
                    <label htmlFor="EN">EN</label>
                    <hr />
                    <input id="RU" name="checkLang" type="radio" />
                    <label htmlFor="RU">RU</label>
                  </div>
                </Slide>

                <Slide right cascade>
                  <div className="header__main__sn">
                    <a href="/">
                      <img src="/img/facebook.svg" alt="" />
                    </a>

                    <a href="/">
                      <img src="/img/instagram.svg" alt="" />
                    </a>
                  </div>
                </Slide>
              </div>
            </div>
          </div>

          <div className="header__bg"></div>
          <img className="header__bg__left_top" src="img/leftUp.png" alt="" />
          <img
            className="header__bg__left_bottom"
            src="img/leftDown.png"
            alt=""
          />
          <img className="header__bg__right_top" src="img/rightUp.png" alt="" />
        </header>

        <section className="services" id="services">
          <p className="title">Услуги</p>

          <div className="services__wrap">
            <div className="slider multiple-items">
              <SlickSlider {...settingsOne}>
                {service &&
                  service.map((item, index) => (
                    <div key={index}>
                      <div className="services__box">
                        <p className="services__box__article">{item.title}</p>
                        <p className="services__box__time">{item.workTime}</p>
                        <img
                          src={`${process.env.REACT_APP_LINK}${item.photo}`}
                          alt=""
                        />
                        <div className="services__box_htmlForm">
                          <p>Записаться</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </SlickSlider>
            </div>
            <ul className="slider_dots"></ul>

            <div
              id="srvice__lastSlide_opacity"
              className="srvice__lastSlide_opacity"
            ></div>
          </div>
        </section>

        <section className="portfolio" id="portfolio">
          <div className="portolio__wrap">
            <p className="title">Портфолио</p>

            <div className="portfolio__slideButton">
              <span id="customPrev" className="portfolio_prev">
                &#60;
              </span>
              <p
                ref={current_slide}
                id="firstLetter"
                className="firstLetter"
              ></p>
              <p className="delimiter">/</p>
              <p ref={quantity_slide} id="delimiter"></p>
              <span id="customNext" className="portfolio_next">
                &#62;
              </span>
            </div>

            <div className="portfolio__section">
              <div className="portfolio__toogle">
                {portfolio &&
                  portfolio.map((item, idx) => (
                    <label
                      id="labelWeeding"
                      htmlFor="weeding"
                      key={idx}
                      onClick={() => changePortfolio(item._id)}
                    >
                      {item.title}
                    </label>
                  ))}
              </div>

              <div id="portfolio__weeding">
                <div className="port__slider">
                  <ul id="ul" ref={WeedingRef}>
                    {currentSlide &&
                      currentSlide.photos!.map((item, idx) => (
                        <li key={idx}>
                          <img
                            src={`${process.env.REACT_APP_LINK}${item.photo1}`}
                            alt=""
                          />
                          <img
                            src={`${process.env.REACT_APP_LINK}${item.photo2}`}
                            alt=""
                          />
                          <img
                            src={`${process.env.REACT_APP_LINK}${item.photo3}`}
                            alt=""
                          />
                          <img
                            src={`${process.env.REACT_APP_LINK}${item.photo4}`}
                            alt=""
                          />
                          <img
                            src={`${process.env.REACT_APP_LINK}${item.photo5}`}
                            alt=""
                          />
                          <img
                            src={`${process.env.REACT_APP_LINK}${item.photo6}`}
                            alt=""
                          />
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="slider port__slider__mobil">
                  <SlickSlider {...settingsOne}>
                    {currentSlide &&
                      currentSlide.photos!.map((item, idx) => (
                        <>
                          <div key={idx}>
                            <img
                              src={`${process.env.REACT_APP_LINK}${item.photo1}`}
                              alt=""
                            />
                          </div>
                          <div key={idx}>
                            <img
                              src={`${process.env.REACT_APP_LINK}${item.photo2}`}
                              alt=""
                            />
                          </div>
                          <div key={idx}>
                            <img
                              src={`${process.env.REACT_APP_LINK}${item.photo3}`}
                              alt=""
                            />
                          </div>
                          <div key={idx}>
                            <img
                              src={`${process.env.REACT_APP_LINK}${item.photo4}`}
                              alt=""
                            />
                          </div>
                          <div key={idx}>
                            <img
                              src={`${process.env.REACT_APP_LINK}${item.photo5}`}
                              alt=""
                            />
                          </div>
                          <div key={idx}>
                            <img
                              src={`${process.env.REACT_APP_LINK}${item.photo6}`}
                              alt=""
                            />
                          </div>
                        </>
                      ))}
                  </SlickSlider>
                </div>
              </div>
            </div>
          </div>
          <div className="title__top_left"></div>
          <div className="title__top_right"></div>
        </section>

        <section className="courses" id="courses">
          <div className="courses__wrap">
            <p className="title">Курсы</p>
            <div className="courses__content">
              <div className="courses__box">
                <span className="courses__title">“Сам себе визажист”</span>
                <Fade left cascade>
                  <ul>
                    <li>4 занятия (по 60 минут)</li>
                    <li>определение типа кожи и цветоитпа</li>
                    <li>обучение базовым техникам макияжа</li>
                    <li>обучающие материалы</li>
                  </ul>
                </Fade>
                <label htmlFor="Записаться на курс" className="courses_btn">
                  Записаться на курс
                </label>
              </div>
              <div className="courses__box">
                <span className="courses__title">
                  Базовый курс “Начинающий визажист”
                </span>
                <Fade right cascade>
                  <ul>
                    <li>10-15 занятия (по 60 минут)</li>
                    <li>типы кожи и особенности работы</li>
                    <li>базовые техники макияжа</li>
                    <li>обучающие материалы</li>
                  </ul>
                </Fade>
                <label htmlFor="Записаться на курс" className="courses_btn">
                  Записаться на курс
                </label>
              </div>
            </div>
          </div>
          <img src="/img/courses_bg.png" alt="" className="courses_bg" />
          <div className="title__top_left"></div>
          <div className="title__top_right"></div>
        </section>

        <section className="about" id="about">
          <div className="about__wrap">
            <p className="title about_title_desc">Обо мне</p>
            <div className="about__contentWrap">
              <div className="about__box">
                {about && (
                  <div className="about__box__title">
                    <p>{about.quote}</p>
                  </div>
                )}
                <hr />
                <div className="about__box__text">
                  <ul>
                    <li>{about && about.desc}</li>
                  </ul>
                </div>
                <div className="about__box__btn">
                  <label onClick={scrollToForm}>Записаться</label>
                </div>
                <Fade left fraction={0.5}>
                  <img
                    className="about_paint"
                    src={about ? about.photo1 : "/img/about_paint.png"}
                    alt=""
                  />
                </Fade>
                <Fade right fraction={0.5}>
                  <div className="about_photo">
                    <img
                      src={about ? about.photo2 : "/img/about_photo.png"}
                      alt=""
                    />
                  </div>
                </Fade>
                <img
                  className="about_quotes"
                  src="/img/about_quotes.png"
                  alt=""
                />
              </div>
              <div className="about__sn">
                <a href={settngs && settngs.inst}>
                  <img src="/img/Instagram_color.svg" alt="" />
                </a>
                <a href={settngs && settngs.fb}>
                  <img src="/img/Facebook_color.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
          <img className="about_bg" src="/img/about_bg.png" alt="" />
        </section>

        <section className="services reviews" id="reviews">
          <p className="title">Отзывы</p>
          <div className="reviews__toogle">
            <div ref={reviews_video} className="rev__toogle_wrap">
              <input
                ref={reviews_video_inp}
                id="video"
                name="reviews"
                type="radio"
                checked
              />
              <label id="review_video" htmlFor="video">
                Видео отзывы
              </label>
            </div>
            <div ref={reviews_text} className="rev__toogle_wrap">
              <input
                ref={reviews_text_inp}
                id="text"
                name="reviews"
                type="radio"
              />
              <label id="review_text" htmlFor="text">
                Текстовые отзывы
              </label>
            </div>
          </div>
          <div className="reviews__wrap">
            <div
              ref={reviewsVideo}
              className="services__wrap reviews__wrap__videoReviews"
            >
              <hr />
              <div className="slider multiple-items">
                <SlickSlider {...settingsOne}>
                  <div>
                    <div className="services__box">
                      <video controls src="/img/video.mp4"></video>
                    </div>
                  </div>
                  <div>
                    <div className="services__box">
                      <video controls src="/img/video.mp4"></video>
                    </div>
                  </div>
                  <div>
                    <div className="services__box">
                      <video controls src="/img/video.mp4"></video>
                    </div>
                  </div>
                  <div>
                    <div className="services__box">
                      <video controls src="/img/video.mp4"></video>
                    </div>
                  </div>
                  <div>
                    <div className="services__box">
                      <video controls src="/img/video.mp4"></video>
                    </div>
                  </div>
                </SlickSlider>
              </div>
              <ul className="slider_dots"></ul>

              <div className="srvice__lastSlide_opacity"></div>
            </div>
            <div
              ref={reviewsText}
              className="services__wrap reviews__wrap__textReviews"
            >
              <hr />
              <div className="slider multiple-items">
                <SlickSlider {...settingsOne}>
                  <div>
                    <div className="services__box">
                      <img src="/img/review_template.png" alt="" />
                    </div>
                  </div>
                  <div>
                    <div className="services__box">
                      <img src="/img/review_template.png" alt="" />
                    </div>
                  </div>
                  <div>
                    <div className="services__box">
                      <img src="/img/review_template.png" alt="" />
                    </div>
                  </div>
                  <div>
                    <div className="services__box">
                      <img src="/img/review_template.png" alt="" />
                    </div>
                  </div>
                  <div>
                    <div className="services__box">
                      <img src="/img/review_template.png" alt="" />
                    </div>
                  </div>
                </SlickSlider>
              </div>
              <ul className="slider_dots"></ul>

              <div className="srvice__lastSlide_opacity"></div>
            </div>
          </div>

          <div className="title__top_left"></div>
          <div className="title__top_right"></div>
        </section>

        <section className="services instagram" id="instagram">
          <div className="services__wrap">
            <div className="instagram__title">
              <p>Подписывайтесь на мой Instagram!</p>
              <a
                href="https://www.instagram.com/mariyasafirmua/"
                target="blank"
              >
                <span>@mariyasafirmua</span>
              </a>
              <img src="/img/insta_dog.svg" alt="" />
            </div>

            <div className="slider multiple-itemsInst">
              <SlickSlider {...settingsTwo}>
                <div>
                  <div className="services__box insta__box">
                    <img src="/img/services_1.png" alt="" />
                    <a href="/" className="insta__box__bg_hover">
                      <img src="/img/instagram.svg" alt="" />
                    </a>
                  </div>
                </div>
                <div>
                  <div className="services__box insta__box">
                    <img src="/img/services_1.png" alt="" />
                    <a href="/" className="insta__box__bg_hover">
                      <img src="/img/instagram.svg" alt="" />
                    </a>
                  </div>
                </div>
                <div>
                  <div className="services__box insta__box">
                    <img src="/img/services_1.png" alt="" />
                    <a href="/" className="insta__box__bg_hover">
                      <img src="/img/instagram.svg" alt="" />
                    </a>
                  </div>
                </div>
                <div>
                  <div className="services__box insta__box">
                    <img src="/img/services_1.png" alt="" />
                    <a href="/" className="insta__box__bg_hover">
                      <img src="/img/instagram.svg" alt="" />
                    </a>
                  </div>
                </div>
                <div>
                  <div className="services__box insta__box">
                    <img src="/img/services_1.png" alt="" />
                    <a href="/" className="insta__box__bg_hover">
                      <img src="/img/instagram.svg" alt="" />
                    </a>
                  </div>
                </div>
                <div>
                  <div className="services__box insta__box">
                    <img src="/img/services_1.png" alt="" />
                    <a href="/" className="insta__box__bg_hover">
                      <img src="/img/instagram.svg" alt="" />
                    </a>
                  </div>
                </div>
              </SlickSlider>
            </div>
            <ul className="slider_dots"></ul>
            <div
              id="srvice__lastSlide_opacity"
              className="srvice__lastSlide_opacity"
            ></div>
          </div>
        </section>

        <section id="form" className="form">
          <div className="form__wrap">
            <div className="form__application">
              <p className="form_title">Форма заявки</p>
              <form className="form" action="">
                <input type="text" placeholder="Имя" required />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="Номер телефона"
                  title="000-000-0000"
                  required
                />
                <input type="text" placeholder="Дата" required />
                {services && (
                  <select defaultValue={"DEFAULT"} id="FormSelect">
                    <option value="DEFAULT" disabled>
                      Тип макияжа
                    </option>
                    <option value="Свадебный макияж">Свадебный макияж</option>
                    <option value="Вечерний макияж">Вечерний макияж</option>
                    <option value="Макияж на фотосессию">
                      Макияж на фотосессию
                    </option>
                  </select>
                )}
                {courses && (
                  <select defaultValue={"DEFAULT"} id="FormSelect">
                    <option value="DEFAULT" disabled>
                      Курс
                    </option>
                    <option value="“Сам себе визажист”">
                      “Сам себе визажист”
                    </option>
                    <option value="Базовый курс “Начинающий визажист”">
                      Базовый курс “Начинающий визажист”
                    </option>
                  </select>
                )}
                <input type="submit" value="Записаться" />
              </form>
            </div>
            <div className="form_img">
              <img src="/img/form.png" alt="" />
            </div>
          </div>
        </section>

        <footer>
          <div className="footer__wrap" id="footer">
            <div className="footer__logo">
              <a href="/">
                <img src="/img/logo_white.svg" alt="" />
              </a>
            </div>
            <div className="footer__nav">
              <ul>
                <li id="navServices">Услуги</li>

                <li id="navPortfolio">Портфолио</li>

                <li id="navAbout">О себе</li>

                <li id="navReviews">Отзывы</li>

                <li id="navCourses">Курсы</li>

                <li id="navSN">Социальные сети</li>
              </ul>
            </div>
            <hr />
            <div className="footer__bottom">
              <div className="footer__copywriting">
                <p>
                  © 2020 <a href="https://itd.company/">ITD Company.</a> All
                  rights reserved
                </p>
              </div>
              <div className="footer__sn">
                <a href="/">
                  <img src="/img/instagram_footer.svg" alt="" />
                </a>
                <a href="/">
                  <img src="/img/facebook_footer.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </footer>

        <img id="scrollUp" src="/img/arrUp.svg" alt="" />
      </>
    );
  }
);

export default Home;
