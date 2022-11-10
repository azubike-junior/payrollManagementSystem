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
  data: {},
  isSuccessful: false,
};

export const getStaff = createAsyncThunk("staffs", async (staffId) => {
  console.log(">>>e", staffId);
  try {
    const response = await axios.post(`${baseUrl}/config/getStaffDetails`, {
      staffId,
    });

    console.log(">>>staffs", response);

    if (response.data.statusCode === "00") {
      return response.data.data;
    }

    if (response.data.statusCode === "96") {
      toast.error("Invalid Staff ID", {
        position: "top-right",
        // duration: "4000",
      });
      return response.data.data;
    }
  } catch (e) {
    return e.response.data;
  }
});

const getStaffDetails = dataSlice("staffs", initialState, {}, getStaff);

// export const { useRegisterMutation } = AuthHandler;
export default getStaffDetails.reducer;
