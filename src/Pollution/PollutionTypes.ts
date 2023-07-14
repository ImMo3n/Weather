export type PollutionData = {
  coord: {
    lon: number;
    lat: number;
  };
  list: {
    main: {
      aqi: number;
    };
    components: component;
    dt: number;
  }[];
};

export type component = {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
};

export type pollutant = "so2" | "no2" | "pm10" | "pm2_5" | "o3" | "co";
