import { useState } from "react";
import { Modal, Button, Paper } from "@mui/material";

const MuiModal = ({
  children,
  modalButtonText,
}: {
  children: React.ReactNode;
  modalButtonText: string;
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>{modalButtonText}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper style={{ padding: "20px", width: "80%" }}>{children}</Paper>
      </Modal>
    </div>
  );
};

export default MuiModal;
