import axios from "axios";

export const fetchStore = async (setDataStore) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/get-all-store`,
      );

      setDataStore(response?.data);
    } catch (err) {
      console.log(err);
    }
  };