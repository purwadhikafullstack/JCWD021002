import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import { SidebarWithHeader } from '../../components/SideBar/SideBar';
import { FiUpload } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWebSize } from '../../provider.websize';
import SideBar from '../../components/SideBar/SideBar';
import EditUserForm from './EditUserForm';

const EditUser = () => {
  const { size, handleWebSize } = useWebSize();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [fieldImage, setFieldImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedC, setSelectedC] = useState([]);
  const navigate = useNavigate();
  const [dataStore, setDataStore] = useState([]);

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [storeId, setStoreId] = useState();
  const [status, setStatus] = useState('');

  const fetchStore = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/get-all-store`,
      );

      setDataStore(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/user-detail/${id}`,
      );

      setData(response?.data?.result);
      setFullname(response?.data?.result?.fullname);
      setUsername(response?.data?.result?.username);
      setEmail(response?.data?.result?.email);
      setStoreId(response?.data?.result?.store_idstore);
      setStatus(response?.data?.result?.status);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchStore();
    fetchData();
  }, []);

  const addProduct = async () => {
    try {
      const fields = [
          { value: fullname.trim(), message: 'full name' },
          { value: username.trim(), message: 'username' },
          { value: email.trim(), message: 'email address' },
        ];

        for (const field of fields) {
          if (!field.value) {
            toast.warn(`Please enter ${field.message}`);
            return;
          }
        }

      let formData = new FormData();
      formData.append("id", id);
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("store_idstore", storeId);
      formData.append("status", status);
      formData.append("avatar", fieldImage);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/update-user`,
        formData,
      );

      navigate('/user-lists');
      toast.success('Success');
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (event) => {
    const selectedFile = event.currentTarget.files[0];

    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024); // Convert size to megabytes

      if (fileSizeInMB > 1) {
        // Display toast message for image size greater than 1 MB
        toast.warning('Selected image size should be less than 1 MB');
        return; // Don't proceed with further handling
      }

      setFieldImage(selectedFile);
      const objectURL = URL.createObjectURL(selectedFile);
      setSelectedImage(objectURL);
    }
  };

  return (
    <>
      <EditUserForm
        addProduct={addProduct}
        selectedImage={selectedImage}
        handleImageChange={handleImageChange}
        fullname={fullname}
        setFullname={setFullname}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        data={data}
        dataStore={dataStore}
        storeId={storeId}
        setStoreId={setStoreId}
        status={status}
        setStatus={setStatus}
        fetchStore={fetchStore}
      />
    </>
  );
};

export default EditUser;
