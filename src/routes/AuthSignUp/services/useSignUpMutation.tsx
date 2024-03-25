import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import { IFormFields } from "@routes/AuthSignUp/hooks/useSignUpForm";

async function signUp(params: IFormFields ) {
  const { email, password } = params;

  return await createUserWithEmailAndPassword(auth.auth, email, password);
}

export default function useSignUpMutation() {
  return useMutation<any, any, IFormFields>({
    mutationFn(values) {
      return signUp(values);
    },
  });
}
