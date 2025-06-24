import { useTheme } from "@/context/theme-provider";
import { Moon, Sun, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import CitySearch from "../UI_Sections/CitySearch";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-g bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/30">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-2 sm:gap-4">
        
        {/* Logo */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "opacity-100"
              : "opacity-90 hover:opacity-100 transition-opacity"
          }
        >
          <img
            src={theme === "dark" ? "/logo.png" : "/logo2.png"}
            alt="Klimate logo"
            className="h-14"
          />
        </NavLink>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Desktop Search */}
          <div className="hidden sm:block">
            <CitySearch />
          </div>

          {/* Mobile Search Drawer */}
          <div className="block sm:hidden">
            <Drawer>
              <DrawerTrigger>
                <Search className="w-6 h-6 text-muted-foreground" />
              </DrawerTrigger>
              <DrawerContent className="p-4">
                <h2 className="text-lg font-semibold mb-2">Search City</h2>
                <CitySearch />
              </DrawerContent>
            </Drawer>
          </div>

          {/* Theme Toggle */}
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`cursor-pointer transition-transform duration-500 ${
              isDark ? "rotate-180" : "rotate-0"
            }`}
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-500" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
