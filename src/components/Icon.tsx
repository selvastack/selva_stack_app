import type { LucideIcon } from "lucide-react";
import {
  BadgeDollarSign,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Camera,
  Database,
  EyeOff,
  FileChartColumn,
  FlaskConical,
  FolderKanban,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Landmark,
  Layers,
  Leaf,
  Map,
  MapPinned,
  MessageCircle,
  Network,
  PanelTop,
  Radar,
  School,
  Share2,
  Sparkles,
  Target,
  Users,
  WalletCards,
  WifiOff
} from "lucide-react";

import type { IconName } from "@/lib/types";

const iconMap: Record<IconName, LucideIcon> = {
  "badge-dollar-sign": BadgeDollarSign,
  "bar-chart-3": BarChart3,
  "book-open": BookOpen,
  "building-2": Building2,
  database: Database,
  "eye-off": EyeOff,
  facebook: Share2,
  "file-chart-column": FileChartColumn,
  "flask-conical": FlaskConical,
  "folder-kanban": FolderKanban,
  "graduation-cap": GraduationCap,
  handshake: Handshake,
  "heart-handshake": HeartHandshake,
  instagram: Camera,
  landmark: Landmark,
  layers: Layers,
  leaf: Leaf,
  linkedin: BriefcaseBusiness,
  map: Map,
  "map-pinned": MapPinned,
  "message-circle": MessageCircle,
  network: Network,
  "panel-top": PanelTop,
  radar: Radar,
  school: School,
  sparkles: Sparkles,
  target: Target,
  users: Users,
  "wallet-cards": WalletCards,
  "wifi-off": WifiOff
};

type IconProps = {
  name: IconName;
  className?: string;
  size?: number;
};

export function Icon({ name, className, size = 22 }: IconProps) {
  const Component = iconMap[name] ?? Leaf;

  return <Component aria-hidden="true" className={className} size={size} />;
}
