"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import PendingIcon from "@/public/assets/Image/pending.png";
import CompletedIcon from "@/public/assets/Image/approved.png";
import AmountIcon from "@/public/assets/Image/dollar.png";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchPayments, goollooperBalance, stripeBalance, withdrawGoollooperBalance } from "@/store/Slices/PaymentSlice";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircleIcon } from "lucide-react";
import { Users } from "@/components/User/Users";
import Pagination from "@/components/User/Pagination/Pagination";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import { formatAmount } from "@/lib/utils";


const PaymentsPageContent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const payments = useSelector((state: RootState) => state.payment.payments);
    const stripeBalanceData = useSelector((state: RootState) => state.payment.stripeBalance);
    const goollooperBalanceData = useSelector((state: RootState) => state.payment.goollooperBalance);
    const status = useSelector((state: RootState) => state.payment.status);
    const error = useSelector((state: RootState) => state.payment.error);

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
                await dispatch(fetchPayments({ page: currentPage, limit: pageData.limit })).unwrap();
                await dispatch(stripeBalance()).unwrap();
                await dispatch(goollooperBalance()).unwrap();
                console.log("Fetched payments:", goollooperBalanceData);
            } catch (error) {
                console.error("Error fetching payments:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dispatch, currentPage, pageData.limit, goollooperBalanceData]);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const withdrawGoollooper = async () => {
        try {
            await dispatch(withdrawGoollooperBalance(parseInt(goollooperBalanceData))).unwrap();
            console.log("Withdrawal successful");
        } catch (error) {
            console.error("Error withdrawing goollooper balance:", error);
        }
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
                                        <AlertCircleIcon size={15} className="cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent className="w-80">
                                        <p>
                                            The pending amount will automatically be transferred to available balance in 4 to 5 business days.
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
                            <h1 className="text-[1.625rem] leading-[2.438rem] font-bold pt-[0.313rem]">
                                {typeof goollooperBalanceData === "number"
                                    ? `$${formatAmount(goollooperBalanceData)}`
                                    : "$0"}
                            </h1>
                            <ConfirmationModal isAccept={false} onAccept={withdrawGoollooper} amount={goollooperBalanceData} />
                        </div>
                        <p className="text-[0.875rem] leading-[1.313rem] text-subTitleColor">
                            Total Goollooper&apos;s Amount
                        </p>
                    </div>
                </section>

                <div>
                    {payments?.result?.length > 0 ? (
                        <>
                            <Users users={payments.result} isSubAdmin={false} isPayment={true} />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={pageData.totalPages}
                                totalItems={pageData.totalItems}
                                onPageChange={handlePageChange}
                                limit={pageData.limit}
                            />
                        </>

                    ) : null}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PaymentsPageContent;