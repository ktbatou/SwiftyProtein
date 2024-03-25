import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../../firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import { IFormFields } from "@routes/SignIn/hooks/useSignInForm";

async function login(params: IFormFields ) {
  const { email, password } = params;

  return await signInWithEmailAndPassword(auth.auth, email, password);
}

export default function useSignInMutation() {
  return useMutation<any, any, IFormFields>({
    mutationFn(values) {
      return login(values);
    },
  });
}
