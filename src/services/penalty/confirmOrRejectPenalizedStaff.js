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
  data: [],
  isSuccessful: false,
};

export const confirmOrRejectPenalizedStaff = createAsyncThunk(
  "confirmOrRejectPenalizedStaff",
  async (data) => {
    const { toggleApprovalModal, toggleRejectionModal, history, ...rest } =
      data;
    try {
      const response = await http(
        `${baseUrl}/config/processPenalizedStaff`,
        rest,
        "POST"
      );

      if (response.statusCode === "00") {
        rest.decision === "Rejected"
          ? toggleRejectionModal()
          : toggleApprovalModal();

        Swal.fire(
          rest.decision === "Approved"
            ? "Successful"
            : "Rejected Successfully",
          "success",
          "success"
        ).then((result) => {
          if (result.isConfirmed) {
          }
        });

        history.push("/payroll/penalty/deduction");
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

const confirmOrRejectPenalizedStaffs = dataSlice(
  "confirmOrRejectPenalizedStaff",
  initialState,
  {},
  confirmOrRejectPenalizedStaff
);

// export const { useRegisterMutation } = AuthHandler;
export default confirmOrRejectPenalizedStaffs.reducer;
