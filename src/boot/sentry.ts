import { boot } from 'quasar/wrappers';
import * as Sentry from '@sentry/vue';

export default boot(({ app, router }) => {
  const useSentry = window.localStorage.getItem('useSentry') === 'true';

  if (useSentry) {
    Sentry.init({
      app,
      dsn: 'https://b4d5879c43f7810630482a2417e16451@o4508286735024128.ingest.de.sentry.io/4508286737973328',
      integrations: [
        Sentry.browserTracingIntegration({ router }),
        Sentry.replayIntegration(),
      ],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for tracing.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,

      // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],

      // Capture Replay for 10% of all sessions,
      // plus for 100% of sessions with an error
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }
});
