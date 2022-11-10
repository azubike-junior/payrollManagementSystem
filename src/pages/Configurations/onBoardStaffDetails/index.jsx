/**
 * TermsCondition Page
 */
import React, { Component, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Table } from "antd";
import { itemRender, onShowSizeChange } from "../../../components/pagination";
import "../../../assets/css/antdstyle.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import Loader from "../../../components/Loader";
import { getSinglePenalizedStaff } from "../../../services/penalty/getPenalizedStaff";
import CancelModal from "../../../components/Modals/cancelModal";
import ConfirmationModal from "../../../components/Modals/submitModal";
import ApproveModal from "../../../components/Modals/approveModal";
import RejectModal from "../../../components/Modals/rejectModal";
import { getSingleOnBoardedStaff } from "./../../../services/onboarding/getOnboardedStaffDetails";
import { Toaster } from "react-hot-toast";

const OnBoardedStaffDetails = () => {
  const { id } = useParams();
  const subject = "Enrollment";

  const dispatch = useDispatch();
  const [reason, setReason] = useState({});
  const [showReason, setShowReason] = useState(false);
  const [showApproval, setShowApprovalModal] = useState(false);
  const [showRejection, setShowRejectionModal] = useState(false);
  const [documentRef, setDocumentRef] = useState("");
  const [displayImageModal, setDisplayImageModal] = useState(false);

  const loggedInStaff = localStorage.getItem("initiatorId");

  const toggleApprovalModal = () => {
    setShowApprovalModal(!showApproval);
  };

  const toggleRejectionModal = () => {
    setShowRejectionModal(!showRejection);
  };

  const { loading: onBoardedStaffLoading, data: onBoardedStaff } = useSelector(
    (state) => state.getOneOnBoardedStaff
  );

  //   console.log(">>>>>penalizedStaff", onBoardedStaff);
  const { porateDate, staffId, staffName, status, resumptionDate, departmentName, departmentCode } =
    onBoardedStaff;

  // Table displayed on Expense Page
  const columns = [
    {
      title: "Request ID",
      dataIndex: "req_id",
      sorter: (a, b) => a.mobile.length - b.mobile.length,
    },
    {
      title: "Request Date",
      dataIndex: "req_date",
      render: (text, record) => <h2 className="table-avatar">{text}</h2>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Staff ID",
      dataIndex: "staff_id",
      sorter: (a, b) => a.employee_id.length - b.employee_id.length,
    },
    {
      title: "Amount Requested",
      dataIndex: "amount_req",
      sorter: (a, b) => a.employee_id.length - b.employee_id.length,
    },
    {
      title: "Description",
      dataIndex: "desc_txt",
      sorter: (a, b) => a.employee_id.length - b.employee_id.length,
    },
    {
      title: "",
      render: (text, record) => (
        <Link
          to="/app/employees/expenseRequests"
          className="btn btn-sm btn-outline-primary m-r-10"
        >
          <i className="fa fa-eye m-r-5" />
          View Details
        </Link>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getSingleOnBoardedStaff(id));
  }, []);

  console.log(">>>>>loggedInStaff", loggedInStaff, status);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Client Profile - HRMS admin Template</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        <Toaster />
        {/* Page Header */}
        <div className="page-header pt-20">
          <div className="row">
            <div className="col-sm-12">
              {/* <h3 className="page-title pb-20"></h3> */}
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link className="back-link" to="/payroll/config/enrollment">
                    Go Back
                  </Link>
                </li>
                <li className="breadcrumb-item">Details</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}

        <div className="card m-b-50">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <div className="profile-view">
                  <div className="row">
                    {onBoardedStaffLoading ? (
                      <Loader />
                    ) : (
                      <div className="col-md-12 m-b-30">
                        <h3 className="user-name m-t-0 m-b-30">
                          Enrolled Staff Details
                        </h3>
                        <div className="pending-status mb-3">{status}</div>
                        <div className="d-flex m-b-10">
                          <div className="m-r-30 col-md-3 font-weight-600">
                            Staff ID:
                          </div>
                          <div className="m-r-20 col-md-9 font-weight-600">
                            {staffId}
                          </div>
                        </div>

                        <div className="d-flex m-b-10">
                          <div className="m-r-30 col-md-3 font-weight-600">
                            Staff Name:
                          </div>
                          <div className="m-r-30 col-md-9 font-weight-600">
                            {staffName}
                          </div>
                        </div>

                        <div className="d-flex m-b-10">
                          <div className="m-r-30 col-md-3 font-weight-600">
                            Department:
                          </div>
                          <div className="m-r-30 col-md-9 font-weight-600">
                            {departmentName}
                          </div>
                        </div>

                        <div className="d-flex m-b-10">
                          <div className="m-r-30 col-md-3 font-weight-600">
                            Department Code:
                          </div>
                          <div className="m-r-30 col-md-9 font-weight-600">
                            {departmentCode}
                          </div>
                        </div>

                        <div className="d-flex m-b-10">
                          <div className="m-r-30 col-md-3 font-weight-600">
                            Resumption Date:
                          </div>
                          <div className="m-r-30 col-md-9 font-weight-600">
                            {resumptionDate}
                          </div>
                        </div>

                        <div className="d-flex m-b-10">
                          <div className="m-r-30 col-md-3 font-weight-600 ">
                            Prorate Days:
                          </div>
                          <div className="m-r-30 col-md-9 font-weight-600 ">
                            {porateDate} Days
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Approve and Reject Buttons */}
        {status == "Active" || status == "Rejected"
          ? ""
          : loggedInStaff == 325 && (
              <div className="form-group col-lg-12 col-md-12 col-sm-12 m-t-50 m-b-20">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="col-lg-3 col-md-6 col-sm-12 m-b-10">
                    <button
                      className="btn btn-block btn-success font-weight-700"
                      onClick={() => toggleApprovalModal()}
                    >
                      APPROVE
                    </button>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 m-b-10">
                    <button
                      className="btn btn-block btn-danger font-weight-700"
                      onClick={() => toggleRejectionModal()}
                    >
                      REJECT
                    </button>
                  </div>
                </div>
              </div>
            )}

        {/* {status === "Active"  ? "" :  (
          <div className="form-group col-lg-12 col-md-12 col-sm-12 m-t-50 m-b-20">
            <div className="d-flex align-items-center justify-content-center">
              <div className="col-lg-3 col-md-6 col-sm-12 m-b-10">
                <button
                  className="btn btn-block btn-success font-weight-700"
                  onClick={() => toggleApprovalModal()}
                >
                  APPROVE
                </button>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 m-b-10">
                <button
                  className="btn btn-block btn-danger font-weight-700"
                  onClick={() => toggleRejectionModal()}
                >
                  REJECT
                </button>
              </div>
            </div>
          </div>
        )} */}
      </div>
      {/* /Page Content */}

      <RejectModal
        id={id}
        toggleRejectionModal={toggleRejectionModal}
        dispatch={dispatch}
        showRejection={showRejection}
        subject={"ENROLLMENT"}
      />

      <ApproveModal
        id={id}
        subject={subject}
        showApproval={showApproval}
        toggleApprovalModal={toggleApprovalModal}
      />
    </div>
  );
};
export default OnBoardedStaffDetails;
