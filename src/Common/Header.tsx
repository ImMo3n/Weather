import { getCountryName } from "./commonFunctions";
import { countryType } from "./types";

export const Header = ({
  header,
  country,
  language,
}: {
  header: string;
  country: countryType;
  language: string;
}) => (
  <h1 className="text-3xl mb-3" tabIndex={0}>
    {header}
    <span className="sr-only">{`for ${getCountryName(
      country?.countryCode,
      language
    )}`}</span>
  </h1>
);
