import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const formValidationSchema = yup.object({
  email: yup.string().required("Required field").email("Invalid email").trim(),
  password: yup
    .string()
    .required("Required field")
    .trim()
    .min(8, "The password must contain at least 8 charcters"),
  confirmPassword: yup
    .string()
    .required("Required field")
    .min(8, "The password must contain at least 8 charcters")
    .trim()
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

export interface IFormFields {
  email: string;
  password: string;
  confirmPassword: string;
}

const formDefaultValues: IFormFields = {
  email: "",
  password: "",
  confirmPassword: "",
};

export default function useSignUpForm() {
  return useForm<IFormFields>({
    defaultValues: formDefaultValues,
    mode: "onSubmit",
    resolver: yupResolver(formValidationSchema),
  });
}
