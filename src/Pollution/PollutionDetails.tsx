import { getIndex } from "../Common/commonFunctions";
import { ELang, langPlaceholder } from "../Common/GeneralInfo";
import {
  airQualityIndexReference,
  airQualityIndexStyles,
} from "./PollutionIndexInfo";
import { component, pollutant } from "./PollutionTypes";

export const PollutionDetails = ({
  components,
  language,
}: {
  components: component;
  language: string;
}) => (
  <div className="px-3">
    {Object.keys(airQualityIndexReference).map((pollutantKey) => {
      const { Title, minVeryPoor } =
        airQualityIndexReference[
          pollutantKey as keyof typeof airQualityIndexReference
        ];
      const pollutantValue =
        components[pollutantKey as keyof typeof components];

      let pollutantPercent = Math.round((pollutantValue * 100) / minVeryPoor);
      pollutantPercent = pollutantPercent < 1 ? 1 : pollutantPercent;
      pollutantPercent = pollutantPercent > 100 ? 100 : pollutantPercent;

      const aqiIndex = getIndex(pollutantValue, pollutantKey as pollutant);
      const { backgroundColor } = airQualityIndexStyles[aqiIndex];

      const labelShort =
        langPlaceholder[language as ELang]["aqi-label-short"](aqiIndex);

      const PollutantText =
        langPlaceholder[language as ELang]["pollutant-text"];

      const PollutantAnswer =
        langPlaceholder[language as ELang]["pollutant-answers"](pollutantKey);

      return (
        <article key={pollutantKey} className="mb-3">
          <div className="flex justify-between mb-1">
            <span tabIndex={0} className="font-medium">
              {PollutantText} <Title />:
              <span className="font-medium">{labelShort}</span>
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 ">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${pollutantPercent}%`, backgroundColor }}
            ></div>
          </div>

          <details className="my-2 pb-2">
            <summary className="cursor-pointer">
              <span className="sr-only">Show description for</span>
              <Title />
              {language === ELang.EN ? "?" : "؟"}
            </summary>
            <div className="mt-1" tabIndex={0}>
              {PollutantAnswer}
            </div>
          </details>
        </article>
      );
    })}
  </div>
);
