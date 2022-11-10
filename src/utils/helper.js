import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const http = async (url, data, method) => {
  console.log(">>>dtaa", data)
  const response = await fetch(url, {
    method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "yes",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: data ? JSON.stringify(data) : null,
  });
  return response.json();
};

export const dataSlice = (name, initialState, reducers, api) => {
  return createSlice({
    name,
    initialState,
    reducers,
    extraReducers: (builder) => {
      builder.addCase(api.rejected, (state, action) => {
        state.error = action.payload;
        state.error2 = action.error.name;
        state.loading = false;
        state.isSuccessful = false;
      });
      builder.addCase(api.fulfilled, (state, action) => {
        state.loading = true;
        state.data = action.payload;
        state.loading = false;
        state.isSuccessful = true;
        state.error = "";
      });
      builder.addCase(api.pending, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
    },
  });
};

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    this.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("");
};

var date = new Date();
export default date.yyyymmdd();

export const addSelect = (data, type) => {
  if (data?.length > 0) {
    return [type, ...data];
  }
  return [];
};

export const pad = (num, size) => {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
};

export const getText = (data, value) => {
  return data[value]?.categoryType;
};

export const getBase64 = (file) => {
  return new Promise((resolve) => {
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file[0]);

    // on reader load somthing...
    reader.onloadend = () => {
      // Make a fileInfo Object

      // baseURL = reader.result;

      resolve(reader.result);
    };
  });
};

const requestorId = localStorage.getItem("initiatorId");

export const hardUtils = {
  requestorId,
  approverId: "335",
};

export const baseUrl = `https://cfdb-197-253-42-52.eu.ngrok.io`;

export const percentages = [
  { value: "", percent: "0%" },
  { value: 30, percent: "30%" },
  { value: 35, percent: "35%" },
  { value: 40, percent: "40%" },
  { value: 45, percent: "45%" },
  { value: 50, percent: "50%" },
  { value: 55, percent: "55%" },
  { value: 60, percent: "60%" },
  { value: 65, percent: "65%" },
  { value: 70, percent: "70%" },
  { value: 75, percent: "75%" },
  { value: 80, percent: "80%" },
  { value: 85, percent: "85%" },
  { value: 90, percent: "90%" },
  { value: 95, percent: "95%" },
  { value: 100, percent: "100%" },
];

export const timeDuration = [
  // { value: "", duration: "Select Option" },
  { value: "hourly", duration: "Hourly" },
  { value: "daily", duration: "Daily" },
  { value: "weekly", duration: "Weekly" },
  { value: "monthly", duration: "Monthly" },
  { value: "quarterly", duration: "Quarterly" },
  { value: "bi-annually", duration: "Bi-Annually" },
  { value: "annually", duration: "Annually" },
];

// this array contains, the information of the student, the course,
// the unit and his/her score

export const updateName = (state, payload) => ({
  ...state,
  data: {
    ...state.data,
    ...payload,
  },
});

export const emptyStateData = {
  exceptionalAchievement: "",
  selectedBehavioralTrainings: [],
  selectedTechnicalTrainings: [],
  appraisalRates: {},
  appraisalResults: {},
  appraiseeResults: {},
  appraiseeRates: {},
  strengthResult: "",
  appraiseeTimeManagementScore: "",
  appraiseePunctualityScore: "",
  appraiseeCommunicationScore: "",
  appraiseeProfessionalConductScore: "",
  appraiseeAnalyticalThinkingScore: "",
  appraiseeBehaviourArray: [],
  appraiseeFunctionalArray: [],
  appraiseeBehaviouralTrainings: "",
  appraiseeFunctionalTrainings: "",
  values: {},
};

export const emptyValue = {
  appraisalRates: {},
  appraisalResults: {},
  appraiseeResults: {},
};

export const switchNumberToMonth = (num) => {
  switch (num) {
    case "01":
      return "Jan";
    case "02":
      return "Feb";
    case "03":
      return "Mar";
    case "04":
      return "Apr";
    case "05":
      return "May";
    case "06":
      return "Jun";
    case "07":
      return "Jul";
    case "08":
      return "Aug";
    case "09":
      return "Sep";
    case "10":
      return "Oct";
    case "11":
      return "Nov";
    case "12":
      return "Dec";
    default:
      return "";
  }
};
