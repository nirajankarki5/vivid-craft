import { baseUrl } from "../utils/constants";

export async function getImages() {
  console.log();
  const response = await fetch(
    `https://cbe6f7a4-8a63-463c-bd01-c738656b688e.mock.pstmn.io/images`,
  );
  const data = await response.json();

  return data;
}
