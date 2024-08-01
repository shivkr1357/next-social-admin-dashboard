import { RootState } from "@/app/redux/store";
import {
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
import { useSelector } from "react-redux";

const PostForm = () => {
   const [userId, setUserId] = useState("");
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   // const [userId, setUserId] = useState("");

   const { users } = useSelector((state: RootState) => state.users);

   const onSubmit = () => {};

   return (
      <form onSubmit={onSubmit}>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
               <TextField
                  type={"text"}
                  label={"Title"}
                  name={"title"}
                  placeholder={"Enter Post Title"}
                  margin='normal'
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
               />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
               <TextField
                  type={"text"}
                  label={"Post Type"}
                  name={"postType"}
                  placeholder={"Post Type"}
                  margin='normal'
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

            <Grid item xs={12} sm={6} md={4}>
               <div style={{ marginTop: "25px" }}>
                  <input
                     accept='image/*'
                     style={{ display: "none" }}
                     id='file-input'
                     type='file'
                     // onChange={handleImageUpload}
                  />
                  <label htmlFor='file-input'>
                     <Button
                        variant='contained'
                        color='primary'
                        component='span'
                     >
                        Upload Profile Picture
                     </Button>
                  </label>
               </div>
            </Grid>
         </Grid>
      </form>
   );
};

export default PostForm;
