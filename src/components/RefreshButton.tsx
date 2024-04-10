import { Button } from "@mui/material";

export const RefreshButton = () => {
  return (
    <Button
      variant="contained"
      onClick={() => {
        window.location.reload();
      }}
    >
      Refresh
    </Button>
  );
};
