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
import { getActivePausedSalary } from './../../../services/penalty/getActivePausedSalary';

export default function ActivePausedSalaries() {
  const ulRef = useRef();
  const inputRef = useRef();
  const [staffId, setStaffId] = useState("");
  const [deductionSubmitted, setDeductionSubmitted] = useState(false);


  const { loading, data: activePausedStaffSalary } = useSelector(
    (state) => state.getAllActivePausedSalary
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivePausedSalary());
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

  const columns = [
    {
      title: "STAFF ID",
      dataIndex: "staffId",
    },
    {
      title: "STAFF NAME",
      dataIndex: "staffName",
    },
    {
      title: "STATUS",
      dataIndex: "status",
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
          to={`/payroll/penalty/resumeSalary/${text.id}`}
          className="btn btn-sm btn-outline-primary m-r-10"
        >
          <i className="fa fa-eye m-r-5" />
          Resume Staff Salary
        </Link>
      ),
    },
  ];


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
              <h4 className="modal-title">Paused Staffs Salary</h4>
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
                total: activePausedStaffSalary.length,
                showTotal: (total, range) =>
                  `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                showSizeChanger: true,
                onShowSizeChange: onShowSizeChange,
                itemRender: itemRender,
              }}
              loading={{
                indicator: <Loader />,
                spinning: null,
              }}
              style={{ overflowX: "auto" }}
              columns={columns}
              // bordered
              dataSource={activePausedStaffSalary}
              rowKey={(record) => record.id}
              // onChange={console.log("change")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
