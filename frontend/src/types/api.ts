export type Role = "user" | "admin" |"guide";
export type Difficulty = "easy" | "medium" | "difficult";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tour {
  _id: string;
  name: string;
  summary: string;
  description: string;
  price: number;
  duration: number; // days
  maxGroupSize: number;
  difficulty: Difficulty;
  location: string;
  imageCover: string;
  images: string[];
  startDates: string[]; // ISO, stored at 09:00 UTC
  ratingsAverage: number; // 0 when there are no reviews yet
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
}
export interface Booking {
  _id: string;
  /** `null` if the tour was deleted. Only 4 fields are populated. */
  tour: Pick<Tour, "_id" | "name" | "imageCover" | "duration"> | null;
  /** A plain id on create/cancel, an object in the admin list. */
  user: string | Pick<User, "_id" | "name" | "email">;
  startDate: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}
export interface Review {
  _id: string;
  rating: number; // 1-5, whole number
  comment: string;
  createdAt: string;
  /** An object in /users/me/reviews, a plain id elsewhere. */
  tour: string | { _id: string; name: string };
  /** An object in /tours/:id/reviews, a plain id elsewhere. */
  user: string | { _id: string; name: string };
}

export interface Availability {
  date: string;
  capacity: number;
  booked: number;
  remaining: number;
  past: boolean;
}
export interface AdminStats {
  totals: {
    users: number;
    tours: number;
    bookings: number;
    reviews: number;
    pendingBookings: number;
    revenue: number;
  };
  bookingsByStatus: Record<BookingStatus, number>;
  recentBookings: Booking[];
}
export interface ArrayEnvelope<T> {
  success: true;
  data: T[];
}

export interface PageEnvelope<T> extends ArrayEnvelope<T> {
  total: number;
  page: number;
  pages: number;
}

export interface AuthEnvelope {
  success: true;
  token: string;
  data: { user: User };
}

export interface TourInput {
  name: string;
  summary: string;
  description: string;
  price: number;
  duration: number;
  maxGroupSize: number;
  difficulty: Difficulty;
  location: string;
  imageCover: string;
  images: string[];
  startDates: string[];
}
export type TourSort =
  | "price"
  | "-price"
  | "ratingsAverage"
  | "-ratingsAverage"
  | "createdAt"
  | "-createdAt"
  | "duration"
  | "-duration";

  export type TourQuery = {
  search?: string;
  /** One value, or a comma list such as "easy,medium". */
  difficulty?: string;
  minPrice?: number;
  maxPrice?: number;
  maxDuration?: number;
  sort?: TourSort;
  page?: number;
  limit?: number; // the API caps this at 50
};