// Site-wide settings. Change them here, not inside components.
export const SITE = {
  name: "Wayfar",
  tagline: "Travel Agency",
  description: "Find, compare and book guided tours.",
  currency: process.env.NEXT_PUBLIC_CURRENCY ?? "USD",
  locale: "en-US",
  // Placeholder contact details. Replace with the client's real ones.
  email: "hello@wayfar.example",
  phone: "+1 000 000 0000",
  address: "123 Example Street, Your City",
};

// Links shown in the header (desktop and mobile menu).
export const NAV_LINKS = [
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/#destinations" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];