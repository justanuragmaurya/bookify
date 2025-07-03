import { createContext } from "react";

enum NavbarState{
    "visble",
    "hidden"
}

const NavbarContext = createContext(NavbarState.visble);

export const ContextProvider  = NavbarContext.Provider