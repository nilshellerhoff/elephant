import { SubredditAboutResponse } from 'src/types/reddit/subreddit';

export const getSubredditIcon = (subreddit: SubredditAboutResponse) => {
  return subreddit.data.community_icon
    ? subreddit.data.community_icon
    : subreddit.data.icon_img;
};
