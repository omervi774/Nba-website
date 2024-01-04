import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { style } from "../style";

function AppModal(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Oops! Something went wrong
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Sorry, we're experiencing technical difficulties try again in a
          minute.
        </Typography>
      </Box>
    </Modal>
  );
}

export default AppModal;
