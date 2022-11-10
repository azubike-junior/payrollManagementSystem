import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteExpenseModal } from "../../services/modals/modals";
import Loader from "../Loader/index";
import { cancelTestRun } from "../../services/payroll/cancelTestRun";

export default function CancelModal({
  openCancelModal,
  toggleCancelModal,
  runPayroll,
  decision,
}) {
  const { loading } = useSelector((state) => state.cancelAfterTestRun);
  const dispatch = useDispatch();

  const data = { dispatch, toggleCancelModal };

  return (
    <Modal show={openCancelModal} centered backdrop="static" keyboard={false}>
      <div className="modal-90w  modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="form-header">
              {decision ? (
                <h3>Reject Payroll Process</h3>
              ) : (
                <h3>Reject Test Run</h3>
              )}
              <p>Are you sure you want to cancel this process?</p>
            </div>
            <div className="modal-btn delete-action">
              <div className="row">
                <div className="col-6">
                  <a
                    className="btn btn-block btn-primary"
                    onClick={() =>
                      decision ? runPayroll() : dispatch(cancelTestRun(data))
                    }
                  >
                    {loading ? <Loader /> : decision ? "Confirm" : "Confirm"}
                  </a>
                </div>
                <div className="col-6">
                  <a
                    onClick={() => toggleCancelModal()}
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
