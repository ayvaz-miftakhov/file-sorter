import * as fs from 'fs';
import { TEMP_DIR } from '../config/global.constants';
import {
  FilesMerger,
  FileSplitter
} from './helpers';

export class FileSorterService {
  async sort(inputFilePath: string, outputFilePath: string) {
    const tempFilesPaths = await FileSplitter.split(inputFilePath);
    await FilesMerger.merge(tempFilesPaths, outputFilePath);
    await fs.promises.rm(TEMP_DIR, { recursive: true });
  }
}
