import api from "@/lib/api";
import { ArrayEnvelope, Availability, PageEnvelope, Review, Tour, TourInput, TourQuery } from "@/types/api";

type TourResponse = { data: { tour: Tour } };

export async function getTours(params: TourQuery = {}) {
  const res = await api.get<PageEnvelope<Tour>>("/tour", { params });

  return {
    tours: res.data.data,
    total: res.data.total,
    page: res.data.page,
    pages: res.data.pages,
  };
}
export async function getTour(id: string) {
  const res = await api.get<TourResponse>(`/tour/${id}`);
  return res.data.data.tour;
}
export async function getAvailability(id: string) {
  const res = await api.get<ArrayEnvelope<Availability>>(
    `/tours/${id}/availability`,
  );
  return res.data.data;
}
export async function getTourReviews(id: string, page = 1) {
  const res = await api.get<PageEnvelope<Review>>(`/review/${id}`, {
    params: { page },
  });

  return {
    reviews: res.data.data,
    total: res.data.total,
    page: res.data.page,
    pages: res.data.pages,
  };
}

export async function createTour(input: TourInput) {
  const res = await api.post<TourResponse>("/tour", input);
  return res.data.data.tour;
}

export async function updateTour(id: string, input: TourInput) {
  const res = await api.patch<TourResponse>(`/tour/${id}`, input);
  return res.data.data.tour;
}

