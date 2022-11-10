import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/index";
import { classNames } from "../../../utils/classNames";
import InputField, { SelectField } from "../../../components/InputField/index";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import { itemRender, onShowSizeChange } from "../../../components/pagination";
import { Toaster } from "react-hot-toast";
import { useRef } from "react";
import { onBoardStaff } from "../../../services/onboarding/onboardStaff";
import { getOnBoardedStaffs } from "./../../../services/onboarding/getOnboardedStaffs";
import { Link } from "react-router-dom";
import { getStaff } from "../../../services/onboarding/getStaffs";
import { deleteOnBoardedStaff } from './../../../services/onboarding/deleteOnBoardedStaff';

export default function StaffOnboarding() {
  const ulRef = useRef();
  const inputRef = useRef();
  const [staffId, setStaffId] = useState("");
  const [deductionSubmitted, setDeductionSubmitted] = useState(false);

  const stuffs = ["112", "335", "301", "201"];

  const [options, setOptions] = useState([]);

  const onInputChange = (e) => {
    const newOptions = stuffs.filter((option) =>
      option.includes(e.target.value)
    );
    setOptions(newOptions);
  };

  const handleStaffId = (e) => {
    setDeductionSubmitted(false);
    setStaffId(e.target.value);
    dispatch(getStaff(e.target.value));
  };

  const { loading: staffLoading, data: staffDetails } = useSelector(
    (state) => state.getStaffDetails
  );

  const { FirstName, LastName, DepartmentName, DepartmentCode } = staffDetails;

  const { loading: onBoardedStaffsLoading, data: onBoardedStaffs } =
    useSelector((state) => state.getAllOnBoardedStaffs);

  // console.log(">>>>>>onBoardedStaffs", onBoardedStaffs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOnBoardedStaffs());
  }, []);

  // useEffect(() => {
  //   console.log("<<<>>>>>got here");
  //   dispatch(getAllStaffPenalized());
  // }, []);

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
      title: "RESUMPTION DATE",
      dataIndex: "resumptionDate",
    },
    {
      title: "PRORATE DATE",
      dataIndex: "porateDate",
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="">
          <a
            className="btn btn-sm btn-outline-danger m-r-10"
            onClick={() => {
              const data = { id: record.id, dispatch };
              dispatch(deleteOnBoardedStaff(data));
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
          to={`/payroll/config/enrollment/${text.id}`}
          className="btn btn-sm btn-outline-primary m-r-10"
        >
          <i className="fa fa-eye m-r-5" />
          View Details
        </Link>
      ),
    },
  ];

  const onBoardStaffHandler = (data, e) => {
    const newData = {
      staffId,
      porateDate: Number(data.porateDate),
      staffName: FirstName + " " + LastName,
      resumptionDate: data.resumptionDate,
      departmentCode: DepartmentCode,
      departmentName: DepartmentName,
      dispatch,
      reset,
      setDeductionSubmitted,
      dispatch,
      reset,
    };

    console.log(">>>>>data", newData);

    dispatch(onBoardStaff(newData));
  };

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
              <h4 className="modal-title">Enroll A New Staff</h4>
            </div>
            <div className="modal-body card col-lg-10">
              <form onSubmit={handleSubmit(onBoardStaffHandler)}>
                <div className="row">
                  <InputField
                    register={register}
                    name="resumptionDate"
                    label="Resumption Date"
                    className="col-lg-4 m-b-30"
                    required
                    type="date"
                    errors={errors.resumptionDate}
                    // message={
                    //   watchStartDate < today
                    //     ? "Start date should not be earlier than current date"
                    //     : ""
                    // }
                  />

                  <InputField
                    register={register}
                    name="porateDate"
                    label="No of Days Worked (prorate Days)"
                    className="col-lg-4 m-b-30"
                    required
                    type="number"
                    errors={errors.resumptionDate}
                    // message={
                    //   watchStartDate < today
                    //     ? "Start date should not be earlier than current date"
                    //     : ""
                    // }
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

                    <div className="col-lg-12 col-md-6 col-sm-12">
                      {staffLoading && (
                        <p>
                          <Loader />
                        </p>
                      )}
                    </div>
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
                  <button className="btn btn-primary submit-btn">Submit</button>
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
                total: onBoardedStaffs.length,
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
              dataSource={onBoardedStaffs}
              rowKey={(record) => record.id}
              // onChange={console.log("change")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
