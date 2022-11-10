import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http, postData } from "../../utils/helper";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { getAllStaffPenalized } from "./getPenalizedStaffs";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const penalizeStaff = createAsyncThunk("penalizeStaff", async (data) => {
  try {
    const { dispatch, reset, setDeductionSubmitted, ...rest } = data;

    console.log(">>>>>>rest", rest);

    //   console.log(".>>>>rest", reason, penaltyId);

    const response = await http(
      `${baseUrl}/config/penalizeStaff`,
      rest,
      "POST"
    );

    console.log(">>>response", response);

    if (response.statusCode === "00") {
      //   toast.success("Successfully Created", {
      //     position: "top-right",
      //   });
      Swal.fire("Successful", "", "success").then((result) => {
        if (result.isConfirmed) {
        }
      });
      setDeductionSubmitted(true);
      dispatch(getAllStaffPenalized());
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
});

const penalizeStaffs = dataSlice(
  "penaltyStaff",
  initialState,
  {},
  penalizeStaff
);

// export const { useRegisterMutation } = AuthHandler;
export default penalizeStaffs.reducer;
