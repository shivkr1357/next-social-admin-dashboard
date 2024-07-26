import { HeadCell, Order } from "@/utils/utils";

export interface IUser {
   _id?: string;
   email: string;
   password: string;
   birthday?: string;
}

export interface Data {
   id: number;
   fullName: string;
   email: string;
   phone: string;
   gender: string;
   address: string;
   about?: string;
   blockedUsers?: string[];
   colorTheme?: string;
   deviceToken?: string;
   hobbies?: string[];
   isDeactivated?: boolean;
   language?: string;
   profilePicture?: string;
   __v?: number;
   _id?: string;
}

export interface PostData {
   _id: string;
   title: string;
   description: string;
   userId: string;
   image: string;
   tags: string[];
   postType: string;
   likes: string[];
   comments: string[];
   createdAt: string;
   updatedAt: string;
}

export interface CommentData {
   _id: string;
   comment: string;
   postId: string;
   userId: string;
   likes: string[];
   createdAt: string;
   updatedAt: string;
}

export interface EnhancedTableProps<T> {
   data: T[];
   tableHeadData: HeadCell[];
   order: Order;
   orderBy: string;
   selected: number[];
   page: number;
   dense: boolean;
   rowsPerPage: number;
}

export interface IPaginationState<T> {
   order: Order;
   orderBy: keyof T;
   selected: number[];
   page: number;
   dense: boolean;
   rowsPerPage: number;
}

// For Data (assuming Data here is the type you provided earlier)
export type DataTableProps = EnhancedTableProps<Data>;

// For Post data
export type PostTableProps = EnhancedTableProps<PostData>;
