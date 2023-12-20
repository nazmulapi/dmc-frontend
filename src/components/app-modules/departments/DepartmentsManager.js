"use client";

import React from "react";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetcher } from "../../../lib/fetcher";

const DesignationManager = () => {
  const { data, error, isLoading } = useSWR(`/department/`, fetcher, {
    errorRetryCount: 2,
  });
  console.log(data);

  return (
    <>
      <section>
      <div>
          <h2 className="border-bottom pb-2 mb-4">Manage Departments</h2>
        </div>
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
                    className="form-control form_border_focus"
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
                <th scope="col">Departments</th>
                <th scope="col">Departments Details</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {error && (
                <tr>
                  <td colSpan={4}>Failed to load</td>
                </tr>
              )}
              {isLoading && (
                <tr>
                  <td colSpan={4}>Loading...</td>
                </tr>
              )}

              {data?.length &&
                data.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.department}</td>
                    <td>{item.description}</td>
                    <td>
                      <button className="add_btn_color border-0 rounded-1 me-2">
                        <FaRegEdit color="#585858" />
                      </button>
                      <button className="bg-danger border-0 rounded-1">
                        <RiDeleteBin6Line color="#DB3545" />
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

export default DesignationManager;
