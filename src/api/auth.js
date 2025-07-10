import axiosInstance from "./axios-instance.js";
const BASE_URL = "https://carolinekem.softvencealpha.com/api/v1";

const userToken = localStorage.getItem("userToken");

export const loginAdmin = async (data) => {
  try {
    const email = data?.email?.trim();
    const password = data?.password?.trim();

    if (!email || !email.includes("@")) {
      return { status: false, message: "Please provide a valid email address" };
    }

    if (!password) {
      return { status: false, message: "Password is required" };
    }

    const response = await axiosInstance.post(
      `${BASE_URL}/users/login-admin`,
      { email, password },
      {
        validateStatus: (status) => status >= 200 && status < 500,
      }
    );

    if (response.status === 200 && response.data?.data) {
      return {
        status: true,
        message: response.data.message || "Login successful",
        data: response.data.data,
        token: response.data.token,
      };
    }

    return {
      status: false,
      message: response.data?.message || "Login failed. Please try again.",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      status: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again later.",
    };
  }
};

// Get Profile
export const getProfile = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.status === 200 && response.data?.data) {
      return {
        status: true,
        message: response.data.message || "Profile fetch successful",
        data: response.data.data,
      };
    }

    return {
      status: false,
      message: response.data?.message || "Failed to fetch profile",
    };
  } catch (error) {
    console.error("Profile fetch error:", error);
    return {
      status: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again later.",
    };
  }
};

// Update Avatar
export const UpdateAvatar = async (data) => {
  try {
    const response = await axiosInstance.patch(
      `${BASE_URL}/users/avatar`,
      data,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (response.status === 200 && response.data?.data) {
      return {
        status: true,
        message: response.data.message || "Avatar Updated Successfully",
        data: response.data.data,
      };
    }

    return {
      status: false,
      message: response.data?.message || "Failed to Update Avatar",
    };
  } catch (error) {
    console.error("Profile fetch error:", error);
    return {
      status: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again later.",
    };
  }
};
