import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Packages from "@/components/home/Packages";
import SearchBar from "@/components/home/SearchBar";
import Testimonials, { HomeReview } from "@/components/home/Testimonials";
import { getErrorMessage } from "@/lib/api";
import { getTourReviews, getTours } from "@/services/tourService";
import { Tour } from "@/types/api";

// Always fetch fresh data (do not build this page once and reuse it).
export const dynamic = "force-dynamic";

async function loadReviews(tours: Tour[]): Promise<HomeReview[]> {
  const lists = await Promise.all(
    tours.slice(0, 6).map(async (tour) => {
      try {
        const { reviews } = await getTourReviews(tour._id);
        return reviews.map((r) => ({
          id: r._id,
          name: typeof r.user === "object" ? r.user.name : "Anonymous",
          comment: r.comment,
          rating: r.rating,
        }));
      } catch {
        return [];
      }
    }),
  );
  return lists.flat();
}

async function page() {
  let tours: Tour[] = [];
  let error = "";
  try {
    const result = await getTours({ sort: "-ratingsAverage", limit: 10 });
    tours = result.tours;
  } catch (err) {
    error = getErrorMessage(err);
  }
  const reviewLists = tours.length > 0 ? await loadReviews(tours) : [];
  const reviews = reviewLists.flat();
  return (
    <div>
      <Hero />
      <div className="container-page -mt-14 relative z-20">
        <SearchBar />
      </div>
      <Intro />
      <Packages tours={tours} error={error} />
      <Testimonials reviews={reviews} />
    </div>
  );
}

export default page;
