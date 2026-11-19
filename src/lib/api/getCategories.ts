import { baseUrl } from "../utils";

const getCategories = async () => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured");
  }

  const res = await fetch(`${baseUrl}/api/categories`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to load categories");
  }

  return await res.json();
};

export default getCategories;
