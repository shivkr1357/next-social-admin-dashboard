import { RootState } from "@/app/redux/store";
import {
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

const UserForm = () => {
   const [gender, setGender] = useState("");
   const [colorTheme, setColorTheme] = useState<string>("light");
   const [isDeactivated, setIsDeactivated] = useState<boolean>(false);
   const [userId, setUserId] = useState("");

   const handleChange = (event: SelectChangeEvent<string>) => {
      setIsDeactivated(event.target.value === "true"); // Convert string to boolean
   };

   return (
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
               type={"file"}
               label={"Proile Picture"}
               name={"profilePicture"}
               placeholder={"Upload Profile Picture"}
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
            <FormControl sx={{ width: "85%" }}>
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
                  Color Theme
               </InputLabel>
               <Select
                  labelId='demo-simple-select-helper-label'
                  id='demo-simple-select-helper'
                  value={isDeactivated.toString()} // Convert boolean to string
                  label='Color Theme'
                  onChange={handleChange}
               >
                  <MenuItem value='true'>True</MenuItem>
                  <MenuItem value='false'>False</MenuItem>
               </Select>
            </FormControl>
         </Grid>
      </Grid>
   );
};

export default UserForm;

// Array(12)
// 0
// :
// {id: 'email', numeric: false, disablePadding: false, label: 'Email', placeholder: 'Enter email', …}
// 1
// :
// {id: 'fullName', numeric: false, disablePadding: false, label: 'FullName', placeholder: 'Enter fullName', …}
// 2
// :
// {id: 'phone', numeric: false, disablePadding: false, label: 'Phone', placeholder: 'Enter phone', …}
// 3
// :
// {id: 'address', numeric: false, disablePadding: false, label: 'Address', placeholder: 'Enter address', …}
// 4
// :
// {id: 'profilePicture', numeric: false, disablePadding: false, label: 'ProfilePicture', placeholder: 'Enter profilePicture', …}
// 5
// :
// {id: 'hobbies', numeric: false, disablePadding: false, label: 'Hobbies', placeholder: 'Enter hobbies', …}
// 6
// :
// {id: 'colorTheme', numeric: false, disablePadding: false, label: 'ColorTheme', placeholder: 'Enter colorTheme', …}
// 7
// :
// {id: 'isDeactivated', numeric: false, disablePadding: false, label: 'IsDeactivated', placeholder: 'Enter isDeactivated', …}
// 8
// :
// {id: 'gender', numeric: false, disablePadding: false, label: 'Gender', placeholder: 'Enter gender', …}
// 9
// :
// {id: 'language', numeric: false, disablePadding: false, label: 'Language', placeholder: 'Enter language', …}
// 10
// :
// {id: 'about', numeric: false, disablePadding: false, label: 'About', placeholder: 'Enter about', …}
// 11
// :
// {id: 'blockedUsers', nume
