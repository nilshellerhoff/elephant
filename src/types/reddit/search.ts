import { Listing } from 'src/types/reddit/base';
import { SubredditAboutResponse } from 'src/types/reddit/subreddit';

export type SubredditsSearchResponse = Listing<SubredditAboutResponse>;
