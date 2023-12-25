import axios from "axios";
import { useState } from "react";

export const useGeolocation = () => {
  const  [ city, setCity ] = useState()
  const  [ province, setProvince ] = useState()

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        let city;
        let province;
        try {
          // Use reverse geocoding to get city and province
          const apiKey = 'daad74fef9a148b89b2ed35a0a7ab882';
          const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}`);
          
          city = response.data.results[0].components.city;
          province = response.data.results[0].components.state;

          setCity(city)
          setProvince(province)
          // console.log(`City: ${city}, Province: ${province}`);
        } catch (error) {
          console.error('Error getting city and province:', error.message);
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            console.error('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            console.error('The request to get user location timed out.');
            break;
          case error.UNKNOWN_ERROR:
            console.error('An unknown error occurred.');
            break;
          default:
            console.error('An error occurred:', error.message);
        }
      }
    );
    return { city, province }
  } else {
    console.log('Geolocation is not supported by your browser.');
  }
}
