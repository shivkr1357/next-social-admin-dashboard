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
