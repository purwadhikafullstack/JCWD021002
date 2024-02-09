import axios from "axios";

export const fetchData = async (id, setData, setName, setDescription, setPrice, setMassProduct, setMassId, setPackagingId, setStatus) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/product-detail-v2/${id}`
      );
      setData(response?.data);
      setName(response?.data?.result?.name);
      setDescription(response?.data?.result?.description);
      setPrice(response?.data?.result?.price);
      setMassProduct(response?.data?.result?.massProduct);
      setMassId(response?.data?.result?.Mass?.id);
      setPackagingId(response?.data?.result?.Packaging?.id);
      setStatus(response?.data?.result?.status == true ? 1 : 0);
    } catch (err) {
      console.log(err);
    }
  };

export const fetchStoreList = async (setDataStore) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}user/store-lists`
    );
    setDataStore(response?.data);
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (
  formData,
  token,
  navigate,
  toastSuccess,
  toastError
) => {
  try {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/products/update-product`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate("/product-lists");
    toastSuccess("Success");
  } catch (err) {
    console.log(err);
    toastError("Error updating product");
  }
};

export const fetchCategory = async (setDataCategory) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}category/category-lists`
    );
    setDataCategory(response?.data?.categories);
    return response?.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchMass = async (setDataMass) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}mass/mass-lists`
    );
    setDataMass(response?.data?.mass);
    return response?.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchPackaging = async (setDataPackaging) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}packaging/packaging-lists`
    );
    setDataPackaging(response?.data?.packaging);
    return response?.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const confirmDeleteImage = async (imageToDelete, closeDeleteImageModal) => {
    try {
      const { imageUrl, productId } = imageToDelete;
  
      await axios.delete(`${import.meta.env.VITE_API_URL}products/delete-product-image`,
      {
          data: { imageUrl, productId },
      });
      closeDeleteImageModal(); // Close the modal after successful deletion
    } catch (err) {
      console.error(err);
    }
  };

export const removeCategoryFromProduct = async (categoryId, productId, toastSuccess, reloadPage) => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}category/remove-category-product`,
      {
        data: { categoryId, productId },
      }
    );
    reloadPage();
    toastSuccess('Category for product deleted successfully');
  } catch (err) {
    console.error(err);
  }
};
