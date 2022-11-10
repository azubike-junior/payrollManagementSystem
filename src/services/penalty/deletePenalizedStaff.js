import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http, postData } from "../../utils/helper";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { getAllStaffPenalized} from "./getPenalizedStaffs";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const deletePenalizedStaff = createAsyncThunk("penalizeStaff", async (data) => {
  try {
    const { dispatch, id } = data;

    console.log(">>>>>>rest", id);

    const response = await http(
      `${baseUrl}/config/deletePenalizedStaff`,
      {id},
      "POST"
    );

    console.log(">>>response", response);

    if (response.statusCode === "00") {
        toast.success("Successfully Created", {
          position: "top-right",
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

const deletePenalizedStaffs = dataSlice(
  "penaltyStaff",
  initialState,
  {},
  deletePenalizedStaff
);

// export const { useRegisterMutation } = AuthHandler;
export default deletePenalizedStaff.reducer;
