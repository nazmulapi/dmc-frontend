"use client";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const AssignScreen = () => {
  return (
    <>
      <div>
        <div>
          <h2 className="border-bottom pb-2 mb-4 text-capitalize">
            Assign screen
          </h2>
        </div>
        <form>
          <Row>
            <Col lg={4} className="px-2">
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Select screen<span className="text-danger"> *</span>
                </label>
                <select
                  className="form-select rounded-1 py-2 form_border_focus"
                  aria-label="Default select example"
                >
                  <option>select screen</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </Col>
            <Col lg={4} className="px-2">
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Select group<span className="text-danger"> *</span>
                </label>
                <select
                  className="form-select rounded-1 py-2 form_border_focus"
                  aria-label="Default select example"
                >
                  <option>select group</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </Col>

            <div className="button-section">
              <button
                className="dynami_button submit ms-2 rounded-1"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Row>
        </form>

        <div className="employee_table table-responsive mt-5">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">SL</th>
                <th scope="col">Device ID</th>
                <th scope="col">Group</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>API000000</td>
                <td>group</td>
                <td>
                  <button className="border-0 rounded-1 bg-danger">
                    <RiDeleteBin6Line color="#fff" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AssignScreen;
