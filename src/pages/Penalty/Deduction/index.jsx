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
import { Link } from "react-router-dom";
import { deletePenalizedStaff } from "./../../../services/penalty/deletePenalizedStaff";
import { getAllStaffPenalized } from "./../../../services/penalty/getPenalizedStaffs";

export default function Deduction() {
  const ulRef = useRef();
  const inputRef = useRef();
  const [staffId, setStaffId] = useState("");
  const [deductionSubmitted, setDeductionSubmitted] = useState(false);

  const trans = [
    { id: 1, type: "Debit" },
    { id: 2, type: "Credit" },
  ];

  const { loading: submitLoading } = useSelector(
    (state) => state.penalizeStaffs
  );

  const { loading: penaltyLoading, data: penaltyReasons } = useSelector(
    (state) => state.getPenalty
  );

  const { loading: staffLoading, data: staffDetails } = useSelector(
    (state) => state.getStaffDetails
  );

  // console.log(">>>>>>staffDerials", staffDetails);

  const { loading: penalizedStaffsLoading, data: penalizedStaffs } =
    useSelector((state) => state.getAllPenalizedStaffs);

  const { FirstName, LastName, DepartmentName, DepartmentCode } = staffDetails;

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {},
  });

  const columns = [
    {
      title: "STAFF ID",
      dataIndex: "staffId",
    },
    {
      title: "STATUS",
      dataIndex: "status",
    },
    {
      title: "STAFF NAME",
      dataIndex: "staffName",
    },
    {
      title: "FROM DATE",
      dataIndex: "fromDate",
    },
    {
      title: "TO DATE",
      dataIndex: "toDate",
    },
    {
      title: "NUMBER OF DAYS",
      dataIndex: "noOfDays",
    },
    {
      title: "REASON",
      dataIndex: "penaltyReason",
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="">
          <a
            className="btn btn-sm btn-outline-danger m-r-10"
            onClick={() => {
              const data = { dispatch, id: record.id };
              dispatch(deletePenalizedStaff(data));
            }}
          >
            <i className="fa fa-trash-o m-r-5" /> Delete
          </a>
        </div>
      ),
    },
    {
      title: "",
      render: (text, record) => (
        <Link
          to={`/payroll/penalty/deduction/${text.id}`}
          className="btn btn-sm btn-outline-primary m-r-10"
        >
          <i className="fa fa-eye m-r-5" />
          View Details
        </Link>
      ),
    },
  ];

  const handleStaffId = (e) => {
    setDeductionSubmitted(false);
    setStaffId(e.target.value);
    dispatch(getStaff(e.target.value));
  };

  //   console.log(">>>>>staffDetai")

  const deductionHandler = (data, e) => {
    if (!FirstName && !LastName) {
      return;
    }

    const reason = data.reason.split("+");

    console.log(reason);

    const newData = {
      type: reason[1],
      staffId,
      penaltyReason: reason[1],
      penaltyId: Number(reason[0]),
      staffName: FirstName + " " + LastName,
      toDate: data.toDate,
      fromDate: data.fromDate,
      db_cr_ind: Number(data.db_cr_ind),
      noOfDays: Number(data.noOfDays),
      departmentName: DepartmentName,
      departmentCode: DepartmentCode,
      setDeductionSubmitted,
      dispatch,
      reset,
    };

    // console.log(">>>>>newData", newData);

    dispatch(penalizeStaff(newData));
  };

  useEffect(() => {
    // console.log("<<<>>>>>got here");
    dispatch(getAllStaffPenalized());
  }, []);

  useEffect(() => {
    dispatch(getPenaltyReasons());
  }, []);

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
              <h4 className="modal-title">Deduct Staff Salary</h4>
            </div>
            <div className="modal-body card col-lg-10">
              <form onSubmit={handleSubmit(deductionHandler)}>
                <div className="row">
                  <InputField
                    register={register}
                    name="fromDate"
                    label="From Date"
                    className="col-lg-4 m-b-30"
                    required
                    type="date"
                    errors={errors.fromDate}
                    // message={
                    //   watchStartDate < today
                    //     ? "Start date should not be earlier than current date"
                    //     : ""
                    // }
                  />

                  <InputField
                    register={register}
                    name="toDate"
                    label="To Date"
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
                    name="noOfDays"
                    label="Number of Days"
                    className="col-lg-4 m-b-30"
                    required
                    type="number"
                    errors={errors.payrollDate}
                    // message={
                    //   watchStartDate < today
                    //     ? "Start date should not be earlier than current date"
                    //     : ""
                    // }
                  />

                  <div className="col-lg-4">
                    <div className="form-group">
                      <label className="col-form-label">
                        Reason<span className="text-danger">*</span>
                      </label>
                      <select
                        name="reason"
                        {...register("reason", { required: true })}
                        className={classNames(
                          !errors?.reason && "focus:border-green-600",
                          errors?.reason && "error-class",
                          "form-control ptt-17"
                        )}
                      >
                        <option value="">Select reason</option>
                        {penaltyReasons.map((penalty) => {
                          return (
                            <option
                              value={`${penalty.penaltyId}+${penalty.reason}`}
                            >
                              {penalty.reason}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="form-group">
                      <label className="col-form-label">
                        Transaction Type<span className="text-danger">*</span>
                      </label>
                      <select
                        name="db_cr_ind"
                        {...register("db_cr_ind", { required: true })}
                        className={classNames(
                          !errors?.branchCode && "focus:border-green-600",
                          errors?.branchCode && "error-class",
                          "form-control ptt-17"
                        )}
                      >
                        <option value="">Select type</option>
                        {trans.map((tran) => {
                          return <option value={tran.id}>{tran.type}</option>;
                        })}
                      </select>
                    </div>
                  </div>

                  {/* <div className="col-lg-4">
                    <div className="form-group">
                      <label className="col-form-label mb-3">
                        Staff ID<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control search-bar"
                        placeholder="search"
                        onChange={onInputChange}
                        ref={inputRef}
                      />
                      <ul ref={ulRef} className="list-group results col-lg">
                        {options.map((option, index) => {
                          return (
                            <li
                              key={index}
                              type="button"
                              onClick={(e) => {
                                inputRef.current.value = option;
                                setStaffId(option);
                              }}
                              className="list-group-item list-group-item-action"
                              style={{ color: "black" }}
                            >
                              {option}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div> */}

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
                        // onKeyDown={handleStaffId}
                        // onKeyUp={handleStaffId}
                        className={classNames(
                          !errors?.staffId && "focus:border-green-600",
                          errors?.staffId && "error-class",
                          "form-control ptt-17"
                        )}
                        name="staffId"
                        type="number"
                      />
                    </div>
                    {/* {customerResponse?.responsecode === "96" && (
                      <p className="text-danger font-12">
                        Invalid Account Number
                      </p>
                    )} */}
                  </div>

                  <div className="col-lg-12 col-md-6 col-sm-12">
                    {staffLoading && (
                      <p>
                        <Loader />
                      </p>
                    )}
                  </div>

                  <InputField
                    register={register}
                    name="staffName"
                    label="Staff Name"
                    className="col-lg-4 m-b-30 mt-4"
                    errors={errors.payrollDate}
                    disabled
                    value={
                      deductionSubmitted
                        ? ""
                        : FirstName === undefined && LastName === undefined
                        ? ""
                        : staffDetails?.statusCode === "96"
                        ? ""
                        : FirstName + " " + LastName
                    }
                  />

                  <InputField
                    register={register}
                    name="department"
                    label="Department"
                    className="col-lg-4 m-b-30 mt-4"
                    errors={errors.department}
                    disabled
                    value={
                      deductionSubmitted
                        ? ""
                        : staffDetails?.statusCode === "96"
                        ? ""
                        : DepartmentName
                    }
                  />
                </div>

                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">
                    {submitLoading ? <Loader /> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <Table
              className="table-striped"
              pagination={{
                total: penalizedStaffs.length,
                showTotal: (total, range) =>
                  `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                showSizeChanger: true,
                onShowSizeChange: onShowSizeChange,
                itemRender: itemRender,
              }}
              loading={{
                indicator: <Loader />,
                spinning: penalizedStaffsLoading,
              }}
              style={{ overflowX: "auto" }}
              columns={columns}
              // bordered
              dataSource={penalizedStaffs}
              rowKey={(record) => record.id}
              // onChange={console.log("change")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
