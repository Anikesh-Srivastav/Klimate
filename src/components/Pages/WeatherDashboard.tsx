import { RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";
import LoadingSkeleton from "../Loading_Error/Loading-skeleton";
import { 
  useForecastQuery, 
  useReverseGeocodeQuery, 
  useWeatherQuery 
} from "@/hooks/use-weather";
import ErrorAlert from "../Loading_Error/ErrorAlert";
import CurrentWeather from "../UI_Sections/CurrentWeather";
import HourlyTemp from "../UI_Sections/HourlyTemp";
import WeatherDetails from "../UI_Sections/WeatherDetails";
import WeatherForecast from "../UI_Sections/WeatherForecast";
import FavoriteCities from "../UI_Sections/FavoriteCities";
import { useFavorites } from "@/hooks/use-favourite";

const WeatherDashboard = () => {
  // Hooks
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);
  const { favorites } = useFavorites();

  // Handlers
  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      locationQuery.refetch();
      weatherQuery.refetch();
      forecastQuery.refetch();    
    }
  };

  // Loading state
  if (locationLoading) {
    return <LoadingSkeleton />;
  }

  // Error states
  if (locationError) {
    return (
      <ErrorAlert
        type="location"
        error={locationError}
        onAction={getLocation}
        isLoading={locationLoading}
      />
    );
  }

  if (!coordinates) {
    return (
      <ErrorAlert
        type="permission"
        onAction={getLocation}
        isLoading={locationLoading}
      />
    );
  }

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <ErrorAlert
        type="weather"
        error={weatherQuery.error?.message || forecastQuery.error?.message}
        onAction={handleRefresh}
        isLoading={locationLoading || weatherQuery.isFetching || forecastQuery.isFetching}
      />
    );
  }

  // Data loading state
  if (!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton />;
  }

  // Derived data
  const locationName = locationQuery.data?.[0];
  const isRefreshing = weatherQuery.isRefetching || forecastQuery.isRefetching;

  return (
    <div className="space-y-4">
      {/* Favorite Cities */}
      {favorites && favorites.length > 0 && (
        <FavoriteCities />
      )}
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          My Location
        </h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw 
            className={`h-4 w-4 ${weatherQuery.isRefetching ? 'animate-spin' : ''}`}
          />
        </Button>
      </div>
      
      {/* Weather Content */}
      <div className="grid gap-6">
        {/* Current and Hourly Weather */}
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather 
            data={weatherQuery.data} 
            locationName={locationName} 
          />
          <HourlyTemp data={forecastQuery.data} />
        </div>

        {/* Details and Forecast */}
        <div>
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard