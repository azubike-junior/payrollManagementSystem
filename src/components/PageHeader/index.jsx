import React from "react";
import { Link } from "react-router-dom";

export default function PageHeader({ title, link, backTitle, subtitle }) {
  return (
    <div className="page-header">
      <div className="row align-items-center mt-4">
        <div className="col">
          <h3 className="page-title pb-20">{title}</h3>
          {link && (
            <ul className="breadcrumb">
              <li className="breadcrumb-item mt-16">
                <Link className="back-link" to={link}>
                  {backTitle}
                </Link>
              </li>

            <li className="breadcrumb-item">{subtitle}</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
