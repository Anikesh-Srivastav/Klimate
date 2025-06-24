import { useFavorites } from "@/hooks/use-favourite"
import type { WeatherData } from "@/api/types";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavoriteButtonProps {
    data: WeatherData;
  }

const FavoriteButton = ({data}: FavoriteButtonProps) => {

   const {addToFavorites, isFavorite, removeFavorites} = useFavorites();
   const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

   const handleToggle = () => {
    if (isCurrentlyFavorite) {
        removeFavorites.mutate(`${data.coord.lat}-${data.coord.lon}`);
        toast.error(`Removed ${data.name} from Favorites`)
    }else{
        addToFavorites.mutate({
            name: data.name,
            lat: data.coord.lat,
            lon: data.coord.lon,
            country: data.sys.country,
        });
        toast.success(`Added ${data.name} from Favorites`);
    }
   }



  return (
    <Button
    variant={isCurrentlyFavorite ? 'default' : 'outline'}
    size={'icon'}
    onClick={handleToggle}
    className={isCurrentlyFavorite ? 'bg-yellow-500 hover:bg-yellow-500' : ''}
    >
        <Star
            className={`h-4 w-4 ${isCurrentlyFavorite ? 'fill-current' : ''}`}
        />
    </Button>
  )
}

export default FavoriteButton