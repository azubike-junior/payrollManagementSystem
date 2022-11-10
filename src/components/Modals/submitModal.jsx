import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteExpenseModal } from "../../services/modals/modals";
import Loader from "../Loader/index";
import { cancelTestRun } from "../../services/payroll/cancelTestRun";

export default function ConfirmationModal({
  openConfirmationModal,
  loading,
  submitPayroll,
  toggleConfirmationModal,
  decision,
}) {
  //   const { loading } = useSelector((state) => state.cancelAfterTestRun);
  const dispatch = useDispatch();

  return (
    <Modal
      show={openConfirmationModal}
      centered
      backdrop="static"
      keyboard={false}
    >
      <div className="modal-90w  modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="form-header">
              {decision ?  <h3>Run Payroll</h3> :  <h3>Test Run Payroll</h3>}
              <p>Are you sure you want to continue with the process?</p>
            </div>
            <div className="modal-btn delete-action">
              <div className="row">
                <div className="col-6">
                  <a
                    className="btn btn-block btn-primary"
                    onClick={() => submitPayroll()}
                  >
                    {loading ? <Loader /> : "Submit"}
                  </a>
                </div>
                <div className="col-6">
                  <a
                    onClick={() => toggleConfirmationModal()}
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
