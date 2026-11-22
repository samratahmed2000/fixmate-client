import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AdminUser } from "@/types/admin";

const getInitials = (name: string | null, email: string) => {
  const source = name?.trim() || email;
  return source
    .split(/[\s@]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";
};

const AdminUserAvatar = ({
  user,
  size = "default",
}: {
  user: AdminUser;
  size?: "default" | "sm" | "lg";
}) => (
  <Avatar size={size} className="shrink-0">
    {user.image ? (
      <AvatarImage src={user.image} alt={user.name ?? "User avatar"} />
    ) : null}
    <AvatarFallback className="bg-primary/10 font-semibold text-primary">
      {getInitials(user.name, user.email)}
    </AvatarFallback>
  </Avatar>
);

export default AdminUserAvatar;
