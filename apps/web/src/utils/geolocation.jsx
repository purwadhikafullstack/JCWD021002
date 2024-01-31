/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../redux/reducer/addressReducer';

export const Location = ({ children }) => {
  const dispatch = useDispatch();

  const location = useSelector((state) => state.addressReducer.address);

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            let city;
            try {
              // Use reverse geocoding to get city
              const apiKey = 'daad74fef9a148b89b2ed35a0a7ab882';
              const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}`,
              );

              city =
                response.data.results[0].components.city ||
                response.data.results[0].components.county;

              const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/city/getCity?cityName=${city}`,
              );

              const dataLocation = res?.data?.data[0];
              if (!location.id) {
                dispatch(
                  setAddress({
                    city_idcity: dataLocation?.id,
                    postalCode: dataLocation?.postalCode,
                    recipientNames: '',
                    recipientsMobileNumber: '',
                    addressLabel: '',
                    addressDetail: '',
                    isMain: '',
                    latitude: latitude,
                    longitude: longitude,
                    City: {
                      city: city,
                      Province: { province: dataLocation?.Province?.province },
                    },
                  }),
                );
              }
            } catch (error) {
              console.error('Error getting city:', error.message);
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
          },
        );
      } else {
        console.log('Geolocation is not supported by your browser.');
      }
    };

    getLocation();
  }, [dispatch]);

  return <>{children}</>;
};
