import dotenv from 'dotenv';
dotenv.config('../');

import { Server } from 'node-osc';

const inboundPrefix = process.env.INBOUND_PREFIX ?? '/wire';
const outboundPrefix = process.env.OUTBOUND_PREFIX ?? '/arena';
const compPrefix = process.env.COMPOSITION_PREFIX ?? '/composition';
const compPrefixLength = compPrefix.length;

export default class InboundOSCListener {
    constructor(outboundClient, port = 3333, ipAddress = '127.0.0.1') {
        this.outboundClient = outboundClient;
        this.server = new Server(port, ipAddress);
    }

    async listen() {
        this.server.on('message', (msg) => {
            console.log(`Message: ${msg}`);
            this.server.close();
        });
    }

    async listenForArena() {
        this.server.on('bundle', (bundle) => {
            bundle.elements.forEach((element) => {
                const [address, msgValue] = element;
                const oscAddress = address;
                const compString = address;

                let sendObj = { address, sendAddress: '', msgValue };
                if (oscAddress.slice(0, compPrefixLength) === compPrefix) {
                    // FROM ARENA TO WIRE - /composition address string
                    // composition/... > /wire/composition/...
                    sendObj = {
                        ...sendObj,
                        sendAddress: inboundPrefix + address,
                    };
                    console.log(
                        `Sending From Arena/Avenue to Wire: ${address}`
                    );
                } else if (
                    compString.slice(0, outboundPrefix.length).length ===
                    outboundPrefix.length
                ) {
                    // FROM WIRE TO ARENA - outboundPrefix + address
                    // /arena/composition/... > /composition
                    sendObj = {
                        ...sendObj,
                        sendAddress: address.slice(outboundPrefix.length),
                    };
                    console.log(
                        `Sending From Wire to Arena/Avenue: ${address}`
                    );
                }
                try {
                    this.outboundClient.send(
                        sendObj.sendAddress,
                        sendObj.msgValue
                    );
                } catch (err) {
                    console.log({
                        message: 'Error Occurred Processing Message',
                        sendObj,
                        err,
                    });
                }
                return;
            });
        });
    }
}
