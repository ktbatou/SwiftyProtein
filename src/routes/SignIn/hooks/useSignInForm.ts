import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const formValidationSchema = yup.object({
  email: yup.string().required("Required field").email("Invalid email").trim(),
  password: yup
    .string()
    .required("Required field")
    .trim()
});

export interface IFormFields {
  email: string;
  password: string;
}

const formDefaultValues: IFormFields = {
  email: "",
  password: "",
};

export default function useSignInForm() {
  return useForm<IFormFields>({
    defaultValues: formDefaultValues,
    mode: "onSubmit",
    resolver: yupResolver(formValidationSchema),
  });
}
