"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Row, Col } from "react-bootstrap";
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBin6Line } from "react-icons/ri";
import EditEmployee from "../employee/EditEmployee";
// import Form from "react-bootstrap/Form";
// import { Row, Col } from "react-bootstrap";
import { fetcher } from "../../../lib/fetcher";
import Pagination from "../../utils/Pagination";

const ManageInfo = () => {
  return (
    <>
      <section>
      <div className="form_part mb-3">
          <form>
            <Row>
              <Col lg={6}>
                <div>
                  <select
                    className="form-select rounded-1 mb-3 form_border_focus"
                    aria-label="Default select example "
                  >
                    <option selected>Select Department</option>
                    <option value="1">Doctor</option>
                    <option value="2">Staff</option>
                  </select>
                </div>

                <div className="col-auto">
                  <input
                    type="search"
                    id=""
                    placeholder="search"
                    className="form-control form_border_focus rounded-1"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div>
                  <select
                    className="form-select rounded-1 mb-3 form_border_focus"
                    aria-label="Default select example "
                  >
                    <option selected>Select Year</option>
                    <option value="1">2023</option>
                    <option value="2">2022</option>
                    <option value="2">2021</option>
                    <option value="2">2020</option>
                  </select>
                </div>
                <div>
                  <select
                    className="form-select rounded-1 mb-3 form_border_focus"
                    aria-label="Default select example "
                  >
                    <option selected>Select Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="11">December</option>
                  </select>
                </div>
              </Col>
            </Row>
          </form>
        </div>
        <div className="employee_table table-responsive">
          <table className="table table-bordered table-striped font_14">
            <thead>
              <tr>
                <th scope="col">
                  <div className="form-check p-0">
                    <input
                      className=""
                      type="checkbox"
                      value=""
                      id="EmployeeListAllCheckbox"
                    />
                  </div>
                </th>
                <th scope="col">SL</th>
                <th scope="col">image</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">In Time</th>
                <th scope="col">Designation</th>
                <th scope="col">Status</th> 
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <div className="form-check p-0">
                    <input className="" type="checkbox" value="" id="" />
                  </div>
                </th>
                <th scope="row">1</th>
                <th scope="row" className="text-center">
                  <img src="/images.png" alt="" className="table_user_img" />
                </th>
                <td>API000000</td>
                <td>MD Mamun</td>
                <td>09:00AM</td>
                <td>N/A</td>
                <td>N/A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ManageInfo;
