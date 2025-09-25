// Interface for a single weather data entry
export interface WeatherDataEntry {
  date: string;      // "2020-01-01 00:00:00" <-- Date & time (string)
  tavg: number;      // 7.9 <-- Average temperature (°C)
  tmin: number;      // 4.9 <-- Minimum temperature (°C)
  tmax: number;      // 13.4 <-- Maximum temperature (°C)
  prcp: number;      // 0 <-- Precipitation, mm (0 means no rain)
  snow: number | null; // null <-- Snowfall, mm (null means no data)
  wdir: number | null; // null <-- Wind direction, degrees (null means no data)
  wspd: number;      // 12.2 <-- Wind speed, km/h
  wpgt: number;      // 31.5 <-- Wind gust, km/h
  pres: number;      // 1032.1 <-- Pressure, hPa
  tsun: number | null; // null <-- Sunshine duration (hours, null means no data)
}

// Interface for the root object
export interface WeatherApiResponse {
  meta: {
    generated: string; // "2025-09-24 09:14:52" <-- When the data was generated
  };
  data: WeatherDataEntry[]; // Array of weather entries
}