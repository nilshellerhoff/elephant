import { Post } from 'src/types/reddit/post';
import { isImage } from 'src/util/media/image';
import { isGallery } from 'src/util/media/gallery';
import { isVideo } from 'src/util/media/video';

export const isMedia = (post: Post) =>
  isImage(post) || isGallery(post) || isVideo(post);
