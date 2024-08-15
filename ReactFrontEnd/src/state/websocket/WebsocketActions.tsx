 // import { createAction } from "@reduxjs/toolkit"; FOR EXTRA REDUCERS
 import CommunicationService from "../../util/CommunicationService";
 import { NetworkLocation } from "../../util/NetworkLocation";
 import { ClientBoundMessage , ConnectionState, ServerBoundMessage} from "./WebsocketTypes";
import { AppDispatch } from "../Store";
import { RootState } from "../Store";
import { websocketConnected, websocketConnecting, websocketDisconnected } from "./WebsocketSlice";

 const CHAT_WEBSOCKET_ID = "one"

 // Creating ip address and port for the websocket to connect to
 const WEBSOCKET_LOCATION: NetworkLocation = {
    ip: "127.0.0.1",
    port: 5000
 }

 // PUT EXTRA REDUCERS HERE IF YOU NEED THEM
 // Example: export const alertEventRecieved = createAction<string>("ws/alertEventReceived");

 /**
  * Connects to websocket and updates the state's websocket slice byupdating the connection status
  * 
  * @returns
  */
 export const connectToWebsocket = () =>
 (dispatch: AppDispatch, getState: () => RootState, commService: CommunicationService) => {
    if (getState().ws.status === ConnectionState.None) {
        dispatch(websocketConnecting());
        commService.connect(CHAT_WEBSOCKET_ID, WEBSOCKET_LOCATION, "/api/ws", undefined,
            () => dispatch(websocketConnected()),
            (_, msg) => dispatch(websocketMessageReceived(msg)),
            () => dispatch(websocketDisconnected()), undefined
        );
    }
 };

 /**
  * Takes a received message and dispatches either onResponseReceived or onEventReceived using that message
  * 
  * @param msg (str)
  * @returns 
  */
 const websocketMessageReceived = (msg: ClientBoundMessage) => 
// @ts-ignore
 (dispatch: AppDispatch, getState: () => RootState, _commService: CommunicationService) => {
    if (msg.type === "event") {
        // Example: dispatch(onResponseReceived((msg))); 
        // This is how you would call a reducer from a different slice based on what kind of message was received.
    }
 }

 export const websocketSendMessage = (msg: ServerBoundMessage) => 
 (_dispatch: AppDispatch, getState: () => RootState, commService: CommunicationService) => {
    const state = getState();
    if (state.ws.status !== ConnectionState.Connected) {
        throw new Error("Not connected to websocket");
    }
    commService.sendMessage(CHAT_WEBSOCKET_ID, msg);
 }