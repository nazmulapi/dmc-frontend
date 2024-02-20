"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { DataTable } from "mantine-datatable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import classEase from "classease";
import { toast } from "react-toastify";
import { fetcher } from "../../../lib/fetch";
import { deleteItem } from "../../../lib/submit";
import { sortBy } from "../../../lib/helper";
import EditDevice from "./EditDevice";

const DeviceManager = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "device_name",
    direction: "asc",
  });

  const [data, setData] = useState([]);

  const { error, isLoading } = useSWR(`/devices/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
    onSuccess: (fetchedData) => {
      // Update local state when data is successfully fetched
      setData(sortBy(fetchedData, "device_name"));
    },
  });

  useEffect(() => {
    const sorted = sortBy(data, sortStatus.columnAccessor);
    setData(sortStatus.direction === "desc" ? sorted.reverse() : sorted);
  }, [sortStatus]);

  const filteredData = data
    ? data.filter(
        (item) =>
          item.device_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.device_ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.device_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleClose = () => {
    setShow(false);
  };

  // Function to handle delete button click
  const handleDelete = async (device) => {
    setDeleting(true);
    try {
      // Perform delete action using API or other methods
      // For example, by making a DELETE request
      const res = await deleteItem(`/devices/${device.device_id}/`);
      if (!res?.error) {
        setData((prevData) =>
          prevData.filter((item) => item.device_id !== device.device_id)
        );
        setShow(false);
        setDeleting(false);
        toast.success(res?.message || "Device deleted successfully");
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
          <h2 className="border-bottom pb-2 mb-4">Manage Device</h2>
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
                    id="device_search"
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

        {console.log(data)}

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
                accessor: "device_id",
                title: "Device ID",
                sortable: true,
                // width: 150
              },
              {
                accessor: "device_ip",
                title: "Device IP",
                sortable: true,
                // width: 150
              },
              {
                accessor: "device_name",
                title: "Device Name",
                sortable: true,
                // width: 150
              },
              {
                accessor: "username",
                title: "Device Username",
                sortable: true,
                // width: 150
              },
              {
                accessor: "password",
                title: "Device Password",
              },
              {
                accessor: "location",
                title: "Location",
              },
              {
                accessor: "active_status",
                title: "Status",
                render: (item) =>
                  item?.active_status === "active" ? "Active" : "Inactive",
              },
              {
                accessor: "actions",
                title: "Actions",
                // width: "0%",
                render: (item) => (
                  <button
                    className="border-0 rounded-1"
                    onClick={() => {
                      setSelectedDevice(item);
                      setShow(true);
                    }}
                  >
                    <RiDeleteBin6Line color="#DB3545" />
                  </button>
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
                <th scope="col">Device ID</th>
                <th scope="col">Device IP</th>
                <th scope="col">Device Name</th>
                <th scope="col">Device Username</th>
                <th scope="col">Device Password</th>
                <th scope="col">Location</th>
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

              {isLoading && (
                <tr>
                  <td colSpan={9}>Loading...</td>
                </tr>
              )}

              {filteredData?.length ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.device_id}</td>
                    <td>{item.device_ip}</td>
                    <td>{item.device_name}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.location}</td>
                    <td>
                      {item?.active_status === "active" ? "Active" : "Inactive"}
                    </td>
                    <td>
                      <button
                        className="border-0 rounded-1"
                        onClick={() => {
                          setSelectedDevice(item);
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
                      <td colSpan={9}>No data found!</td>
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
                setSelectedDevice(null);
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
                handleDelete(selectedDevice);
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

export default DeviceManager;
