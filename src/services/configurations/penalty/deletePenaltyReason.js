import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http, postData } from "../../../utils/helper";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { getPenaltyReasons } from "./getPenaltyReasons";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const deletePenaltyReason = createAsyncThunk(
  "penaltyReason",
  async (data) => {
    try {
      const { id, dispatch } = data;

      const response = await http(
        `${baseUrl}/config/deletePenaltyReason`,
        { id },
        "POST"
      );

      console.log(">>>responses", response);

      if (response.statusCode === "00") {
        toast.success("Successfully Deleted", {
          position: "top-right",
        });
        dispatch(getPenaltyReasons());
        return response.data.data;
      }

      if (response.data.statusCode === "96") {
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

const deletePenalty = dataSlice(
  "penaltyReason",
  initialState,
  {},
  deletePenaltyReason
);

// export const { useRegisterMutation } = AuthHandler;
export default deletePenalty.reducer;
