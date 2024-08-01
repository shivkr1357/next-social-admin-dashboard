import { createEvent, getAllEvents } from "@/app/redux/actions/event";
import { eventsActions } from "@/app/redux/reducers/events";
import { themeActions } from "@/app/redux/reducers/theme";
import { RootState } from "@/app/redux/store";
import {
   Alert,
   Box,
   Button,
   FormControl,
   FormHelperText,
   Grid,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
   TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const EventForm = ({ handleClose }: any) => {
   const [userId, setUserId] = useState("");
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [location, setLocation] = useState("");
   const [dateOfEvent, setDateOfEvent] = useState("");

   const dispatch = useDispatch();

   const { users } = useSelector((state: RootState) => state.users);

   const onSubmit = async (event: React.FormEvent) => {
      event.preventDefault();

      let eventData = {
         title: title,
         description: description,
         location: location,
         dateOfEvent: dateOfEvent,
      };

      await createEvent(eventData)
         .then(async (res: any) => {
            if (res.data.error === false) {
               const response: any = await getAllEvents();
               if (response && response.data.events) {
                  dispatch(themeActions.toogleAlert(true));
                  dispatch(eventsActions.setAllEvents(response.data.events));
               }
            }
            handleClose();
            Swal.fire({
               title: "Event Created",
               text: res.data.message,
               icon: "success",
            });
         })
         .catch((err: any) => {
            console.log("Error", err);
         });
   };

   return (
      <form onSubmit={onSubmit} method='post'>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
               <TextField
                  type={"text"}
                  label={"Title"}
                  name={"title"}
                  placeholder={"Enter Post Title"}
                  margin='normal'
                  value={title}
                  onChange={(e) => {
                     setTitle(e.target.value);
                  }}
               />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
               <TextField
                  type={"text"}
                  multiline
                  label={"Description"}
                  name={"description"}
                  placeholder={"Post Description"}
                  margin='normal'
                  value={description}
                  onChange={(e) => {
                     setDescription(e.target.value);
                  }}
               />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
               <TextField
                  type={"text"}
                  label={"Location"}
                  name={"location"}
                  placeholder={"Location of Event"}
                  margin='normal'
                  value={location}
                  onChange={(e) => {
                     setLocation(e.target.value);
                  }}
               />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
               <TextField
                  type={"date"}
                  label={"Date Of Event"}
                  name={"dateOfEvent"}
                  placeholder={"Date of Event"}
                  margin='normal'
                  value={dateOfEvent}
                  onChange={(e) => {
                     setDateOfEvent(e.target.value);
                  }}
               />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
               <FormControl sx={{ width: "85%", marginTop: "15px" }}>
                  <InputLabel id='demo-simple-select-helper-label'>
                     User
                  </InputLabel>
                  <Select
                     labelId='demo-simple-select-helper-label'
                     id='demo-simple-select-helper'
                     fullWidth
                     value={userId}
                     label='Age'
                     onChange={(e: SelectChangeEvent) => {
                        setUserId(e.target.value);
                     }}
                  >
                     {users &&
                        users.map((item: any, key: any) => (
                           <MenuItem key={key} value={item._id}>
                              {item.fullName}
                           </MenuItem>
                        ))}
                  </Select>
               </FormControl>
            </Grid>

            {/* <Grid item xs={12} sm={6} md={4}>
            <div style={{ marginTop: "25px" }}>
               <input
                  accept='image/*'
                  style={{ display: "none" }}
                  id='file-input'
                  type='file'
                  // onChange={handleImageUpload}
               />
               <label htmlFor='file-input'>
                  <Button variant='contained' color='primary' component='span'>
                     Upload Profile Picture
                  </Button>
               </label>
            </div>
         </Grid> */}
         </Grid>

         <Box mt={2} display='flex' justifyContent='flex-end'>
            <Button variant='contained' color='primary' type='submit'>
               Submit
            </Button>
         </Box>
      </form>
   );
};

export default EventForm;
