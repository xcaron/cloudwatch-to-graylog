import graylog2 = require("graylog2");

import {GRAYLOG_ENDPOINT} from "../Config";

const GRAYLOG_LOGGER = new graylog2.graylog({
    servers: [
        { 'host': GRAYLOG_ENDPOINT, port: 9000 }
    ],
    facility: 'Node.js',     // the facility for these log messages
                             // (optional, default: "Node.js")
});

GRAYLOG_LOGGER.on('error', function (error) {
    console.error('Error while trying to write to graylog2:', error);
});

export function publish(payload: any): void {
    GRAYLOG_LOGGER.log(payload);
}