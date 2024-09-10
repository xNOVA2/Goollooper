"use client";
import dynamic from "next/dynamic";

import RoleGuard from "@/components/RoleGuard";
import PaymentsPageContent from "@/components/Payment/PaymentsPageContent";
import { useAuth } from "@/components/WithAuth/withAuth";

const PaymentsPage = () => {
    const isAuthenticated = useAuth('/');
    if (!isAuthenticated) return null;
    
    return (
        <RoleGuard allowedRoles={[1]}>
            <PaymentsPageContent />
        </RoleGuard>
    );
};

export default dynamic(() => Promise.resolve(PaymentsPage), { ssr: false });