export type Severity = 'debug' | 'info' | 'warn' | 'error';

export type LogMessage = {
  message: string;
  severity: Severity;
  time: Date;
};
