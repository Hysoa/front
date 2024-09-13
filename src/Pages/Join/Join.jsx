import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import cn from "classnames";
import "./join.css";

import bg from "./../../assets/images/menu/FOND VIDE.png";
import contact from "./../../assets/images/menu/FORMULAIRE NOUS CONTACTER.png";
import deezer from "./../../assets/images/reseaux/DEEZER.png";
import spotify from "./../../assets/images/reseaux/SPOTIFY.png";
import apple from "./../../assets/images/reseaux/ITUNES.png";
import youtube from "./../../assets/images/reseaux/YOUTUBE.png";
import facebook from "./../../assets/images/reseaux/FACEBOOK.png";
import tiktok from "./../../assets/images/reseaux/TIKTOK.png";
import instagram from "./../../assets/images/reseaux/INSTA.png";
import mainlogo from "../../assets/images/logo/LOGO HYSOA DEFINITIF.png";
import { useEffect } from "react";

export default function Join() {
  const [isFormContactDisplayed, setIsFormContactDisplayed] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const formRef = useRef(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch(`${import.meta.env.VITE_API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      setMessageSent(true);

      setTimeout(() => {
        setIsFormContactDisplayed(false);
      }, 3000);
    });
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setIsFormContactDisplayed(false);
    }
  };

  useEffect(() => {
    if (isFormContactDisplayed) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFormContactDisplayed]);

  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="Join"
    >
      <section className="w-full">
        <img className="bg-join" src={bg} />
        <article className="main-container flex flex-col items-center justify-around">
          <h2 className="text-white">JOIN US</h2>
          <div className="logo-top-container flex justify-between">
            <a target="_blank" href="https://www.instagram.com/HysoaMusic">
              <img src={instagram} alt="" />
            </a>
            <a target="_blank" href="https://www.facebook.com/HysoaMusic">
              <img src={facebook} alt="" />
            </a>
            <a target="_blank" href="https://www.youtube.com/@hysoamusic">
              <img src={youtube} alt="" />
            </a>
            <a target="_blank" href="https://www.tiktok.com/@hysoahysoa">
              <img src={tiktok} alt="" />
            </a>
          </div>
          <div className="logo-bottom-container flex justify-around">
            <a
              target="_blank"
              href=" https://www.deezer.com/fr/artist/12057132"
            >
              <img src={deezer} alt="" />
            </a>
            <a
              target="_blank"
              href="https://open.spotify.com/intl-fr/album/415IcfQrWr6mbQk5lIaEQm"
            >
              <img src={spotify} alt="" />
            </a>
            <a
              target="_blank"
              href="http://itunes.apple.com/album/id1738668120?ls=1&app=itunes"
            >
              <img src={apple} alt="" />
            </a>
          </div>
          <h2 className="text-white">Nous Contacter :</h2>
          <img
            src={mainlogo}
            alt=""
            className="bottom-logo"
            onClick={() => setIsFormContactDisplayed(true)}
          />
          {isFormContactDisplayed && (
            <div
              ref={formRef}
              className="absolute w-[100%] h-[100%] px-20"
              style={{
                backgroundImage: `url(${contact})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div
                className={cn(
                  "relative flex flex-col",
                  "pl-[5vw] pt-[4.8vw]",
                  "4xl:pt-[5.8vh]"
                )}
              >
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={cn(
                    "flex flex-col text-3xl 4xl:text-4xl text-black",
                    "w-11/12",
                    "4xl:w-5/6"
                  )}
                >
                  <input
                    type="text"
                    maxLength={32}
                    placeholder={`Nom ${
                      errors.name && errors.name.type === "required"
                        ? " (requis)"
                        : ""
                    }`}
                    {...register("name", { required: true })}
                    className={cn(
                      "w-4/6 bg-transparent placeholder-black/50 focus:outline-none",
                      "focus:border-transparent focus:ring-0",
                      "ml-[4.3vw] h-[1.5vw]",
                      "4xl:ml-[4.5vw] 4xl:h-[1.7vh]"
                    )}
                  />
                  <input
                    type="text"
                    placeholder={`Email ${
                      errors.email && errors.email.type === "required"
                        ? " (requis)"
                        : ""
                    }`}
                    {...register("email", {
                      required: true,
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                        message: "Email invalide",
                      },
                    })}
                    className={cn(
                      "bg-transparent placeholder-black/50 focus:outline-none",
                      "mt-[0.5vw] ml-[4.3vw] h-[3.6vh] w-4/6",
                      "4xl:mt-4 4xl:ml-[4.5vw] 4xl:h-[1.7vh]"
                    )}
                  />
                  <input
                    type="text"
                    placeholder={`Objet du message ${
                      errors.subject && errors.subject.type === "required"
                        ? " (requis)"
                        : ""
                    }`}
                    {...register("subject", { required: true, maxLength: 58 })}
                    className={cn(
                      "bg-transparent placeholder-black/50 focus:outline-none",
                      "mt-[2vw] ml-[4vw]",
                      "4xl:mt-[2.8vh] 4xl:ml-[4.5vw]"
                    )}
                  />
                  <textarea
                    placeholder={`Message ${
                      errors.message && errors.message.type === "required"
                        ? " (requis)"
                        : ""
                    }`}
                    maxLength={500}
                    {...register("message", { required: true })}
                    className={cn(
                      "bg-transparent placeholder-black/50 focus:outline-none",
                      "mt-[2vw] ml-[5.4vw] h-[8vw] min-h-[8vw] max-h-[8vw]",
                      "4xl:mt-[2vw] 4xl:ml-[5.3vw] 4xl:h-[10vh] 4xl:max-h-[10vh]"
                    )}
                  />
                  <div className="flex justify-between mt-3">
                    {messageSent ? (
                      <button type="submit" className="self-end text-green-900">
                        Message envoyé !
                      </button>
                    ) : Object.entries(errors).length > 0 ? (
                      <p className="text-red-700">
                        {Object.keys(errors).length > 1 ? (
                          <>
                            Plusieurs erreurs dans le formulaire (
                            {Object.keys(errors)
                              .map((key) => {
                                if (key === "name") return "Nom";
                                if (key === "email") return "Mail";
                                if (key === "subject") return "Objet";

                                return key;
                              })
                              .join(", ")}
                            )
                          </>
                        ) : (
                          <>
                            {errors.email &&
                              errors.email.type === "pattern" &&
                              "L'adresse mail est invalide"}
                            {errors.name && errors.name.type === "required" && (
                              "Le nom est requis"
                            )}
                            {errors.email && errors.email.type === "required" && (
                              "L'email est requis"
                            )}
                            {errors.subject && errors.subject.type === "required" && (
                              "L'objet est requis"
                            )}
                            {errors.message && errors.message.type === "required" && (
                              "Le message est requis"
                            )}
                          </>
                        )}
                      </p>
                    ) : (
                      <button type="submit" className="self-end">
                        Envoyer
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </article>
      </section>
    </motion.div>
  );
}
