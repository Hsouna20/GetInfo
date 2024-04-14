import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextInput } from 'flowbite-react';

const IPAddressSearch = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [ipInfo, setIpInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3041/api/data?id=${ipAddress}`);
      const { location, geolocation } = response.data;

      if (location && geolocation) {
        setIpInfo({ location, geolocation });
        setError(null);
      } else {
        setError('No IP information found');
        setIpInfo(null);
      }
    } catch (error) {
      console.error('Error fetching IP info:', error);
      setError('Failed to fetch IP information. Please try again.');
      setIpInfo(null);
    }
  };

  const excludedFields = ['_id', 'network_start_integer', 'network_last_integer','geoname_id','locale_code'];

  const renderField = (label, value) => {
    if (
      value !== null &&
      value !== undefined &&
      value !== '' &&
      !excludedFields.includes(label)
    ) {
      return (
        <p key={label}>
          <span className="font-semibold text-red-500">{label}:</span> {value}
        </p>
      );
    }
    return null;
  };

  return (
    <div className="flex items-center mt-16 mb-16">
      <TextInput
        type="text"
        placeholder="x.x.x.x"
        value={ipAddress}
        onChange={(e) => setIpAddress(e.target.value)}
      />
      <Button
        gradientDuoTone="purpleToPink"
        type="button"
        onClick={handleSearch}
        style={{ marginLeft: '0.5rem' }}
      >
        Search
      </Button>

      {error && <p className="text-red-500">{error}</p>}

      {ipInfo && (
        <div className="mt-4" style={{ marginLeft: '3rem' }}>
          {Object.entries(ipInfo.geolocation).map(([key, value]) =>
            renderField(key, value)
          )}
          {Object.entries(ipInfo.location).map(([key, value]) =>
            renderField(key, value)
          )}
        </div>
      )}
    </div>
  );
};

export default IPAddressSearch;
