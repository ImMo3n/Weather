import {
  COUNTRIES,
  countriesInPersian,
  KEYS,
  ELang,
  EVars,
  ETempMode,
  BASE_URLS,
  langPlaceholder,
} from "./GeneralInfo";
import {
  airQualityIndexReference,
  airQualityIndexStyles,
} from "../Pollution/PollutionIndexInfo";
import { countryType } from "./types";
import { pollutant } from "../Pollution/PollutionTypes";

export function appendWeatherParams(
  url: URL,
  country: countryType,
  lang?: string | undefined
) {
  if (!country) return;
  const { lat, long } = country;
  url.searchParams.append("lat", lat.toString());
  url.searchParams.append("lon", long.toString());
  url.searchParams.append("appid", KEYS.OPENWEATHERMAP);
  url.searchParams.append("units", "metric");
  if (!lang) return;
  if (lang === ELang.EN) return;
  url.searchParams.append("lang", lang);
}

export function getLocalValue(key: string, property: string) {
  const localValue = localStorage.getItem(key);
  if (!localValue) return null;
  return JSON.parse(localValue)[property];
}

export function getLocalCountry() {
  return getLocalValue(EVars.LOCAL_COUNTRY_KEY, "country");
}

export function setLocalCountry(country: countryType) {
  localStorage.setItem(EVars.LOCAL_COUNTRY_KEY, JSON.stringify({ country }));
}

export function getCountryName(
  country: string | countryType | null | undefined,
  lang: string
): string {
  if (!country) return "";
  return typeof country === "string"
    ? getCountryNameByCountryCode(country, lang)
    : getCountryNameByCountryObject(country, lang);
}

function getCountryNameByCountryCode(
  countryCode: string,
  lang: string
): string {
  const countryObject = COUNTRIES[countryCode as keyof typeof COUNTRIES];
  if (!countryObject) return "";
  let { Name, Capital } = countryObject;
  let CapitalName = Capital?.Name;

  if (lang === ELang.FA) {
    const translationOfCountry =
      countriesInPersian[countryCode as keyof typeof countriesInPersian];
    Name = translationOfCountry.Name;
    CapitalName = translationOfCountry.Capital;
  }

  const buttonName = CapitalName ? `${Name} - ${CapitalName}` : Name;
  return buttonName;
}

function getCountryNameByCountryObject(
  countryObject: countryType,
  lang: string
): string {
  if (!countryObject?.countryInfo) return "";
  const { countryCode } = countryObject;
  return getCountryNameByCountryCode(countryCode, lang);
}

export function getFirstWordCapitalized(input: string) {
  return input
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function getDegrees(temp: number, tempMode: string): string {
  if (tempMode === ETempMode.C) return temp.toString();
  const resultInFarenheit = ((temp * 9) / 5 + 32).toFixed(2);
  return resultInFarenheit;
}

export function convertToPersianNumber(number: number | string, lang?: ELang) {
  if (lang === ELang.EN) return String(number);
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const englishDigits = "0123456789";

  const numberString = String(number);
  let convertedNumber = "";

  for (let i = 0; i < numberString.length; i++) {
    const digit = numberString[i];
    const digitIndex = englishDigits.indexOf(digit);

    if (digitIndex !== -1) {
      convertedNumber += persianDigits[digitIndex];
    } else {
      convertedNumber += digit;
    }
  }

  return convertedNumber;
}

export async function getCurrentCountry(): Promise<countryType> {
  const url = new URL(BASE_URLS.GEOLOCATION);
  url.pathname = `json/${KEYS.GEOLOCATION}`;

  const result = fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error occured in geocountryCode api. Error code: ${response.status}`
        );
      }
      return response.json();
    })
    .then((resultAPI) => {
      const {
        country_code: countryCode,
        latitude: lat,
        longitude: long,
      } = resultAPI;
      const countryInfo = COUNTRIES[countryCode as keyof typeof COUNTRIES];
      setLocalCountry({ countryInfo, lat, long, countryCode });
      return { countryInfo, lat, long, countryCode };
    })
    .catch((error) => {
      const [lat, long] = COUNTRIES[EVars.DEFAULT_COUNTRY].GeoPt;
      const defaultCountry = {
        countryInfo: COUNTRIES[EVars.DEFAULT_COUNTRY],
        lat,
        long,
        countryCode: EVars.DEFAULT_COUNTRY,
      };

      return defaultCountry;
    });

  return result;
}

export function prefersDarkMode() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export function getPreferedMode() {
  if (prefersDarkMode() === true) return "dark";
  return "light";
}

export function getLocalDarkMode() {
  return getLocalValue(EVars.LOCAL_MODE_KEY, EVars.LOCAL_MODE_PROPERTY);
}

export function setMode(mode: string) {
  const otherMode = mode === "dark" ? "light" : "dark";
  if (!mode || !otherMode) return;
  if (document.documentElement.classList.contains(otherMode))
    document.documentElement.classList.remove(otherMode);
  if (!document.documentElement.classList.contains(mode))
    document.documentElement.classList.add(mode);
}

export function systemModeChange(event: Event) {
  const systemMode = (event as MediaQueryListEvent).matches ? "dark" : "light";
  setMode(systemMode);
}

export function updateDocumentTitle(countryCode: string, lang: string) {
  const countryName = getCountryName(countryCode, lang);
  const generalTitle = langPlaceholder[lang as ELang].documentTitle;
  document.title = `${generalTitle} | ${countryName}`;
}

export function getCurrentWeatherURL(
  country: countryType,
  language: string
): URL {
  const currentWeatherURL = new URL(BASE_URLS.OPENWEATHERMAP);
  currentWeatherURL.pathname = "data/2.5/forecast";
  appendWeatherParams(currentWeatherURL, country, language);
  return currentWeatherURL;
}

export function getCurrentPollutionURL(country: countryType): URL {
  const airPollutionURL = new URL(BASE_URLS.OPENWEATHERMAP);
  airPollutionURL.pathname = "data/2.5/air_pollution";
  appendWeatherParams(airPollutionURL, country);
  return airPollutionURL;
}

export function getWeekDay(inputDate: Date | string, language: string) {
  if (typeof inputDate === "string") inputDate = new Date(inputDate);
  return new Date(inputDate).toLocaleDateString(language, {
    weekday: "long",
  });
}

export function getWeatherTitle(dt_txt: string, language: string) {
  const date = new Date(dt_txt);
  const formattedDate = date.toLocaleDateString(language, {
    weekday: "short",
    hour: "numeric",
    hour12: true,
  });
  return formattedDate;
}

export const getIndex = (level: number, polltant: pollutant) => {
  const defaultValue = 1;
  if (!airQualityIndexReference.hasOwnProperty(polltant)) return defaultValue;
  const parametersObject =
    airQualityIndexReference[polltant as keyof typeof airQualityIndexReference];
  const { minGood, minFair, minModerate, minPoor, minVeryPoor } =
    parametersObject;

  if (level >= minGood && level < minFair) {
    return 1;
  } else if (level >= minFair && level < minModerate) {
    return 2;
  } else if (level >= minModerate && level < minPoor) {
    return 3;
  } else if (level >= minPoor && level < minVeryPoor) {
    return 4;
  } else if (level >= minVeryPoor) {
    return 5;
  }
  return defaultValue;
};

export const createStyle = (pollutantAmount: number, pollutant: pollutant) => {
  const { backgroundColor, color } =
    airQualityIndexStyles[getIndex(pollutantAmount, pollutant)];
  return {
    backgroundColor,
    color,
  };
};
