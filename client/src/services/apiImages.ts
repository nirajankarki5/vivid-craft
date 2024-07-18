import Image from "../types/Image";
import { baseUrl } from "../utils/constants";

export async function getImages(
  categoryName: string = "all",
): Promise<Image[]> {
  try {
    let response;
    if (categoryName === "all") {
      response = await fetch(`${baseUrl}/image`);
    } else {
      response = await fetch(`${baseUrl}/image/category/${categoryName}`);
    }
    const data = await response.json();

    if (response.status === 404) {
      throw new Error("An error occured");
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
