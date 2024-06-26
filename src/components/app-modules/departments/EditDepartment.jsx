"use client";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaRegEdit } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import { update } from "../../../lib/submit";

const EditModal = ({ show, onHide, item, mutate }) => {
  const [formValues, setFormValues] = useState({
    id: item.id,
    department: item.department,
    description: item.description,
    is_active: item.is_active,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      id: item.id,
      department: item.department,
      description: item.description,
      is_active: item.is_active,
    }));
  }, [item]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formValues?.department?.trim()) {
      newErrors.department = "Department is required";
      valid = false;
    }

    if (!formValues?.description?.trim()) {
      newErrors.description = "Description is required";
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

    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
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

      const response = await update(`/department/${item.id}/`, formValues);

      // console.log(response);

      if (response?.id) {
        setTimeout(() => {
          // setItem((prevData) =>
          //   prevData.map((i) => (i.id === formValues.id ? formValues : i))
          // );
          mutate();
          setSuccess("Department updated successfully");
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
          Edit Department
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Department Name
            </label>
            <input
              type="text"
              placeholder="Enter department"
              name="department"
              value={formValues.department}
              onChange={(e) => handleInputChange(e)}
              className={classEase(
                "rounded-1 form_border_focus form-control",
                errors.department && "is-invalid"
              )}
            />
            {errors.department && (
              <div className="invalid-feedback">{errors.department}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              value={formValues.description}
              className={classEase(
                "rounded-1 form_border_focus form-control",
                errors.description && "is-invalid"
              )}
              onChange={(e) => handleInputChange(e)}
              rows="3"
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>

          <div className="mb-2">
            <input
              id="departmentStatus"
              type="checkbox"
              name="is_active"
              checked={formValues.is_active}
              // value={formValues.is_active}
              onChange={(e) => handleInputChange(e)}
              className="form-check-input"
            />
            <label className="mb-2 ms-2" htmlFor="departmentStatus">
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

const Edit = ({ item, mutate }) => {
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
        mutate={mutate}
      />
    </>
  );
};

export default Edit;
