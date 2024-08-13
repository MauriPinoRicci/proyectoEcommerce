import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Nombre es requerido"),
  email: Yup.string()
    .email("Correo inválido")
    .required("Correo es requerido"),
  birthdate: Yup.string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Fecha debe estar en formato DD/MM/YYYY"
    )
    .required("Fecha de nacimiento es requerida"),
  nDni: Yup.number()
    .typeError("Debe ser un número")
    .required("DNI es requerido"),
  username: Yup.string().required("Nombre de usuario es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Contraseña es requerida"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirmación de contraseña es requerida"),
});

export default validationSchema;
