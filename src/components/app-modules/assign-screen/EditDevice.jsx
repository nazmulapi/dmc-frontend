"use client";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaRegEdit } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import { submit } from "../../../lib/submit";

const EditModal = ({ show, onHide, item, setItem }) => {
  console.log(item);

  const [formValues, setFormValues] = useState({
    device_id: item.device_id,
    device_ip: item.device_ip,
    device_name: item.device_name,
    username: item.username,
    password: item.password,
    location: item.location,
    active_status: item.active_status,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      device_id: item.device_id,
      device_ip: item.device_ip,
      device_name: item.device_name,
      username: item.username,
      password: item.password,
      location: item.location,
      active_status: item.active_status,
    }));
  }, [item]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formValues?.device_id?.trim()) {
      newErrors.device_id = "Device ID is required";
      valid = false;
    }

    if (!formValues?.device_ip?.trim()) {
      newErrors.device_ip = "Device IP is required";
      valid = false;
    }

    if (!formValues?.device_name?.trim()) {
      newErrors.device_name = "Device name is required";
      valid = false;
    }

    if (!formValues?.username?.trim()) {
      newErrors.username = "Device username is required";
      valid = false;
    }

    if (!formValues?.password?.trim()) {
      newErrors.password = "Device password is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleInputChange = (e) => {
    setSuccess("");

    const { name, type, value } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });

    if (type === "checkbox") {
      setFormValues((prev) => ({
        ...prev,
        [name]: e.target.checked ? "active" : "inactive",
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    const valid = validateForm();

    // console.log("Form Value: ", formValues);
    // console.log("Error: ", errors);

    if (valid) {
      setIsLoading(true);

      const response = await submit(`/device/${item.device_id}/`, formValues);

      console.log(response);

      if (response?.device_id) {
        setTimeout(() => {
          setItem((prevData) =>
            prevData.map((i) =>
              i.device_id === formValues.device_id ? formValues : i
            )
          );
          setSuccess("Device updated successfully");
          setIsLoading(false);
          // setErrors({});
          // setFormValues(initialValues);
        }, 1000);
      } else {
        setTimeout(() => {
          setSuccess("Something went wrong!");
          setIsLoading(false);
          // setErrors({});
          // setFormValues(initialValues);
        }, 1000);
      }
    }
  };

  return (
    <Modal
      // {...props}
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Device ID <span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              placeholder="Enter device name"
              name="device_id"
              value={formValues.device_id}
              onChange={(e) => handleInputChange(e)}
              className={classEase(
                "rounded-1 form_border_focus form-control",
                errors.device_id && "is-invalid"
              )}
              readOnly
            />
            {errors.device_id && (
              <div className="invalid-feedback">{errors.device_id}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Device name <span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              placeholder="Enter device name"
              name="device_name"
              value={formValues.device_name}
              onChange={(e) => handleInputChange(e)}
              className={classEase(
                "rounded-1 form_border_focus form-control",
                errors.device_name && "is-invalid"
              )}
            />
            {errors.device_name && (
              <div className="invalid-feedback">{errors.device_name}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Device IP <span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              placeholder="Enter device IP"
              name="device_ip"
              value={formValues.device_ip}
              onChange={(e) => handleInputChange(e)}
              className={classEase(
                "rounded-1 form_border_focus form-control",
                errors.device_ip && "is-invalid"
              )}
            />
            {errors.device_ip && (
              <div className="invalid-feedback">{errors.device_ip}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Username <span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              placeholder="Enter device username"
              name="username"
              value={formValues.username}
              onChange={(e) => handleInputChange(e)}
              className={classEase(
                "rounded-1 form_border_focus form-control",
                errors.username && "is-invalid"
              )}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Password <span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              placeholder="Enter device password"
              name="password"
              value={formValues.password}
              onChange={(e) => handleInputChange(e)}
              className={classEase(
                "rounded-1 form_border_focus form-control",
                errors.password && "is-invalid"
              )}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="mb-2">
            <input
              id="deviceStatus"
              type="checkbox"
              name="active_status"
              checked={formValues.active_status === "active"}
              // value={formValues.is_active}
              onChange={(e) => handleInputChange(e)}
              className="form-check-input"
            />
            <label className="mb-2 ms-2" htmlFor="employeeStatus">
              Active
            </label>
          </div>

          {success && success !== "" && (
            <div className="success-feedback mb-3">{success}</div>
          )}

          <Button
            type="submit"
            className={classEase(
              "rounded-1 mt-2 px-0 add_btn_color border-0 d-flex justify-content-center align-items-center app-button",
              isLoading ? "loading" : ""
            )}
            disabled={isLoading}
          >
            Submit
            {isLoading && (
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
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
          <Button>Edit</Button>
        </Modal.Footer> */}
    </Modal>
  );
};

const Edit = ({ item, setItem }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setModalShow(true);
        }}
        className="bg-transparent border-0 p-0 m-0"
      >
        <FaRegEdit color="#585858" />
      </Button>

      <EditModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={item}
        setItem={setItem}
      />
    </>
  );
};

export default Edit;
