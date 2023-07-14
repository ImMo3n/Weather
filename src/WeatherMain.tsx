import { useCallback, useContext } from "react";

import { CountryContext, LanguageContext } from "./WeatherApp";
import { BASE_URLS } from "./Common/GeneralInfo";
import { PromiseElement } from "./hooks/usePromise/PromiseElement";
import { appendWeatherParams } from "./Common/commonFunctions";
import { countryType } from "./Common/types";
import { Weather } from "./Weather/Weather";
import { Pollution } from "./Pollution/Pollution";

import { SkeletonLoader as SkeletonLoaderWeather } from "./Weather/SkeletonLoader";
import { SkeletonLoader as SkeletonLoaderPollution } from "./Pollution/SkeletonLoader";

import { WeatherResponse, PollutionData } from "./Common/types";

const SkeletonLoader = () => {
  return (
    <div>
      <SkeletonLoaderWeather />
      <SkeletonLoaderPollution />
    </div>
  );
};

const CountryNotSelectedElement = SkeletonLoader;

const ErrorElement = () => <p>Error...</p>;
const SuccessElement = ({
  result,
}: {
  result: [WeatherResponse, PollutionData];
}) => {
  const [currentWeatherResult, currentAirPolutionResult] = result;
  return (
    <>
      <div className="max-w-5xl m-auto pt-3 px-3">
        <section className="border dark:border-slate-500 rounded-md">
          <Weather apiResult={currentWeatherResult} />
        </section>

        <section className="border dark:border-slate-500 rounded-md mt-3">
          <Pollution apiResult={currentAirPolutionResult} />
        </section>
      </div>
    </>
  );
};

export const WeatherMain = () => {
  const [country] = useContext(CountryContext);
  const [language] = useContext(LanguageContext);

  const weatherPromise = useCallback(
    () =>
      new Promise((resolve, reject) => {
        fetch(getCurrentWeatherURL(country, language))
          .then((res) => {
            if (!res.ok) {
              reject(
                `Error occured in currentweather API. Status code = ${res.status}`
              );
            }
            return res.json();
          })
          .then((result) => {
            resolve(result);
          });
      }),
    [country, language]
  );

  const airPollution = useCallback(
    () =>
      new Promise((resolve, reject) => {
        fetch(getCurrentPollutionURL(country))
          .then((res) => {
            if (!res.ok) {
              reject(
                `Error occured in airpollution API. Status code = ${res.status}`
              );
            }
            return res.json();
          })
          .then((result) => {
            resolve(result);
          });
      }),
    [country, language]
  );

  const promiseCurrent = useCallback(
    () =>
      new Promise((resolve, reject) =>
        Promise.all([weatherPromise(), airPollution()])
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          })
      ),
    [weatherPromise, airPollution]
  );

  return !country ? (
    <CountryNotSelectedElement />
  ) : (
    <div>
      <PromiseElement
        promise={promiseCurrent}
        SuccessElement={SuccessElement}
        LoadingElement={SkeletonLoader}
        ErrorElement={ErrorElement}
      />
    </div>
  );
};

function getCurrentWeatherURL(country: countryType, language: string): URL {
  const currentWeatherURL = new URL(BASE_URLS.OPENWEATHERMAP);
  currentWeatherURL.pathname = "data/2.5/forecast";
  appendWeatherParams(currentWeatherURL, country, language);
  return currentWeatherURL;
}

function getCurrentPollutionURL(country: countryType): URL {
  const airPollutionURL = new URL(BASE_URLS.OPENWEATHERMAP);
  airPollutionURL.pathname = "data/2.5/air_pollution";
  appendWeatherParams(airPollutionURL, country);
  return airPollutionURL;
}
