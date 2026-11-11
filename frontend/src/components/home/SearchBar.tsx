import { Search } from "lucide-react";

// A plain GET form: it opens /tours?search=...&difficulty=...&maxPrice=...
// The tours page reads those values from the address.
// The home page places it half over the hero and half over the next section.
export default function SearchBar() {
  const label =
    "mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase";
  const field =
    "w-full rounded-xl border border-line bg-fog px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-fjord-600 focus:outline-none focus:ring-2 focus:ring-fjord-600/20";

  return (
    <form
      action="/tours"
      className="grid gap-4 rounded-3xl bg-white p-4 shadow-xl ring-1 ring-line sm:grid-cols-2 sm:p-5 lg:grid-cols-[2fr_1fr_1fr_auto] lg:items-end"
    >
      <label>
        <span className={label}>Destination</span>
        <input
          name="search"
          placeholder="Where do you want to go?"
          className={field}
        />
      </label>
      <label>
        <span className={label}>Difficulty</span>
        <select name="difficulty" className={field} defaultValue="">
          <option value="">Any difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="difficult">Difficult</option>
        </select>
      </label>
      <label>
        <span className={label}>Max price</span>
        <input
          name="maxPrice"
          type="number"
          min="1"
          placeholder="Any price"
          className={field}
        />
      </label>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-full bg-fjord-600 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-fjord-700 sm:col-span-2 lg:col-span-1"
      >
        <Search className="size-4" aria-hidden />
        Search
      </button>
    </form>
  );
}
