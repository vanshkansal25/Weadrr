import { Button } from "../components/ui/button"
import { RefreshCw } from "lucide-react"
import { useGeoLocation } from "../hooks/useGeoLocation"
import WeatherSkeleton from "../components/WeatherSkeleton";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { Terminal,MapPin } from "lucide-react";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "../hooks/useWeather";
import CurrentWeather from "../components/CurrentWeather";
import HourlyTemperature from "../components/HourlyTemperature";
const WeatherDashboard = () => {
  const { coordinates, error, getLocation, isLoading } = useGeoLocation();
  const locationQuery = useReverseGeocodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);


  const handleRefresh = () => {
    getLocation()
    if (coordinates) {
       weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  }

  if (isLoading) {
    return <WeatherSkeleton />
  }
  if (error) {
    return <Alert variant="destructive">
      <Terminal />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{error}</p>
        <Button onClick={getLocation} variant={"outline"} className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
            Enable Location
        </Button>
      </AlertDescription>
    </Alert>
  }
  if (!coordinates) {
    return <Alert variant="destructive">
      
      <AlertTitle>Location Required</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Please enable location access to see your local weather.</p>
        <Button onClick={getLocation} variant={"outline"} className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
            Enable Location
        </Button>
      </AlertDescription>
    </Alert>
  }
   const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <Terminal />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
          <Button variant="outline" onClick={handleRefresh} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }


  return (
    <div className="space-y-4">
      {/* Favourite Cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl inter-bold tracking-tight">My Location</h1>
        <Button variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`} />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
        </div>
      </div>
    </div>
  )
}

export default WeatherDashboard