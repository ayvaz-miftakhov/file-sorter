# FileSorter

## Description

Lexicographically sorts string values from a file (file size may exceed available RAM) and creates a new file with sorted values.

## Running
Execute the command (_ts-node_ should be installed)
```bash
ts-node ./src/main.ts
```

## Configuration

Modifiable parameters are stored in the file ./src/config/global.constants.ts

| Parameter             | Description                                                  |
|-----------------------|--------------------------------------------------------------|
| TOTAL_RAM_AVAILABLE   | Total available RAM on the device                            |
| READ_FILE_RAM_RATIO   | Coefficient of available memory for reading data from a file |
| INPUT_FILE_PATH       | Path to the file from which data should be sorted            |
| OUTPUT_FILE_PATH      | Path where the sorted file should be saved                   |
| TEMP_DIR              | Directory for storing temporary files                        |
| FILE_ENCODING         | File encoding                                                |
| DELIMITER             | Delimiter character between sorted substrings                |

### TODO
1. Move configurations to .env
2. Add unit tests
3. Make ignored characters configurable
