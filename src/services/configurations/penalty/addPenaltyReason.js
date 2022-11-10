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

export const addPenaltyReason = createAsyncThunk(
  "penaltyReason",
  async ({ penaltyId, reason, dispatch, reset }) => {
    try {
      //   const { dispatch, reset, ...rest } = newData;

      console.log(".>>>>rest", reason, penaltyId);

      const response = await http(
        `${baseUrl}/config/addPenaltyReason`,
        {
          reason,
          penaltyId,
        },
        "POST"
      );

      console.log(">>>response", response);

      if (response.statusCode === "00") {
        toast.success("Successfully Created", {
          position: "top-right",
          // duration: "4000",
        });
        dispatch(getPenaltyReasons());
        reset();
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

const addPenalty = dataSlice(
  "penaltyReason",
  initialState,
  {},
  addPenaltyReason
);

// export const { useRegisterMutation } = AuthHandler;
export default addPenalty.reducer;
