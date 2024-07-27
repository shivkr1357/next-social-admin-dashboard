"use client";
import { getAllEvents } from "@/app/redux/actions/event";
import { eventsActions } from "@/app/redux/reducers/events";
import { RootState } from "@/app/redux/store";
import EnhancedTable from "@/components/CustomTable/Table";
import { CommentData, EventData, PostData } from "@/types/types";
import { generateHeadCells, HeadCell, isAuthenticated } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Event = () => {
  const [accessTokenCheck, setAccessTokenCheck] = useState(
    localStorage.getItem("accessToken")
  );
  const [headCells, setHeadCells] = useState<HeadCell[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const { events } = useSelector((state: RootState) => state.events);
  const { order, orderBy, selected, page, dense, rowsPerPage } = useSelector(
    (state: RootState) => state.paginationn
  );

  const getAllEventsData = useCallback(async () => {
    try {
      const response = await getAllEvents();
      if (response && response.data.events) {
        setHeadCells(generateHeadCells(response.data.events));
        dispatch(eventsActions.setAllEvents(response.data.events));
      }
    } catch (error) {
      console.log("Error", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated()) {
      setAccessTokenCheck("");
      router.push("/");
    } else {
      getAllEventsData();
    }
  }, [accessTokenCheck]);

  return (
    <EnhancedTable<EventData>
      data={events}
      tableHeadData={headCells}
      order={order}
      orderBy={orderBy as keyof EventData}
      selected={selected}
      page={page}
      dense={dense}
      rowsPerPage={rowsPerPage}
      title="Events"
    />
  );
};

export default Event;
