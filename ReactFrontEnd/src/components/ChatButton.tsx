import { IconButton, InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send"
import { useState } from "react";

export default function ChatButton() {
    const [text, setText] = useState("");

    // To get a variable from the state use the useAppSelector
    // Example: const messages = useAppSelector(state => state.chat.messages)

    // Define your dispatch here to call reducers from your state slice
    // const dispatch = useAppDispatch()
    const send = () => {
        // Use dispatch here 
        console.log("Send button was pressed")
        setText("");
    }
    return (
        <TextField multiline label="Chat Box" variant="outlined"
        maxRows={3} sx={{border: "ButtonShadow"}}
        value={text} onChange={(evt) => {
            setText(evt.target.value);
        }}
        onKeyDown={(evt) => {
            if (evt.key === "Enter" && !evt.shiftKey) {
                evt.preventDefault();
                send();
            }
        }}
        InputProps={{
            endAdornment: (<InputAdornment position="end">
                <IconButton type="submit"
                aria-label="toggle password visiblity"
                onClick={send}
                edge='end'>
                    <SendIcon/>
                </IconButton>
            </InputAdornment>)
        }}/>
        
        
    );
}