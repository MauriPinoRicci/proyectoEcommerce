import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../utils/validateLogin";
import styles from "../login/login.module.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        setMessageType("success");
        setMessage(result.message);
      } else {
        setMessageType("error");
        setMessage(result.message);
      }
    } catch (error) {
      setMessageType("error");
      setMessage("Network error: " + error.message);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    navigate("/home");
  };

  return (
    <div className={styles.loginFormContainer}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.loginContainer} onSubmit={handleOnSubmit} >
            <h1 className={styles.loginTitle}>Iniciar Sesión</h1>
            <div>
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                className={styles.inputField}
              />
              <ErrorMessage
                name="username"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className={styles.inputField}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.buttonContainer}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.buttonLogin}
              >
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {message && (
        <div className={styles.messageContainer}>
          <div
            className={
              messageType === "success"
                ? styles.successMessage
                : styles.errorMessage
            }
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
