"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const AttendanceManage = () => {
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
        <div className="search_part border mb-3">
          <div className="d-flex justify-content-end p-2">
            <div className="d-flex justify-content-between">
              <div className="me-2">
                <Button
                  type="submit"
                  className="rounded-1 px-4 add_btn_color border-0"
                >
                  PDF
                </Button>
              </div>
              <div className="me-2">
                <Button
                  type="submit"
                  className="rounded-1 px-4 add_btn_color border-0"
                >
                  CSV
                </Button>
              </div>
              <div>
                <Button
                  type="submit"
                  className="rounded-1 px-4 add_btn_color border-0"
                >
                  Excel
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="employee_table table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
              <th scope="row">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                  </div>
                </th>
                <th scope="col">SL</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">In Time</th>
                <th scope="col">Out Time</th>
                <th scope="col">Date</th>
                {/*<th scope="col">Tardiness</th>
                <th scope="col">Minutes</th>
                <th scope="col">Cumulative</th>
                <th scope="col">Action</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                  </div>
                </th>
                <th scope="row">1</th>
                <td>API00000</td>
                <td>Md Azad </td>
                <td className="text-danger">00:00:00</td>
                <td>00:00:00</td>
                <td>00-00-0000</td>
                {/*<td>00:00:00</td>
                 <td>00:00:00</td>
                <td>00:00:00</td>
                <td>
                  <button className="add_btn_color border-0 rounded-1 me-2">
                    <FaRegEdit color="white" />
                  </button>
                  <button className="bg-danger border-0 rounded-1">
                    <RiDeleteBin6Line color="white" />
                  </button>
                </td> */}
              </tr>
              <tr>
              <th scope="row">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                  </div>
                </th>
                <th scope="row">2</th>
                <td>API00000</td>
                <td>Md Mamun </td>
                <td>00:00:00</td>
                <td>00:00:00</td>
                <td>00-00-0000</td>
                {/*<td>00:00:00</td>
                 <td>00:00:00</td>
                <td>00:00:00</td>
                <td>
                  <button className="add_btn_color border-0 rounded-1 me-2">
                    <FaRegEdit color="white" />
                  </button>
                  <button className="bg-danger border-0 rounded-1">
                    <RiDeleteBin6Line color="white" />
                  </button>
                </td> */}
              </tr>
              <tr>
              <th scope="row">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                  </div>
                </th>
                <th scope="row">3</th>
                <td>API00000</td>
                <td>Md Mihal </td>
                <td>00:00:00</td>
                <td>00:00:00</td>
                <td>00-00-0000</td>
                {/*<td>00:00:00</td>
                 <td>00:00:00</td>
                <td>00:00:00</td>
                <td>
                  <button className="add_btn_color border-0 rounded-1 me-2">
                    <FaRegEdit color="white" />
                  </button>
                  <button className="bg-danger border-0 rounded-1">
                    <RiDeleteBin6Line color="white" />
                  </button>
                </td> */}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AttendanceManage;
