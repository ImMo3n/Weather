import { useContext, useEffect } from "react";

import { WeatherMain } from "./WeatherMain";
import { Footer } from "./Common/Footer";
import { Settings } from "./Options/Settings";

import { DarkModeContext, LanguageContext } from "./WeatherApp";

import { setMode, systemModeChange } from "./Common/commonFunctions";
import { ELang } from "./Common/GeneralInfo";

export const WeatherWrapper = () => {
  const [mode] = useContext(DarkModeContext);
  const [language] = useContext(LanguageContext);

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", systemModeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", systemModeChange);
    };
  }, []);

  useEffect(() => {
    setMode(mode);
  }, [mode]);

  return (
    <div
      className="dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 font-sans"
      dir={language === ELang.FA ? "rtl" : "ltr"}
    >
      <Settings />
      <WeatherMain />
      <Footer />
    </div>
  );
};
