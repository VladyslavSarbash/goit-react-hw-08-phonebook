import { toast } from 'react-toastify';

export const notifySuccess = message => {
  return toast.success(`${message}`);
};
export const notifyError = message => {
  return toast.error(`${message}`);
};
