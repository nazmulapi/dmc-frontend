"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import classEase from "classease";
import { DataTable } from "mantine-datatable";
import { toast } from "react-toastify";
import { fetcher } from "../../../lib/fetch";
import { deleteItem } from "../../../lib/submit";
import { sortBy } from "../../../lib/helper";
import EditShift from "./EditShift";

const ShiftManager = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "shift_name",
    direction: "asc",
  });

  const { error, isLoading } = useSWR(`/shift/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
    onSuccess: (fetchedData) => {
      // Update local state when data is successfully fetched
      setData(sortBy(fetchedData, "shift_name"));
    },
  });

  useEffect(() => {
    const sorted = sortBy(data, sortStatus.columnAccessor);
    setData(sortStatus.direction === "desc" ? sorted.reverse() : sorted);
  }, [sortStatus]);

  const filteredData = data
    ? data.filter((item) =>
        item.shift_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);

  const handleClose = () => {
    setShow(false);
  };

  // Function to handle delete button click
  const handleDelete = async (shift) => {
    setDeleting(true);
    try {
      // Perform delete action using API or other methods
      // For example, by making a DELETE request
      const res = await deleteItem(`/shift/${shift.shift_id}/`);
      if (!res?.error) {
        setData((prevData) =>
          prevData.filter((item) => item.shift_id !== shift.shift_id)
        );
        setShow(false);
        setDeleting(false);
        toast.success(res?.message || "Shift deleted successfully");
      } else {
        setShow(false);
        setDeleting(false);
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Delete failed", error);
      setShow(false);
      setDeleting(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <section>
        <div>
          <h2 className="border-bottom pb-2 mb-4">Manage Shifts</h2>
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
                    id="shift_search"
                    className="form-control form_border_focus"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* <div className="d-flex justify-content-between">
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
            </div> */}
          </div>
        </div>

        <div className="datatable-wrapper">
          <DataTable
            style={{ height: filteredData.length === 0 ? "300px" : "auto" }}
            className="datatable"
            withTableBorder
            withColumnBorders
            striped
            highlightOnHover
            horizontalSpacing="sm"
            verticalSpacing="sm"
            fz="sm"
            verticalAlign="center"
            columns={[
              {
                accessor: "",
                title: "SL",
                render: (_, index) => index + 1,
              },
              {
                accessor: "shift_name",
                title: "Shift Name",
                sortable: true,
                // width: 150
              },
              {
                accessor: "shift_beginning",
                title: "Shift Beginning",
                sortable: true,
                // width: 150
              },
              {
                accessor: "shift_end",
                title: "Shift End",
                sortable: true,
                // width: 150
              },
              {
                accessor: "total_time",
                title: "Total Time",
                sortable: true,
                // width: 150
              },

              {
                accessor: "actions",
                title: "Actions",
                // width: "0%",
                render: (item) => (
                  <>
                    {/* <EditShift item={item} setItem={setData} /> */}

                    <button
                      className="border-0 rounded-1"
                      onClick={() => {
                        setSelectedShift(item);
                        setShow(true);
                      }}
                    >
                      <RiDeleteBin6Line color="#DB3545" />
                    </button>
                  </>
                ),
              },
            ]}
            fetching={isLoading}
            records={filteredData}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
          />
        </div>

        {/* <div className="employee_table table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">SL</th>
                <th scope="col">Shift Name</th>
                <th scope="col">Shift Beginning</th>
                <th scope="col">Shift End</th>
                <th scope="col">Total Time</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {error && (
                <tr>
                  <td colSpan={6}>Failed to load</td>
                </tr>
              )}
              {isLoading && (
                <tr>
                  <td colSpan={6}>Loading...</td>
                </tr>
              )}

              {filteredData?.length ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.shift_name}</td>
                    <td>{item.shift_beginning}</td>
                    <td>{item.shift_end}</td>
                    <td>{item.total_time}</td>
                    <td>
                      <EditShift item={item} setItem={setData} />

                      <button
                        className="border-0 rounded-1"
                        onClick={() => {
                          setSelectedShift(item);
                          setShow(true);
                        }}
                      >
                        <RiDeleteBin6Line color="#DB3545" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {!isLoading && (
                    <tr>
                      <td colSpan={6}>No data found!</td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div> */}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4 className="pt-2">Are you sure want to delete?</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button
              onClick={() => {
                setSelectedShift(null);
                setShow(false);
              }}
              variant="success"
              className={classEase(
                "rounded-1 mt-2 px-0 add_btn_color border-0 d-flex justify-content-center align-items-center app-button"
              )}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDelete(selectedShift);
              }}
              variant="success"
              className={classEase(
                "rounded-1 mt-2 px-0 add_btn_color border-0 d-flex justify-content-center align-items-center app-button",
                deleting ? "loading" : ""
              )}
              disabled={deleting}
            >
              Delete
              {deleting && (
                <div className="spinner">
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
};

export default ShiftManager;
