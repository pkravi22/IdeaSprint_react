const BASE_URL = "https://ideasprint-backend.onrender.com/api";
import axios from "axios";
export const signup = async (data) => {
  console.log(data);
  try {
    const res = await axios.post(`${BASE_URL}/auth/local/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { success: true, user: res.data };
  } catch (error) {
    return { success: false, error: error.response.data };
  }
};
export const signin = async (credentials) => {
  console.log(credentials);
  const { email, password } = credentials;
  try {
    const res = await axios.post(`${BASE_URL}/auth/local`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Login response", res);
    return { success: true, user: res.data };
  } catch (error) {
    return { error: error?.response?.data };
  }
};

const payment = async (data) => {
  console.log(data);

  try {
    const res = await axios.post(`${BASE_URL}/transactions/checkout`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { success: true, payment: res.data };
  } catch (error) {
    return { success: false, error: error.response.data };
  }
};
 export const getUser = async (token) => {
   try {
     const res = await axios.get(`${BASE_URL}/users/me?populate=demo_schemas`, {
       headers: { Authorization: `Bearer ${token}` },
     });
     return { success: true, user: res.data };
   } catch (error) {
     console.error("Error fetching user:", error);
     return { success: false, error: error.response.data };
   }
 };