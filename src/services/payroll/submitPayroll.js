import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http } from "../../utils/helper";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { payrollPendingOnMe } from "./getPendingOnMe";
import { getTestPayroll } from "./getTempPayroll";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const submitPayroll = createAsyncThunk(
  "approvePayroll",
  async (newData) => {
    try {
      const { dispatch, toggleCancelModal, toggleConfirmationModal, ...data } = newData;

      console.log(">>>>>>>rest", data);

      const response = await http(
        `${baseUrl}/payroll/submitPayroll`,
        data,
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
      
        data.decision === "approved"
          ? Swal.fire("Payroll run successfully", "Successful", "success").then(
              (result) => {
                if (result.isConfirmed) {
                  data.decision === "approved"
                    ? toggleConfirmationModal()
                    : toggleCancelModal();
                 dispatch(payrollPendingOnMe(data.initiatorId));
                }
              }
            )
          : Swal.fire("Payroll Rejected Successfully", "Successful", "success").then(
              (result) => {
                if (result.isConfirmed) {
                  data.decision === "approved"
                    ? toggleConfirmationModal()
                    : toggleCancelModal();
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

const submitPayrolls = dataSlice(
  "approvePayroll",
  initialState,
  {},
  submitPayroll
);

// export const { useRegisterMutation } = AuthHandler;
export default submitPayrolls.reducer;
