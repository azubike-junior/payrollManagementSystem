import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/index";
import { classNames } from "./../../../utils/classNames";
import InputField, { SelectField } from "../../../components/InputField/index";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import { itemRender, onShowSizeChange } from "./../../../components/pagination";
import { getExpenseTypes } from "../../../services/configurations/expenseType/getExpenseTypes";
import { getBranches } from "../../../services/configurations/payrollAccount/getBranchLocation";
import { getAccountName } from "../../../services/configurations/payrollAccount/getAccountName";
import { Toaster } from "react-hot-toast";
import { addAccountExpense } from "../../../services/configurations/payrollAccount/postPayrollAccount";
import { getPayrollAccounts } from "../../../services/configurations/payrollAccount/getPayrollAccount";
import { deletePayrollAccount } from "./../../../services/configurations/payrollAccount/deletePayrollAccount";
import { useRef } from "react";
import { getPenaltyReasons } from "./../../../services/configurations/penalty/getPenaltyReasons";
import { penalizeStaff } from "./../../../services/penalty/penalizeStaff";
import { getStaff } from "./../../../services/onboarding/getStaffs";
import { Link, useHistory, useParams } from "react-router-dom";
import { deletePenalizedStaff } from "./../../../services/penalty/deletePenalizedStaff";
import { getPenalizedStaff } from "../../../services/penalty/getPenalizedStaff";
import { getSinglePenalizedStaff } from "./../../../services/penalty/getPenalizedStaff";
import { resumeSalary } from "./../../../services/penalty/resumeSalary";

export default function ResumeSalary() {
  const ulRef = useRef();
  const inputRef = useRef();
  const [staffId, setStaffId] = useState("");
  const [deductionSubmitted, setDeductionSubmitted] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [differenceInDays, setDifferenceInDays] = useState("");
  const history = useHistory();

  const { id } = useParams();

  const trans = [
    { id: 1, type: "Debit" },
    { id: 2, type: "Credit" },
  ];

  const [options, setOptions] = useState([]);

  //   const onInputChange = (e) => {
  //     const newOptions = stuffs.filter((option) =>
  //       option.includes(e.target.value)
  //     );
  //     setOptions(newOptions);
  //   };

  const { loading: resumeLoading } = useSelector(
    (state) => state.resumeStaffSalary
  );

  const { loading: submitLoading } = useSelector(
    (state) => state.penalizeStaffs
  );

  const { loading: staffLoading, data: staffDetails } = useSelector(
    (state) => state.getStaffDetails
  );

  const { loading: penalizedStaffLoading, data: penalizedStaff } = useSelector(
    (state) => state.getPenalizedStaff
  );

  // console.log(">>>>>>penalizedStaff", penalizedStaff);

  const { FirstName, LastName, DepartmentName } = staffDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPenaltyReasons());
  }, []);

  useEffect(() => {
    dispatch(getSinglePenalizedStaff(id));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {},
  });

  let fromDate;
  let toDate;

  if (penalizedStaff) {
  }

  const getDiffInDate = (a, b) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  };

  const handleDifference = (e) => {
    const newFromDate = new Date(dateFrom);
    const newToDate = new Date(e.target.value);
    const difference = getDiffInDate(newFromDate, newToDate);
    setDifferenceInDays(difference);
  };

  const handleStaffId = (e) => {
    setDeductionSubmitted(false);
    setStaffId(e.target.value);
    dispatch(getStaff(e.target.value));
  };

  //   console.log(">>>>>staffDetai")

  const resumeSalaryHandler = (data) => {
    console.log(">>>>.e", data);
    const newData = {
      id: penalizedStaff.id,
      toDate: data.toDate,
      fromDate: data.fromDate,
      noOfDays: Number(data.noOfDays),
      history,
      dispatch,
    };

    console.log(">>>>>newData", newData);

    dispatch(resumeSalary(newData));
  };

  // console.log(">>>>>dateFrom", dateFrom);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Payroll System | Account System</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}

      <div className="content container-fluid">
        <div className="" role="document">
          <Toaster />
          <div className="justify-center place-content-center">
            <div className="modal-header">
              <h4 className="modal-title">Resume Staff Salary</h4>
            </div>
            <div className="modal-body card col-lg-10">
              <form onSubmit={handleSubmit(resumeSalaryHandler)}>
                <div className="row">
                  <div className="col-lg-4 m-b-30">
                    <div className="form-group">
                      <label className="col-form-label">
                        From Date
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        {...register("fromDate")}
                        className={classNames(
                          !errors?.fromDate && "focus:border-green-600",
                          errors?.fromDate && "error-class",
                          "form-control ptt-17"
                        )}
                        // value={value}
                        onChange={(e) => setDateFrom(e.target.value)}
                        // name="fromDate"
                        // defaultValue="2022-11-16"
                        type="date"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 m-b-30">
                    <div className="form-group">
                      <label className="col-form-label">
                        To Date
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        {...register("toDate")}
                        className={classNames(
                          !errors?.toDate && "focus:border-green-600",
                          errors?.toDate && "error-class",
                          "form-control ptt-17"
                        )}
                        // value={value}
                        onChange={(e) => handleDifference(e)}
                        // name="toDate"
                        // defaultValue="2022-11-16"
                        type="date"
                      />
                    </div>
                  </div>

                  <InputField
                    register={register}
                    name="noOfDays"
                    label="Number of Days"
                    className="col-lg-4 m-b-30"
                    required
                    type="number"
                    errors={errors.payrollDate}
                    defaultValue={penalizedStaff.noOfDays}
                    value={differenceInDays}
                    // disabled
                  />

                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label">
                        Staff ID
                        <span className="text-danger">*</span>
                      </label>

                      <input
                        placeholder="Enter Staff ID"
                        maxLength={10}
                        {...register("staffId")}
                        onChange={handleStaffId}
                        className={classNames(
                          !errors?.staffId && "focus:border-green-600",
                          errors?.staffId && "error-class",
                          "form-control ptt-17"
                        )}
                        disabled
                        defaultValue={penalizedStaff?.staffId}
                        name="staffId"
                        type="number"
                      />
                    </div>
                  </div>

                  <InputField
                    register={register}
                    name="staffName"
                    label="Staff Name"
                    className="col-lg-4 m-b-30"
                    errors={errors.payrollDate}
                    disabled
                    value={penalizedStaff?.staffName}
                  />
                </div>

                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">
                    {resumeLoading ? <Loader /> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
