import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http, postData } from "../../../utils/helper";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { getExpenseTypes } from "./getExpenseTypes";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const deleteExpenseType = createAsyncThunk(
  "deleteExpenseType",
  async (data) => {
    try {
      const { id, dispatch } = data;
      const response = await http(
        `${baseUrl}/config/deleteExpenseType`,
        { id },
        "DELETE"
      );

      if (response.statusCode === "00") {
        toast.success("Delete Successful", {
          position: "top-right"
        });
        dispatch(getExpenseTypes());
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

const deleteExpense = dataSlice(
  "deleteExpense",
  initialState,
  {},
  deleteExpenseType
);

// export const { useRegisterMutation } = AuthHandler;
export default deleteExpense.reducer;
