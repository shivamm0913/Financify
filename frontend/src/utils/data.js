import { FaUserCircle } from "react-icons/fa";
import {
  LuLayoutDashboard,
  LuHandCoins,
  LuLogOut,
  LuWalletMinimal,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "04",
    label: "Profile",
    icon: FaUserCircle,
    path: "/profile",
  },
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Income",
    icon: LuWalletMinimal,
    path: "/income",
  },
  {
    id: "03",
    label: "Expense",
    icon: LuHandCoins,
    path: "/expense",
  },
  {
    id: "06",
    label: "Logout",
    icon: LuLogOut,
    path: "/logout",
  },
];
