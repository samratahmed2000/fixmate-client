"use client";

import * as React from "react";
import { ImagePlusIcon, LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateUser } from "@/lib/auth-client";
import { imageUpload } from "@/lib/actions/upload";
import { toast } from "@/components/ui/toast";

export interface ProfileFields {
  name: string;
  email: string;
  image: string | null;
  role: string;
  phone: string;
  area: string;
  bio: string;
}

const ProfileEditDialog = ({
  user,
  open,
  onOpenChange,
}: {
  user: ProfileFields;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [name, setName] = React.useState(user.name);
  const [phone, setPhone] = React.useState(user.phone);
  const [area, setArea] = React.useState(user.area);
  const [bio, setBio] = React.useState(user.bio);
  const [photo, setPhoto] = React.useState<File | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      toast.add({
        title: "Name is required",
        description: "Enter your name before saving your profile.",
        type: "warning",
      });
      return;
    }

    setIsSaving(true);
    try {
      let image = user.image;
      if (photo) {
        const uploaded = await imageUpload(photo);
        if (
          typeof uploaded !== "object" ||
          uploaded === null ||
          !("imageUrl" in uploaded) ||
          typeof uploaded.imageUrl !== "string"
        ) {
          throw new Error("The photo upload did not return a valid image URL.");
        }
        image = uploaded.imageUrl;
      }

      const { error } = await updateUser({
        name: name.trim(),
        phone: phone.trim(),
        area: area.trim(),
        bio: bio.trim(),
        image,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile.");
      }

      toast.add({
        title: "Profile Updated",
        description: "Your profile details have been saved.",
        type: "success",
      });
      onOpenChange(false);
    } catch (error) {
      toast.add({
        title: "Could Not Update Profile",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="profile-name">Name</Label>
            <Input
              id="profile-name"
              autoComplete="name"
              maxLength={80}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="profile-phone">Phone</Label>
            <Input
              id="profile-phone"
              type="tel"
              autoComplete="tel"
              maxLength={30}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="profile-area">Area</Label>
            <Input
              id="profile-area"
              autoComplete="address-level2"
              maxLength={100}
              value={area}
              onChange={(event) => setArea(event.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="profile-bio">Bio</Label>
            <Textarea
              id="profile-bio"
              maxLength={500}
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={4}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="profile-photo">Profile Photo</Label>
            <Input
              id="profile-photo"
              type="file"
              accept="image/*"
              onChange={(event) => setPhoto(event.target.files?.[0] ?? null)}
              className="h-auto py-2 file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm file:font-medium file:cursor-pointer"
            />
            {photo ? (
              <p className="text-xs text-muted-foreground">
                Selected: {photo.name}
              </p>
            ) : null}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="cursor-pointer"
            >
              {isSaving ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                <ImagePlusIcon />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
