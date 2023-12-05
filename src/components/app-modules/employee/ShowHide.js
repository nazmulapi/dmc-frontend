import React, { useState } from "react";
// import { Form } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Field, ErrorMessage } from "formik";

const ShowHide = () => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  return (
    <>
      <div className="d-flex">
        <div className="form-check me-2">
          <input
            className="form-check-input"
            onClick={handleClick}
            type="checkbox"
            value=""
            name="employee_role"
            id=""
          />
          <label className="form-check-label" htmlFor="">
            Is Admin
          </label>
        </div>
        <div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Is staff
            </label>
          </div>
        </div>
      </div>

      {isShown && (
        <div className="">
          <div className="mb-2">
            <label className="mb-2">
              Password<span className="text-danger">*</span>
            </label>
            <Field
              type="password"
              placeholder=""
              className="form-control rounded-1 form_border_focus"
              name="password"
            />
            <div className="text-danger">
              <ErrorMessage name="phone_num" />
            </div>
          </div>
          <div className="mb-2">
            <label className="mb-2">
              Confirm Password<span className="text-danger">*</span>
            </label>
            <Field
              type="password"
              placeholder=""
              className="form-control rounded-1 form_border_focus"
              name="confirm_password"
            />
            <div className="text-danger">
              <ErrorMessage name="phone_num" />
            </div>
          </div>
        </div>
      )}

      {/* show component on click  */}
      {isShown || (
        <div>
          <h2></h2>
        </div>
      )}
    </>
  );
};

export default ShowHide;
