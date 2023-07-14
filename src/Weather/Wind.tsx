import { convertToPersianNumber } from "../Common/commonFunctions";
import { ELang } from "../Common/GeneralInfo";

export const Wind = ({
  speed,
  deg,
  language,
}: {
  speed: number;
  deg: number;
  language: string;
}) => (
  <div className="max-md:hidden">
    <span className={`flex ${language === ELang.FA ? "flex-row-reverse" : ""}`}>
      <img
        src="/wind-direction.svg"
        style={{ transform: `rotate(${deg - 180}deg)` }}
        data-rotate-value={deg}
        className="inline"
      />
      <span
        className={`px-2 flex gap-x-1 ${
          language === ELang.FA ? "flex-row-reverse" : ""
        }`}
      >
        <span className="sr-only">Wind speed: </span>
        <span>{convertToPersianNumber(speed, language as ELang)}</span>
        <span>km/h</span>
      </span>
    </span>
  </div>
);
