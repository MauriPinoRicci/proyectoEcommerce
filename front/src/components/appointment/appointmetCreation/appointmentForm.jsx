import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import styles from "./AppointmentForm.module.css";

const AppointmentForm = ({ onSubmit }) => {

  const formik = useFormik({
    initialValues: {
      time: "",
      date: "",
      description: "",
    },
    validationSchema: Yup.object({
      time: Yup.string().required("La hora es obligatoria"),
      date: Yup.string().required("La fecha es obligatoria"),
      description: Yup.string().required("La descripción es obligatoria"),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.registerContainer}>
      <h1 className={styles.registerTitle}>Registro De Turno</h1>
      <div className={styles.inputField}>
        <label htmlFor="time">Hora</label>
        <input
          id="time"
          name="time"
          type="text"
          value={formik.values.time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
           placeholder="08:00"
        />
        {formik.touched.time && formik.errors.time ? (
          <div className={styles.errorMessage}>{formik.errors.time}</div>
        ) : null}
      </div>

      <div className={styles.inputField}>
        <label htmlFor="date">Fecha</label>
        <input
          id="date"
          name="date"
          type="text"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
           placeholder="16/12/2001"
        />
        {formik.touched.date && formik.errors.date ? (
          <div className={styles.errorMessage}>{formik.errors.date}</div>
        ) : null}
      </div>

      <div className={styles.inputField}>
        <label htmlFor="description">Descripción</label>
        <input
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="clase de conversación"
        />
        {formik.touched.description && formik.errors.description ? (
          <div className={styles.errorMessage}>{formik.errors.description}</div>
        ) : null}
      </div>

      <button type="submit" className={styles.buttonRegistrar}>
        Crear Turno
      </button>
    </form>
  );
};

AppointmentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AppointmentForm;
