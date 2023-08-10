import * as fs from 'fs';
import * as readline from 'readline';
import { FILE_ENCODING } from '../../config/global.constants';

// TODO: check multiple parallel accesses to a file

export class FileLineReader {
  private readonly linesIterator;

  constructor(filePath: string) {
    this.linesIterator = this.iterateLines(filePath);
  }

  async next(): Promise<string | null> {
    const result = await this.linesIterator.next();
    return result.value ? result.value : null;
  }

  private async* iterateLines(filePath: string) {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(filePath, { encoding: FILE_ENCODING }),
      crlfDelay: Infinity,
    });
    for await (const line of readInterface) {
      yield line;
    }
  }
}
