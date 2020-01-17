
import * as Yup from "yup";
import { validateYupSchema } from "formik";
 export const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(7, 'Too Short!')
    .max(16, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});
export const postHorseSchema = Yup.object().shape({
    horse_name: Yup.string()
    .min(1,"Too short")
    .max(255, "Too long")
    .required("Reuired"),
    horse_number: Yup.string()
    .min(1, "Too Short")
    .min(100, "Too long"),
    age_verified: Yup.string()
    .required("Required"),
    ushja_registered: Yup.boolean()
    .required("Required"),
    dob: Yup.date(),
    color: Yup.string()
    .max(255,"Too long"),
    ushja_registered: Yup.boolean()
    .required("Required")
})
export default validateYupSchema