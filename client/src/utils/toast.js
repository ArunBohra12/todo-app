import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TOAST_DURATION = 2500; // 2.5 seconds
const TOAST_POSITION = toast.POSITION.TOP_CENTER;
const TOAST_ID = 'todo-toast';

const toastGeneralOptions = {
  position: TOAST_POSITION,
  autoClose: TOAST_DURATION,
  pauseOnFocusLoss: false,
  toastId: TOAST_ID,
  transition: Slide,
};

export const successToast = (message = '') => {
  if (!message) return;

  toast.success(message, {
    ...toastGeneralOptions,
  });
};

export const errorToast = (message = '') => {
  if (!message) return;

  toast.error(message, {
    ...toastGeneralOptions,
  });
};
