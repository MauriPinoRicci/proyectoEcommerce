// src/components/LoginForm.js
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../utils/validateLogin";
import styles from "../login/login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'; 
import { setUser } from '../../redux/reducer'; 
import axios from 'axios'; 

const LoginForm = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.data;

      if (response.status === 200) {
        setMessageType("success");
        setMessage(result.message);
        dispatch(setUser(result.user));
        navigate("/home");
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

  return (
    <div className={styles.loginFormContainer}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.loginContainer}>
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
