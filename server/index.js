const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const GeolocationCity = require('./model/adress'); // Assuming your GeoLite2City model is defined in adress.js
const GeoLite2City = require('./model/cityinfo');

const app = express();
const PORT = process.env.PORT || 3041;
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/SearchCityInfo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDb is connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Define routes
app.get('/api/data', async (req, res) => {
    const id = req.query.id;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing IP address parameter (id)' });
    }

    console.log('Requested geoname ID:', id); // Log the requested geoname ID

    try {
        const ipNumber = ipToNumber(id); // Convert input IP address to numerical representation
console.log(ipNumber);
        const location = await GeoLite2City.findOne({
            network_start_integer: { $lte: ipNumber },
            network_last_integer: { $gte: ipNumber }
        });

        if (location) {
            const geonameId = location.geoname_id;

            const geolocationInfo = await GeolocationCity.findOne({ geoname_id: geonameId });

            if (geolocationInfo) {
                res.json({ location, geolocation: geolocationInfo });
            } else {
                res.json({ result: 'No geolocation information found for this geoname_id.' });
            }
        } else {
            console.log('No information found for geoname ID:', id);
            res.status(404).json({ error: 'No information found for this geoname ID.' });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Function to convert IP address to numerical representation
function ipToNumber(id) {
    return id.split('.').reduce((acc, octet, index) => acc + parseInt(octet) * Math.pow(256, 3 - index), 0);
}


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
