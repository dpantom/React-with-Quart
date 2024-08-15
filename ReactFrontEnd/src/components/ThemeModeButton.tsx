import { Box, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import { useAppDispatch, useAppSelector } from "../state/Hooks";
import { setMode } from "../state/theme/ThemeSlice";

/**
 * A component that allows the user to toggle between light and dark mode
 */
export default function ThemeModeButton() {
    const mode = useAppSelector(state => state.theme.mode);
    const dispatch = useAppDispatch();

    return (
        <Box sx={{display: "flex", alignItems: "center"}}>
            <IconButton onClick={() => dispatch(setMode(mode == "light" ? "dark" : "light"))}>
                {mode === "light" ? <LightModeIcon/> : <DarkModeIcon />}
            </IconButton>
        </Box>
    );
}