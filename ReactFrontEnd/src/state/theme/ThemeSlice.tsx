/* External Imports */
import { PaletteMode } from "@mui/material"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const THEME_MODE_KEY = "themeMode";

type ThemeState = {
    mode: PaletteMode;
};

/**
 * Controls the state and application logic for the current theming
 */
export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        mode: localStorage.getItem(THEME_MODE_KEY) ?? "light"
    } as ThemeState,
    reducers: {
        /**
         * Sets the current theme mode
         */
        setMode: (state, action: PayloadAction<PaletteMode>) => {
            state.mode = action.payload;
            localStorage.setItem(THEME_MODE_KEY, action.payload)
        }
    }
});

export const { setMode } = themeSlice.actions
const themeReducer = themeSlice.reducer;
export default themeReducer;