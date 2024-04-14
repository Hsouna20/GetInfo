const mongoose = require('mongoose');

const GeoLite2CitySchema = new mongoose.Schema({
    network: {
        type: String ,
        required: true
    },
    geoname_id: {
        type: Number,
        required: true
    },
    registered_country_geoname_id: {
        type: Number
    },
    is_anonymous_proxy: {
        type: Number
    },
    is_satellite_provider: {
        type: Number
    },
    postal_code: {
        type: String
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    accuracy_radius: {
        type: Number
    },
   
});

const GeoLite2City = mongoose.model('adresses', GeoLite2CitySchema);

module.exports = GeoLite2City;
