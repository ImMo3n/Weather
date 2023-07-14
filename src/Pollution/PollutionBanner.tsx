import { ELang, langPlaceholder } from "../Common/GeneralInfo";
import { airQualityIndexStyles } from "./PollutionIndexInfo";

export const PollutionBanner = ({
  aqi,
  language,
  iconWidth,
}: {
  aqi: number;
  language: string;
  iconWidth: number;
}) => {
  const style =
    airQualityIndexStyles[aqi as keyof typeof airQualityIndexStyles];
  const aqiText = langPlaceholder[language as ELang]["aqi-text"](aqi);
  const label = langPlaceholder[language as ELang]["aqi-label"](aqi);
  const url = `/aqi/${aqi}.svg`;

  return (
    <section
      className="flex justify-between items-center -mx-3 mt-3 p-3"
      style={style}
    >
      <div>
        <p className="font-bold text-xl" tabIndex={0}>
          <span className="sr-only">Air Quality Index, </span>
          {label}
        </p>
        <p>{aqiText}</p>
      </div>
      <div>
        <img width={iconWidth} src={url} alt={label} />
      </div>
    </section>
  );
};
