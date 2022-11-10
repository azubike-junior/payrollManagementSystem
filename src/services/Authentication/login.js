import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import regeneratorRuntime from "regenerator-runtime";
import Swal from "sweetalert2";
import { baseUrl, postData, http } from "../../utils/helper";
// import { http } from './../../utils/helper';

const initialState = {
  error: "",
  error2: "",
  isSuccessful: false,
  loading: false,
  response: {},
};

export const login = createAsyncThunk(
  "loginUser",
  async (data, { rejectWithValue }) => {
    const { history, ...rest } = data;
    
    try {
      const response = await http(`${baseUrl}/users/login`, rest, "POST");

      console.log(">>>>>>>login", response.data);

      if (response.statusCode === "96") {
        Swal.fire({
          title: "Oops",
          text: "Invalid Login Credentials",
          icon: "error",
        }).then((result) => {});
      }
      if (response.statusCode === "00") {
        localStorage.setItem("success", true)
        localStorage.setItem("initiatorId", response.data.staffId);
        localStorage.setItem(
          "initiatorName",
          `${response.data.firstName} ${response.data.lastName}`
        );

        history.push("/payroll/dashboard");
        return response.data;
      } else {
        return response.data;
      }
    } catch (e) {
      console.log(">>>>>>e", e);
      if(e) {
        Swal.fire({
          title: "Oops",
          text: "Something went wrong, please try again",
          icon: "error",
        }).then((result) => {});
      }
      return rejectWithValue(e.response.data);
    }
  }
);

export const loginSlice = createSlice({
  name: "loginReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.error2 = action.error.name;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = true;
      state.response = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

// export const { handleNext, handlePrevious, setPage, openShow, closeShow } =
//   NextAndPreviousHandler.actions;
export default loginSlice.reducer;
