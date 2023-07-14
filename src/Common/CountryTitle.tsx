import { getCountryName } from "./commonFunctions";
import { countryType } from "./types";

export const CountryTitle = ({
  country,
  language,
}: {
  country: countryType;
  language: string;
}) => (
  <div className="flex gap-2">
    <div className={`fflag fflag-${country?.countryCode} ff-lg ff-app`}></div>
    <p>{getCountryName(country?.countryCode, language)}</p>
  </div>
);
