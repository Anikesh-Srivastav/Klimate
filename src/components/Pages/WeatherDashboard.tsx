import {RefreshCw} from "lucide-react"
import { Button } from "../ui/button"
import { useGeolocation } from "@/hooks/use-geolocation"
import LoadingSkeleton from "../Loading_Error/Loading-skeleton"
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather"
import ErrorAlert from "../Loading_Error/ErrorAlert"
import CurrentWeather from "../UI_Sections/CurrentWeather"
import HourlyTemp from "../UI_Sections/Hourly-Temp"


const WeatherDashboard = () => {

  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation
    } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  console.log("Weather Query:", weatherQuery);
console.log("Forecast Query:", forecastQuery);
console.log("Location Query:", locationQuery);

  



  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      locationQuery.refetch();
      weatherQuery.refetch();
      forecastQuery.refetch();    
  }
}
//! ERROR HANDLING ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //Loading state
  if(locationLoading) {
    return <LoadingSkeleton/>
  }

 // Location error state
 if(locationError) {
  return (
    <ErrorAlert
      type="location"
      error={locationError}
      onAction={getLocation}
      isLoading={locationLoading}
    />
  )
}

// Permission error state  
if(!coordinates) {
  return (
    <ErrorAlert
      type="permission"
      onAction={getLocation}
      isLoading={locationLoading}
    />
  )
}

// Weather error state
if(weatherQuery.error || forecastQuery.error) {
  return (
    <ErrorAlert
      type="weather"
      error={weatherQuery.error?.message || forecastQuery.error?.message}
      onAction={handleRefresh}
      isLoading={locationLoading || weatherQuery.isFetching || forecastQuery.isFetching}
    />
  )
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Soft Landing 
if(!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton />
  }

  const locationName = locationQuery.data?.[0];



  return (
    <div className="space-y-4"> 
      {/* Favourite cites */}
      <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">My Location</h1>
          <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          //disabled={}
          
          >
            <RefreshCw className={`h-4 w-4 ${weatherQuery.isRefetching ? 'animate-spin' : ''}`}/>
          </Button>
      </div>
      
      {/* Currently and Hourly Weather */}
      <div className='grid gap-6'>
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* current Weather */}
          <CurrentWeather 
          data = {weatherQuery.data} 
          locationName = {locationName} />
          {/* Hourly Temp */}
          <HourlyTemp
           data={forecastQuery.data} 
           />
            
        </div>

        <div>
          {/* details */}
          {/* forecast */}
        </div>
      </div>
    </div>
  )
}

export default WeatherDashboard