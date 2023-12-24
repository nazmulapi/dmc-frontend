"use client";
import React from "react";
import Button from "react-bootstrap/Button";
import { FaRegEdit } from "react-icons/fa";
import { Row } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";

const AssignShift = () => {
  return (
    <>
      <section>
        <div>
          <h2 className="border-bottom pb-2">Assign Shift</h2>
        </div>
        <div className="search_part mb-3">
          <div className=" p-2">
            <form>
              <Row>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-1 form_border_focus"
                      id=""
                      placeholder="Enter Employee"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Shift<span className="text-danger"> *</span>
                    </label>
                    <select
                      className="form-select form_border_focus rounded-1"
                      aria-label="Default select example"
                    >
                      <option>select shift</option>
                      <option value="1">Morning shift</option>
                      <option value="2">Evening shift</option>
                      <option value="3">Night shift</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-1 form_border_focus"
                      id=""
                      placeholder=" "
                    />
                  </div>
                </div>
              </Row>
              <button className="button-16 fw-semibold" role="button">
                <span className="text">Assign</span>
              </button>
            </form>
          </div>
        </div>

        {/* <div className="employee_table table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">SL</th>
                <th scope="col">Departments</th>
                <th scope="col">Departments Details</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>API00000</td>
                <td>Md Azad </td>
                <td>
                  <button className="add_btn_color border-0 rounded-1 me-2">
                    <FaRegEdit color="white" />
                  </button>
                  <button className="bg-danger border-0 rounded-1">
                    <RiDeleteBin6Line color="white" />
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>API00000</td>
                <td>Md Azad </td>
                <td>
                  <button className="add_btn_color border-0 rounded-1 me-2">
                    <FaRegEdit color="white" />
                  </button>
                  <button className="bg-danger border-0 rounded-1">
                    <RiDeleteBin6Line color="white" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </section>
    </>
  );
};

export default AssignShift;
