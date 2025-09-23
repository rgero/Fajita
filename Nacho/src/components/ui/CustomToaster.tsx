import toast, { Toaster, useToasterStore } from "react-hot-toast";

import { useDarkMode } from "../../context/darkmode/DarkModeContext";
import { useEffect } from "react";

const CustomToaster = () => {
  const { isDarkMode } = useDarkMode();
  const { toasts } = useToasterStore();

  // Limit the number of toasts displayed
  const TOAST_LIMIT = 2;
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss with animation
  }, [toasts]);

  return (
    <Toaster
      position="bottom-center"
      gutter={12}
      containerStyle={{ margin: "8px", bottom: "17.5%" }}
      toastOptions={{
        success: { duration: 3000 },
        error: { duration: 3000 },
        loading: { duration: 1500 },
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          maxWidth: "500px",
          padding: "16px 24px",
          borderRadius: "8px",
          boxShadow:
            "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
          backgroundColor: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#fff" : "#333",
        },
      }}
    />
  );
};

export default CustomToaster;
