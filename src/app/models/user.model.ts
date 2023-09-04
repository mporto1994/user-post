export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface Pagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface UserResponse {
  code: number;
  meta: {
    pagination: Pagination;
  };
  data: User[];
}

export interface GetUser {
  users: User[];
  pagination?: Pagination;
}

export interface ApiResponse<T> {
  code: number;
  data: T | null;
  meta?: any;
  error?: string;
}
