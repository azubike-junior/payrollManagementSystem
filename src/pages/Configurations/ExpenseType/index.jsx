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
import { getExpenseTypes } from "./../../../services/configurations/expenseType/getExpenseTypes";
import { addExpenseType } from "./../../../services/configurations/expenseType/addExpenseType";
import { Toaster } from "react-hot-toast";
import { deleteExpenseType } from "./../../../services/configurations/expenseType/deleteExpenseType";
import { data } from "jquery";

const StaffExpenseTypes = () => {
  const dispatch = useDispatch();
  const { loading: expensesLoader, data: expenseTypes } = useSelector(
    (state) => state.getAllExpenses
  );

  const { loading: addExpenseLoader } = useSelector(
    (state) => state.addExpense
  );

  const { loading: deleteExpenseLoader } = useSelector(
    (state) => state.deleteExpense
  );

  //   console.log(">>>.expepsne", expenseTypes);

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
    dispatch(getExpenseTypes());
  }, []);

  const addExpenseHandler = (data) => {
    const newData = { data, dispatch, reset };
    dispatch(addExpenseType(newData));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "EXPENSE TYPE",
      dataIndex: "description",
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
              dispatch(deleteExpenseType(data));
            }}
          >
            <i className="fa fa-trash-o m-r-5" />{" "}
            {deleteExpenseLoader && text.id === data.id ? <Loader /> : "Delete"}
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
              <h4 className="modal-title">Add Expense Type</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(addExpenseHandler)}>
                <div className="">
                  <InputField
                    className="col-lg-4"
                    register={register}
                    type="text"
                    required
                    name="description"
                    label="Expense Type"
                    errors={errors?.expenseType}
                  />
                </div>

                <div className="col-lg-2 mt-4 m-b-10">
                  <button
                    type="submit"
                    className="btn btn-block btn-suntrust font-weight-700"
                  >
                    {addExpenseLoader ? <Loader /> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col mt-3">
          <h3 className="page-title">Expense Types</h3>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <Table
                className="table-striped"
                pagination={{
                  total: expenseTypes?.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                loading={{
                  indicator: <Loader />,
                  spinning: expensesLoader,
                }}
                style={{ overflowX: "auto" }}
                columns={columns}
                // bordered
                dataSource={expenseTypes}
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
};

export default StaffExpenseTypes;
