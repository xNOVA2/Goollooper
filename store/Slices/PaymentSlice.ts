import { Api } from "@/api/Middleware";
import { getStats, getSubadmin, getUsers } from "@/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/type";

interface UserPayment {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  profileImage?: string;
}

interface Transaction {
  _id: string;
  user: UserPayment;
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

interface StripBalance {
  available: number;
  pending: number;
}

interface PageData {
  totalPages: number;
  totalItems: number;
  limit: number;
}

interface PaymentState {
  payments: Transaction[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  stripeBalance: StripBalance | null;
  currentActiveChat: string | null;
  users: User[];
  subadmins: User[];
  userCount: number;
  taskCount: number;
  loading: boolean;
  pageData: PageData;
}

const initialState: PaymentState = {
  payments: [],
  status: "idle",
  error: null,
  stripeBalance: null,
  currentActiveChat: null,
  users: [],
  subadmins: [],
  userCount: 0,
  taskCount: 0,
  loading: false,
  pageData: {
    totalPages: 0,
    totalItems: 0,
    limit: 10,
  },
};

interface FetchPaymentsParams {
  page: number;
  limit: number;
}

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (
    {
      page,
      limit,
      search,
      role,
      isSubAdmin,
    }: {
      page: number;
      limit: number;
      search?: string;
      role?: number;
      isSubAdmin?: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      let userRes;
      if (isSubAdmin) {
        userRes = await getSubadmin(page, limit);
      } else {
        userRes = await getUsers(page, limit, search, role);
      }

      const statsRes = await getStats();

      return {
        users: userRes?.data?.data?.data || [],
        pagination: userRes?.data?.data?.pagination,
        stats: statsRes?.data?.data,
      };
    } catch (error) {
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

export const fetchPayments = createAsyncThunk(
  "payment/fetchPayments",
  async ({ page, limit }: FetchPaymentsParams, { rejectWithValue }) => {
    try {
      const response = await Api.get<ApiResponse>(
        `/transaction?page=${page}&limit=${limit}&type=Withdraw`
      );
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
      const response = await Api.put<any>(
        `/stripe/toggle-withdraw-request/${transactionId}`,
        {
          status: "accepted",
        }
      );
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
    setPageData(state, action: PayloadAction<typeof initialState.pageData>) {
      state.pageData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPayments.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.status = "succeeded";
          state.payments = action.payload;
        }
      )
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(stripeBalance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        stripeBalance.fulfilled,
        (
          state,
          action: PayloadAction<{ available: number; pending: number }>
        ) => {
          state.status = "succeeded";
          state.stripeBalance = action.payload;
        }
      )
      .addCase(stripeBalance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updatePaymentStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePaymentStatus.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(withdrawPayment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(withdrawPayment.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(withdrawPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserData.fulfilled,
        (
          state,
          action: PayloadAction<
            {
              users: any;
              pagination: any;
              stats: any;
            },
            string,
            {
              arg: {
                page: number;
                limit: number;
                search?: string;
                role?: number;
                isSubAdmin?: boolean;
              };
              requestId: string;
              requestStatus: "fulfilled";
            }
          >
        ) => {
          state.loading = false;
          if (action.payload.users) {
            if (action.meta.arg.isSubAdmin) {
              state.subadmins = action.payload.users;
            } else {
              state.users = action.payload.users;
            }
          }
          if (action.payload.pagination) {
            state.pageData = {
              totalPages: action.payload.pagination.totalPages,
              totalItems: action.payload.pagination.totalItems,
              limit: state.pageData?.limit,
            };
          }
          if (action.payload.stats) {
            state.userCount = action.payload.stats.userCount;
            state.taskCount = action.payload.stats.taskCount;
          }
        }
      )
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentActiveChat, clearCurrentActiveChat, setPageData } =
  paymentSlice.actions;
export default paymentSlice.reducer;
