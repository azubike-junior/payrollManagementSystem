import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http, postData } from "../../../utils/helper";
import Swal from "sweetalert2";
import { getExpenseTypes } from "./getExpenseTypes";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const addExpenseType = createAsyncThunk(
  "addExpenseType",
  async (newData) => {
    try {
      const { dispatch, reset, ...rest } = newData;

      const response = await http(
        `${baseUrl}/config/addExpenseType`,
        rest.data,
        "POST"
      );

      if (response.data.statusCode === "96") {
        Swal.fire("Sorry, Something went wrong", "error").then((result) => {
          if (result.isConfirmed) {
          }
        });
        return response.data.data;
      }

      if (response.statusCode === "00") {
        toast.success("Successfully Created", {
          position: "top-right",
          // duration: "4000",
        });
        dispatch(getExpenseTypes());
        reset();
        return response.data.data;
      }
    } catch (e) {
      return e.response.data;
    }
  }
);

const addExpense = dataSlice(
  "submitActivity",
  initialState,
  {},
  addExpenseType
);

// export const { useRegisterMutation } = AuthHandler;
export default addExpense.reducer;
