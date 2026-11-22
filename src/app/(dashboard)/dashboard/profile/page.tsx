import UserProfile from "@/app/components/dashboard/profile/UserProfile";
import { requireAuthenticatedUser } from "@/lib/core/server";

const UserProfilePage = async () => {
  const user = await requireAuthenticatedUser();

  return (
    <UserProfile
      initialUser={{
        name: user.name ?? "",
        email: user.email ?? "",
        image: user.image ?? null,
        role: user.role ?? "customer",
        phone: user.phone ?? "",
        area: user.area ?? "",
        bio: user.bio ?? "",
      }}
    />
  );
};

export default UserProfilePage;
