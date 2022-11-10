import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import "../../assets/css/antdstyle.css";
import suntrustlogo from "../../assets/img/st_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { getTestPayroll } from "../../services/payroll/getTempPayroll";

const ViewSlip = () => {
  const dispatch = useDispatch();

  const { data: testedPayrolls } = useSelector(
    (state) => state.getAllTestPayroll
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
    dispatch(getTestPayroll());
  }, []);

  const staffId = localStorage.getItem("initiatorId");

  const item = testedPayrolls?.find((payroll) => payroll.staffId === staffId);

  const format = (number) => {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    });

    return formatter.format(number);
  };

  const deductions =
    Number(item?.nhf) +
    Number(item?.employeePension) +
    Number(item?.healthInsurance) +
    Number(item?.lifeInsurance);

  console.log(">>>>.deductions", deductions);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Payroll System | Slip</title>
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
              <h4 className="modal-title">Payroll Slip</h4>
            </div>
          </div>
        </div>

        {testedPayrolls.length === 0 ? (
          <p className="font-30 font-bold mt-4 text-center">Payroll Slip has not been generated</p>
        ) : (
          <div className="col mt-3">
            <div class="invoice-box">
              <table cellpadding="0" cellspacing="0">
                <tr class="top">
                  <td colspan="2">
                    <table>
                      <tr>
                        <td class="title">
                          <img src={suntrustlogo} width={60} height={55} />
                        </td>

                        <td className="font-12">
                          <span
                            style={{ color: "#005D30", fontWeight: "bold" }}
                            className=" font-12"
                          >
                            Address
                          </span>
                          : Suntrust Bank Ltd.
                          <br />
                          1, Oladele Olashore Street
                          <br />
                          VI, Lagos
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <hr />

                <tr class="information">
                  <td colspan="2">
                    <table>
                      <tr>
                        <td>
                          <span className="font-14">{item?.staffName}</span>
                          <br />
                          Information Technology
                          <br />
                          <span
                            style={{ color: "#005D30", fontWeight: "bold" }}
                            className=" font-14"
                          >
                            Staff ID:
                          </span>{" "}
                          {item?.staffId}
                        </td>

                        <td className="font-14">
                          <span style={{ color: "#005D30" }}>Currency</span> :{" "}
                          {item?.currency}
                          <br />
                          <span style={{ color: "#005D30" }}>Gross Pay</span>:
                          {item?.grossSalary}
                          <br />
                          <span style={{ color: "#005D30" }}>
                            Total Deductions
                          </span>
                          : {deductions}
                          <br />
                          {/* <span style={{ color: "#005D30" }}>Total NetPay</span>:
                        VI, Lagos */}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* <tr class="heading">
                <td>Earnings</td>

                <td>Amount (NGN)</td>
              </tr>

              <tr class="details">
                <td>Check</td>

                <td>1000</td>
              </tr> */}

                <tr class="heading">
                  <td>Earnings</td>

                  <td>Amount(NGN)</td>
                </tr>

                <tr class="item">
                  <td>Basic Salary</td>

                  <td>{format(item?.basicSalary).replace("NGN", "")}</td>
                </tr>

                <tr class="item">
                  <td>Education Allowance</td>
                  <td>{format(item?.education).replace("NGN", "")}</td>
                </tr>

                <tr class="item">
                  <td>Dressing Allowance</td>
                  <td>{format(item?.dressing).replace("NGN", "")}</td>
                </tr>

                <tr class="item">
                  <td>Entertainment</td>
                  <td>{format(item?.entertainment).replace("NGN", "")}</td>
                </tr>

                <tr class="item">
                  <td>Housing Allowance</td>
                  <td>{format(item?.housing).replace("NGN", "")}</td>
                </tr>

                <tr class="item">
                  <td>Lunch Allowance</td>
                  <td>{format(item?.lunch).replace("NGN", "")}</td>
                </tr>

                <tr class="item">
                  <td>Transport Allowance</td>
                  <td>{format(item?.transport).replace("NGN", "")}</td>
                </tr>

                <tr class="item">
                  <td>Utility Allowance</td>
                  <td>{format(item?.utility).replace("NGN", "")}</td>
                </tr>

                <tr class="item">
                  <td>Vacation</td>
                  <td>{format(item?.leaveAllowance).replace("NGN", "")}</td>
                </tr>

                <tr class="heading">
                  <td>Gross Pay</td>

                  <td>{format(item?.grossSalary).replace("NGN", "")}</td>
                </tr>

                <tr class="total">
                  <td></td>
                  <td></td>
                </tr>
                <tr class="total">
                  <td></td>

                  <td></td>
                </tr>

                <tr class="heading">
                  <td>Deductions</td>
                  <td>Amount (NGN)</td>
                </tr>

                <tr class="item">
                  <td>NHF</td>
                  <td>{format(item?.nhf).replace("NGN", "")}</td>
                </tr>

                <tr class="item">
                  <td>Annual Pension Employee</td>
                  <td>{format(item?.employeePension).replace("NGN", "")}</td>
                </tr>

                <tr class="item">
                  <td>Health Insurance</td>
                  <td>{format(item?.healthInsurance).replace("NGN", "")}</td>
                </tr>

                <tr class="item">
                  <td>Life Insurance</td>
                  <td>{format(item?.lifeInsurance).replace("NGN", "")}</td>
                </tr>

                <tr class="item">
                  <td>Gratuity</td>
                  <td>{format(item?.gratuity).replace("NGN", "")}</td>
                </tr>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSlip;
