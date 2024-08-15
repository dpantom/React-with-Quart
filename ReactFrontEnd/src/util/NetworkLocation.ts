/**
 * Represents a network location.
 */
export type NetworkLocation = {
    ip: string;
    port: number;
};

/**
 * Converts a network location to a string
 * @param loc the network location
 * @param protocol the protocol (i.e "http")
 * @param endpoint the endpoint (i.e. "/create")
 * @returns a string of the network location
 */
export function networkLocationToString(loc: NetworkLocation, protocol?: string, endpoint?: string, args?: {[arg: string]: any}){
    let argString: string | undefined = undefined;
    if (args) {
        argString = (new URLSearchParams(args)).toString();
    }

    return (protocol ? protocol + "://" : "") + loc.ip + ":" + loc.port + (endpoint ?? "") + (argString ? "?" +argString : "");
}