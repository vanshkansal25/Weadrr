import { Button } from "../components/ui/button"
import { RefreshCw } from "lucide-react"
import { useGeoLocation } from "../hooks/useGeoLocation"
import WeatherSkeleton from "../components/WeatherSkeleton";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { Terminal,MapPin } from "lucide-react";
const WeatherDashboard = () => {
  const { coordinates, error, getLocation, isLoading } = useGeoLocation();

  const handleRefresh = () => {
    getLocation()
    if (coordinates) {
      // reload weather data
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
      <Terminal />
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



  return (
    <div>
      {/* Favourite Cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl inter-bold tracking-tight">My Location</h1>
        <Button variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
        // disabled={}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default WeatherDashboard