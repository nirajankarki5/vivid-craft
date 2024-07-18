import Image from "../types/Image";
import { baseUrl } from "../utils/constants";

export async function getImages(): Promise<Image[]> {
  try {
    const response = await fetch(`${baseUrl}/image`);
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
