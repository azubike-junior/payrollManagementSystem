import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http } from "../../utils/helper";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getTestPayroll = createAsyncThunk(
  "getTestPayroll",
  async () => {
    try {
      const response = await http(
        `${baseUrl}/payroll/getTemporarySalaryAfterSpool`, null, "GET"
      );

      console.log(">>>>tempPayroll", response);

      if (response.statusCode === "96") {
         Swal.fire("Sorry, Something went wrong", "", "error").then((result) => {
           if (result.isConfirmed) {
           }
         });
         return response.data.data;
      }

      if (response.statusCode === "97") {
        toast.error("Sorry, Something went wrong", {
          position: "top-right",
        });
        return response.data;
      }

      if (response.statusCode === "00") {
        return response.data;
      }
    } catch (e) {
      return e.response.data;
    }
  }
);

const getAllTestPayroll = dataSlice(
  "getAllTestPayroll",
  initialState,
  {},
  getTestPayroll
);

// export const { useRegisterMutation } = AuthHandler;
export default getAllTestPayroll.reducer;
