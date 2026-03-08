import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      organization,
      message,
    }: {
      name: string;
      email: string;
      organization: string | null;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitForm(name, email, organization, message);
    },
  });
}
