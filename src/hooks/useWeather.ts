import { useQuery } from "@tanstack/react-query";
import type { Coordinates } from "../../api/types";
import { weatherAPI } from "../../api/weather";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["weather", coords] as const,
  location: (coords: Coordinates) => ["weather", coords] as const,
};

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }), // used for caching like how much time it will last
    queryFn: () =>
      coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
      enabled: !!coordinates, // will only work if we have data
  });
}
export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }), // used for caching like how much time it will last
    queryFn: () =>
      coordinates ? weatherAPI.getForecast(coordinates) : null,
      enabled: !!coordinates, // will only work if we have data
  });
}
export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }), // used for caching like how much time it will last
    queryFn: () =>
      coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
      enabled: !!coordinates, // will only work if we have data
  });
}
