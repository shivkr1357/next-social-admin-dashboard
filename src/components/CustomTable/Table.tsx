"use client";
import React, { useMemo } from "react";
import { alpha } from "@mui/material/styles";
import {
   Box,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TablePagination,
   TableRow,
   TableSortLabel,
   Toolbar,
   Typography,
   Paper,
   Checkbox,
   IconButton,
   Tooltip,
   FormControlLabel,
   Switch,
} from "@mui/material";

import { Delete, FilterList } from "@mui/icons-material";

import { visuallyHidden } from "@mui/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

import { getComparator, Order, HeadCell } from "@/utils/utils";
import { Data } from "@/types/types";
import { usersActions } from "@/app/redux/reducers/user";

function stableSort(
   array: readonly Data[],
   comparator: (a: Data, b: Data) => number
) {
   const stabilizedThis = array.map(
      (el, index) => [el, index] as [Data, number]
   );
   stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
         return order;
      }
      return a[1] - b[1];
   });
   return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
   data: Data[];
   tableHeadData: HeadCell[];
}

interface EnhancedTableHeadProps {
   numSelected: number;
   onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof Data
   ) => void;
   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
   order: Order;
   orderBy: string;
   rowCount: number;
   tableHeadData: HeadCell[];
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
   const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
      tableHeadData,
   } = props;
   const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
         onRequestSort(event, property);
      };

   return (
      <TableHead>
         <TableRow>
            <TableCell padding='checkbox'>
               <Checkbox
                  color='primary'
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{
                     "aria-label": "select all",
                  }}
               />
            </TableCell>
            {tableHeadData.map((headCell) => (
               <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "normal"}
                  sortDirection={orderBy === headCell.id ? order : false}
               >
                  <TableSortLabel
                     active={orderBy === headCell.id}
                     direction={orderBy === headCell.id ? order : "asc"}
                     onClick={createSortHandler(headCell.id)}
                  >
                     {headCell.label}
                     {orderBy === headCell.id ? (
                        <Box component='span' sx={visuallyHidden}>
                           {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                        </Box>
                     ) : null}
                  </TableSortLabel>
               </TableCell>
            ))}
         </TableRow>
      </TableHead>
   );
}

interface EnhancedTableToolbarProps {
   numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
   const { numSelected } = props;

   return (
      <Toolbar
         sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
               bgcolor: (theme) =>
                  alpha(
                     theme.palette.primary.main,
                     theme.palette.action.activatedOpacity
                  ),
            }),
         }}
      >
         {numSelected > 0 ? (
            <Typography
               sx={{ flex: "1 1 100%" }}
               color='inherit'
               variant='subtitle1'
               component='div'
            >
               {numSelected} selected
            </Typography>
         ) : (
            <Typography
               sx={{ flex: "1 1 100%" }}
               variant='h6'
               id='tableTitle'
               component='div'
            >
               Users
            </Typography>
         )}
         {numSelected > 0 ? (
            <Tooltip title='Delete'>
               <IconButton>
                  <Delete />
               </IconButton>
            </Tooltip>
         ) : (
            <Tooltip title='Filter list'>
               <IconButton>
                  <FilterList />
               </IconButton>
            </Tooltip>
         )}
      </Toolbar>
   );
}

export default function EnhancedTable({
   data,
   tableHeadData,
}: EnhancedTableProps) {
   const dispatch = useDispatch();

   const { sidebar } = useSelector((state: RootState) => state.theme);

   const { order, orderBy, selected, page, dense, rowsPerPage } = useSelector(
      (state: RootState) => state.users
   );

   const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof Data
   ) => {
      const isAsc = orderBy === property && order === "asc";
      dispatch(usersActions.setOrder(isAsc ? "desc" : "asc"));
      dispatch(usersActions.setOrderBy(property));
   };

   const handleSelectAllClick = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      if (event.target.checked) {
         const newSelected = data.map((n) => n.id);
         dispatch(usersActions.setSelected(newSelected));
         return;
      }
      dispatch(usersActions.setSelected([]));
   };

   const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected: number[] = [];

      if (selectedIndex === -1) {
         newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
         newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
         newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
         newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
         );
      }

      dispatch(usersActions.setSelected(newSelected));
   };

   const handleChangePage = (event: unknown, newPage: number) => {
      dispatch(usersActions.setPage(newPage));
   };

   const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      dispatch(usersActions.setRowPerPage(parseInt(event.target.value, 10)));
      dispatch(usersActions.setPage(0));
   };

   const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(usersActions.setDense(event.target.checked));
   };

   const isSelected = (id: number) => selected.indexOf(id) !== -1;

   // Avoid a layout jump when reaching the last page with empty rows.
   const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

   const visibleRows = useMemo(
      () =>
         stableSort(data, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
         ),
      [order, orderBy, page, rowsPerPage, data]
   );

   return (
      <Box
         sx={{
            width: sidebar === true ? "80%" : "90%",
            marginLeft: sidebar === true ? "250px" : "90px",
         }}
      >
         <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
               <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby='tableTitle'
                  size={dense ? "small" : "medium"}
               >
                  <EnhancedTableHead
                     numSelected={selected.length}
                     order={order}
                     orderBy={orderBy}
                     onSelectAllClick={handleSelectAllClick}
                     onRequestSort={handleRequestSort}
                     rowCount={data.length}
                     tableHeadData={tableHeadData}
                  />
                  <TableBody>
                     {visibleRows.map((row, index) => {
                        const isItemSelected = isSelected(index);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                           <TableRow
                              hover
                              onClick={(event) => handleClick(event, index)}
                              role='checkbox'
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row._id}
                              selected={isItemSelected}
                              sx={{ cursor: "pointer" }}
                           >
                              <TableCell padding='checkbox'>
                                 <Checkbox
                                    color='primary'
                                    checked={isItemSelected}
                                    inputProps={{
                                       "aria-labelledby": labelId,
                                    }}
                                 />
                              </TableCell>
                              {tableHeadData.map((headCell) => (
                                 <TableCell
                                    key={headCell.id}
                                    align={headCell.numeric ? "right" : "left"}
                                 >
                                    {row[headCell.id as keyof Data]}
                                 </TableCell>
                              ))}
                           </TableRow>
                        );
                     })}
                     {emptyRows > 0 && (
                        <TableRow
                           style={{
                              height: (dense ? 33 : 53) * emptyRows,
                           }}
                        >
                           <TableCell colSpan={6} />
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
            </TableContainer>
            <TablePagination
               rowsPerPageOptions={[5, 10, 25]}
               component='div'
               count={data.length}
               rowsPerPage={rowsPerPage}
               page={page}
               onPageChange={handleChangePage}
               onRowsPerPageChange={handleChangeRowsPerPage}
            />
         </Paper>
         <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label='Dense padding'
         />
      </Box>
   );
}
