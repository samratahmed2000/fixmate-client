"use client";

import * as React from "react";
import { MapPinIcon, PencilIcon, PhoneIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { getRoleBadgeClassName } from "@/lib/dashboard/role-badge";
import ProfileEditDialog, { type ProfileFields } from "./ProfileEditDialog";

const getInitials = (name: string, email: string) => {
  const parts = (name.trim() || email.split("@")[0])
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const UserProfile = ({ initialUser }: { initialUser: ProfileFields }) => {
  const { data: session } = useSession();
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const sessionUser = session?.user;
  const user: ProfileFields = {
    name: sessionUser?.name ?? initialUser.name,
    email: sessionUser?.email ?? initialUser.email,
    image: sessionUser?.image ?? initialUser.image,
    role: sessionUser?.role ?? initialUser.role,
    phone: sessionUser?.phone ?? initialUser.phone,
    area: sessionUser?.area ?? initialUser.area,
    bio: sessionUser?.bio ?? initialUser.bio,
  };

  return (
    <section className="mx-auto w-full max-w-4xl space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            View and manage your account information.
          </p>
        </div>
        <Button
          className="cursor-pointer"
          type="button"
          onClick={() => setIsEditOpen(true)}
        >
          <PencilIcon />
          Edit Profile
        </Button>
      </header>

      <Card className="border-border shadow-xs">
        <CardHeader className="border-b">
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <Avatar size="lg" className="size-20">
                {user.image ? (
                  <AvatarImage
                    src={user.image}
                    alt={user.name || "Profile photo"}
                  />
                ) : null}
                <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                  {getInitials(user.name, user.email)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 space-y-0.5">
                <h2 className="font-heading text-xl font-semibold">
                  {user.name || "Name not set"}
                </h2>
                <Badge
                  variant="outline"
                  className={`w-fit capitalize ${getRoleBadgeClassName(user.role)}`}
                >
                  {user.role}
                </Badge>
                <p className="break-all text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <ProfileValue label="Phone" value={user.phone} icon={PhoneIcon} />
            <ProfileValue label="Area" value={user.area} icon={MapPinIcon} />
            <div className="space-y-1.5 sm:col-span-2">
              <p className="text-sm font-medium">Bio</p>
              <p className="min-h-10 whitespace-pre-wrap text-sm text-muted-foreground">
                {user.bio || "No bio added"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProfileEditDialog
        key={String(isEditOpen)}
        user={user}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </section>
  );
};

const ProfileValue = ({
  label,
  value,
  readOnly = false,
  icon: Icon,
}: {
  label: string;
  value: string;
  readOnly?: boolean;
  icon?: typeof PhoneIcon;
}) => (
  <div className="space-y-1.5">
    <p className="text-sm font-medium">{label}</p>
    <div className="flex min-h-10 items-center gap-2 rounded-lg border bg-muted/20 px-3 text-sm">
      {Icon ? (
        <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
      ) : null}
      <span className="min-w-0 wrap-break-words text-muted-foreground">
        {value || "Not provided"}
      </span>
      {readOnly ? (
        <span className="ml-auto shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          Read only
        </span>
      ) : null}
    </div>
  </div>
);

export default UserProfile;
