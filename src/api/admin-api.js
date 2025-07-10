import store from "../redux/store/store.js";
import {
    setCount,
    setIsCountLoading,
    setIsUserLoading,
    setIsUsersLoading, setUser,
    setUsers
} from "../redux/slices/admin-slice.js";
import axiosInstance from "./axios-instance.js";

export const fetchCount = async ()=>{
    store.dispatch(setIsCountLoading(true));
    try {
      const res = await axiosInstance.get(`/admin/count`);
      store.dispatch(setIsCountLoading(false));
      if (res.status === 200) {
        store.dispatch(setCount(res.data.data));
      }
    } catch (error) {
      store.dispatch(setIsCountLoading(false));
      console.log("Error to changing Password", error);
    }
};

export const fetchUserList = async ()=>{
    store.dispatch(setIsUsersLoading(true));
    try {
        const res = await axiosInstance.get(`/admin/users`);
        store.dispatch(setIsUsersLoading(false));
        if (res.status === 200) {
            store.dispatch(setUsers(res.data.data));
        }
    } catch (error) {
        store.dispatch(setIsUsersLoading(false));
        console.log("Error to changing Password", error);
    }
};


export const fetchSingleUser = async (id)=>{
    store.dispatch(setIsUserLoading(true));
    try {
        const res = await axiosInstance.get(`/admin/user/${id}`);
        store.dispatch(setIsUserLoading(false));
        if (res.status === 200) {
            store.dispatch(setUser(res.data.data));
        }
    } catch (error) {
        store.dispatch(setIsUserLoading(false));
        console.log("Error to changing Password", error);
    }
};



export const manageUserStatus = async (id) => {
    try {
        const response = await axiosInstance.put(`/admin/user/${id}`, {
            validateStatus: status => status >= 200 && status < 500
        });
        console.log(response);
        if (!response) {
            return { status: false, message: 'No response received from server' };
        }

        if (response.status === 200) {
            return { status: true, message: response.data.message || 'Account Status Changed successfully' };
        } else {
            return { status: false, message: response.data.message || 'Account Status Changed request failed' };
        }

    } catch (error) {
        console.error('Email error:', error);
        const errorMessage = error.response?.data?.message ||
            error.message ||
            'Failed to Changed Account Status request';
        return { status: false, message: errorMessage };
    }
};



