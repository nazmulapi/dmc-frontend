"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBin6Line } from "react-icons/ri";
import EditEmployee from "./EditEmployee";
// import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import classEase from "classease";
import { fetcher } from "../../../lib/fetcher";
import Pagination from "../../utils/Pagination";
import { formatDate, getDate, getTime } from "../../../lib/helper";

const ManageInfo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // const { data, error, isLoading } = useSWR(
  //   `/employee/?page=${currentPage}&page_size=${itemsPerPage}`,
  //   fetcher
  // );
  const {
    data: apiData,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR(`/employee/?page=${currentPage}&page_size=${pageSize}`, fetcher, {
    errorRetryCount: 2,
  });

  const totalPages = Math.ceil(apiData?.count / pageSize);
  // const displayedData = apiData && apiData?.results;

  // const isLoading = isValidating && displayedData.length === 0;

  // const totalPages = Math.ceil(data?.length / pageSize);

  // const { data, error, isLoading } = useSWR(`/employee/`, fetcher);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // const displayedData = data?.slice(startIndex, endIndex);

  // const totalPages = Math.ceil((data?.length || 0) / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    mutate();
  };

  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    if (!isLoading && !error) {
      setDisplayedData(apiData?.results || []);
    }
  }, [isLoading, isValidating]);

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
                {/* <th scope="col">
                  <div className="form-check p-0">
                    <input
                      className=""
                      type="checkbox"
                      value=""
                      id="EmployeeListAllCheckbox"
                    />
                  </div>
                </th> */}
                <th scope="col">SL</th>
                <th scope="col">image</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Shift</th>
                <th scope="col">Designation</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {error && (
                <tr>
                  <td colSpan={9}>Failed to load</td>
                </tr>
              )}

              {displayedData && !error
                ? displayedData.map((item, index) => (
                    <tr key={index}>
                      {/* <th scope="row">
                        <div className="form-check p-0">
                          <input
                            className=""
                            type="checkbox"
                            value=""
                            id={item.employee_id}
                          />
                        </div>
                      </th> */}
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
                        {/* {console.log(item)} */}
                        <EditEmployee employee={item} />

                        {/* <button className="bg-danger border-0 rounded-1">
                        <RiDeleteBin6Line color="white" />
                      </button> */}
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>

          {/* {isLoading && (
            <div className="loading-overlay">
              <p>Loading...</p>
            </div>
          )} */}

          {/* {isValidating && (
            <div className="loading-overlay">
              <p>Loading...</p>
            </div>
          )} */}
        </div>
        <Row>
          <Col xs lg="9">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Col>
          <Col xs lg="3">
            <div className="w-100 d-flex align-items-center justify-content-end mb-3">
              <label>Page Size</label>
              <select
                className="rounded-1 form_border_focus form-control w-50 ms-2"
                value={pageSize}
                onChange={(e) => handlePageSizeChange(e.target.value)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default ManageInfo;
