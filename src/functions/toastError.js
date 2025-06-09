import { toast } from "sonner";

export const toastError = (txt) => {
  toast.error(txt);
  return;
};
