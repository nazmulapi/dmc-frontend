"use client";
import React from "react";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const CreateShift = () => {
  return (
    <>
      <section>
        <div>
          <h2 className="border-bottom pb-2">Create Shift</h2>
        </div>
        <form>
          <Row>
            <div className="col-lg-6">
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Shift ID
                </label>
                <input
                  type="text"
                  className="form-control rounded-1 form_border_focus"
                  id=""
                  placeholder=""
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Select Shift<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control rounded-1 form_border_focus"
                  id=""
                  placeholder="Enter shift name"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Start Time
                </label>
                <input
                  type="number"
                  className="form-control rounded-1 form_border_focus"
                  id=""
                  placeholder="Enter Start Time"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  End Time<span className="text-danger"> *</span>
                </label>
                <input
                  type="number"
                  className="form-control rounded-1 form_border_focus"
                  id=""
                  placeholder="Enter End Time"
                />
              </div>
            </div>
          </Row>
          <button className="button-16 fw-semibold" role="button">
            <span class="text">Create</span>
          </button>
        </form>
      </section>
    </>
  );
};

export default CreateShift;
