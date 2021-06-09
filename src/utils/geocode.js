const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2UxMCIsImEiOiJja3BoNXV6ZDYwOXNzMm5wbTYwZXRianE4In0.UWqJX6DvyjmC5fXxlOxMWA&limit=1`;

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location! Try again with different search parameter.', undefined);
        } else {
            const features = body.features[0];
            const latitude = features.center[1];
            const longitude = features.center[0];
            const place_name = features.place_name;

            callback(undefined, {
                latitude,
                longitude,
                location: place_name
            });
        }
    });
};

module.exports = geocode;