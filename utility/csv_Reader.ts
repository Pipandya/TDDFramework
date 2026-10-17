
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';

export function readCSV(
  fileName: string
): Record<string, string>[] {
  const filePath = path.resolve(
    process.cwd(),
    'data',
    fileName
  );

  const csvContent = fs.readFileSync(filePath, 'utf-8');

  return parse(csvContent, {
    columns: (headers: string[]) =>
      headers.map(header => header.trim()),
    skip_empty_lines: true,
    trim: true,
    bom: true
  }) as Record<string, string>[];
}

export function getTestData(
  testCaseName: string,
  fileName = 'testdata.csv'
): Record<string, string> {
  const records = readCSV(fileName);

  const record = records.find(
    row => row['TestCaseName'] === testCaseName
  );

  if (!record) {
    throw new Error(
      `Test case "${testCaseName}" not found in ${fileName}`
    );
  }

  return record;
}