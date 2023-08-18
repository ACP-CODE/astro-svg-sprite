// @internal
export interface ILogger {
  info(...msg: string[]): void;
  success(...msg: string[]): void;
  warn(...msg: string[]): void;
  error(...msg: string[]): void;
}

// @internal
export class Logger implements ILogger {
  private colors = {
    reset: '\x1b[0m',
    fg: {
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      cyan: '\x1b[1m\x1b[36m'
    },
  } as const;

  private packageName: string;

  constructor(packageName: string) {
    this.packageName = packageName;
  }

  private log(msg: string[], prefix: string = '') {
    const s = msg.join('\n');
    // eslint-disable-next-line no-console
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    console.log(
      `\x1b[38;2;169;169;169m${hours}:${minutes}:${seconds}\x1b[0m %s[${this.packageName}]%s ${s}`,
      prefix,
      prefix ? this.colors.reset : ''
    );
  }

  info(...msg: string[]) {
    this.log(msg);
  }

  success(...msg: string[]) {
    this.log(msg, this.colors.fg.cyan);
  }

  warn(...msg: string[]) {
    this.log([`${this.colors.fg.yellow}Caution!${this.colors.reset}`, ...msg], this.colors.fg.cyan);
  }

  error(...msg: string[]) {
    this.log([`${this.colors.fg.red}Failed!${this.colors.reset}`, ...msg], this.colors.fg.cyan);
  }
}
