import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http, postData } from "../../../utils/helper";
import Swal from "sweetalert2";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const getBranches = createAsyncThunk("getBranches", async () => {
  try {
    const response = await http(`${baseUrl}/config/getBranches`, null, "GET");

    if (response.statusCode === "96") {
      Swal.fire("Sorry, Something went wrong", "error").then((result) => {
        if (result.isConfirmed) {
        }
      });
      return response.data.data;
    }

    if (response.statusCode === "00") {
      return response.data;
    }
  } catch (e) {
    return e.response.data;
  }
});

const getAllBranches = dataSlice("getBranch", initialState, {}, getBranches);

// export const { useRegisterMutation } = AuthHandler;
export default getAllBranches.reducer;
