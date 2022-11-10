import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/index";
import { cancelTestRun } from "../../services/payroll/cancelTestRun";
import { classNames } from "../../utils/classNames";
import { useHistory } from 'react-router-dom';
import { confirmOrRejectPenalizedStaff } from './../../services/penalty/confirmOrRejectPenalizedStaff';

export default function RejectModal({
  showRejection,
  toggleRejectionModal,
  subject,
  id,
}) {
  const { loading } = useSelector((state) => state.cancelAfterTestRun);
  const dispatch = useDispatch();
  const history = useHistory()

  const staffId = localStorage.getItem("initiatorId");

  const rejectionHandler = (data) => {
    const newData = {
      id,
      decision: "Rejected",
      staffId,
      comment: data.comment,
      toggleRejectionModal,
      history
    };

    console.log(">>>>rejection", newData);

    dispatch(confirmOrRejectPenalizedStaff(newData));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {},
  });

  return (
    <Modal show={showRejection} centered backdrop="static" keyboard={false}>
      <div className="modal-90w modal-dialog-centered modal-lg" role="document">
        <form
          className="modal-content"
          onSubmit={handleSubmit(rejectionHandler)}
        >
          <div className="modal-header bg-danger align-items-center justify-content-center">
            <h5 className="modal-title text-white m-b-0" id="modal_title_6">
              REJECT {subject}
            </h5>
          </div>
          <div className="modal-body">
            <div className="py-3 text-center">
              <h5 className="heading">Add a Comment</h5>
              <div className="form-group col-lg-12 col-md-12 col-sm-12 m-b-10 font-weight-700">
                <textarea
                  rows="3"
                  style={{ resize: "none" }}
                  {...register("comment", { required: true })}
                  name="comment"
                  className={classNames(
                    errors?.comment ? "error-class" : "",
                    "form-control m-b-10"
                  )}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer justify-content-center align-items-center">
            <button
              type="submit"
              className="btn btn-block btn-success font-weight-700 col-sm-4"
            >
              {loading ? <Loader /> : "CONFIRM"}
            </button>
            <button
              onClick={() => toggleRejectionModal()}
              className="btn btn-block text-danger font-weight-700 col-sm-4"
              data-dismiss="modal"
              type="button"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
