"use client";
import React from "react";
import Button from "react-bootstrap/Button";

const AddDesignation = () => {
  return (
    <>
      <section>
        <div>
          <h2 className="border-bottom pb-2">Create Departments</h2>
        </div>
        <div className="col-lg-6">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Departments
              </label>
              <input
                type="text"
                className="form-control rounded-1 form_border_focus"
                id=""
                placeholder="Enter Departments"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Departments Details
              </label>
              <textarea
                className="form-control form_border_focus rounded-1"
                id=""
                rows="3"
              ></textarea>
            </div>
            <Button
              type="submit"
              className="rounded-1 mt-2 px-4 add_btn_color border-0"
            >
              + Add
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddDesignation;
