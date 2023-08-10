import {
  INPUT_FILE_PATH,
  OUTPUT_FILE_PATH,
} from './config/global.constants';
import { FileSorterService } from './file-sorter/file-sorter.service';

const fileSorter = new FileSorterService();
fileSorter.sort(INPUT_FILE_PATH, OUTPUT_FILE_PATH)
  .then(() => {
    console.log(`File '${INPUT_FILE_PATH}'was successfully sorted and saved to a file '${OUTPUT_FILE_PATH}'`);
  })
  .catch((error) => {
    console.log(`An error occurs while executing the program: '${error}'`);
  });
