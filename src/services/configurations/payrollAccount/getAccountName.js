import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl, http } from "../../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getAccountName = createAsyncThunk("accountName", async (data) => {
  try {
    const response = await http(
      `${baseUrl}/config/getAccountName`,
      data,
      "POST"
    );

    console.log(">>>>>>resposneAccoutnName",  response)
    if (response.statusCode === "96") {
      toast.error("Invalid Ledger", {
        position: "top-right",
      });
      return response;
    }
    if (response.statusCode === "00") {
      toast.success("Name Enquiry Successful", {
        position: "top-right",
      });
      return response.accountName;
    }
  } catch (e) {
    return e.response.data;
  }
});

const fetchAccountName = createSlice({
  name: "accountName",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccountName.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getAccountName.fulfilled, (state, action) => {
      state.isSuccessful = true;
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getAccountName.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
      state.isSuccessful = false;
      state.data = "";
    });
  },
});

// export const { useRegisterMutation } = AuthHandler;
export default fetchAccountName.reducer;
