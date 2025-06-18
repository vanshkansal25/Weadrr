import { useEffect, useState } from "react";
import type { Coordinates } from "../../api/types";

interface GeolocationState {
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;
}
export function useGeoLocation() {
    const [locationData, setlocationData] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        isLoading: true,
    })

    const getLocation = () => {
        setlocationData((prev) => ({ ...prev, isLoading: true, error: null }))

        // for accessing the user current location if not access granted throw error
        if (!navigator.geolocation) {
            setlocationData({
                coordinates: null,
                error: "GeoLocation is not supported by your browser",
                isLoading: false
            })
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            setlocationData({
                coordinates: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                error: null,
                isLoading: false,
            })
        }, (error) => {
            let errorMessage: string;

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage =
                        "Location permission denied. Please enable location access.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    errorMessage = "Location request timed out.";
                    break;
                default:
                    errorMessage = "An unknown error occurred.";
            }
            setlocationData({
                coordinates: null,
                error: errorMessage,
                isLoading: false,
            })
        },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            })
    }


    useEffect(() => {
        getLocation()
    }, [])

    return {
        ...locationData,
        getLocation // for the refresh button to get the current location
    }
}