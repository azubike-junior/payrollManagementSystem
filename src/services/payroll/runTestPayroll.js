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

export const runTestPayroll = createAsyncThunk(
  "addAccountExpense",
  async (newData) => {
    try {
      const { dispatch, reset, data } = newData;

      const response = await http(
        `${baseUrl}/payroll/startTestRun`,
        data,
        "POST"
      );

      if (response.statusCode === "96") {
        toast.error("Sorry, Something went wrong", {
          position: "top-right",
        });
        return response.data;
      }

      if (response.statusCode === "97") {
        toast.error("Sorry, Something went wrong", {
          position: "top-right",
        });
        return response.data;
      }

      if (response.statusCode === "00") {
      Swal.fire("Payroll is running", "Processing", "success").then(
          (result) => {
            if (result.isConfirmed) {
            }
          }
        );
        reset();
        return response.data.data;
      }
    } catch (e) {
      return e.response.data;
    }
  }
);

const testPayroll = dataSlice(
  "addAccountExpense",
  initialState,
  {},
  runTestPayroll
);

// export const { useRegisterMutation } = AuthHandler;
export default testPayroll.reducer;
