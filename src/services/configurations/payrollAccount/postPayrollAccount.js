import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http } from "../../../utils/helper";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { getPayrollAccounts } from "./getPayrollAccount";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const addAccountExpense = createAsyncThunk(
  "addAccountExpense",
  async (newData) => {
    try {
      const { dispatch, reset, payrollData, setSubmitted, setLedgerSubmitted } =
        newData;

      console.log(">>>>>>>rest", payrollData);

      const response = await http(
        `${baseUrl}/config/addStaffAccountExpense`,
        payrollData,
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
        toast.success("Successfully Created", {
          position: "top-right",
        });
        dispatch(getPayrollAccounts());
        setSubmitted(true);
        setLedgerSubmitted(true);
        reset();
        return response.data.data;
      }
    } catch (e) {
      return e.response.data;
    }
  }
);

const addPayrollAccountExpense = dataSlice(
  "addAccountExpense",
  initialState,
  {},
  addAccountExpense
);

// export const { useRegisterMutation } = AuthHandler;
export default addPayrollAccountExpense.reducer;
