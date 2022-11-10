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

export const approveTestRun = createAsyncThunk(
  "approveTestRun",
  async (data) => {
    try {
      console.log(">>>>>>>rest", data);

      const { dispatch, toggleConfirmationModal, ...rest } = data;

      const response = await http(
        `${baseUrl}/payroll/approveTestRun`,
        rest,
        "POST"
      );

      console.log(">>>>response", response);

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
        // toast.success("Payroll is running ", {
        //   position: "top-right",
        // });
        Swal.fire("Submission successful", "Successful", "success").then(
          (result) => {
            if (result.isConfirmed) {
              toggleConfirmationModal()
              dispatch(getTestPayroll());
            }
          }
        );
        return response.data.data;
      }
    } catch (e) {
      return e.response.data;
    }
  }
);

const approveTestRunPayroll = dataSlice(
  "approveTestRun",
  initialState,
  {},
  approveTestRun
);

// export const { useRegisterMutation } = AuthHandler;
export default approveTestRunPayroll.reducer;
