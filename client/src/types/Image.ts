interface Image {
  _id: string;
  userId: string;
  imageUrl: string;
  category: string;
  tags: string[];
  favouritesCount: number;
  createdAt: string;
  updatedAt: string;
}

export default Image;
