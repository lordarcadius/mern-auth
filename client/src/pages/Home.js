import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../core/utils';
import { ToastContainer } from 'react-toastify'

function Home() {
  const [userName, setUserName] = useState('');
  const [products, setProducts] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setUserName(localStorage.getItem('userName'));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    handleSuccess("Logout success!");
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      };

      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>{userName}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          products && products?.map((item, index) => (
            <ul key={index}>
              <span>{item.name} : {item.price}</span>
            </ul>
          ))
        }
      </div>
      <ToastContainer />
    </div>

  )
}

export default Home