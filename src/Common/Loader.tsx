import { useEffect, useState } from "react";

import { Backdrop, CircularProgress } from "@mui/material";

export default function Loader() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
}
