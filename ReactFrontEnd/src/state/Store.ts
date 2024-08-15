import { configureStore } from "@reduxjs/toolkit";
import CommunicationService from "../util/CommunicationService";
import websocketReducer from './websocket/WebsocketSlice';

export const store = configureStore({
    reducer: {
        ws: websocketReducer,
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
        thunk: {
            extraArgument: new CommunicationService
        }
    })
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;