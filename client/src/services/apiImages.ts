import Image from "../types/Image";
import { baseUrl } from "../utils/constants";

export async function getImages(
  categoryName: string = "all",
): Promise<Image[]> {
  try {
    const response = await fetch(`${baseUrl}/image/category/${categoryName}`);
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error("An error occured");
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUploadsAndFavouriteImages(
  url: string,
  token: string | null,
): Promise<Image[]> {
  if (!token) {
    throw new Error("Token not provided");
  }

  try {
    const response = await fetch(`${baseUrl}/image${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data: Image[] = await response.json();

    if (response.status !== 200) {
      throw new Error("An error occured");
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
