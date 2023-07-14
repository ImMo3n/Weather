import { useState } from "react";
import { getWeatherTitle } from "../Common/commonFunctions";
import { WeatherDataTemplate } from "./WeatherDataTemplate";
import { DateWeekObjectType } from "./WeatherTypes";

export const WeatherSorted = ({
  dateWeekObject,
  language,
}: {
  dateWeekObject: DateWeekObjectType;
  language: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mainWeatherObject, list, weekDay } = dateWeekObject;

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <WeatherDataTemplate
        clickHandler={toggleOpen}
        weatherData={mainWeatherObject[0]}
        language={language}
        title={weekDay}
        isOpen={isOpen}
        classes={"dark:bg-slate-700"}
      />
      {isOpen === true &&
        list.map((weatherDataItem) => {
          const { dt_txt } = weatherDataItem;

          return (
            <WeatherDataTemplate
              key={dt_txt}
              weatherData={weatherDataItem}
              language={language}
              title={getWeatherTitle(dt_txt, language)}
              classes={"bg-slate-100 dark:bg-slate-600"}
            />
          );
        })}
    </>
  );
};
