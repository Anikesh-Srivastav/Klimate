import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom"
import CitySearch from "../UI_Sections/CitySearch";


const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    
<header className="sticky top-0 z-50 w-full border-g bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/30">
      {/*Logo*/}
  <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <NavLink 
        to="/"
        className={({ isActive }) => 
          isActive ? "opacity-100" : "opacity-90 hover:opacity-100 transition-opacity"
        }
      >
        <img
          src={theme === "dark" ? "/logo.png" : "/logo2.png"}
          alt="Klimate logo"
          className="h-14"
        />
      </NavLink>
        <div className="flex gap-4">
            {/*Search*/}
            <CitySearch/>
            {/*Theme Toggle*/}
            <div onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`flex items-center cursor-pointer transition-transform duration-500
                ${isDark ? 'rotate-180' : 'rotate-0'}
                `}
              >
               {isDark ? (
                <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
               ) : (
                <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
               )} 
            </div>
          </div>
    </div>
</header>
  )
}

export default Header