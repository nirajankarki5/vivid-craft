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

export async function getImageById(id: string | undefined): Promise<Image> {
  if (!id) {
    throw new Error("Image ID is not provided");
  }
  try {
    const response = await fetch(`${baseUrl}/image/${id}`);
    const data: Image = await response.json();

    if (response.status !== 200) {
      throw new Error("Error occured while fetching image");
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

export async function addToFavourite(body: {
  method: string;
  imageId: string | undefined;
  token: string | null;
}) {
  if (!body.imageId) {
    throw new Error("Image ID is invalid");
  }
  if (!body.token) {
    throw new Error("Please login first");
  }

  console.log(body.method);

  try {
    const response = await fetch(`${baseUrl}/image/favourite/${body.imageId}`, {
      method: body.method,
      headers: {
        Authorization: `Bearer ${body.token}`,
        "Content-Type": "application/json",
      },
    });
    await response.json();

    if (response.status === 400 && body.method !== "DELETE") {
      throw new Error("Image is already in favourite list");
    }

    // to show success message (deleted or added)
    return { status: "success", method: body.method };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
