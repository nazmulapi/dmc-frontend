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
  const [formValues, setFormValues] = useState({
    id: item.group_id,
    group_name: item.group_name,
    Remaks: item.Remaks,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      group_id: item.group_id,
      group_name: item.group_name,
      Remaks: item.Remaks,
    }));
  }, [item]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formValues?.group_name?.trim()) {
      newErrors.group_name = "Group name is required";
      valid = false;
    }

    if (!formValues?.Remaks?.trim()) {
      newErrors.Remaks = "Remarks is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleInputChange = (e) => {
    setSuccess("");

    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: "",
    });

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    const valid = validateForm();

    // console.log("Form Value: ", formValues);
    // console.log("Error: ", errors);

    if (valid) {
      setIsLoading(true);

      const response = await submit(`/empgrp/${item.group_id}/`, formValues);

      // console.log(response);

      if (response?.group_id) {
        setTimeout(() => {
          setItem((prevData) =>
            prevData.map((i) =>
              i.group_id === formValues.group_id ? formValues : i
            )
          );
          setSuccess("Group updated successfully");
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
          Edit Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Group
            </label>
            <input
              type="text"
              placeholder="Enter Group name"
              name="group_name"
              value={formValues.group_name}
              onChange={(e) => handleInputChange(e)}
              className={classEase(
                "rounded-1 form_border_focus form-control",
                errors.group_name && "is-invalid"
              )}
            />
            {errors.group_name && (
              <div className="invalid-feedback">{errors.group_name}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Remarks
            </label>
            <textarea
              name="Remaks"
              value={formValues.Remaks}
              className={classEase(
                "rounded-1 form_border_focus form-control",
                errors.Remaks && "is-invalid"
              )}
              onChange={(e) => handleInputChange(e)}
              rows="3"
            ></textarea>
            {errors.Remaks && (
              <div className="invalid-feedback">{errors.Remaks}</div>
            )}
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
