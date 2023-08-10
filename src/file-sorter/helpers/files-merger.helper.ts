import * as fs from 'fs';
import { FILE_ENCODING } from '../../config/global.constants';
import {
  FileLineReader,
  MinHeap,
} from '../helpers';

export class FilesMerger {
  static async merge(inputFilePaths: string[], outputFilePath: string): Promise<void> {
    const writeStream = fs.createWriteStream(outputFilePath);
    const fileReaders: FileLineReader[] = [];
    const minHeap = new MinHeap();

    for (let i = 0; i < inputFilePaths.length; i++) {
      const reader = new FileLineReader(inputFilePaths[i]);
      fileReaders.push(reader);

      const value = await reader.next();
      if (value !== null) {
        minHeap.push({ value, index: i });
      }
    }

    while (!minHeap.isEmpty()) {
      const { value, index: i } = minHeap.pop()!;

      writeStream.write(`${value}\n`, FILE_ENCODING);
      const nextValue = await fileReaders[i].next();
      if (nextValue !== null) {
        minHeap.push({ value: nextValue, index: i });
      }
    }
  }
}
