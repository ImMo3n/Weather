import {
  COUNTRIES,
  countriesInPersian,
  ELang,
  EVars,
  langPlaceholder,
} from "../Common/GeneralInfo";
import { ImLocation } from "react-icons/im";
import { getCountryName } from "../Common/commonFunctions";
import { useContext } from "react";
import { LanguageContext } from "../WeatherApp";
import { CountryOption } from "./CountryOption";

export const RecommendedSearches = ({
  searchTerm,
  onCountrySelect,
}: {
  searchTerm: string;
  onCountrySelect: (countryCode: string) => void;
}) => {
  const LIMITER = 12;
  const [language] = useContext(LanguageContext);

  const searchResult = Object.keys(COUNTRIES).filter((countryCode) => {
    const searchTermLowerCased = searchTerm.toLowerCase();
    let { Name, Capital } = COUNTRIES[countryCode as keyof typeof COUNTRIES];
    let CapitalName = Capital?.Name;

    if (language === ELang.FA) {
      const translationObject =
        countriesInPersian[countryCode as keyof typeof countriesInPersian];
      Name = translationObject.Name;
      CapitalName = translationObject.Capital;
    }

    return (
      Name.toLowerCase().includes(searchTermLowerCased) ||
      (CapitalName && CapitalName.toLowerCase().includes(searchTermLowerCased))
    );
  });

  const limitedCountries =
    searchTerm === "" ? searchResult.slice() : searchResult.slice(-LIMITER);

  const sortedCountries = limitedCountries.sort();

  const currentLocationLabel =
    langPlaceholder?.[language as ELang].currentLocationLabel;

  return (
    <ul className="flex flex-col space-y-2 mx-2">
      <CountryOption
        language={language}
        countryCode={EVars.CURRENT}
        onCountrySelect={onCountrySelect}
        OptionLabel={() => (
          <>
            <ImLocation />
            <span aria-hidden>{currentLocationLabel}</span>
            <span className="sr-only">Detect current location</span>
          </>
        )}
      />
      {sortedCountries.length === 0 ? (
        <></>
      ) : (
        sortedCountries.map((countryCode) => (
          <CountryOption
            key={countryCode}
            language={language}
            countryCode={countryCode}
            onCountrySelect={onCountrySelect}
            OptionLabel={() => (
              <>
                <div
                  className={`fflag fflag-${countryCode} ff-lg ff-app`}
                ></div>
                {getCountryName(countryCode, language)}
              </>
            )}
          />
        ))
      )}
    </ul>
  );
};
