const mongoose = require('mongoose');

// Define schema for the database
const geolocationSchema = new mongoose.Schema({
    geoname_id: { type: Number, required: true },
    locale_code: { type: String},
    continent_code: { type: String},
    continent_name: { type: String },
    country_iso_code: { type: String },
    country_name: { type: String },
    subdivision_1_iso_code: { type: mongoose.Schema.Types.Mixed },
    subdivision_1_name: { type: String },
    subdivision_2_iso_code: { type: mongoose.Schema.Types.Mixed },
    subdivision_2_name: { type: String },
    city_name: { type: String },
    metro_code: { type: Number },
    time_zone: { type: String },
    is_in_european_union: { type: Number}
});

// Create a model based on the schema
const GeolocationCity = mongoose.model('information', geolocationSchema);

module.exports = GeolocationCity;
