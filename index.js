import dotenv from 'dotenv';

dotenv.config();

import InboundOSCListener from './OSCHandlers/InboundListener.js';
import OutboundOSCClient from './OSCHandlers/OutboundClient.js';

const { IP_ADDRESS, INBOUND_PORT, OUTBOUND_PORT } = process.env;

// SENDER
const client = new OutboundOSCClient(IP_ADDRESS, OUTBOUND_PORT);

// LISTENER (send via client)
const listener = new InboundOSCListener(client, INBOUND_PORT, IP_ADDRESS);

await listener.listenForArena().then(console.log('listener active'));

// TODO: add a RESTAPI handler for when Arena closes to shut down the server.
