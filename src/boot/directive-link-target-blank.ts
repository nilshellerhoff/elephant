import { boot } from 'quasar/wrappers';
import { processRedditContent } from 'src/util/redditContent';

export default boot(({ app }) => {
  app.directive('links-in-new-window', {
    mounted: function (el) {
      processRedditContent(el);
    },
    updated: function (el) {
      processRedditContent(el);
    },
  });
});
