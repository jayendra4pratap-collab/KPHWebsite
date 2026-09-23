import {
  LayoutDashboard,
  CodeXml,
  Library,
  Trophy,
  CalendarDays,
  Megaphone,
  UsersRound,
  Link2,
  MessageSquare,
} from "lucide-react";

export const navigation = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Practice",
    items: [
      { label: "Problem of the Day", href: "/dashboard/pod", icon: CodeXml },
      {
        label: "Practice Resources",
        href: "/dashboard/resources",
        icon: Library,
      },
      {
        label: "Leaderboard",
        href: "/dashboard/leaderboard",
        icon: Trophy,
        upcoming: true,
      },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Events", href: "/dashboard/events", icon: CalendarDays },
      {
        label: "Announcements",
        href: "/dashboard/announcements",
        icon: Megaphone,
      },
      {
        label: "Coordinators",
        href: "/dashboard/coordinators",
        icon: UsersRound,
        upcoming: true,
      },
      {
        label: "Connect",
        href: "/dashboard/connect",
        icon: Link2,
        upcoming: true,
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        label: "Feedback",
        href: "/dashboard/feedback",
        icon: MessageSquare,
        upcoming: true,
      },
    ],
  },
];

export const navigationItems = navigation.flatMap((group) => group.items);
