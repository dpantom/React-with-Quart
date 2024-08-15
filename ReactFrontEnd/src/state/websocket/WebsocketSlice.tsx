import { createSlice } from "@reduxjs/toolkit";
import { ConnectionState, WebsocketState } from "./WebsocketTypes";

const initialState: WebsocketState = {
    status: ConnectionState.None
};

const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        /**
         * Reducer function thaty sets the connections status to connecting
         * 
         * @param state (WebsocketState)
         */
        websocketConnecting: (state) => {
            state.status = ConnectionState.Connecting;
        },

        /**
         * Reducer function thaty sets the connections status to connecting
         * 
         * @param state (WebsocketState)
         */
        websocketConnected: (state) => {
            state.status = ConnectionState.Connected;
        },

        /**
         * Reducer function thaty sets the connections status to connecting
         * 
         * @param state (WebsocketState)
         */
        websocketDisconnected: (state) => {
            state.status = ConnectionState.None;
        }
    }
})

export const { websocketConnecting, websocketConnected, websocketDisconnected } = websocketSlice.actions;
export default websocketSlice.reducer;