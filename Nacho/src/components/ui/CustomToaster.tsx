import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { useEffect, useMemo } from "react";

import { createTheme } from "@mui/material"
import { useDarkMode } from "../../context/DarkModeContext";

const CustomToaster = () => {
  const {isDarkMode} = useDarkMode();
  const mode = isDarkMode ? "dark" : "light";
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        }
      }),
    [mode]
  );
  const { toasts } = useToasterStore();

  // Limit the number of Toasts displayed
  const TOAST_LIMIT = 2;
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <Toaster 
      position="bottom-center"
      gutter={12}
      containerStyle={{margin: "8px", bottom:"17.5%"}}
      toastOptions={
        {
          success: {duration: 3000}, 
          error: {duration: 3000},
          loading: {duration: 1500},
          style: { 
            fontSize: '16px',
            fontWeight: 'bold',
            maxWidth: '500px', 
            padding: '16px 24px', 
            backgroundColor: `${theme.palette.background.paper}`, 
            color: `${theme.palette.text.primary}` 
          }
        }
      }
    />
  )
}

export default CustomToaster
