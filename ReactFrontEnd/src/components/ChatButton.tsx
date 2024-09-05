import { IconButton, InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send"
import { useState } from "react";
import { useAppDispatch } from "../state/Hooks";
import { websocketSendMessage } from "../state/websocket/WebsocketActions";
import { ServerBoundMessage } from "../state/websocket/WebsocketTypes"

export default function ChatButton() {
    const [text, setText] = useState("");
    const dispatch = useAppDispatch();

    // To get a variable from the state use the useAppSelector
    // Example: const messages = useAppSelector(state => state.chat.messages)

    // Define your dispatch here to call reducers from your state slice
    // const dispatch = useAppDispatch()
    const send = (msg: string) => {
        if (msg.trim() !== "") {
            console.log("Send button was pressed");
            let message: ServerBoundMessage = {
                'type': 'event',
                'task': 'message',
                'description': msg
            }
            dispatch(websocketSendMessage(message));  // Sending the message
            setText("");  // Clear the input field after sending
        }
    }
    return (
        <TextField 
            multiline 
            label="Chat Box" 
            variant="outlined"
            maxRows={3} 
            sx={{border: "ButtonShadow"}}
            value={text} 
            onChange={(evt) => setText(evt.target.value)}
            onKeyDown={(evt) => {
                if (evt.key === "Enter" && !evt.shiftKey) {
                    evt.preventDefault();
                    send(text);
                    console.log("Enter button was pressed")
                }
            }}
        InputProps={{
            endAdornment: (<InputAdornment position="end">
                <IconButton 
                    type="submit"
                    aria-label="toggle password visiblity"
                    onClick={() => send(text)}
                    edge='end'>
                    <SendIcon/>
                </IconButton>
            </InputAdornment>)
        }}/>
        
        
    );
}