import { toast } from "react-toastify";

export const ToastAlert = (type, message) => {
  if (type === "success") {
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  } else if (type === "error") {
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  }

  // Story Saving & remove toast
  else if (type === "story_saves") {
    toast.success(message, {
      background: "#d4ec94",
      position: "top-center",
      autoClose: 2000,
    });
  } else {
    toast.error(message, {
      background: "#d4ec94",

      position: "top-center",
      autoClose: 2000,
    });
  }
};
