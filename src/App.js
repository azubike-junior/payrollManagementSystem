import React, { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
  Switch,
  useHistory,
} from "react-router-dom";
// import SidebarContent from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./pages/Login";
import "font-awesome/css/font-awesome.min.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/line-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/sidebar.css";
import "./assets/css/main.css";
import "./assets/js/task.js";
// import "./assets/js/multiselect.min.js";
import "./assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css";
// import "./assets/css/bootstrap-datetimepicker.min.css";
import "./assets/css/style.css";
import "./assets/css/demo.css";
import PrivateRoute from "./components/Router/PrivateRoute";
import { createBrowserHistory } from "history";

import { Container, Box, Button, makeStyles } from "@material-ui/core";
// import Expenses from "./pages/Expenses";
import SidebarContent from "./components/SidebarContent.js";
import Dashboard from "./pages/Dashboard";
// import RunTestPayroll from "./pages/RunTestPayroll";
import RunTestPayroll from "./pages/RunTestPayroll/index";
import ProcessPayroll from "./pages/ProcessPayroll";
import PendingPayroll from "./pages/PendingPayroll";
import StaffExpenseTypes from "./pages/Configurations/ExpenseType";
import PayrollAccountType from "./pages/Configurations/PayrollAccountType";
import ViewSlip from "./pages/ViewSlip/index";
import ResumeSalary from "./pages/Penalty/ResumeSalary";
import StaffEnrollment from "./pages/Configurations/StaffOnboarding/index";
import PenaltyReason from "./pages/Configurations/PenaltyReason/index";
import Deduction from "./pages/Penalty/Deduction/index";
import StaffDetails from "./pages/StaffDetails/index";
import OnBoardedStaffDetails from './pages/Configurations/onBoardStaffDetails/index';
import ActivePausedSalaries from './pages/Penalty/ActivePausedSalaries/index';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
  },
}));

const browserHistory = createBrowserHistory({
  basename: "/payroll",
});

function App() {
  const history = useHistory();
  const classes = useStyles();
  const [isAuthenticated, setAuth] = useState(false);
  let button;

  // useEffect(() => {
  //   return () => {
  //     if (window.performance.navigation.type == 1) {
  //       window.location.href = "/expenseManagement/dashboard";
  //     }
  //   };
  // }, []);

  return (
    <>
      <Router history={browserHistory}>
        {/* <SessionTimeout /> */}

        <Switch>
          <Route exact path="/payroll" component={Login} />

          <div>
            <Header />
            <div>
              {/* <RefreshRoute
                path="/expenseManagement/dashboard"
                redirectionPath="/expenseManagement/dashboard"
              /> */}
              <PrivateRoute
                exact
                path="/payroll/dashboard"
                component={Dashboard}
              />
              <PrivateRoute exact path="/payroll/slip" component={ViewSlip} />
              <PrivateRoute
                exact
                path="/payroll/runTest"
                component={RunTestPayroll}
              />
              <PrivateRoute
                exact
                path="/payroll/processPayroll"
                component={ProcessPayroll}
              />
              <PrivateRoute
                exact
                path="/payroll/pendingProcess"
                component={PendingPayroll}
              />
              <PrivateRoute
                exact
                path="/payroll/config/expenseType"
                component={StaffExpenseTypes}
              />

              <PrivateRoute
                exact
                path="/payroll/config/payrollAccountType"
                component={PayrollAccountType}
              />

              <PrivateRoute
                exact
                path="/payroll/config/penaltyReason"
                component={PenaltyReason}
              />
              <PrivateRoute
                exact
                path="/payroll/penalty/deduction"
                component={Deduction}
              />
              <PrivateRoute
                exact
                path="/payroll/penalty/resumeSalary/:id"
                component={ResumeSalary}
              />
              <PrivateRoute
                exact
                path="/payroll/penalty/activePausedStaffs"
                component={ActivePausedSalaries}
              />
              <PrivateRoute
                exact
                path="/payroll/config/enrollment"
                component={StaffEnrollment}
              />
              <PrivateRoute
                exact
                path="/payroll/penalty/deduction/:id"
                component={StaffDetails}
              />
              <PrivateRoute
                exact
                path="/payroll/config/enrollment/:id"
                component={OnBoardedStaffDetails}
              />
            </div>
            <SidebarContent />
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;
