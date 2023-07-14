import { convertToPersianNumber, createStyle } from "../Common/commonFunctions";
import { ELang } from "../Common/GeneralInfo";
import { airQualityIndexReference } from "./PollutionIndexInfo";
import { component, pollutant } from "./PollutionTypes";

export const PollutionTable = ({
  components,
  language,
}: {
  components: component;
  language: string;
}) => (
  <section className="mt-3 max-md:hidden">
    <table className="table-fixed w-full text-center">
      <thead>
        <tr>
          {Object.keys(airQualityIndexReference).map((pollutant) => {
            const PollutantTitle =
              airQualityIndexReference[
                pollutant as keyof typeof airQualityIndexReference
              ].Title;

            return (
              <th key={pollutant}>
                <PollutantTitle />
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          {Object.keys(airQualityIndexReference).map((pollutant) => {
            const style = createStyle(
              components[pollutant as pollutant],
              pollutant as pollutant
            );

            const pollutantAmount = convertToPersianNumber(
              components[pollutant as pollutant],
              language as ELang
            );

            return (
              <td key={pollutant} style={style}>
                {pollutantAmount}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  </section>
);
