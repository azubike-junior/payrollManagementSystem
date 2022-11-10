import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "./../../../components/pagination";
import "../../../assets/css/antdstyle.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../../../components/Loader/index";
import InputField from "../../../components/InputField";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { data } from "jquery";
import { addPenaltyReason } from "./../../../services/configurations/penalty/addPenaltyReason";
import { getPenaltyReasons } from "./../../../services/configurations/penalty/getPenaltyReasons";
import { deletePenaltyReason } from './../../../services/configurations/penalty/deletePenaltyReason';

export default function PenaltyReason() {
  const dispatch = useDispatch();
  const { loading: penaltyLoader, data: penalties } = useSelector(
    (state) => state.getPenalty
  );

//   console.log(">>>>>penalties", penalties)

  const { loading: addPenaltyLoader } = useSelector(
    (state) => state.addPenalty
  );

  const { loading: deletePenaltyLoader } = useSelector(
    (state) => state.deletePenalty
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {},
  });

  useEffect(() => {
    dispatch(getPenaltyReasons());
  }, []);

  const addPenaltyHandler = (data) => {
    const newData = {
      penaltyId: penalties?.length + 1,
      reason: data.reason,
      dispatch,
      reset,
    };
    dispatch(addPenaltyReason(newData));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "penaltyId",
    },
    {
      title: "Reason",
      dataIndex: "reason",
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="">
          {/* <a className="btn btn-sm btn-outline-secondary m-r-10">
            <i className="fa fa-pencil m-r-5" /> Edit
          </a> */}
          <a
            className="btn btn-sm btn-outline-danger m-r-10"
            onClick={() => {
              //   setRequestDetail(text);
              console.log(">>>>>>text", text);
              const data = { id: record.id, dispatch };
                dispatch(deletePenaltyReason(data));
            }}
          >
            <i className="fa fa-trash-o m-r-5" />{" "}
            {deletePenaltyLoader && text.id === data.id ? <Loader /> : "Delete"}
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Payroll System | ExpenseTypes</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <Toaster />

      <div className="content container-fluid">
        <div
          className="modal-90w modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Penalty Reason</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(addPenaltyHandler)}>
                <div className="">
                  <InputField
                    className="col-lg-4"
                    register={register}
                    type="text"
                    required
                    name="reason"
                    label="Reason"
                    errors={errors?.reason}
                  />
                </div>

                <div className="col-lg-2 mt-4 m-b-10">
                  <button
                    type="submit"
                    className="btn btn-block btn-suntrust font-weight-700"
                  >
                    {addPenaltyLoader ? <Loader /> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col mt-3">
          <h3 className="page-title">Penalty Reasons</h3>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: penalties?.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                loading={{
                  indicator: <Loader />,
                  spinning: penaltyLoader,
                }}
                style={{ overflowX: "auto" }}
                columns={columns}
                // bordered
                dataSource={penalties}
                rowKey={(record) => record.id}
                // onChange={console.log("change")}
              />
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
}
