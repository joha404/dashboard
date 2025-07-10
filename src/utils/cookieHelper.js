import { toast } from "react-hot-toast";

//  Set token in sessionStorage
export const setToken = (token) => {
  sessionStorage.setItem("token", token);
};

//  Get token from sessionStorage
export const getToken = () => {
  return sessionStorage.getItem("token");
};

//  Set userInfo in sessionStorage
export const setUserInfo = (userInfo) => {
  sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
};

// Get userInfo from sessionStorage
export const getUserInfo = () => {
  const userInfo = sessionStorage.getItem("userInfo");
  try {
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Error parsing userInfo:", error);
    return null;
  }
};

// Clear all session data
export const clearToken = () => {
  sessionStorage.clear();
  toast.success("Logged out Successfully!");
  window.location.href = "/login";
};
