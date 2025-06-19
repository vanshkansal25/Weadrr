# 🌦️ Weadrr - Weather Dashboard

![Screenshot](./public/Screenshot%20(102).png)  
*Modern weather app with real-time updates, charts, and a polished UI*

---

## 📖 Overview

**Weadrr** is a modern, responsive weather dashboard built using **React**, **TypeScript**,**TanStack Query** and a suite of powerful libraries to provide a seamless and insightful weather tracking experience. From real-time data fetching to beautifully animated UI components, Weadrr brings a refined weather website to your fingertips.

---

## 🚀 Features

- 🌍 **Real-time weather** data for any location worldwide  
- ⭐ Manage your **favorite cities** with ease  
- 🕓 Track **search history** to revisit past lookups  
- 📊 **Interactive charts** for hourly and weekly forecasts  
- 📱 **Fully responsive** design for all devices  

---

## 🛠 Tech Stack

### 🧩 Core Technologies
- **React** (Vite) – Fast, modular frontend framework  
- **TypeScript** – Strict typing and developer confidence  
- **TanStack Query v5** – Declarative data fetching and state management  
- **shadcn/ui** – Accessible, beautiful UI components  
- **Recharts** – Clean and interactive data visualizations  

### 🔗 APIs Used
- [OpenWeatherMap API](https://openweathermap.org/api) – Real-time weather and forecasts  


---

## 🔑 Key Features

### 1. 📡 Intelligent Data Fetching (TanStack Query)

- Caching for weather data freshness  
- Optimistic updates when favoriting cities  
- Automatic deduplication of API calls  
- Retry logic for failed fetches  

```ts
export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
  });
}
```

---

### 2. 🧠 Fully Typed with TypeScript

- Strict typing for API responses  
- Type-safe event handlers and utilities  
- Reusable generic components  

```ts
export interface WeatherData {
  coord: Coordinates;
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  name: string;
  dt: number;
}
```

---

### 3. 📈 Forecast Charts with Recharts

- Hourly temperature fluctuations  
- 5-day forecast trends  
- Interactive tooltips & responsive design  

---

### 4. 🎨 UI/UX with shadcn/ui

- Accessible, themed components  
- Dark/light mode toggle  
- Form optimizations and animated transitions  

---

## 📁 Project Structure

```
├── api          # API service definitions
/src
├── components   # Reusable UI components
├── context      # Theme Provider
├── hooks        # Custom React hooks
└── lib          # For utils
├── pages        # Main route views
├── types        # Global TypeScript types
```
---

> **Note:** This project was bootstrapped with **Vite**. Huge thanks to [OpenWeatherMap](https://openweathermap.org/) for providing robust free APIs.
