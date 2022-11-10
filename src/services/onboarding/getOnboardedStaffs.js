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

export const getOnBoardedStaffs = createAsyncThunk(
  "onBoardStaffs",
  async () => {
    try {
      const response = await http(
        `${baseUrl}/config/getOnboardedStaff`,
        null,
        "GET"
      );

      console.log(">>>response", response);

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

const getAllOnBoardedStaffs = dataSlice(
  "onBoardStaffs",
  initialState,
  {},
  getOnBoardedStaffs
);

// export const { useRegisterMutation } = AuthHandler;
export default getAllOnBoardedStaffs.reducer;
