import {
  Action,
  configureStore,
  combineReducers,
  ThunkAction,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import modalReducer from "../modals/modals";
import loginReducer from "./../Authentication/login";
import deleteExpense from "./../configurations/expenseType/deleteExpenseType";
import addExpense from "./../configurations/expenseType/addExpenseType";
import getAllExpenses from "./../configurations/expenseType/getExpenseTypes";
import getAllBranches from "./../configurations/payrollAccount/getBranchLocation";
import fetchAccountName from "./../configurations/payrollAccount/getAccountName";
import addPayrollAccountExpense from "./../configurations/payrollAccount/postPayrollAccount";
import getAllPayrollAccounts from "./../configurations/payrollAccount/getPayrollAccount";
import testPayroll from "./../payroll/runTestPayroll";
import getAllTestPayroll from "./../payroll/getTempPayroll";
import approveTestRunPayroll from "./../payroll/approveTestPayroll";
import submitPayrolls from "../payroll/submitPayroll";
import getApproverDetails from "./../payroll/getPendingOnMe";
import checkIfPending from "./../payroll/checkPendingStatus";
import cancelAfterTestRun from "./../payroll/cancelTestRun";
import addPenalty from "./../configurations/penalty/addPenaltyReason";
import getPenalty from "./../configurations/penalty/getPenaltyReasons";
import deletePenalty from "./../configurations/penalty/deletePenaltyReason";
import getAllPenalizedStaffs from "./../penalty/getPenalizedStaffs";
import penalizeStaffs from "./../penalty/penalizeStaff";
import getAllOnBoardedStaffs from "./../onboarding/getOnboardedStaffs";
import onBoardStaffs from "./../onboarding/onboardStaff";
import deleteOnBoardedStaffs from "./../onboarding/deleteOnBoardedStaff";
import getStaffDetails from "./../onboarding/getStaffs";
import deletePenalizedStaffs from "./../penalty/deletePenalizedStaff";
import getPenalizedStaff from "./../penalty/getPenalizedStaff";
import getOneOnBoardedStaff from "./../onboarding/getOnboardedStaffDetails";
import confirmOrRejectOnBoardingEnrollment from "../onboarding/confirmOrRejectEnrollment";
import confirmOrRejectPenalizedStaffs from './../penalty/confirmOrRejectPenalizedStaff';
import getAllActivePausedSalary from './../penalty/getActivePausedSalary';
import resumeStaffSalary from './../penalty/resumeSalary';

export const store = configureStore({
  reducer: {
    modalReducer,
    loginReducer,
    deleteExpense,
    getAllExpenses,
    addExpense,
    getAllBranches,
    fetchAccountName,
    addPayrollAccountExpense,
    getAllPayrollAccounts,
    testPayroll,
    getAllTestPayroll,
    approveTestRunPayroll,
    submitPayrolls,
    getApproverDetails,
    checkIfPending,
    cancelAfterTestRun,
    addPenalty,
    getPenalty,
    deletePenalty,
    getAllPenalizedStaffs,
    penalizeStaffs,
    getAllOnBoardedStaffs,
    onBoardStaffs,
    deleteOnBoardedStaffs,
    getStaffDetails,
    getPenalizedStaff,
    confirmOrRejectOnBoardingEnrollment,
    getOneOnBoardedStaff,
    confirmOrRejectPenalizedStaffs,
    getAllActivePausedSalary,
    resumeStaffSalary,
    deletePenalizedStaffs,
  },
  middleware: (gdm) =>
    gdm({
      serializableCheck: false,
    }),
  devTools: true,
});

setupListeners(store.dispatch);
