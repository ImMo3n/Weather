import { getCountryName } from "../Common/commonFunctions";
import { ELang } from "../Common/GeneralInfo";

export const CountryOption = ({
  language,
  countryCode,
  onCountrySelect,
  OptionLabel,
}: {
  language: string;
  countryCode: string;
  onCountrySelect: (countryCode: string) => void;
  OptionLabel: () => JSX.Element;
}) => (
  <li className="m-0 border-b dark:text-white last:border-0">
    <button
      className={`flex gap-2 py-2 pt-1 w-full ${
        language === ELang.FA ? "justify-start flex-row-reverse" : ""
      }`}
      value={countryCode}
      type="button"
      onClick={() => onCountrySelect(countryCode)}
    >
      {language === ELang.FA ? (
        <span className="sr-only">
          select {getCountryName(countryCode, ELang.EN)}
        </span>
      ) : (
        <></>
      )}
      <OptionLabel />
    </button>
  </li>
);
