import axios from "axios";

  export const fetchCategory = async (setDataCategory) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/category/category-lists`,
      );
      console.log(response?.data);
      setDataCategory(response?.data);
    } catch (err) {
      console.log(err);
    }
  };