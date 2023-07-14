import { Humidity } from "./Humidity";
import { Icon } from "./Icon";
import { Status } from "./Status";
import { Temperature } from "./Temperature";
import { Title } from "./Title";
import { Toggler } from "./Toggler";
import { WeatherData } from "./WeatherTypes";
import { Wind } from "./Wind";

export const WeatherDataTemplate = ({
  weatherData,
  language,
  clickHandler,
  title,
  classes,
  isOpen,
}: {
  weatherData: WeatherData;
  clickHandler?: () => void;
  language: string;
  title: string;
  classes?: string;
  isOpen?: boolean;
}) => {
  const {
    wind: { speed, deg },
    main: { feels_like, humidity },
  } = weatherData;
  const { description, icon, main } = weatherData.weather[0];

  return (
    <div
      className={`
              grid place-items-center 
              grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_20px] 
              max-md:grid-cols-[1fr_1fr_1fr_1fr_20px] max-md:text-sm 
              border-b dark:border-slate-500 last:border-b-0 last:rounded-b-md 
              ${clickHandler ? "cursor-pointer" : ""}
              ${classes ? classes : ""} 
          `}
      onClick={clickHandler}
      tabIndex={0}
    >
      <Title title={title} />
      <Temperature feels_like={feels_like} language={language} />
      <Icon icon={icon} weatherStatus={main} size={60} />
      <Status weatherStatus={description} />
      <Humidity humidity={humidity} language={language} />
      <Wind speed={speed} deg={deg} language={language} />
      <Toggler
        isOpen={isOpen}
        title={title}
        clickHandler={clickHandler}
        language={language}
      />
    </div>
  );
};
