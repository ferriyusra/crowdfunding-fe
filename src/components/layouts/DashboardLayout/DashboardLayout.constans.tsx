import { FaHandHoldingHeart, FaWallet, FaTag, FaUser } from "react-icons/fa6"

const SIDEBAR_FUNDRAISER = [
  {
    key: "transation",
    label: "Transaction",
    href: "/fundraiser/donation",
    icon: <FaWallet />
  },
  {
    key: "profile",
    label: "Profile",
    href: "/fundraiser/profile",
    icon: <FaUser />
  },
]

const SIDEBAR_ADMIN = [
  {
    key: "category",
    label: "Kategori",
    href: "/admin/category",
    icon: <FaTag />
  },
  {
    key: "campaign",
    label: "Penggalangan Dana",
    href: "/admin/campaign",
    icon: <FaHandHoldingHeart />
  },
]

export {
  SIDEBAR_ADMIN,
  SIDEBAR_FUNDRAISER
}