import { API_CONFIG } from "./config"
import { Coordinates, ForecastData, WeatherData,GeocodingResponse } from "./types";

class WeatherAPI{
    private createUrl(endpoint:string,params: Record<string,string|number>){
        const searchParams = new URLSearchParams({
            appid:API_CONFIG.API_KEY,
            ...params,
        })
        return `${endpoint}?${searchParams.toString()}`
    }
    private async fetchData<T>(url:string):Promise<T>{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Weather API error:${response.statusText}`)
        }

        return response.json();
    }
    async getCurrentWeather({lat,lon}:Coordinates):Promise<ForecastData>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units : API_CONFIG.DEFAULT_PARAMS.units,
        })

        return this.fetchData<ForecastData>(url)
    }
    async getForecast({lat,lon}:Coordinates):Promise<WeatherData>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units : API_CONFIG.DEFAULT_PARAMS.units,
        })

        return this.fetchData<WeatherData>(url)
    }
    async reverseGeocode({lat,lon}:Coordinates):Promise<GeocodingResponse[]>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/reverse`,{
            lat:lat.toString(),
            lon:lon.toString(),
            limit:1,
        })

        return this.fetchData<GeocodingResponse[]>(url)
    }
    
}

export const weatherAPI = new WeatherAPI();
