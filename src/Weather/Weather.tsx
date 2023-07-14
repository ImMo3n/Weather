import { useContext, useMemo } from "react";

import { getWeekDay } from "../Common/commonFunctions";
import { CountryTitle } from "../Common/CountryTitle";

import { ELang, EVars, langPlaceholder } from "../Common/GeneralInfo";
import { Header } from "../Common/Header";

import { CountryContext, LanguageContext, TempContext } from "../WeatherApp";
import { WeatherSorted } from "./WeatherSorted";

import { WeatherResponse } from "./WeatherTypes";

const ErrorElement = () => <p>Error...</p>;

export const Weather = ({ apiResult }: { apiResult: WeatherResponse }) => {
  const [language] = useContext(LanguageContext);
  const [country] = useContext(CountryContext);

  if (apiResult.cod !== "200") return <ErrorElement />;

  const dates = useMemo(
    () =>
      apiResult.list.reduce((dates, listItem) => {
        const { dt_txt } = listItem;
        const [date] = dt_txt.split(" ");
        if (!dates.includes(date)) dates.push(date);
        return dates;
      }, [] as string[]),
    [apiResult]
  );

  const dateWeekList = useMemo(() => {
    return dates.map((date) => {
      const weekDay = getWeekDay(date, language);
      const list = apiResult.list.filter((weatherObject) => {
        const [objectDate] = weatherObject.dt_txt.split(" ");
        return objectDate === date;
      });

      let mainWeatherObject = list.filter((weatherObject) => {
        const [, clock] = weatherObject.dt_txt.split(" ");
        return clock === EVars.DEFAULT_CLOCK;
      });

      if (mainWeatherObject.length === 0) mainWeatherObject = [list[0]];

      return { date, weekDay, list, mainWeatherObject };
    });
  }, [dates]);

  const header = langPlaceholder[language as ELang]["weather-header"](
    dates.length
  );

  return (
    <div>
      <div className="p-3 border-b dark:border-slate-500">
        <div>
          <Header header={header} country={country} language={language} />
          <CountryTitle language={language} country={country} />
        </div>
      </div>
      <div>
        {dateWeekList.map((dateWeekObject) => {
          return (
            <WeatherSorted
              key={dateWeekObject.date}
              dateWeekObject={dateWeekObject}
              language={language}
            />
          );
        })}
      </div>
    </div>
  );
};
