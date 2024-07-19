export type Order = "asc" | "desc";

export interface Data {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
}

export const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (accessToken && refreshToken) {
    return true;
  }

  return false;
};

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof Data>(
  order: Order,
  orderBy: Key
): (a: Data, b: Data) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function createData(
  id: number,
  fullName: string,
  email: string,
  phone: string,
  gender: string,
  address: string
): Data {
  return {
    id,
    fullName,
    email,
    phone,
    gender,
    address,
  };
}

export const rows: Data[] = [
  createData(
    1,
    "Test Account",
    "test@gmail.com",
    "7903665379",
    "M",
    "No Address"
  ),
  createData(
    2,
    "Test Account",
    "test@gmail.com",
    "7903665379",
    "M",
    "No Address"
  ),
  createData(
    3,
    "Test Account",
    "test@gmail.com",
    "7903665379",
    "M",
    "No Address"
  ),
  createData(
    4,
    "Test Account",
    "test@gmail.com",
    "7903665379",
    "M",
    "No Address"
  ),
  createData(
    5,
    "Test Account",
    "test@gmail.com",
    "7903665379",
    "M",
    "No Address"
  ),
  createData(
    6,
    "Test Account",
    "test@gmail.com",
    "7903665379",
    "M",
    "No Address"
  ),
  createData(
    7,
    "Test Account",
    "test@gmail.com",
    "7903665379",
    "M",
    "No Address"
  ),
  createData(
    8,
    "Test Account",
    "test@gmail.com",
    "7903665379",
    "M",
    "No Address"
  ),
  createData(
    9,
    "Test Account",
    "test@gmail.com",
    "7903665379",
    "M",
    "No Address"
  ),
  createData(
    10,
    "Test Account",
    "test@gmail.com",
    "7903665379",
    "M",
    "No Address"
  ),
  createData(
    11,
    "Test Account",
    "test@gmail.com",
    "7903665379",
    "M",
    "No Address"
  ),
  createData(
    12,
    "Test Account",
    "test@gmail.com",
    "7903665379",
    "M",
    "No Address"
  ),
  createData(
    13,
    "Test Account",
    "test@gmail.com",
    "7903665379",
    "M",
    "No Address"
  ),
];
