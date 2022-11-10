import React, { useEffect, useState } from "react";
import payrollItems from "../../utils/payrollItems.json";
import penaltyItems from "../../utils/penaltyItem.json";
import configurationItems from "../../utils/configurationsItems.json";
import { Link, NavLink } from "react-router-dom";
import { updateName } from "../../utils/helper";
import { emptyStateData } from "./../../utils/helper";
import { useStateMachine } from "little-state-machine";
import { useDispatch } from "react-redux";

import logoutItem from "../../utils/logoutItem.json";
import SidebarItem from "../SidebarItem";
import "../../assets/css/sidebar.css";
import avatar from "../../assets/img/avatar.png";

export default function SidebarContent() {
  const [dept, setDept] = useState("");

  const { state, actions } = useStateMachine({ updateName });
  const [open, setOpen] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const dispatch = useDispatch();

  const emptyState = () => {
    actions.updateName(emptyStateData);
  };

  useEffect(() => {
    const departmentName = localStorage.getItem("departmentName");
    setDept(departmentName);
  }, []);

  return (
    <div className="sidebar">
      <div>
        {payrollItems.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>

      <div>
        {configurationItems.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>

      <div>
        {penaltyItems.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>

      <div className="sidebar-title">
        <a
          href="/payroll"
          onClick={() => localStorage.clear()}
          className=" text-white"
        >
          <span>
            <i className="fa fa-sign-out font-20 pl-2 mr-2 ml-2 pt-2"></i>
            Logout
          </span>
        </a>
      </div>
    </div>
  );
}
