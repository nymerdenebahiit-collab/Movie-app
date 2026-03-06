"use client";

import GenreList from "./GenreList";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Genre() {
  return (
    <div className="relative">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="w-[90px] h-[38px] flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 relative z-50">
              Genre
            </NavigationMenuTrigger>

            <NavigationMenuContent className="absolute mt-2 w-[280px] p-4 rounded-lg border border-gray-200 bg-white shadow-md z-50">
              <NavigationMenuLink>
                <GenreList />
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Genre;
