import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6"

const NAV_ITEMS = [
  {
    label: "Beranda", href: "/"
  },
  {
    label: "Donasi", href: "/campaign"
  },
]

const BUTTON_ITEMS = [
  {
    label: "Daftar",
    href: "/auth/register",
    variant: "bordered"
  },
  {
    label: "Masuk", href: "/auth/login", variant: "solid"
  },
]

const SOCIAL_ITEMS = [
  {
    label: "Instagram", href: "https://instagram.com", icon: <FaInstagram />
  },
  {
    label: "Tiktok", href: "https://tiktok.com", icon: <FaTiktok />
  },
  {
    label: "YouTube", href: "https://youtube.com", icon: <FaYoutube />
  },
]

export { NAV_ITEMS, BUTTON_ITEMS, SOCIAL_ITEMS }