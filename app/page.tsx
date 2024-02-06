'use client'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthLayout from "@/app/layouts/AuthLayout";
import Signin from "@/components/Auth/Signin";
import { store, persistor } from '@/store/store';

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <AuthLayout title="Admin Login" subText="Welcome Back!">
          <Signin />
        </AuthLayout>
      </PersistGate>
    </Provider>
  );
}
