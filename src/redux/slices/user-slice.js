import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        userData:{},
        isUserDataLoading: false,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setIsUserDataLoading: (state, action) => {
            state.isUserDataLoading = action.payload;
        }
    }
});

export default userSlice.reducer;
export const {setUserData,setIsUserDataLoading} = userSlice.actions;