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

export default function PayrollAccountType() {
  const [submitted, setSubmitted] = useState(false);
  const [branchCode, setBranchCode] = useState("");
  const [customerNum, setCustomerNum] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [ledgerCode, setLedgerCode] = useState("");
  const [subAccCode, setSubAccCode] = useState("");
  const [ledgerSubmitted, setLedgerSubmitted] = useState(false);

  const { data: expenseTypes } = useSelector((state) => state.getAllExpenses);

  const { data: branches } = useSelector((state) => state.getAllBranches);

  const { loading: fetchingName, data: accountName } = useSelector(
    (state) => state.fetchAccountName
  );

  const { loading: postAccountNameLoading } = useSelector(
    (state) => state.addPayrollAccountExpense
  );

  const { loading: payrollAccountLoading, data: payrollAccounts } = useSelector(
    (state) => state.getAllPayrollAccounts
  );

  const handleBranchCodeChange = (e) => {
    setBranchCode(e.target.value);
  };

  const handleCustomerNumChange = (e) => {
    setCustomerNum(e.target.value);
  };

  const handleCurrencyCodeChange = (e) => {
    setCurrencyCode(e.target.value);
  };

  const handleLedgerCodeChange = (e) => {
    setLedgerCode(e.target.value);
  };

  console.log(">>>>>accountName", accountName);

  const handleSubAccountChange = (e) => {
    if (e.target.value.length > 0) {
      const data = {
        bra_code: Number(branchCode.split("-")[0]),
        cus_num: Number(customerNum),
        cur_code: Number(currencyCode),
        led_code: Number(ledgerCode),
        sub_acct_code: Number(e.target.value),
      };
      dispatch(getAccountName(data));
    }
    setSubAccCode(e.target.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpenseTypes());
  }, []);

  useEffect(() => {
    dispatch(getBranches());
  }, []);

  useEffect(() => {
    dispatch(getPayrollAccounts());
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
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "EXPENSE TYPE",
      dataIndex: "expenseName",
    },
    {
      title: "BRANCH LOCATION",
      dataIndex: "branchLocationName",
    },
    {
      title: "ACCOUNT NAME",
      dataIndex: "accountName",
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="">
          <a
            className="btn btn-sm btn-outline-danger m-r-10"
            onClick={() => {
              const data = { id: record.id, dispatch };
              dispatch(deletePayrollAccount(data));
            }}
          >
            <i className="fa fa-trash-o m-r-5" /> Delete
          </a>
        </div>
      ),
    },
  ];

  const addPayrollAccountHandler = (data, e) => {
    if (data) {
      const {
        expenseType,
        branchCode,
        customerNumber,
        currencyCode,
        ledgerCode,
        subAccountCode,
      } = data;

      const payrollData = {
        branchLocation: branchCode.split("-")[1]?.trim(),
        branchCode: Number(branchCode.split("-")[0]),
        cusNum: Number(customerNumber),
        ledNum: Number(ledgerCode),
        curCode: Number(currencyCode),
        subAccCode: Number(subAccountCode),
        expenseId: expenseType.split("+")[0],
        expenseName: expenseType.split("+")[1]?.trim(),
        accountName,
      };

      console.log(">>>>>payrollData", payrollData);

      const newData = {
        payrollData,
        dispatch,
        reset,
        setSubmitted,
        setLedgerSubmitted,
      };
      dispatch(addAccountExpense(newData));
    }
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Payroll System | Account System</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}

      <div className="content container-fluid">
        <div
          className="modal-90w modal-dialog-centered modal-lg"
          role="document"
        >
          <Toaster />
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Payroll Account</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(addPayrollAccountHandler)}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Expense Type<span className="text-danger">*</span>
                      </label>
                      <select
                        name="expenseType"
                        {...register("expenseType", { required: true })}
                        className={classNames(
                          errors?.expenseTypes ? "error-class" : "",
                          "form-control"
                        )}
                      >
                        <option value="">Select Expense </option>,
                        {expenseTypes.map((expense) => {
                          return (
                            <option
                              value={`${expense.id} + ${expense.description}`}
                            >
                              {expense.description}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Branch Code<span className="text-danger">*</span>
                      </label>
                      <select
                        name="branchCode"
                        {...register("branchCode")}
                        onChange={handleBranchCodeChange}
                        className={classNames(
                          !errors?.branchCode && "focus:border-green-600",
                          errors?.branchCode && "error-class",
                          "form-control"
                        )}
                      >
                        <option value="">Select Branch </option>,
                        {branches.map((branch) => {
                          return (
                            <option
                              value={`${branch.branchCode} - ${branch.branch}`}
                            >
                              {`${branch.branchCode} - ${branch.branch}`}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label">
                        Customer Number
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        maxLength={10}
                        {...register("customerNumber")}
                        onKeyUp={handleCustomerNumChange}
                        className={classNames(
                          !errors?.customerNumber && "focus:border-green-600",
                          errors?.customerNumber && "error-class",
                          "form-control ptt-17"
                        )}
                        name="customerNumber"
                        type="number"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label">
                        Currency Code
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        maxLength={10}
                        {...register("currencyCode", { required: true })}
                        onKeyUp={handleCurrencyCodeChange}
                        className={classNames(
                          !errors?.currencyCode && "focus:border-green-600",
                          errors?.currencyCode && "error-class",
                          "form-control ptt-17"
                        )}
                        name="currencyCode"
                        type="number"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label">
                        Ledger Code
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        maxLength={10}
                        {...register("ledgerCode")}
                        onKeyUp={handleLedgerCodeChange}
                        className={classNames(
                          !errors?.ledgerCode && "focus:border-green-600",
                          errors?.ledgerCode && "error-class",
                          "form-control ptt-17"
                        )}
                        name="ledgerCode"
                        type="number"
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label className="col-form-label">
                        Sub-Account Code
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        maxLength={10}
                        {...register("subAccountCode")}
                        onKeyUp={handleSubAccountChange}
                        className={classNames(
                          !errors?.subAccountCode && "focus:border-green-600",
                          errors?.subAccountCode && "error-class",
                          "form-control ptt-17"
                        )}
                        name="subAccountCode"
                        type="number"
                      />
                    </div>
                  </div>

                  <InputField
                    className="col-lg-4 col-md-6 col-sm-12"
                    label="Account Name"
                    name="accountName"
                    {...register("accountName")}
                    value={
                      ledgerSubmitted
                        ? ""
                        : accountName.statusCode === "96"
                        ? ""
                        : accountName
                    }
                    register={register}
                    errors={errors?.accountName}
                    formClass="form-control ptt-17"
                    disabled={true}
                  />
                </div>

                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">
                    {postAccountNameLoading ? <Loader /> : "Submit"}
                  </button>
                </div>
              </form>
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
                      total: payrollAccounts.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    loading={{
                      indicator: <Loader />,
                      spinning: payrollAccountLoading,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={columns}
                    // bordered
                    dataSource={payrollAccounts}
                    rowKey={(record) => record.id}
                    // onChange={console.log("change")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
