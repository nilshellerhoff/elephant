import { LogMessage, Severity } from 'src/types/logger';
import { ref, Ref } from 'vue';

const consoleLoggingEnabled = true;
const overlayLoggingEnabled = true;
const logEntries: Ref<LogMessage[]> = ref([]);

export const useLogger = () => {
  const consoleHandler = (message: LogMessage) => {
    if (message.severity == 'error') console.error(message.message);
    else if (message.severity == 'warn') console.warn(message.message);
    else if (message.severity == 'info') console.info(message.message);
    else if (message.severity == 'debug') console.debug(message.message);
    else
      throw `Unknown severity ${message.severity} for log message "${message.message}"`;
  };

  const log = (message: string, severity: Severity) => {
    logEntries.value.push({ message, severity, time: new Date() });

    if (consoleLoggingEnabled)
      consoleHandler({ message, severity, time: new Date() });
  };
  const debug = (message: string) => log(message, 'debug');
  const info = (message: string) => log(message, 'info');
  const warn = (message: string) => log(message, 'warn');
  const error = (message: string) => log(message, 'error');

  return {
    logEntries: logEntries,
    consoleLoggingEnabled,
    overlayLoggingEnabled,
    log,
    debug,
    info,
    warn,
    error,
  };
};
