import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { baseUrl, dataSlice, http } from "../../utils/helper";

const initialState = {
  error: "",
  loading: false,
  error2: "",
  data: "",
  isSuccessful: false,
};

export const downloadPayroll = createAsyncThunk("download", async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/downloads/testRun `,

      {
        headers: {
          "ngrok-skip-browser-warning": "yes",
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.statusCode === "00") {
      console.log(">>>>.", response.data)
      const downloadUrl = response.data.data?.replace(
        "localhost:5000",
        baseUrl
      );
      console.log(">>>>>down", downloadUrl)
      window.open(`${downloadUrl}`, "_blank");
      return response.data.data;
    }
  } catch (e) {
    return e.response.data;
  }
});

const downloadPayrollSheet = dataSlice(
  "downloadAllPaidRequests",
  initialState,
  {},
  downloadPayroll
);

// export const { useRegisterMutation } = AuthHandler;
export default downloadPayrollSheet.reducer;
