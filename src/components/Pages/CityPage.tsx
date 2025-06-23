import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { useParams, useSearchParams } from "react-router-dom"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertTriangle } from "lucide-react";
import LoadingSkeleton from "../Loading_Error/Loading-skeleton";
import CurrentWeather from "../UI_Sections/CurrentWeather";
import HourlyTemp from "../UI_Sections/HourlyTemp";
import WeatherDetails from "../UI_Sections/WeatherDetails";



const CityPage = () => {

  const [searchParams] = useSearchParams();
  const params = useParams()
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");


  const coordinates = {lat, lon};

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant='destructive'>
        <AlertTriangle className="h-4 w-4"/>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
            Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    )
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <LoadingSkeleton />
  }
  return (
    <div className="space-y-4"> 
      {/* Favourite cites */}
      <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">My Location</h1>
      </div>
      
      {/* Currently and Hourly Weather */}
      <div className='grid gap-6'>
        <div className='flex flex-col gap-4'>
          {/* current Weather */}
          <CurrentWeather 
          data = {weatherQuery.data} />
          {/* Hourly Temp */}
          <HourlyTemp
           data={forecastQuery.data} 
           />
            
        </div>

        <div>
          {/* details */}
          <WeatherDetails data={weatherQuery.data} />
          {/* forecast */}
          {/* <WeatherForecast  data={forecastQuery.data}/> */}
        </div>
      </div>
    </div>
  )
}

export default CityPage