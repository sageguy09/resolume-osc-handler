import dotenv from 'dotenv';

dotenv.config();

import InboundOSCListener from './OSCHanlders/InboundListener.js';
import OutboundOSCClient from './OSCHanlders/OutboundClient.js';
// /composition - comes from ARENA via  OSC_INBOUND_PORT (as '/composition'), Send to WIRE  with appended '/wire' prefix to RESOLUME_INBOUND_PORT
// /arena - comes from Wire via  OSC_INBOUND_PORT (as '/arena'). Need to remove prefix '/arena' prefix and send to ARENA to RESOLUME_INBOUND_PORT
// /wire - comes from OSC-SCRIPT, need to remove prefix '/wire'

const { IP_ADDRESS, INBOUND_PORT, OUTBOUND_PORT } = process.env;

// SENDER
const client = new OutboundOSCClient(IP_ADDRESS, OUTBOUND_PORT);

// LISTENER (send via client)
const listener = new InboundOSCListener(client, INBOUND_PORT, IP_ADDRESS);

await listener.listenForArena().then(console.log('listener active'));

// TODO: add a RESTAPI handler for when Arena closes to shut down the server.
