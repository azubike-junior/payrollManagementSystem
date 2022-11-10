import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http, postData } from "../../utils/helper";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { getOnBoardedStaffs } from "./getOnboardedStaffs";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: [],
  isSuccessful: false,
};

export const onBoardStaff = createAsyncThunk("onBoardStaffs", async (data) => {
  try {
    const { dispatch, setDeductionSubmitted, reset, ...rest } = data;
    console.log(">>>>>rest", rest);
    const response = await http(
      `${baseUrl}/config/onBoardNewStaff`,
      rest,
      "POST"
    );

    console.log(">>>response", response);

    if (response.statusCode === "00") {
      toast.success("Successfully Created", {
        position: "top-right",
        // duration: "4000",
      });
      dispatch(getOnBoardedStaffs());
      reset();
      setDeductionSubmitted(true);
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

const onBoardStaffs = dataSlice(
  "onBoardStaffs",
  initialState,
  {},
  onBoardStaff
);

// export const { useRegisterMutation } = AuthHandler;
export default onBoardStaffs.reducer;
