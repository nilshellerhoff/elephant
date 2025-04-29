import axios from 'axios';

export const imgurAlbumExtractor = (url: string): Promise<string[]> => {
  const match = url.match(/https:\/\/imgur\.com\/a\/(.*)/);
  if (!match) {
    throw new Error('Invalid Imgur album URL');
  }
  const albumId = match[1];

  return axios
    .get(
      `https://api.imgur.com/post/v1/albums/${albumId}?client_id=546c25a59c58ad7&include=media`,
      {
        headers: {
          Referer: null,
        },
      }
    )

    .then((res) => {
      if (res.status !== 200) {
        throw new Error('Failed to fetch Imgur album data');
      }
      const data = res.data.data;
      if (!data) {
        throw new Error('No data found in Imgur album response');
      }

      const images: string[] = data.media.map((m: any) => m.url);
      return images;
    });
};
