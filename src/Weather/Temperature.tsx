import { useContext } from "react";
import { convertToPersianNumber, getDegrees } from "../Common/commonFunctions";
import { ELang } from "../Common/GeneralInfo";
import { TempContext } from "../WeatherApp";

export const Temperature = ({
  feels_like,
  language,
}: {
  feels_like: number;
  language: string;
}) => {
  const [tempMode] = useContext(TempContext);
  //   const [language] = useContext(LanguageContext);

  let degrees = getDegrees(feels_like, tempMode);
  if (language === ELang.FA) degrees = convertToPersianNumber(degrees);
  return (
    <div>
      <span>
        <span className="font-bold">
          <span className="sr-only">Temperature: </span>
          {degrees}
        </span>
        °{tempMode}
      </span>
    </div>
  );
};
