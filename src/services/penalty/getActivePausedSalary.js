import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http, postData } from "../../utils/helper";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getActivePausedSalary = createAsyncThunk(
  "getActivePausedSalary",
  async () => {
    // console.log(">>>got here", id);
    try {
      const response = await http(
        `${baseUrl}/config/allActivePausedSalary`,
        null,
        "GET"
      );

      console.log(">>> single response", response);

      if (response.statusCode === "00") {
        return response.data;
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

const getAllActivePausedSalary = dataSlice(
  "getActivePausedSalary",
  initialState,
  {},
  getActivePausedSalary
);

// export const { useRegisterMutation } = AuthHandler;
export default getAllActivePausedSalary.reducer;
