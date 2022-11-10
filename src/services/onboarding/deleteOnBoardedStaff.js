import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http, postData } from "../../utils/helper";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { getOnBoardedStaffs } from './getOnboardedStaffs';

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const deleteOnBoardedStaff = createAsyncThunk(
  "onBoarding",
  async (data) => {
    try {
      const { id, dispatch } = data;

      const response = await http(
        `${baseUrl}/config/deleteOnboardedStaff`,
        { id },
        "POST"
      );

      console.log(">>>responses", response);

      if (response.statusCode === "00") {
        dispatch(getOnBoardedStaffs())
        toast.success("Successfully Deleted", {
          position: "top-right",
        });
        return response.data.data;
      }

      if (response.statusCode === "96") {
        Swal.fire("Sorry, Something went wrong", "error").then((result) => {
          if (result.isConfirmed) {
          }
        });
      }
    } catch (e) {
      return e.response.data;
    }
  }
);

const deleteOnBoardedStaffs = dataSlice(
  "penaltyReason",
  initialState,
  {},
  deleteOnBoardedStaff
);

// export const { useRegisterMutation } = AuthHandler;
export default deleteOnBoardedStaffs.reducer;
