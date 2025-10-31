import XLSX from "xlsx";

/**
 * Reads and parses an Excel file into a JSON array
 * @param {File} file - The Excel file to be read
 * @param {number} [range] - Optional row range to read from the worksheet
 * @returns {Promise<Array<Record<string, string>>>} A promise that resolves to an array of objects representing the worksheet data
 * @throws {Error} If there's an error reading or parsing the file
 *
 * @example
 * // Basic usage
 * const data = await readExcel(file);
 *
 * // With row range
 * const data = await readExcel(file, 10); // Reads after first 10 rows
 */

export async function readExcel(file: File, range?: number): Promise<Array<Array<string>>> {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const json = XLSX.utils.sheet_to_json(worksheet, { range, header: 1, defval: "" });

  return JSON.parse(JSON.stringify(json));
}
