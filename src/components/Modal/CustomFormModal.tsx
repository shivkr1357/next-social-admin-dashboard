import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import UserForm from "../Forms/UserForm";
import PostForm from "../Forms/PostForm";
import CommentForm from "../Forms/CommentsForm";
import EventForm from "../Forms/EventsForm";

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
   title: string;
}

const CustomFormModal: React.FC<CustomFormModalProps> = ({
   open,
   handleClose,
   title,
}) => {
   return (
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby='modal-title'
         aria-describedby='modal-description'
      >
         <Box sx={style}>
            <Box
               display='flex'
               justifyContent='space-between'
               alignItems='center'
            >
               <Typography id='modal-title' variant='h6' component='h2'>
                  {title} Add Form
               </Typography>
               <IconButton onClick={handleClose}>
                  <Close />
               </IconButton>
            </Box>

            {title === "Users" ? (
               <UserForm />
            ) : title === "Posts" ? (
               <PostForm />
            ) : title === "Comments" ? (
               <CommentForm handleClose={handleClose} />
            ) : title === "Events" ? (
               <EventForm handleClose={handleClose} />
            ) : null}
         </Box>
      </Modal>
   );
};

export default CustomFormModal;
