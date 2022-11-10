import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table, Select, Option } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../../components/pagination";
import "../../../assets/css/antdstyle.css";
import AddRequestModal from "../../../components/Modals/configurations/requestModals/AddRequestModal";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleRequestModal,
  toggleEditRequestModal,
  toggleDeleteRequestModal,
} from "../../../services/modals/modals";
import { useForm } from "react-hook-form";
import Loader from "./../../../components/Loader/index";
import DeleteRequestModal from "./../../../components/Modals/configurations/requestModals/DeleteRequestModal/index";
import EditRequestModal from "./../../../components/Modals/configurations/requestModals/EditRequestmodal/index";
import { getRequests } from "./../../../services/configurations/requests/getRequests";
import { getExpenses } from "../../../services/Requests/getAllExpenses";
import { getPendingRequests } from "../../../services/Request/getAllPendingRequests";
// import { getAllPendingRequests } from "../../../services/Requests/getPendingExpenses";
import { getRejectedRequests } from "./../../../services/Request/getAllRejectedRequests";
import { getApprovedRequests } from "./../../../services/Request/getAllApprovedRequests";
import Swal from "sweetalert2";
import { baseUrl, hardUtils } from "../../../utils/helper";
import { getVendorLists } from "../../../services/Expense/getVendorList";
import { getPaidRequests } from "../../../services/reports/Fincon/getPaidRequests";
import { getPartiallyPaid } from "./../../../services/reports/Fincon/getPartiallyPaidRequest";
import { downloadPartiallyPaidRequests } from "./../../../services/reports/Fincon/downloadPartiallyPaid";
import { downloadPaidRequests } from "./../../../services/reports/Fincon/downloadPaidReports";
import { downloadFinconRequestByStatus } from "./../../../services/reports/Fincon/downloadReportByStatus";

const FinconReports = () => {
  const [requestDetail, setRequestDetail] = useState({});
  const [status, setStatus] = useState("pending");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    return setStatus(value);
  };
  const [loadingRequest, setLoadingRequest] = useState();

  const dispatch = useDispatch();
  const { openRequest } = useSelector((state) => state.modalReducer);

  const { data: pendingRequest, loading: pendingDataLoading } = useSelector(
    (state) => state.getAllPendingRequestsReducer
  );

  const { data: approvedRequest, loading: approvedDataLoading } = useSelector(
    (state) => state.getAllApprovedRequestsReducer
  );

  const { data: rejectedRequest, loading: rejectedDataLoading } = useSelector(
    (state) => state.getAllRejectedRequestsReducer
  );

  const { data: paidRequests, loading: paidDataLoading } = useSelector(
    (state) => state.getAllPaidRequestsReducer
  );

  const { data: partiallyPaidRequests, loading: partialDataLoading } =
    useSelector((state) => state.getPartiallyPaidRequests);

  const { loading: partiallyPaidDownloadLoading } = useSelector(
    (state) => state.downloadAllPartiallyPaidRequests
  );

  const { loading: fullyPaidDownloadLoading } = useSelector(
    (state) => state.downloadAllPartiallyPaidRequests
  );

  // const { data: vendorLists, loading: vendorLoading } = useSelector(
  //   (state) => state.getAllVendorListsReducer
  // );

  // console.log(">>>>>>>paiddddd", paidRequests)

  const downloadReport = () => {
    const data = {
      status,
      dateFrom,
      dateTo,
    };

    if (status === "partiallyPaid") {
      dispatch(downloadPartiallyPaidRequests(data));
    }
    if (status === "paid") {
      dispatch(downloadPaidRequests(data));
    }
    if (
      status === "rejected" ||
      status === "approved" ||
      status === "pending"
    ) {
      dispatch(downloadFinconRequestByStatus(data));
    }

    setDateFrom("");
    setDateTo("");
  };

  useEffect(() => {
    dispatch(getPendingRequests(hardUtils.requestorId));
  }, [status]);

  useEffect(() => {
    if (status === "pending") {
      setLoadingRequest(pendingDataLoading);
    }
    if (status === "approved") {
      setLoadingRequest(approvedDataLoading);
      dispatch(getApprovedRequests(hardUtils.requestorId));
    }
    if (status === "rejected") {
      dispatch(getRejectedRequests(hardUtils.requestorId));
      setLoadingRequest(rejectedDataLoading);
    }
    if (status === "paid") {
      // console.log(">>>>>>>okayyy")
      dispatch(getPaidRequests());
      setLoadingRequest(paidDataLoading);
    }
    if (status === "partiallyPaid") {
      dispatch(getPartiallyPaid());
      setLoadingRequest(partialDataLoading);
    }
    if (status === "rejected") {
      dispatch(getRejectedRequests(hardUtils.requestorId));
      setLoadingRequest(rejectedDataLoading);
    }
  }, [status]);

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
      title: "Department",
      dataIndex: "RequestByID",
      render: (text, record) => <h2 className="table-avatar">{text}</h2>,
    },
    {
      title: "Request Type",
      dataIndex: "RequestType",
      render: (text, record) => <h2 className="table-avatar">{text}</h2>,
    },
    {
      title: "Requestor Name",
      dataIndex: "RequestByName",
      render: (text, record) => <h2 className="table-avatar">{text}</h2>,
    },
    {
      title: "Initial Payment",
      dataIndex: "InitialPercentage",
      render: (text, record) => (
        <h2 className="table-avatar">
          {record?.PaymentStatusCode === "01"
            ? `#${(
                (record?.InitialPercentage / 100) *
                record?.Amount
              ).toFixed()} (${record?.InitialPercentage}%)`
            : record?.PaymentStatusDescription === "COMPLETED"
            ? `#${(
                (record?.InitialPercentage / 100) *
                record?.Amount
              ).toFixed()} (${record?.InitialPercentage}%)`
            : `#0.00 (${record?.InitialPercentage}%)`}
        </h2>
      ),
    },
    {
      title: "Balance Payment",
      dataIndex: "percentageBeingPaid",
      render: (text, record) => (
        <h2 className="table-avatar">
          {record?.PaymentStatusCode === "01"
            ? `#${(
                record?.Amount -
                (record?.InitialPercentage / 100) * record?.Amount
              ).toFixed()}`
            : `#${record?.Amount}`}
        </h2>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "Amount",
      render: (text, record) => <h2 className="table-avatar">#{text}</h2>,
    },
    {
      title: "Request Date",
      dataIndex: "DateCreated",
      render: (text, record) => (
        <div className="table-avatar">{text?.split("T")[0]}</div>
      ),
    },
    {
      title: "",
      render: (text, record) => (
        <Link
          to={`/expenseManagement/requests/myRequestDetails/${text.Id}`}
          className="btn btn-sm btn-outline-primary m-r-10"
        >
          <i className="fa fa-eye m-r-5" />
          View Details
        </Link>
      ),
    },
  ];

  // console.log(">>>>>rejected", rejectedRequest);

  // useEffect(() => {
  //   dispatch(getVendorLists(pendingRequest?.Id));
  // }, []);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Expense Management | Requests</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}

      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header pt-20">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Request Reports</h3>
            </div>
          </div>
        </div>
        {/* /Page Header */}

        <div className="row m-b-30 ">
          <div className="form-group col-lg-3 col-md-6 col-sm-12">
            <h5 className="control-label font-16">Request Status</h5>
            <select
              onChange={(e) => handleChange(e)}
              value={status}
              className="custom-select form-control"
            >
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="paid">Paid</option>
              <option value="partiallyPaid">Partially Paid</option>
              <option
                value="pending"
                onClick={() => dispatch(getPendingRequests())}
              >
                Pending
              </option>
            </select>
          </div>
          <div className="form-group col-lg-3 col-md-6 col-sm-12 ">
            <h5 className="control-label font-16">From Date:</h5>
            <input
              onChange={(e) => setDateFrom(e.target.value)}
              type="date"
              name="dateFrom"
              className="form-control"
            />
          </div>
          <div className="form-group col-lg-3 col-md-6 col-sm-12 ">
            <h5 className="control-label font-16">To Date:</h5>
            <input
              onChange={(e) => setDateTo(e.target.value)}
              type="date"
              name="dateTo"
              className="form-control"
            />
          </div>

          {(status === "rejected" && rejectedRequest.length === 0) ||
          (status === "pending" && pendingRequest.length === 0) ||
          (status === "approved" && approvedRequest.length === 0) ||
          (status === "paid" && paidRequests.length === 0) ||
          (status === "partiallyPaid" && partiallyPaidRequests.length === 0) ? (
            ""
          ) : (
            <div className="float-right d-flex col-lg-3 pt-28">
              <div className="dropdown m-l-125 m-t-30">
                <button
                  className="btn btn-primary"
                  type="button"
                  disabled={status === "" || dateTo === "" || dateFrom === ""}
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={() => {
                    downloadReport();
                  }}
                >
                  {partiallyPaidDownloadLoading ? (
                    <Loader />
                  ) : fullyPaidDownloadLoading ? (
                    <Loader />
                  ) : (
                    "Download"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <h3 className=" font-18">
          {status === "paid" && "Paid"}{" "}
          {status === "partiallyPaid" && "Partially Paid"}{" "}
          {status === "approved" && "Approved"}{" "}
          {status === "rejected" && "Rejected"}{" "}
          {status === "pending" && "Pending"} Requests
        </h3>

        {/* Search Filter */}

        {/* Search Filter */}

        {pendingRequest.statusCode === "96" ? (
          <div className="text-danger text-center">
            Sorry, Something went wrong
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  className="table-striped"
                  pagination={{
                    total: pendingRequest?.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  loading={{
                    indicator: <Loader />,
                    spinning:
                      status === "pending"
                        ? pendingDataLoading
                        : status === "rejected"
                        ? rejectedDataLoading
                        : status === "approved"
                        ? approvedDataLoading
                        : pendingDataLoading,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  // bordered
                  dataSource={
                    status === "pending"
                      ? pendingRequest
                      : status === "rejected"
                      ? rejectedRequest
                      : status === "approved"
                      ? approvedRequest
                      : status === "paid"
                      ? paidRequests
                      : status === "partiallyPaid"
                      ? partiallyPaidRequests
                      : pendingRequest
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* /Page Content */}

      {/* Add Request Modal */}
      <AddRequestModal />
      {/* /Add Request Modal */}

      {/* Edit Request Modal */}
      <EditRequestModal requestDetail={requestDetail} />
      {/* /Edit Request Modal */}

      {/* Delete Request Modal */}
      <DeleteRequestModal requestDetail={requestDetail} />
      {/* /Delete Request Modal */}
    </div>
  );
};

export default FinconReports;
