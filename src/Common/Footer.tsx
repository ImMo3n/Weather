export const Footer = () => {
  return (
    <footer
      dir="ltr"
      className="text-center text-sm pt-3 bg-gray-400 dark:bg-slate-700 dark:text-gray-100 border-slate-950 h-24 mt-3"
    >
      <div className="flex flex-col items-baseline max-w-5xl m-auto px-3 gap-1">
        <p>
          Air pollution and weather api by{" "}
          <a
            href="https://openweathermap.org/api"
            target="_blank"
            className="border-b"
          >
            Open Weather Map
          </a>
        </p>
        <p>
          Geo location api by{" "}
          <a
            href="https://geolocation-db.com"
            target="_blank"
            className="border-b"
          >
            Geolocation DB
          </a>
        </p>
        <p>
          Country flags by{" "}
          <a
            href="https://www.freakflagsprite.com/"
            target="_blank"
            className="border-b"
          >
            Freak Flags
          </a>
        </p>
      </div>
    </footer>
  );
};
