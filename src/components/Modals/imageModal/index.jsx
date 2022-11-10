import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function DisplayImageModal({
  displayImageModal,
  toggleImageModal,
  documentRef,
}) {
  return (
    <Modal show={displayImageModal} centered backdrop="static" keyboard={false}>
      <div className="modal-90w modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              onClick={() => toggleImageModal()}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <iframe
            src={documentRef}
            style={{ height: "400px" }}
            title="Iframe Example"
          ></iframe>
          {/* </div> */}
        </div>
      </div>
    </Modal>
  );
}
