import { RefreshCw, Terminal, MapPin } from "lucide-react"
import { Button } from "../ui/button"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

type ErrorType = 'location' | 'permission' | 'weather';

interface ErrorAlertProps {
  type: ErrorType;
  error?: string;
  onAction: () => void;
  isLoading?: boolean;
}

const ERROR_CONFIG = {
  location: {
    title: "Location Error",
    defaultMessage: "Failed to get your location",
    buttonText: "Enable Location",
    icon: MapPin,
  },
  permission: {
    title: "Location Required", 
    defaultMessage: "Please Enable location access to see your local weather",
    buttonText: "Enable Location",
    icon: MapPin,
  },
  weather: {
    title: "Error",
    defaultMessage: "Failed to Fetch weather Data. Please try again.",
    buttonText: "Retry", 
    icon: RefreshCw,
  }
} as const;

const ErrorAlert = ({ 
  type, 
  error, 
  onAction, 
  isLoading = false 
}: ErrorAlertProps) => {
  const config = ERROR_CONFIG[type];
  const ButtonIcon = config.icon;
  const message = error || config.defaultMessage;

  return (
    <Alert variant="destructive">
      <Terminal className="h-4 w-4" />
      <AlertTitle>{config.title}</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{message}</p>
        <Button 
          onClick={onAction} 
          variant={"outline"} 
          className="w-fit"
          disabled={isLoading}
        >
          <ButtonIcon className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 
            (type === 'weather' ? 'Retrying...' : 'Getting Location...') : 
            config.buttonText
          }
        </Button>
      </AlertDescription>
    </Alert>
  )
}

export default ErrorAlert