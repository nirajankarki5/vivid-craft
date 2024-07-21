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

export async function getPresignedUrl(
  token: string | null,
): Promise<{ key: string; url: string }> {
  if (!token) {
    throw new Error("Token not provided");
  }

  try {
    const response = await fetch(`${baseUrl}/upload`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function uploadImage(url: string, file: File) {
  try {
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createImage(
  imageType: {
    imageUrl: string;
    category: string;
    tags: string[];
  },
  token: string | null,
): Promise<Image> {
  if (!token) {
    throw new Error("Token not provided");
  }

  try {
    const response = await fetch(`${baseUrl}/image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageType),
    });

    const data: Image = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
