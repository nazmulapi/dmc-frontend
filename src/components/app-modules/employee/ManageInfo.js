"use client";

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetchEmployee } from "../../../lib/fetch";

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
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label htmlFor="inputPassword6" className="col-form-label">
                    Search
                  </label>
                </div>
                <div className="col-auto">
                  <input
                    type="search"
                    id=""
                    className="form-control form_border_focus rounded-1"
                  />
                </div>
              </div>
            </div>
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
                <th scope="col">SL</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Shift Start</th>
                <th scope="col">Shift End</th>
                <th scope="col">Deasignation</th>
                <th scope="col">Status </th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees &&
                employees.map((item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.employee_id}</td>
                    <td>{item.username}</td>
                    <td>{item.in_time}</td>
                    <td>{item.out_time}</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>
                      <button className="add_btn_color border-0 rounded-1 me-2">
                        <FaRegEdit color="white" />
                      </button>
                      <button className="bg-danger border-0 rounded-1">
                        <RiDeleteBin6Line color="white" />
                      </button>
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
