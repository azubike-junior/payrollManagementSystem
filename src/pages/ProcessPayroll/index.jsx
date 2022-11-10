import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Select, Option } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../components/pagination";
import "../../assets/css/antdstyle.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Loader from "../../components/Loader/index";
import { getTestPayroll } from "./../../services/payroll/getTempPayroll";
import { approveTestRun } from "./../../services/payroll/approveTestPayroll";
import CancelModal from "../../components/Modals/cancelModal";
import ConfirmationModal from "./../../components/Modals/submitModal";
import { downloadPayroll } from "./../../services/payroll/downloadPayroll";
import { Toaster } from "react-hot-toast";

const ProcessPayroll = () => {
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const toggleCancelModal = () => {
    setOpenCancelModal(!openCancelModal);
  };

  const toggleConfirmationModal = () => {
    setOpenConfirmationModal(!openConfirmationModal);
  };

  const dispatch = useDispatch();

  const { data: testedPayrolls } = useSelector(
    (state) => state.getAllTestPayroll
  );

  const { loading: submitLoading } = useSelector(
    (state) => state.approveTestRunPayroll
  );

  const initiatorId = localStorage.getItem("initiatorId")

  const submitPayroll = () => {
    const data = {
      dispatch,
      initiatorId,
      payrollDatex: testedPayrolls[0]?.payRollDate.split("T")[0],
      salaryDatex: testedPayrolls[0]?.salaryDate.split("T")[0],
      toggleConfirmationModal,
    };

    console.log(">>>dta", data);

    dispatch(approveTestRun(data));
  };

  useEffect(() => {
    dispatch(getTestPayroll());
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
      title: "Staff Id",
      dataIndex: "staffId",
      render: (text, record) => <h2 className="table-avatar">{text}</h2>,
    },
    {
      title: "Staff Grade",
      dataIndex: "staffGrade",
      render: (text, record) => <h2 className="table-avatar">{text}</h2>,
    },
    {
      title: "Staff Name",
      dataIndex: "staffName",
      render: (text, record) => <h2 className="table-avatar">{text}</h2>,
    },
    {
      title: "Salary",
      dataIndex: "basicSalary",
      render: (text, record) => <h2 className="table-avatar">{text}</h2>,
    },
    {
      title: "Expense Type",
      dataIndex: "expenseType",
      render: (text, record) => <h2 className="table-avatar">{text}</h2>,
    },
  ];

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Payroll System | Process Payroll</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <Toaster />

      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header pt-20">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Process Payroll</h3>
            </div>
          </div>

          <div className="float-right d-flex col-lg-3 pt-28 mt-30">
            <div className="dropdown m-l-125 m-t-30">
              <button
                className="btn btn-primary"
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                // disabled={status === "" || dateTo === "" || dateFrom === ""}
                onClick={() => dispatch(downloadPayroll())}
              >
                Download
              </button>
            </div>
          </div>
        </div>
        {/* /Page Header */}

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: testedPayrolls?.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                // loading={{
                //   indicator: <Loader />,
                //   spinning: pendingDataLoading,
                // }}
                style={{ overflowX: "auto" }}
                columns={columns}
                // bordered
                dataSource={
                  testedPayrolls[0]?.status === "PENDING" ? 0 : testedPayrolls
                }
              />
            </div>
          </div>
        </div>

        {testedPayrolls[0]?.status === "TESTRUN" && (
          <div className="form-group col-lg-8 col-md-8 col-sm-8 m-t-50 m-b-20">
            <div className="d-flex align-items-center justify-content-center">
              <div className="col-lg-3 col-md-6 col-sm-12 m-b-10">
                <button
                  onClick={() => toggleConfirmationModal()}
                  className="btn btn-block btn-primary font-weight-700"
                >
                  Submit
                </button>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 m-b-10">
                <button
                  className="btn btn-block btn-danger font-weight-700"
                  onClick={() => toggleCancelModal()}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* /Page Content */}

      <CancelModal
        openCancelModal={openCancelModal}
        toggleCancelModal={toggleCancelModal}
      />

      <ConfirmationModal
        loading={submitLoading}
        submitPayroll={submitPayroll}
        openConfirmationModal={openConfirmationModal}
        toggleConfirmationModal={toggleConfirmationModal}
      />
    </div>
  );
};

export default ProcessPayroll;
