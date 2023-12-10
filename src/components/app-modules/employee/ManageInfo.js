"use client";

import React, { useState } from "react";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBin6Line } from "react-icons/ri";
import EditEmployee from "./EditEmployee";
// import Form from "react-bootstrap/Form";
// import { Row, Col } from "react-bootstrap";
import { fetcher } from "../../../lib/fetcher";
import Pagination from "../../utils/Pagination";

const ManageInfo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, error, isLoading } = useSWR(`/employee/`, fetcher);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedData = data?.slice(startIndex, endIndex);

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
                <th scope="col">Shift</th>
                <th scope="col">Deasignation</th>
                <th scope="col">Status </th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {error && (
                <tr>
                  <td colSpan={9}>Failed to load</td>
                </tr>
              )}
              {isLoading && (
                <tr>
                  <td colSpan={9}>Loading...</td>
                </tr>
              )}

              {data?.length &&
                displayedData.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">
                      <div className="form-check p-0">
                        <input
                          className=""
                          type="checkbox"
                          value=""
                          id={item.employee_id}
                        />
                      </div>
                    </th>
                    <th scope="row">{startIndex + index + 1}</th>
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
                      <EditEmployee />

                      {/* <button className="bg-danger border-0 rounded-1">
                        <RiDeleteBin6Line color="white" />
                      </button> */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </section>
    </>
  );
};

export default ManageInfo;
