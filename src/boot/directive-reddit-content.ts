import { boot } from 'quasar/wrappers';
import { processRedditContent } from 'src/util/redditContent';

export default boot(({ app }) => {
  app.directive('reddit-content', {
    mounted: function (el) {
      processRedditContent(el);
    },
    updated: function (el) {
      processRedditContent(el);
    },
  });
});
