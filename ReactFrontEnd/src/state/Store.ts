import { useAppDispatch } from './Hooks';
import { configureStore } from "@reduxjs/toolkit";
import CommunicationService from "../util/CommunicationService";

export const store = configureStore({
    reducer: {

    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
        thunk: {
            extraArgument: new CommunicationService
        }
    })
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;