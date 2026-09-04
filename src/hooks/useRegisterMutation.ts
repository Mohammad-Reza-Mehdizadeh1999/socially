import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../services/authServices";

export const useRegisterMutation = () => {
  const mutation = useMutation({ mutationFn: registerRequest });

  return mutation;
};
