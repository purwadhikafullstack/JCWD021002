import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWebSize } from '../../provider.websize';
import EditProductBody from "./EditProductBody";
import { fetchData, fetchCategory, fetchMass, fetchPackaging, confirmDeleteImage } from './productService';

const EditProduct = () => {
  const {size, handleWebSize } = useWebSize();
  const {id} = useParams();
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataMass, setDataMass] = useState([]);
  const [dataPackaging, setDataPackaging] = useState([]);
  const [fieldImage, setFieldImage] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedC, setSelectedC] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [massProduct, setMassProduct] = useState("");
  const [massId, setMassId] = useState("");
  const [packagingId, setPackagingId] = useState("");
  const [status, setStatus] = useState("")
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData(id, setData, setName, setDescription, setPrice, setMassProduct, setMassId, setPackagingId, setStatus)
  }, [id]);
  
  const addProduct = async () => {
    try {
        const fields = [
            { value: name.trim(), message: 'name' },
            { value: price, message: 'price' },
            { value: description.trim(), message: 'description' },
            { value: massProduct.trim(), message: 'massProduct' },
            { value: massId, message: 'mass' },
            { value: packagingId, message: 'packaging' },
          ];
          
          for (const field of fields) {
            if (!field.value) {
              toast.warn(`Please enter ${field.message}`);
              return;
            }
          }

      let formData = new FormData();
      formData.append("id", data?.result?.id);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("status", status);
      formData.append("description", description);
      selectedC.forEach((item, i) => {
        formData.append(`category[${i}][id]`, item.category.id);
        formData.append(`category[${i}][category]`, item.category.category);
      });
      formData.append("massProduct", massProduct);
      formData.append("massId", massId);
      formData.append("packagingId", packagingId);

      for (let i = 0; i < fieldImage.length; i++) {
        formData.append(`images`, fieldImage[i]);
      }

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/update-product`,
        formData, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
          }
      );
      navigate("/product-lists");
      toast.success("Success");
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.currentTarget.files);
    if (selectedFiles.length > 0) {
      const fileSizeExceedsLimit = selectedFiles.some(
        (file) => file.size / (1024 * 1024) > 1
      );
      if (fileSizeExceedsLimit) {
        toast.warning("Selected images should be less than 1 MB each");
        return; // Don't proceed with further handling
      }
      setFieldImage((prevImages) => [...prevImages, ...selectedFiles]);
      const objectURLs = selectedFiles.map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...objectURLs]);
    }
  };

  const handleDeleteImage = (index) => {
    setFieldImage((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };
  
  const increment = (category) => {
    const exist = selectedC.find((item) => item.category.id === category.id);

    if (!exist) {
      setSelectedC([...selectedC, { category }]);
    }
  };

  const decrement = (category) => {
    const updatedCategories = selectedC.filter((item) => item.category.id !== category.id);
    setSelectedC(updatedCategories);
  };


useEffect(() => {
    fetchCategory(setDataCategory);
    fetchMass(setDataMass);
    fetchPackaging(setDataPackaging);
}, []);

const [isDeleteImageModalOpen, setIsDeleteImageModalOpen] = useState(false);
const [imageToDelete, setImageToDelete] = useState({ imageUrl: "", productId: "" });

const openDeleteImageModal = (imageUrl, productId) => {
  setImageToDelete({ imageUrl, productId });
  setIsDeleteImageModalOpen(true);
};

const closeDeleteImageModal = () => {
  setImageToDelete({ imageUrl: "", productId: "" });
  setIsDeleteImageModalOpen(false);
};

const [isDeleteProductCategoryModalOpen, setIsDeleteProductCategoryModalOpen] = useState(false);
const [productCategoryToDelete, setProductCategoryToDelete] = useState({ categoryId: "", productId: "" });

const openDeleteProductCategoryModal = (categoryId, productId) => {
  setProductCategoryToDelete({ categoryId, productId });
  setIsDeleteProductCategoryModalOpen(true);
};

const closeDeleteProductCategoryModal = () => {
    setProductCategoryToDelete({ categoryId: "", productId: "" });
    setIsDeleteProductCategoryModalOpen(false);
};

const confirmDeleteProductCategory = async () => {
  try {
    const { categoryId, productId } = productCategoryToDelete;

    await axios.delete(`${import.meta.env.VITE_API_URL}category/remove-category-product`,
    {
        data: { categoryId, productId },
    });

    window.location.reload();
    toast.success('Category for product deleted successfully');
    closeDeleteProductCategoryModal(); // Close the modal after successful deletion
  } catch (err) {
    console.error(err);
  }
};

  return (
    <>
    <EditProductBody size={size} handleWebSize={handleWebSize}
      navigate={navigate}
      addProduct={addProduct}
      selectedImages={selectedImages} handleImageChange={handleImageChange} handleDeleteImage={handleDeleteImage}
      name={name} setName={setName} price={price} setPrice={setPrice} description={description}
      setDescription={setDescription} massProduct={massProduct} setMassProduct={setMassProduct} massId={massId} setMassId={setMassId}
      packagingId={packagingId} setPackagingId={setPackagingId} status={status} setStatus={setStatus} dataMass={dataMass} dataPackaging={dataPackaging}
      selectedC={selectedC} increment={increment} decrement={decrement} dataCategory={dataCategory} data={data}
      openDeleteProductCategoryModal={openDeleteProductCategoryModal} openDeleteImageModal={openDeleteImageModal} isDeleteImageModalOpen={isDeleteImageModalOpen}
      closeDeleteImageModal={closeDeleteImageModal} imageToDelete={imageToDelete}
      confirmDeleteImage={confirmDeleteImage} isDeleteProductCategoryModalOpen={isDeleteProductCategoryModalOpen} closeDeleteProductCategoryModal={closeDeleteProductCategoryModal}
      productCategoryToDelete={productCategoryToDelete} confirmDeleteProductCategory={confirmDeleteProductCategory} />
    </>
  );
};

export default EditProduct;
