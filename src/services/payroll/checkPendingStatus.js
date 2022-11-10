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

export const checkPendingTestPayroll = createAsyncThunk(
  "checkPayroll",
  async () => {
    try {
      const response = await http(
        `${baseUrl}/payroll/checkIsPending`,
        null,
        "GET"
      );

    //   console.log(">>>>payrollCheck", response.data);

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
        if (response.data === true) {
          Swal.fire("Payroll Process is On-going", "Processing", "success").then(
            (result) => {
              if (result.isConfirmed) {
                // dispatch(getTestPayroll());
              }
            }
          );
        }
        return response.data;
      }
    } catch (e) {
      return e.response.data;
    }
  }
);

const checkIfPending = dataSlice(
  "approveTestRun",
  initialState,
  {},
  checkPendingTestPayroll
);

// export const { useRegisterMutation } = AuthHandler;
export default checkIfPending.reducer;
