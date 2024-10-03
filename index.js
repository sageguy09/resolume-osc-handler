import dotenv from 'dotenv';

dotenv.config();

import InboundOSCListener from './OSCHandlers/InboundListener.js';
import OutboundOSCClient from './OSCHandlers/OutboundClient.js';

const { IP_ADDRESS, INBOUND_PORT, OUTBOUND_PORT } = process.env;
const outboundPort = Number(OUTBOUND_PORT);
const inboundPort = Number(INBOUND_PORT);

// SENDER
const client = new OutboundOSCClient(IP_ADDRESS, outboundPort);

// LISTENER (send via client)
const listener = new InboundOSCListener(
    client,
    inboundPort,
    IP_ADDRESS
);

await listener.listenForArena().then(console.log('listener active'));

// TODO: add a RESTAPI handler for when Arena closes to shut down the server.
