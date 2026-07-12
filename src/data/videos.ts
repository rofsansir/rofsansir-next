/** Examiner YouTube videos (migrated from videoData.json). */

export type Video = {
  id: string;
  videoId: string;
  title: string;
  duration: string;
  category: string;
};

/**
 * Fallback data, used when the R2-hosted manifest (assets/data/videos.json)
 * is unreachable or empty - see src/lib/remote-content.ts.
 */
export const fallbackVideos: Video[] = [
  {
    id: "1",
    videoId: "n4pKaLL-fyE",
    title: "How to Write Comprehension Answers Perfectly in O Level Bangla (3204)",
    duration: "3:19",
    category: "Comprehension",
  },
  {
    id: "2",
    videoId: "MCuveciqCV0",
    title: "O Level Bengali - Last 3 Months Preparation | Paper 1 Strategy",
    duration: "5:40",
    category: "Paper 1",
  },
  {
    id: "5",
    videoId: "XVkO44dEq48",
    title: "O Level Bangla Coaching - Admission Open",
    duration: "1:30",
    category: "Overview",
  },
  {
    id: "6",
    videoId: "tAlxNZrj7xU",
    title: "Why do students miss the A* in O Level Bangla?",
    duration: "5:18",
    category: "Examiner Insight",
  },
  {
    id: "8",
    videoId: "Ktr2lmfm2Z4",
    title: "Exam Tips - O Level Bangla Paper 2",
    duration: "7:37",
    category: "Paper 2",
  },
  {
    id: "9",
    videoId: "MILbr7xliD0",
    title: "Last-minute Tips & Suggestions for O Level Bengali Paper 01",
    duration: "Exam Tips",
    category: "Paper 1",
  },
];

export const videoThumb = (id: string) =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const videoUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
