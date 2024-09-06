import { Api } from "@/api/Middleware";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: number;
    profileImage?: string;
}

interface Transaction {
    _id: string;
    user: User;
    wallet: string;
    amount: number;
    type: string;
    status: string;
    task?: string;
    isCredit: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ApiResponse {
    code: number;
    status: boolean;
    msg: string;
    data: Transaction[];
}

interface PaymentState {
    payments: Transaction[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    stripeBalance: {
        available: number;
        pending: number;
    } | null;
    currentActiveChat: string | null;
}

const initialState: PaymentState = {
    payments: [],
    status: 'idle',
    error: null,
    stripeBalance: null,
    currentActiveChat: null,
};

interface FetchPaymentsParams {
    page: number;
    limit: number;
}

export const fetchPayments = createAsyncThunk(
    "payment/fetchPayments",
    async ({ page, limit }: FetchPaymentsParams, { rejectWithValue }) => {
        try {
            const response = await Api.get<ApiResponse>(`/transaction?page=${page}&limit=${limit}&type=Withdraw`);
            // console.log("API Response:", response);
            return response.data.data;
        } catch (error: any) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.msg || "An error occurred");
        }
    }
);

export const stripeBalance = createAsyncThunk(
    "payment/stripeBalance",
    async () => {
        try {
            const response = await Api.get<any>(`/stripe/balance`);
            console.log("Stripe Balance:", response);
            return {
                available: response.data.data.available[0].amount,
                pending: response.data.data.pending[0].amount,
            };
        } catch (error: any) {
            console.error("Stripe Balance Error:", error);
            return error.response?.data?.msg || "An error occurred";
        }
    }
);

export const updatePaymentStatus = createAsyncThunk(
    "payment/updatePaymentStatus",
    async (transactionId: any, { rejectWithValue }) => {
        try {
            const response = await Api.put<any>(`/stripe/toggle-withdraw-request/${transactionId}`, {
                status: "accepted",
            });
            return response.data.data;
        } catch (error: any) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.msg || "An error occurred");
        }
    }
);

export const withdrawPayment = createAsyncThunk(
    "payment/withdrawPayment",
    async (amount: any, { rejectWithValue }) => {
        try {
            const response = await Api.post<any>("/stripe/payout", {
                amount: amount,
            });
            return response.data.data;
        } catch (error: any) {
            console.error("API Error:", error);
            return rejectWithValue(error.response?.data?.msg || "An error occurred");
        }
    }
);

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setCurrentActiveChat(state, action: PayloadAction<string>) {
            state.currentActiveChat = action.payload;
        },
        clearCurrentActiveChat(state) {
            state.currentActiveChat = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPayments.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
                state.status = 'succeeded';
                state.payments = action.payload;
            })
            .addCase(fetchPayments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            
            .addCase(stripeBalance.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(stripeBalance.fulfilled, (state, action: PayloadAction<{ available: number; pending: number }>) => {
                state.status = 'succeeded';
                state.stripeBalance = action.payload;
            })
            .addCase(stripeBalance.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(updatePaymentStatus.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatePaymentStatus.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updatePaymentStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(withdrawPayment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(withdrawPayment.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(withdrawPayment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});
export const { setCurrentActiveChat, clearCurrentActiveChat } = paymentSlice.actions;
export default paymentSlice.reducer;