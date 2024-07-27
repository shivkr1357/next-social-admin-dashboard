import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { HeadCell } from "@/utils/utils";
import UserForm from "../Forms/UserForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface CustomFormModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (formData: { name: string; email: string }) => void;
  fields: HeadCell[];
  title: string;
}

const CustomFormModal: React.FC<CustomFormModalProps> = ({
  open,
  handleClose,
  handleSubmit,
  fields,
  title,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newFields, setNewFields] = useState<any>([]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit({ name, email });
    handleClose();
  };

  useEffect(() => {
    const newFields = fields.filter((item) => {
      return item.id !== "_id" && item.id !== "createdAt";
    });
    setNewFields(newFields);
  }, [fields]);

  // console.log("newFields", newFields);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="modal-title" variant="h6" component="h2">
            {title} Add Form
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <form onSubmit={onSubmit}>
          <UserForm />

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CustomFormModal;
