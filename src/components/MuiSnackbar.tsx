import { Snackbar } from "@mui/material";

export const MuiSnackBar = ({
  message,
  open,
  setOpen,
}: {
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        message={message}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </div>
  );
};
