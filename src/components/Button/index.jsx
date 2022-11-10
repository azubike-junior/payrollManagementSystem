import React from "react";

export default function Button({ title, type = "button", className, onClick }) {
  return (
    <div className="submit-section m-b-50 m-t-20">
      <button type={type} className={className} onClick={onClick}>
        {title}
      </button>
    </div>
  );
}
