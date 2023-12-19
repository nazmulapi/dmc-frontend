"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import classEase from "classease";
import { forgotEmailSubmit, forgotPasswordSubmit } from "../../../lib/submit";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [success, setSuccess] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState({
    email: false,
    password: false,
  });

  const validateEmail = () => {
    let valid = true;
    const newErrors = {};

    if (!formValues?.email?.trim()) {
      newErrors.email = "Enter your email";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValues?.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const validatePassword = () => {
    let valid = true;
    const newErrors = {};

    if (!formValues?.password?.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formValues?.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters long";
      valid = false;
    } else if (!/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(formValues?.password)) {
      newErrors.password = "Password must contain both letters and numbers";
      valid = false;
    }

    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleEmailChange = (e) => {
    // e.preventDefault();
    setSuccess({});
    setErrors({});

    const { value } = e.target;

    setFormValues((prev) => ({ ...prev, email: value }));
  };

  const handlePasswordChange = (e) => {
    // e.preventDefault();
    setSuccess({});

    const { name, value } = e.target;

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setSuccess({});

    const valid = validateEmail();

    console.log("Form Value: ", formValues?.email);
    console.log("Error: ", errors?.email);

    if (valid) {
      setIsLoading((prev) => ({ ...prev, email: true }));

      const response = await forgotEmailSubmit("/forget_password/", {
        email: formValues.email,
      });

      console.log(response);

      if (response?.data) {
        setTimeout(() => {
          setSuccess((prev) => ({
            ...prev,
            email: "A password reset link was sent to your email",
          }));
          setIsLoading((prev) => ({ ...prev, email: false }));
          // setErrors({});
          setFormValues((prev) => ({ ...prev, email: "" }));
        }, 1000);
      } else {
        setTimeout(() => {
          setSuccess((prev) => ({
            ...prev,
            email: "Something went wrong!",
          }));
          setIsLoading((prev) => ({ ...prev, email: false }));
          // setErrors({});
          setFormValues((prev) => ({ ...prev, email: "" }));
        }, 1000);
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSuccess({});

    const valid = validatePassword();

    console.log("Form Value: ", formValues);
    console.log("Error: ", errors);

    if (valid) {
      setIsLoading((prev) => ({ ...prev, password: true }));

      const response = await forgotPasswordSubmit(
        "/forget_password/",
        {
          password: formValues.password,
        },
        token
      );

      console.log(response);

      if (response?.data) {
        setTimeout(() => {
          setSuccess((prev) => ({
            ...prev,
            password: "Password changed successfully",
          }));
          setIsLoading((prev) => ({ ...prev, password: false }));
          // setErrors({});
          setFormValues((prev) => ({
            ...prev,
            password: "",
            confirmPassword: "",
          }));
        }, 1000);
      } else {
        setTimeout(() => {
          setSuccess((prev) => ({
            ...prev,
            password: "Something went wrong!",
          }));
          setIsLoading((prev) => ({ ...prev, password: false }));
          // setErrors({});
          setFormValues((prev) => ({
            ...prev,
            password: "",
            confirmPassword: "",
          }));
        }, 1000);
      }
    }
  };

  if (!token) {
    return (
      <section className="forgot_password">
        <Col lg={4} className="d-flex align-items-center">
          <div className="bg-white w-100 rounded-1 p-5">
            <div className="text-center">
              <h1 className="py-3 fw-bold">Password Reset</h1>
            </div>
            <div>
              <Form onSubmit={(e) => handleEmailSubmit(e)} method="POST">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Enter your email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Your email"
                    // autoComplete="off"
                    name="email"
                    value={formValues.email}
                    onChange={(e) => handleEmailChange(e)}
                    className={classEase(
                      "rounded-1 form_border_focus form-control",
                      errors.email && "is-invalid"
                    )}
                  />
                  {errors?.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="col-auto">
                  {success?.email && success?.email !== "" && (
                    <div className="success-feedback mb-3">{success.email}</div>
                  )}

                  <Button
                    type="submit"
                    className={classEase(
                      "btn btn-primary mb-3 rounded-1 w-100 py-2 add_btn_color d-flex justify-content-center align-items-center app-button border-0 mt-2 px-4",
                      isLoading?.email ? "loading" : ""
                    )}
                  >
                    Send email
                    {isLoading?.email && (
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
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </section>
    );
  }

  return (
    <>
      <section className="forgot_password">
        <Col lg={4} className="d-flex align-items-center">
          <div className="bg-white w-100 rounded-1 p-5">
            <div className="text-center">
              <h1 className="py-3 fw-bold">Password Reset</h1>
            </div>
            <div>
              <Form onSubmit={(e) => handlePasswordSubmit(e)} method="POST">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    New Password <span className="text-danger">*</span>
                  </label>
                  <input
                    id="exampleFormControlInput2"
                    type="text"
                    placeholder="New password"
                    name="password"
                    value={formValues.password}
                    onChange={(e) => handlePasswordChange(e)}
                    className={classEase(
                      "rounded-1 form_border_focus form-control",
                      errors.password && "is-invalid"
                    )}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <input
                    id="exampleFormControlInput3"
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={formValues.confirmPassword}
                    onChange={(e) => handlePasswordChange(e)}
                    className={classEase(
                      "rounded-1 form_border_focus form-control",
                      errors.confirmPassword && "is-invalid"
                    )}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <div className="col-auto">
                  {success?.password && success?.password !== "" ? (
                    <>
                      <div className="success-feedback mb-3">
                        {success.password}
                      </div>
                      <Link
                        href="/auth/login"
                        className="btn btn-primary mb-3 rounded-1 w-100 py-2"
                      >
                        Go to login
                      </Link>
                    </>
                  ) : (
                    <Button
                      type="submit"
                      className={classEase(
                        "btn btn-primary mb-3 rounded-1 w-100 py-2 add_btn_color d-flex justify-content-center align-items-center app-button border-0 mt-2 px-4",
                        isLoading?.password ? "loading" : ""
                      )}
                    >
                      Reset Password
                      {isLoading?.password && (
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
                  )}
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </section>
    </>
  );
};

export default Page;
