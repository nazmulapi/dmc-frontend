"use client";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const page = () => {
  return (
    <>
      <section className="forgot_password">
        <Col lg={4} className="d-flex align-items-center">
          <div className="bg-white w-100 rounded-1 p-5">
            <div className="text-center">
              <h1 className="py-3 fw-bold"> Password Reset</h1>
            </div>
            <div>
              <Form>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    New Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-1 form_padding"
                    id=""
                    placeholder="Enter New Password"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-1 form_padding"
                    id=""
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="col-auto">
                  <button
                    type="submit"
                    className="btn btn-primary mb-3 rounded-1 w-100 py-2"
                  >
                    Reset Password
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </section>
    </>
  );
};

export default page;
