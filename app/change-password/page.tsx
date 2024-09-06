import AuthLayout from '@/app/layouts/AuthLayout';
import ChangePassword from '@/components/Auth/ChangePassword';
import React from 'react';


export default function ChangePasswordpage() {
    return (
        <AuthLayout title='Change Password' subText='Enter your new password.'>
            <ChangePassword />
        </AuthLayout>
    );
}
