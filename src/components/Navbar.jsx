import { Book, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  // State to manage theme, default = "dark"
  const [theme, setTheme] = useState("dark");

  // On first load, check if a theme is saved in localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme); // apply stored theme if found
    }
  }, []);

  // Whenever theme changes:
  // 1. Update <html data-theme="..."> (required by DaisyUI)
  // 2. Save the theme in localStorage for persistence
  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
      backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            {/* App logo icon */}
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Book className="w-5 h-5 text-primary" />
            </div>
            {/* App title */}
            <h1 className="text-lg font-bold">Book Finder</h1>
            {/* Example badge for user */}
            <div className="badge badge-soft badge-secondary badge-xs">Alex</div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle"
            >
              {/* If current theme is "light", show Moon (to switch to dark) */}
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                // If current theme is "dark", show Sun (to switch to light)
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
