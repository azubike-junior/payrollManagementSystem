import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http, postData } from "../../../utils/helper";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { getPayrollAccounts } from './getPayrollAccount';

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const deletePayrollAccount = createAsyncThunk(
  "deletePayroll",
  async (data) => {
    try {
      const { id, dispatch } = data;

      const response = await http(
        `${baseUrl}/config/deleteStaffAccountExpense`,
        { id },
        "DELETE"
      );

      console.log(">>>>>>rdelete", response)

      if (response.statusCode === "00") {
        toast.success("Delete Successful", {
          position: "top-right",
        });
        dispatch(getPayrollAccounts());
        return response.data.data;
      }

      if (response.statusCode === "96") {
        Swal.fire("Sorry, Something went wrong", "error").then((result) => {
          if (result.isConfirmed) {
          }
        });
        return response.data.data;
      }
    } catch (e) {
      return e.response.data;
    }
  }
);

const deletePayrollAcc = dataSlice(
  "deletePayrollAccount",
  initialState,
  {},
  deletePayrollAccount
);

// export const { useRegisterMutation } = AuthHandler;
export default deletePayrollAcc.reducer;
