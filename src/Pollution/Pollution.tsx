import { useContext } from "react";
import { ELang, langPlaceholder } from "../Common/GeneralInfo";
import { CountryContext, LanguageContext } from "../WeatherApp";

import { PollutionData } from "./PollutionTypes";

import { CountryTitle } from "../Common/CountryTitle";
import { Header } from "../Common/Header";

import { PollutionBanner } from "./PollutionBanner";
import { PollutionTable } from "./PollutionTable";
import { PollutionDetails } from "./PollutionDetails";

export const Pollution = ({ apiResult }: { apiResult: PollutionData }) => {
  const [country] = useContext(CountryContext);
  const [language] = useContext(LanguageContext);

  const {
    main: { aqi },
  } = apiResult.list[0];
  const { components } = apiResult.list[0];

  const header = langPlaceholder[language as ELang]["pollution-header"]();
  return (
    <>
      <div className="p-3">
        <Header language={language} header={header} country={country} />
        <CountryTitle language={language} country={country} />
        <PollutionBanner language={language} aqi={aqi} iconWidth={100} />
        <PollutionTable language={language} components={components} />
      </div>
      <PollutionDetails language={language} components={components} />
    </>
  );
};
