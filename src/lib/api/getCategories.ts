import { baseUrl } from "../utils";

const getCategories = async () => {
  if (!baseUrl) {
    console.error("BASE_URL is not configured");
    return { data: [] };
  }

  try {
    const res = await fetch(`${baseUrl}/api/categories`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to load categories:", res.status);
      return { data: [] };
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { data: [] };
  }
};

export default getCategories;
