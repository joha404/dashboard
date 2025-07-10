import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user-slice.js";
import adminReducer from "../slices/admin-slice.js";
import settingsReducer from "../slices/settings-slice.js";
import aboutReducer from "../slices/about-slice.js";
import contactReducer from "../slices/contact-us-slice.js";
import priceReducer from "../slices/price-slice.js";
import sellHeroReducer from "../slices/sell-hero-slice.js";
import testimoniesReducer from "../slices/testimonies-slice.js";
import buySellReducer from "../slices/buy-sell-snap-slice.js";
import companyInfoReducer from "../slices/company-info-slice.js";
import authPageReducer from "../slices/authPage-slice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    settings: settingsReducer,
    about: aboutReducer,
    contact: contactReducer,
    price: priceReducer,
    sellHero: sellHeroReducer,
    testimonies: testimoniesReducer,
    buySell: buySellReducer,
    companyInfo: companyInfoReducer,
    authPage: authPageReducer,
  },
});
export default store;
