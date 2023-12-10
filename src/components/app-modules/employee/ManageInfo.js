"use client";

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetchEmployee } from "../../../lib/fetch";
import EditEmployee from "./EditEmployee";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";

const ManageInfo = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchEmployee();
      setEmployees(response?.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <section>
        <div className="search_part border mb-3">
          <div className="d-flex justify-content-between p-2">
            <div className="">
              <div className=" d-flex">
                <div>
                  <input
                    type="file"
                    className="form-control rounded-1 form_border_focus"
                  />
                </div>
                <div>
                  <input
                    type="submit"
                    className="form-control form_border_focus rounded-1 theme_color fw-semibold text-white ms-3"
                    value="import"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="me-2">
                <Button
                  type="submit"
                  className="rounded-1 px-4 btn btn-success border-0"
                >
                  PDF
                </Button>
              </div>
              <div className="me-2">
                <Button
                  type="submit"
                  className="rounded-1 px-4 btn btn-success border-0"
                >
                  CSV
                </Button>
              </div>
              <div>
                <Button
                  type="submit"
                  className="rounded-1 px-4 btn btn-success border-0"
                >
                  Excel
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="employee_table table-responsive">
          <table className="table table-bordered table-striped font_14">
            <thead>
              <tr>
                <th scope="col">
                  <div className="form-check p-0">
                    <input className="" type="checkbox" value="" id="" />
                  </div>
                </th>
                <th scope="col">SL</th>
                <th scope="col">image</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Shift</th>
                <th scope="col">Deasignation</th>
                <th scope="col">Status </th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees &&
                employees.map((item, index) => (
                  <tr>
                    <th scope="row">
                      <div className="form-check p-0">
                        <input className="" type="checkbox" value="" id="" />
                      </div>
                    </th>
                    <th scope="row">{index + 1}</th>
                    <th scope="row" className="text-center">
                      <img
                        src="/images.png"
                        alt=""
                        className="table_user_img"
                      />
                    </th>
                    <td>{item.employee_id}</td>
                    <td>{item.username}</td>
                    <td>{item.in_time}</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>
                      <button className="add_btn_color border-0 rounded-1 me-2">
                        <EditEmployee />
                      </button>
                      {/* <button className="bg-danger border-0 rounded-1">
                        <RiDeleteBin6Line color="white" />
                      </button> */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ManageInfo;
