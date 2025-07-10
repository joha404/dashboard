import {createSlice} from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        contacts: {},
        isContactsLoading: false,
        cloudinary: {},
        isCloudinaryLoading: false,
        emailSettings: {},
        isEmailLoading: false,
    },
    reducers: {
        setContacts: (state, action) => {
            state.contacts = action.payload;
        },
        setIsContactsLoading: (state, action) => {
            state.isContactsLoading = action.payload;
        },
        setCloudinary: (state, action) => {
            state.cloudinary = action.payload;
        },
        setIsCloudinaryLoading: (state, action) => {
            state.isCloudinaryLoading = action.payload;
        },
        setEmailSettings: (state, action) => {
            state.emailSettings = action.payload;
        },
        setIsEmailLoading: (state, action) => {
            state.isEmailLoading = action.payload;
        }
    },
});

export default settingsSlice.reducer;
export const {
    setContacts,
    setIsContactsLoading,
    setCloudinary,
    setIsCloudinaryLoading,
    setEmailSettings,
    setIsEmailLoading
} = settingsSlice.actions;
