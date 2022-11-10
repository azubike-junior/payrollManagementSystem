import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteExpenseModal } from "../../services/modals/modals";
import Loader from "../Loader/index";
import { cancelTestRun } from "../../services/payroll/cancelTestRun";
import { confirmOrRejectEnrollment } from "./../../services/onboarding/confirmOrRejectEnrollment";
import { useHistory } from 'react-router-dom';
import { confirmOrRejectPenalizedStaff } from './../../services/penalty/confirmOrRejectPenalizedStaff';

export default function ApproveModal({
  toggleApprovalModal,
  showApproval,
  subject,
  decision,
  id,
}) {
  const { loading } = useSelector(
    (state) => state.confirmOrRejectOnBoardingEnrollment
  );
  const dispatch = useDispatch();
  const history = useHistory()

  const staffId = localStorage.getItem("initiatorId");

  const data = {
    id,
    staffId,
    decision: "Approved",
    toggleApprovalModal,
    history
  };

  return (
    <Modal show={showApproval} centered backdrop="static" keyboard={false}>
      <div className="modal-90w  modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="form-header">
              <h3>Approve {subject}</h3>
              <p>Are you sure you want to approve this process?</p>
            </div>
            <div className="modal-btn delete-action">
              <div className="row">
                <div className="col-6">
                  <a
                    className="btn btn-block btn-primary"
                    onClick={() =>
                      // console.log(">>>>>>hello", subject)
                      subject === "Enrollment"
                        ? dispatch(confirmOrRejectEnrollment(data))
                        : dispatch(confirmOrRejectPenalizedStaff(data))
                    }
                  >
                    {loading ? <Loader /> : decision ? "Confirm" : "Confirm"}
                  </a>
                </div>
                <div className="col-6">
                  <a
                    onClick={() => toggleApprovalModal()}
                    className="btn btn-block btn-outline-danger"
                  >
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
