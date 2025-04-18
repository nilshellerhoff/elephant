export type MediaEntryImage = {
  u: string;
  x: number;
  y: number;
};

export type MediaMetadataImage = {
  e: 'Image';
  id: string;
  m: string;
  p: MediaEntryImage[];
  s: MediaEntryImage;
  status: 'valid';
};

export type MediaMetadataAnimatedImage = {
  e: 'AnimatedImage';
  id: string;
  m: string;
  p: MediaEntryImage[];
  s: {
    gif: string;
    mp4: string;
    x: number;
    y: number;
  };
  status: 'valid';
};

export type MediaRedditVideo = {
  bitrate_kbps: number;
  fallback_url: string;
  has_audio: boolean;
  height: number;
  width: number;
  scrubber_media_url: string;
  dash_url: string;
  duration: number;
  hls_url: string;
  is_gif: boolean;
  transcoding_status: 'completed';
};
