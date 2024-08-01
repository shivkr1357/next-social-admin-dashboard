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

const UserForm = () => {
   const [gender, setGender] = useState("");
   const [colorTheme, setColorTheme] = useState<string>("light");
   const [isDeactivated, setIsDeactivated] = useState<boolean>(false);
   const [userId, setUserId] = useState("");

   const handleChange = (event: SelectChangeEvent<string>) => {
      setIsDeactivated(event.target.value === "true"); // Convert string to boolean
   };
   const onSubmit = () => {};

   return (
      <form onSubmit={onSubmit}>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
               <TextField
                  type={"text"}
                  label={"Email"}
                  name={"email"}
                  placeholder={"Enter Email"}
                  margin='normal'
               />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
               <TextField
                  type={"text"}
                  label={"Full Name"}
                  name={"fullName"}
                  placeholder={"Enter Full Name"}
                  margin='normal'
               />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
               <TextField
                  type={"text"}
                  label={"Phone"}
                  name={"phone"}
                  placeholder={"Enter Phone"}
                  margin='normal'
               />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
               <TextField
                  type={"text"}
                  label={"Address"}
                  name={"address"}
                  placeholder={"Enter Address"}
                  margin='normal'
               />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
               <TextField
                  type={"text"}
                  label={"Hobbies"}
                  name={"hobbies"}
                  placeholder={"Enter Hobbies"}
                  margin='normal'
               />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
               <TextField
                  type={"text"}
                  label={"About"}
                  name={"about"}
                  placeholder={"Enter About User"}
                  margin='normal'
               />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
               <TextField
                  type={"text"}
                  label={"Language"}
                  name={"language"}
                  placeholder={"Enter Language"}
                  margin='normal'
               />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
               <FormControl sx={{ width: "85%", marginTop: "15px" }}>
                  <InputLabel id='demo-simple-select-helper-label'>
                     Gender
                  </InputLabel>
                  <Select
                     labelId='demo-simple-select-helper-label'
                     id='demo-simple-select-helper'
                     fullWidth
                     value={gender}
                     label='Age'
                     onChange={(e: SelectChangeEvent) => {
                        setGender(e.target.value);
                     }}
                  >
                     <MenuItem value={"M"}>Male</MenuItem>
                     <MenuItem value={"F"}>Female</MenuItem>
                     <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
               </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
               <FormControl sx={{ width: "85%" }}>
                  <InputLabel id='demo-simple-select-helper-label'>
                     Color Theme
                  </InputLabel>
                  <Select
                     labelId='demo-simple-select-helper-label'
                     id='demo-simple-select-helper'
                     fullWidth
                     value={colorTheme}
                     label='Color Theme'
                     onChange={(e: SelectChangeEvent) => {
                        setColorTheme(e.target.value);
                     }}
                  >
                     <MenuItem value={"dark"}>Dark</MenuItem>
                     <MenuItem value={"light"}>Light</MenuItem>
                  </Select>
               </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
               <FormControl sx={{ width: "85%" }}>
                  <InputLabel id='demo-simple-select-helper-label'>
                     is Deactivated
                  </InputLabel>
                  <Select
                     labelId='demo-simple-select-helper-label'
                     id='demo-simple-select-helper'
                     value={isDeactivated.toString()} // Convert boolean to string
                     label='Is Deactivated'
                     onChange={handleChange}
                  >
                     <MenuItem value='true'>True</MenuItem>
                     <MenuItem value='false'>False</MenuItem>
                  </Select>
               </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
               {/* <Box textAlign='center'> */}
               <div style={{ marginTop: "10px" }}>
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
               {/* </Box> */}
            </Grid>
         </Grid>
      </form>
   );
};

export default UserForm;
