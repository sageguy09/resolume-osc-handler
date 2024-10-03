import { Client } from 'node-osc';

export default class OutboundOSCClient {
    constructor(ipAddress = '127.0.0.1', port = 8330) {
        this.client = new Client(ipAddress, port);
    }
    async send(address, message) {
        if (!!message) {
            console.log('sending with param...');
            await this.client.send(address, message, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        } else {
            // TODO: add second param to wire to arena messages to flag wether to set this param to 0j
            // NOTE: Wire patch is sending values of 1 for 'clip/#/select' messages
            //  node-osc does not support null or undefined as a message value, so manually adding one here
            console.log('sending without param...');
            await this.client.send(address, 0, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
    }
}
