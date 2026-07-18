/** Examiner YouTube videos (migrated from videoData.json). */

export type Video = {
  id: string;
  videoId: string;
  title: string;
  duration: string;
  category: string;
};

export const videoThumb = (id: string) =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const videoUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
