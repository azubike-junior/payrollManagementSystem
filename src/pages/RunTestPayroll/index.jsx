/**
 * TermsCondition Page
 */
import React, { Component, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import "../../assets/css/antdstyle.css";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import { addSelect, timeDuration } from "../../utils/helper";
import { classNames } from "../../utils/classNames";
import { useSelector, useDispatch } from "react-redux";
// import { setupAppraisal } from "../../../services/PerformanceManagement/Configurations/appraisalSetup/setUpAppraisal";
import Loader from "../../components/Loader/index";
import { itemRender, onShowSizeChange } from "../../components/pagination";
import { getPayrollAccounts } from "./../../services/configurations/payrollAccount/getPayrollAccount";
import { runTestPayroll } from "../../services/payroll/runTestPayroll";
import { Toaster } from "react-hot-toast";
import { checkPendingTestPayroll } from "./../../services/payroll/checkPendingStatus";
import { checkTestRun } from "./../../services/payroll/checkTestRun";
import { useHistory } from "react-router-dom";

const RunTestPayroll = () => {
  const [appraisalPeriod, setAppraisalPeriod] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const { data: payrollAccountTypes } = useSelector(
    (state) => state.getAllPayrollAccounts
  );

  const { data: checkedData } = useSelector((state) => state.checkIfPending);

  const { loading: testPayrollLoading } = useSelector(
    (state) => state.testPayroll
  );

  let today = new Date().toISOString().slice(0, 10);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const runTestPayrollHandler = (data) => {
    const newData = { reset, dispatch, data };
    dispatch(runTestPayroll(newData));
  };

  useEffect(() => {
    dispatch(checkTestRun(history));
  }, []);

  useEffect(() => {
    dispatch(getPayrollAccounts());
  }, []);

  useEffect(() => {
    dispatch(checkPendingTestPayroll());
  }, []);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Run Test Payroll</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>

      {/* Page Content */}
      <div className="content container-fluid">
        <Toaster />
        <form
          className="m-b-50 col-lg-12"
          onSubmit={handleSubmit(runTestPayrollHandler)}
        >
          <div className="card-body">
            <div className="row flex-column">
              <div className="col-lg-12 m-t-10 m-b-20">
                <h3 className="user-name m-t-0">Test Payroll</h3>
              </div>

              <InputField
                register={register}
                name="payRollDatex"
                label="Payroll Date"
                className="col-lg-4 m-b-30"
                required
                type="date"
                errors={errors.payrollDate}
                // message={
                //   watchStartDate < today
                //     ? "Start date should not be earlier than current date"
                //     : ""
                // }
              />

              <InputField
                register={register}
                name="salaryDatex"
                label="Salary Date"
                className="col-lg-4 m-b-30"
                //   defaultValue={today}
                required
                type="date"
                errors={errors.salaryDate}
              />

              <div className="col-lg-4 m-b-10">
                <div className="m-b-10">Payment Type</div>
                <div className="form-group">
                  <select
                    {...register("expenseType", { required: true })}
                    className={classNames(
                      errors?.paymentType ? "error-class" : "",
                      "form-control"
                    )}
                  >
                    <option value="">Select Option</option>
                    {payrollAccountTypes.map((account) => {
                      return (
                        <option value={account.expenseName}>
                          {account.expenseName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-lg-3 mt-3 m-b-10">
                <div className="form-group">
                  <button
                    disabled={checkedData === true}
                    type="submit"
                    className="btn btn-block btn-suntrust font-weight-700"
                  >
                    {testPayrollLoading ? <Loader /> : "Test Payroll"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* /Page Content */}
    </div>
  );
};
export default RunTestPayroll;
