import axios from 'axios';

export const fetchPackaging = async (setDataPackaging) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/packaging/packaging-lists`
        );

        setDataPackaging(response?.data?.packaging)
    } catch (err) {
        console.log(err);
    }
}