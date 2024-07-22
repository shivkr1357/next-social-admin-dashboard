import { Data } from "@/types/types";

export type Order = "asc" | "desc";

export const isAuthenticated = () => {
   const accessToken = localStorage.getItem("accessToken");
   const refreshToken = localStorage.getItem("refreshToken");

   if (accessToken && refreshToken) {
      return true;
   }

   return false;
};

export function descendingComparator<T>(a: T, b: T, orderBy: string): number {
   const valueA = a[orderBy as keyof T];
   const valueB = b[orderBy as keyof T];

   if (valueA < valueB) {
      return -1;
   }
   if (valueA > valueB) {
      return 1;
   }
   return 0;
}

export function getComparator(
   order: Order,
   orderBy: string
): (a: Data, b: Data) => number {
   return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

export interface HeadCell {
   disablePadding: boolean;
   id: keyof Data;
   label: string;
   numeric: boolean;
}

export const generateHeadCells = (data: Data[]): HeadCell[] => {
   if (data.length === 0) return [];
   return Object.keys(data[0]).map((key) => ({
      id: key as keyof Data,
      numeric: typeof data[0][key as keyof Data] === "number",
      disablePadding: false,
      label: key.charAt(0).toUpperCase() + key.slice(1),
   }));
};
