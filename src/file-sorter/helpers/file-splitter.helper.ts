import * as fs from 'fs';
import {
  DELIMITER,
  FILE_ENCODING,
  READ_FILE_RAM_RATIO,
  TEMP_DIR,
  TOTAL_RAM_AVAILABLE,
} from '../../config/global.constants';

const IGNORE_SYMBOLS = [' ', '\n', '\r', '\t', DELIMITER];
const READ_FILE_RAM_AVAILABLE = Math.floor(TOTAL_RAM_AVAILABLE * READ_FILE_RAM_RATIO);

export class FileSplitter {
  static async split(inputFilePath: string): Promise<string[]> {
    if (!fs.existsSync(inputFilePath)) throw new Error(`File with path ${inputFilePath} was not found`);
    if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

    const readStream = fs.createReadStream(inputFilePath, {
      encoding: FILE_ENCODING,
      highWaterMark: READ_FILE_RAM_AVAILABLE,
    });

    let unfinishedWord = '';
    let completedWord = '';
    const tempFilesPaths: string[] = [];

    for await (const line of readStream) {
      const words = FileSplitter.extractWords(line);
      if (!words) continue;

      if (unfinishedWord) {
        if (IGNORE_SYMBOLS.includes(line[0])) { // check if first word is separated
          completedWord = unfinishedWord; // TODO: check that vs words.unshift(unfinishedWord) performance
        } else {
          words[0] = `${unfinishedWord}${words[0]}`; // word part from prev line ending + part from new line beginning
        }
        unfinishedWord = '';
      }
      if (!IGNORE_SYMBOLS.includes(line[line.length - 1])) { // check if last word is NOT separated
        unfinishedWord = words.pop()!; // extract word part for next line
      }

      if (words.length > 0) {
        if (completedWord) {
          words.push(completedWord);
          completedWord = '';
        }
        words.sort((a, b) => a.localeCompare(b));
        await FileSplitter.writeTempFile(words, tempFilesPaths);
      }
    }

    if (unfinishedWord) {
      await FileSplitter.writeTempFile([unfinishedWord], tempFilesPaths);
    }

    return tempFilesPaths;
  }

  private static async writeTempFile(words: string[], tempFilesPaths: string[]): Promise<void> {
    const tempFilePath = `${TEMP_DIR}/temp_${tempFilesPaths.length}.txt`;
    await fs.promises.writeFile(tempFilePath, words.join('\n'), FILE_ENCODING);
    tempFilesPaths.push(tempFilePath);
  }

  private static extractWords(line: string): string[] {
    return line
      .replace(/[ \n\r\t]/g, DELIMITER) // TODO: optimize (rid of multiple delimiters in a row)
      .split(DELIMITER)
      .map((word: string) => word.trim())
      .filter((str: string) => str);
  }
}
