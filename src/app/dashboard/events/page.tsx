"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "@/app/redux/actions/event";
import { eventsActions } from "@/app/redux/reducers/events";
import { paginationActions } from "@/app/redux/reducers/pagination";
import EnhancedTable from "@/components/CustomTable/Table";
import { generateHeadCells, HeadCell, isAuthenticated } from "@/utils/utils";
import { RootState } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import { EventData } from "@/types/types";

const Event = () => {
   const [headCells, setHeadCells] = useState<HeadCell[]>([]);
   const dispatch = useDispatch();
   const router = useRouter();

   const { events } = useSelector((state: RootState) => state.events);
   const { order, orderBy, selected, page, dense, rowsPerPage, total } =
      useSelector((state: RootState) => state.pagination);

   const fetchEvents = useCallback(
      async (page: number, rowsPerPage: number) => {
         try {
            const response = await getAllEvents(page, rowsPerPage);
            if (response && response.data.events) {
               if (page === 0) {
                  dispatch(eventsActions.setEvents(response.data.events)); // Replace events
               } else {
                  dispatch(eventsActions.appendEvents(response.data.events)); // Append new events
               }
               setHeadCells(generateHeadCells(response.data.events));
               dispatch(
                  paginationActions.setTotal(
                     response.data.pagination.totalRecords
                  )
               );
            }
         } catch (error) {
            console.log("Error", error);
         }
      },
      [dispatch]
   );

   useEffect(() => {
      if (!isAuthenticated()) {
         router.push("/");
      } else {
         fetchEvents(page, rowsPerPage);
      }
   }, [page, rowsPerPage, fetchEvents, router]);

   return (
      <EnhancedTable<EventData>
         data={events}
         tableHeadData={headCells}
         order={order}
         orderBy={orderBy as keyof EventData}
         selected={selected}
         page={page} // MUI Table expects 0-indexed page
         dense={dense}
         rowsPerPage={rowsPerPage}
         total={total}
         title='Events'
      />
   );
};

export default Event;
