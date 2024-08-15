import { NetworkLocation, networkLocationToString } from "./NetworkLocation";

export type WSId = string | number;

/**
 * A service for managing websocket connections. Used as the extra parameter for thunks.
 */
export default class CommunicationService {
    websockets: { [id: WSId]: WebSocket};

    constructor() {
        this.websockets = {}
    }

    /**
     * Creates a websocket connection
     * @param wsID the identifier for this connection
     * @param location the location of the server 
     * @param endpoin the endpoint to connect to
     * @param urlParameters any URL parameters that should be used
     * @param onConnect callback when connection established
     * @param onMessage callback when message received
     * @param onClose callback when connection closed
     * @param onError callback when connection errors
     */
    connect<T>(wsId: string | number,
        location: NetworkLocation,
        endpoint: string,
        urlParameters?: T,
        onConnect: ((wsId: WSId) => void) | null = null,
        onMessage: ((wsId: WSId, msg: any) => void) | null = null,
        onClose: ((wsId: WSId) => void) | null = null,
        onError: ((wsId: WSId, evt: Event) => void) | null = null
    ) {
        if (wsId in this.websockets) {
            throw Error("Websocket Already Exists");
        }

        let wsUrl: string = networkLocationToString(location, "ws", endpoint);
        if (urlParameters !== undefined) {
            wsUrl += "?" + new URLSearchParams(urlParameters as any).toString();
        }

        const ws = new WebSocket(wsUrl)

        this.websockets[wsId] = ws

        if (onConnect) {
            ws.addEventListener('open', onConnect.bind(this, wsId))
        }

        if (onMessage) {
            ws.addEventListener('message', (evt) => {
                console.log(evt.data)
                onMessage(wsId, JSON.parse(evt.data as any));
            });
        }

        if (onError) {
            ws.addEventListener('close', onError.bind(this, wsId));
        }

        if (onClose) {
            ws.addEventListener('close', onClose.bind(this, wsId));
        }
    }

    /**
     * Sends a message on a websocket.
     * @param wsId the identifier of the websocket to use
     * @param msg the message to send
     */
    sendMessage<T>(wsId: WSId, msg: T) {
        if (!(wsId in this.websockets)) {
            throw Error("Websocket Does Not Exist");
        }

        this.websockets[wsId].send(JSON.stringify(msg));
    }

    /**
     * Closes a websocket connection
     * @param wsId the identifier of the websocket to close
     */
    close(wsId: WSId) {
        if (!(wsId in this.websockets)) {
            throw Error("Websocket Does Not Exist");
        }

        const ws = this.websockets[wsId];
        ws.close();

        delete this.websockets[wsId];
    }

    /**
     * Closes all active websocket connetions.
     */
    closeAll() {
        for (const id in this.websockets) {
            this.websockets[id].close();
            delete this.websockets[id];
        }
    }
}