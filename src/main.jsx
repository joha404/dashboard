import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.jsx';
import { Toaster } from 'react-hot-toast';
import {Provider} from "react-redux";
import store from "./redux/store/store.js";

// Create root element
const container = document.getElementById('root');
const root = createRoot(container);

// Toast configuration
const toastOptions = {
    success: {
        style: {
            background: '#10b981',
            color: '#ffffff',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        iconTheme: {
            primary: '#ffffff',
            secondary: '#10b981',
        },
        duration: 4000,
    },
    error: {
        style: {
            background: '#ef4444',
            color: '#ffffff',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        iconTheme: {
            primary: '#ffffff',
            secondary: '#ef4444',
        },
        duration: 5000,
    },
    loading: {
        style: {
            background: '#3b82f6',
            color: '#ffffff',
        },
        duration: 8000,
    },
    position: 'top-right',
    reverseOrder: false,
};

root.render(
    <StrictMode>
           <Provider store={store}>
               <RouterProvider router={routes} />
               <Toaster
                   toastOptions={toastOptions}
                   containerStyle={{
                       top: '1.5rem',
                       right: '1.5rem',
                   }}
               />
           </Provider>
    </StrictMode>
);