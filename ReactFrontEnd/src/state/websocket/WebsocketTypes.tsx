/**
 * Creating types that are used in the websocket slice
 */

// Enum type that refers to the different connection status values
export enum ConnectionState {
    None, Connecting, Connected
}

export type WebsocketState = {
    status: ConnectionState;
}