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

export const getAllStaffPenalized = createAsyncThunk(
  "allPenalizedStaffs",
  async () => {
    try {
      const response = await http(
        `${baseUrl}/config/allPenalizedStaff`,
        null,
        "GET"
      );

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

const getAllPenalizedStaffs = dataSlice(
  "allPenalizedStaffs",
  initialState,
  {},
  getAllStaffPenalized
);

// export const { useRegisterMutation } = AuthHandler;
export default getAllPenalizedStaffs.reducer;
