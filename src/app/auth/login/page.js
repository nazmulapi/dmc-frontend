"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Spinner from "react-bootstrap/Spinner";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import classEase from "classease";
import { login } from "../../../lib/auth";
import { authTokenKey, authUserKey } from "../../../lib/config";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!employeeId || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const { access, refresh, user, device_status } = await login({
        employee_id: employeeId,
        password,
      });

      console.log(user, device_status);
      // return;
      setLoading(false);

      if (!access) {
        console.log("Wrong username or password");
        return;
      } else if (!rememberMe) {
        // should be updated
        localStorage.setItem("user", JSON.stringify(user));
        Cookies.set(authUserKey, user?.employee_id, {
          expires: 30,
        }); // Expires in 30 days
        Cookies.set(authTokenKey, access, {
          expires: 30,
        }); // Expires in 30 days
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        Cookies.set(authUserKey, user?.employee_id);
        Cookies.set(authTokenKey, access);
      }
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Invalid credentials. Please try again.");
    }
    return;
  };

  return (
    <>
      <section className="login_bg">
        <Container>
          <Row>
            <Col lg={6} className="div_height ">
              <div className="w-100 bg-white py-5 rounded-1">
                <div className="d-flex justify-content-center mb-3">
                  <img src="/th.jpg" alt="dmc logo" className="img-fluid" />
                </div>

                <div className="px-5">
                  <Form onSubmit={(e) => handleLogin(e)}>
                    <div className="mb-3">
                      <label htmlFor="employeeId" className="form-label">
                        Employee ID <span className="text-danger">*</span>
                      </label>
                      <input
                        id="employeeId"
                        name="employeeId"
                        type="text"
                        className="form-control rounded-1 form_padding form_border_focus"
                        placeholder="Enter your employee id"
                        value={employeeId}
                        onChange={(e) => {
                          setError(null);
                          setEmployeeId(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control rounded-1 form_padding form_border_focus"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => {
                          setError(null);
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-auto">
                      <Button
                        type="submit"
                        // className="rounded-1 mt-2 px-4 add_btn_color border-0"
                        className={classEase(
                          "w-100 rounded-1 mt-2 px-0 add_btn_color theme_color border-0 d-flex justify-content-center align-items-center app-button py-3 mb-3",
                          loading ? "loading" : ""
                        )}
                        disabled={loading}
                      >
                        Login
                        {loading && (
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
                    {error && <p className="text-danger">{error}</p>}
                  </Form>
                  <div className="text-end">
                    <Link href="/auth/forgot-password">Forgot Password?</Link>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Page;
