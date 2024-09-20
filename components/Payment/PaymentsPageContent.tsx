"use client"; 

import React, { useEffect, useState } from "react";
import Image from "next/image";
import PendingIcon from "@/public/assets/Image/pending.png";
import CompletedIcon from "@/public/assets/Image/approved.png";
import AmountIcon from "@/public/assets/Image/dollar.png";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchPayments, stripeBalance } from "@/store/Slices/PaymentSlice";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircleIcon } from "lucide-react";
import { Users } from "@/components/User/Users";
import Pagination from "@/components/User/Pagination/Pagination";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import DashboardLayout from "@/app/layouts/DashboardLayout";

const formatAmount = (amount: number): string => {
    if (amount === undefined || amount === null) {
        return '0.00';
    }
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const PaymentsPageContent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const payments = useSelector((state: RootState) => state.payment.payments);
    const stripeBalanceData = useSelector((state: RootState) => state.payment.stripeBalance);
    const status = useSelector((state: RootState) => state.payment.status);
    const error = useSelector((state: RootState) => state.payment.error);
    console.log(stripeBalanceData);

    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState<number>(1);    
    const [pageData, setPageData] = useState({
        totalPages: 0,
        totalItems: 0,
        limit: 5,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dispatch(fetchPayments({ page: currentPage, limit: pageData.limit })).unwrap();
                console.log("Fetched payments:", result);
                const { available, pending } = await dispatch(stripeBalance()).unwrap();
            } catch (error) {
                console.error("Error fetching payments:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [dispatch, currentPage, pageData.limit]);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <DashboardLayout Active={7}>
            <div className="mx-[0.813em] my-[0.688em] border border-border bg-white rounded-md pl-[1.75em] pt-[2rem]">

                <section className="flex items-center mb-[2em] justify-start gap-[12.313em] ">
                    <div className="flex flex-col items-start space-y-1">
                        <Image src={PendingIcon} alt="Users Icon" width={40} height={40} />
                        <h1 className="text-[1.625rem] leading-[2.438rem] font-bold pt-[0.313rem]">${formatAmount(stripeBalanceData?.pending)}</h1>
                        <div className="flex flex-row gap-2 items-center">
                            <p className="text-[0.875rem] leading-[1.313rem] my-3 text-subTitleColor">
                                Total Pending Amount
                            </p>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <AlertCircleIcon size={15} className="cursor-pointer"/>
                                    </TooltipTrigger>
                                    <TooltipContent className="w-80">
                                        <p>
                                            The pending amount will automatically be transferred in 4 to 5 business days.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>

                    <div className="flex flex-col items-start space-y-1 ml-4">
                        <Image src={CompletedIcon} alt="Users Icon" width={42} height={42} />

                        <h1 className="text-[1.625rem] leading-[2.438rem] font-bold pt-[0.313rem]">${formatAmount(stripeBalanceData?.available)}</h1>

                        <p className="text-[0.875rem] leading-[1.313rem] text-subTitleColor">
                            Total Available Amount
                        </p>
                    </div>

                    <div className="flex flex-col items-start space-y-1 ml-4">
                        <Image src={AmountIcon} alt="Users Icon" width={42} height={42} />
                        <div className="flex flex-row gap-4">
                            <h1 className="text-[1.625rem] leading-[2.438rem] font-bold pt-[0.313rem]">${formatAmount(39908)}</h1>
                            <ConfirmationModal isAccept={false} />
                        </div>
                        <p className="text-[0.875rem] leading-[1.313rem] text-subTitleColor">
                            Total Goollooper&apos;s Amount
                        </p>
                    </div>
                </section>

                <div>
                    { payments.length > 0 ? (
                        <>
                            <Users users={payments} isSubAdmin={false} isPayment={true} />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={pageData.totalPages}
                                totalItems={pageData.totalItems}
                                onPageChange={handlePageChange}
                                limit={pageData.limit}
                            />
                        </>
                        
                    ) : null }
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PaymentsPageContent;