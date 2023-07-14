import { WiHumidity } from "react-icons/wi";
import { convertToPersianNumber } from "../Common/commonFunctions";
import { ELang } from "../Common/GeneralInfo";

export const Humidity = ({
  humidity,
  language,
}: {
  humidity: number;
  language: string;
}) => (
  <div className="max-md:hidden">
    <span className={`flex ${language === ELang.FA ? "flex-row-reverse" : ""}`}>
      <WiHumidity className="inline text-2xl text-sky-500" />
      <span className="sr-only">Humidity</span>
      {convertToPersianNumber(humidity, language as ELang)}
      <span className="sr-only">%</span>
    </span>
  </div>
);
