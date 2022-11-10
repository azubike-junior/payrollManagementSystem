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

export const resumeSalary = createAsyncThunk("resume", async (data) => {
  try {
    const { dispatch, history, ...rest } = data;

    console.log(">>>>>>rest", rest);

    const response = await http(`${baseUrl}/config/resume`, rest, "POST");

    console.log(">>>response", response);

    if (response.statusCode === "00") {
      //   toast.success("Successfully Created", {
      //     position: "top-right",
      //   });
      Swal.fire("Successful", "", "success").then((result) => {
        if (result.isConfirmed) {
          history.push("/payroll/penalty/activePausedStaffs");
        }
      });
      dispatch(getAllStaffPenalized());
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

const resumeStaffSalary = dataSlice(
  "penaltyStaff",
  initialState,
  {},
  resumeSalary
);

// export const { useRegisterMutation } = AuthHandler;
export default resumeStaffSalary.reducer;
