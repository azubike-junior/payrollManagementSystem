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
  data: {},
  isSuccessful: false,
};

export const cancelTestRun = createAsyncThunk("cancel", async (data) => {
  const { dispatch, toggleCancelModal } = data;
  try {
    const response = await http(
      `${baseUrl}/payroll/cancelAfterTestRun`,
      null,
      "GET"
    );

    console.log(">>>>cancel", response);

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
      Swal.fire("Payroll process has been cancelled", "Successful", "success").then(
        (result) => {
          if (result.isConfirmed) {
            toggleCancelModal();
            dispatch(getTestPayroll());
          }
        }
      );

      return response.data;
    }
  } catch (e) {
    return e.response.data;
  }
});

const cancelAfterTestRun = dataSlice(
  "cancelAfterTestRun",
  initialState,
  {},
  cancelTestRun
);

// export const { useRegisterMutation } = AuthHandler;
export default cancelAfterTestRun.reducer;
