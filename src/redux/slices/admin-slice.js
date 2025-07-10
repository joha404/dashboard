import {createSlice} from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "landingPageSlice",
    initialState: {
        count: {},
        isCountLoading: false,
        users: [],
        isUsersLoading: false,
        user: {},
        isUserLoading: false,
    },
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload;
        },
        setIsCountLoading: (state, action) => {
            state.isCountLoading = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setIsUsersLoading: (state, action) => {
            state.isUsersLoading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsUserLoading: (state, action) => {
            state.isUsersLoading = action.payload;
        }
    }
});

export default adminSlice.reducer;
export const {
    setCount,
    setIsCountLoading,
    setUsers,
    setIsUsersLoading,
    setUser,
    setIsUserLoading
} = adminSlice.actions;