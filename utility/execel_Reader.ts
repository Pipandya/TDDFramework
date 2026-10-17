
import fs from 'node:fs';
import path from 'node:path';
import * as XLSX from 'xlsx';

export function readExcel(
  fileName: string
): Record<string, string>[] {
  const filePath = path.resolve(
    process.cwd(),
    'data',
    fileName
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`Excel file not found: ${filePath}`);
  }

  const workbook = XLSX.readFile(filePath);

  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error(`No worksheets found in ${fileName}`);
  }

  const worksheet = workbook.Sheets[sheetName];

  const records = XLSX.utils.sheet_to_json<
    Record<string, unknown>
  >(worksheet, {
    defval: '',
    raw: false
  });

  return records.map(row =>
    Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        key.trim(),
        String(value ?? '').trim()
      ])
    )
  );
}

export function getTestData(
  testCaseName: string,
  fileName = 'testdata.xlsx'
): Record<string, string> {
  const records = readExcel(fileName);

  const targetName = testCaseName.trim().toLowerCase();

  // Flexible search: case-insensitive check for 'TestCaseName' or 'TestCase'
  const record = records.find(row => {
    const key = Object.keys(row).find(
      k => k.toLowerCase() === 'testcasename' || k.toLowerCase() === 'testcase'
    );
    return key && row[key].trim().toLowerCase() === targetName;
  });

  if (!record) {
    // Extract available test cases for clear debugging feedback
    const availableCases = records
      .map(row => {
        const k = Object.keys(row).find(
          col => col.toLowerCase() === 'testcasename' || col.toLowerCase() === 'testcase'
        );
        return k ? row[k] : undefined;
      })
      .filter(Boolean);

    throw new Error(
      `Test case "${testCaseName}" not found in ${fileName}.\n` +
      `Available test cases found: [${availableCases.join(', ')}]`
    );
  }

  return record;

}