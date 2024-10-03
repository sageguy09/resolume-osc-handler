# resolume-osc-handler
A simple node.js app written with [node-osc](https://github.com/MylesBorins/node-osc) to handle OSC Address strings for messages sent between Resolume Arena/Avenue and Resolume Wire.

Problem: When loading a Resolume Wire patch that sends and receives messages for Resolume Arena/Avenue cannot be handle messages when the patch is loaded into Arena/Avenue. 


Solution(as of this commit): In order to achieve this, you must use prefixes appended to the OSC address via middleware and/or the Wire patch that can differentiate between the addresses and send to the correct intended receiver.

## Pre Setup
See `.sample.env` for default parameter values:

```
# Inbound from Arena to Wire Prefix for Sending to Wire
INBOUND_PREFIX=/wire
# Outbound Wire to Arena Prefix for messages sent From Wire
OUTBOUND_PREFIX=/arena
# /composition string prefix as sent from Arena by default
COMPOSITION_PREFIX=/composition
RESOLUME_INBOUND_PORT=8338
RESOLUME_OUTBOUND_PORT=8000
```

### Wire READ / WRITE OSC NODES
All READ addresses should have the `INBOUND_PREFIX` from `./sample.env` prefixed 

All Outbound addresses should have the `OUTBOUND_PREFIX` from `./sample.env` prefixed

*TIP*: Use the `concatenate` node to add a new prefix to existing projects for easier transition to using this handler

### Resolume Arena/Avenue
Set Inbound and Outbound ports to match those set in `.env` or to match default values
From root directory run the following from `shell`:
```shell
cp ./.sample.env .env
```
Overwrite any values based on your project needs

## Start Server
`npm:`
```shell
npm install && npm start
```

`yarn:`
```shell
yarn && yarn start
```




