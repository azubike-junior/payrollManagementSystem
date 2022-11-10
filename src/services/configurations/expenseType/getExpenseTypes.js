import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http } from "../../../utils/helper";
import Swal from "sweetalert2";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getExpenseTypes = createAsyncThunk("getExpenseType", async () => {
  try {
    const response = await axios.get(`${baseUrl}/config/getAllExpenseTypes`, {
      headers: {
        "ngrok-skip-browser-warning": "yes",
        "Content-Type": "application/json",
      },
    });

    if (response.data.statusCode === "96") {
      Swal.fire("Sorry, Something went wrong", "error").then((result) => {
        if (result.isConfirmed) {
        }
      });
      return response.data.data;
    }

    if (response.data.statusCode === "00") {
      return response.data.data;
    }
  } catch (e) {
    return e.response.data;
  }
});

const getAllExpenses = dataSlice(
  "getExpenseType",
  initialState,
  {},
  getExpenseTypes
);

// export const { useRegisterMutation } = AuthHandler;
export default getAllExpenses.reducer;
