import { baseUrl } from "../utils";

export const imageUpload = async (imageFile: File) => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured");
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await fetch(`${baseUrl}/api/upload`, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      typeof data?.message === "string"
        ? data.message
        : "Failed to upload image",
    );
  }

  return data;
};
