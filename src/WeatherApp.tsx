import React, { useState, createContext } from "react";

import { WeatherWrapper } from "./WeatherWrapper";

import { ELang, ETempMode } from "./Common/GeneralInfo";
import { getPreferedMode } from "./Common/commonFunctions";
import { countryType } from "./Common/types";

import "./css/tailwindOutput.css";
import "./css/additionalClasses.css";
import "./css/freakflags.css";

export const CountryContext = createContext<
  [countryType, React.Dispatch<React.SetStateAction<countryType>>]
>([null, () => {}]);

export const LanguageContext = createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>(["", () => {}]);

export const TempContext = createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>(["", () => {}]);

export const DarkModeContext = createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>(["", () => {}]);

export const WeatherApp = () => {
  return (
    <CountryContext.Provider value={useState<countryType>(null)}>
      <LanguageContext.Provider value={useState<string>(ELang.EN)}>
        <TempContext.Provider value={useState<string>(ETempMode.C)}>
          <DarkModeContext.Provider value={useState<string>(getPreferedMode())}>
            <WeatherWrapper />
          </DarkModeContext.Provider>
        </TempContext.Provider>
      </LanguageContext.Provider>
    </CountryContext.Provider>
  );
};
