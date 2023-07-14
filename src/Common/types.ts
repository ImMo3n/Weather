export type WeatherData = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility?: number;
  pop?: number;
  rain?: {
    "3h": number;
  };
  sys?: {
    pod: string;
  };
  dt_txt: string;
};

export type CityType = {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type WeatherResponse = {
  city: CityType;
  cnt: number;
  cod: string;
  list: WeatherData[];
  message: number;
};

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
export type countryType = {
  countryInfo: Country;
  lat: number;
  long: number;
  countryCode: string;
} | null;

export type Country = {
  Name: string;
  Capital: {
    DLST: null | number;
    TD: number;
    Flg: number;
    Name: string | null;
    GeoPt: [number, number] | number[];
  } | null;
  GeoRectangle?: {
    West: number;
    East: number;
    North: number;
    South: number;
  };
  SeqID: number;
  GeoPt: [number, number] | number[];
  TelPref: string | null;
  CountryCodes: {
    tld: string;
    iso3: string;
    iso2: string;
    fips: string;
    isoN: number;
  };
  CountryInfo?: string;
};
