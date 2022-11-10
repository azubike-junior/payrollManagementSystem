import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleAddExpenseModal } from "../../services/modals/modals";

export default function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="vertical-align-wrap">
      <div className="vertical-align-middle auth-main">
        {/* <div className="auth-box"> */}
          <div className="text-center mb-3">
            <div className="header-text mb-2">
              <h2>Welcome to Payroll Management System</h2>{" "}
            </div>
            <div className="header-text mb-4">
              <h4>Create and Manage all your Payrolls.</h4>{" "}
            </div>
            <button
              onClick={() => {
                history.push("/payroll/runTest");
                dispatch(toggleAddExpenseModal());
              }}
              className="btn btn-suntrust btn-lg"
            >
              <i className="la la-plus m-r-5" />
              Test Run Payroll
            </button>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}
