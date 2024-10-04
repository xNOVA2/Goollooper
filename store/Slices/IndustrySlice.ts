import { Api } from "@/api/Middleware";
import { GetIndustriesResponse, Industry } from "@/types/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IndustryState {
  industries: Industry[];
  industry: string;
  loading: boolean;
  error: string;
}

const initialState: IndustryState = {
  industries: [],
  industry: "",
  loading: false,
  error: "",
};

export const fetchIndustries = createAsyncThunk(
  "industry/getIndustries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get<GetIndustriesResponse>("/industry");
      return response.data.data;
    } catch (error: any) {
      console.error("Industries error", error);
      return rejectWithValue(error.response?.data?.msg || "An error occurred");
    }
  }
);

export const createIndustry = createAsyncThunk(
  "industry/addIndustry",
  async (industry: string, { rejectWithValue }) => {
    try {
      const response = await Api.post("/industry/create", { name: industry });
      return response.data.data;
    } catch (error: any) {
      console.error("Add Industry error", error);
      return rejectWithValue(error.response?.data?.msg || "An error occurred");
    }
  }
);

export const deleteIndustry = createAsyncThunk(
  "industry/deleteIndustry",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await Api.delete(`/industry/delete/${id}`);
      return response;
    } catch (error: any) {
      console.error("Delete Industry error", error);
      return rejectWithValue(error.response?.data?.msg || "An error occurred");
    }
  }
);

const industrySlice = createSlice({
  name: "industry",
  initialState,
  reducers: {
    removeIndustry: (state, action) => {
      state.industries = state.industries.filter(
        (industry) => industry._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndustries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIndustries.fulfilled, (state, action) => {
        state.loading = false;
        state.industries = action.payload;
      })
      .addCase(fetchIndustries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createIndustry.pending, (state) => {
        state.loading = true;
      })
      .addCase(createIndustry.fulfilled, (state, action) => {
        state.loading = false;
        state.industries.push(action.payload);
      })
      .addCase(createIndustry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteIndustry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteIndustry.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteIndustry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { removeIndustry } = industrySlice.actions;
export const selectIndustries = (state: RootState) => state.industry.industries;
export const selectIndustry = (state: RootState) => state.industry.industry;

export default industrySlice.reducer;
