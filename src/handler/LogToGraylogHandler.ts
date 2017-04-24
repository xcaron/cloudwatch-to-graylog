import zlib = require('zlib');

import GraylogPublisher = require('../graylog/GraylogPublisher');

export function handler(input: any, context: any, callback: any) {

    let payload = new Buffer(input.awslogs.data, 'base64');

    zlib.gunzip(payload, function(e, result) {
        if (e) {
            console.error("Error while unzipping payload:", e);
            callback(e);
        } else {
            result = JSON.parse(result.toString('ascii'));

            console.log("Event Data:", JSON.stringify(result, null, 2));
            GraylogPublisher.publish(result);

            callback();
        }
    });
}