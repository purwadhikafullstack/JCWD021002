import axios from 'axios';

export const fetchMass = async (setDataMass) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/mass/mass-lists`
        );

        setDataMass(response?.data?.mass)
    } catch (err) {
        console.log(err);
    }
}