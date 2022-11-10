import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http } from "../../utils/helper";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { getTestPayroll } from "./getTempPayroll";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const checkTestRun = createAsyncThunk(
  "checkTestRun",
  async (history) => {
    try {
      const response = await http(
        `${baseUrl}/payroll/checkPendingTestRun`,
        null,
        "GET"
      );

      console.log(">>>>payrollCheck", response.data);

      //   if (response.statusCode === "00") {
      if (response.data === true) {
        Swal.fire("Payroll Process is On-going", "Processing", "success").then(
          (result) => {
            if (result.isConfirmed) {
              history.push("/payroll/processPayroll");
            }
          }
        );
        return response.data;
      }
      //   }

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
    } catch (e) {
      return e.response.data;
    }
  }
);

const checkIfTestRun = dataSlice(
  "checkTestRun",
  initialState,
  {},
  checkTestRun
);

// export const { useRegisterMutation } = AuthHandler;
export default checkIfTestRun.reducer;
