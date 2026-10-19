import ExcelJS from 'exceljs';
import type { Cell, Row, Worksheet } from 'exceljs';
import { expect, test } from '@playwright/test';

interface Coordinate {
    row: number;
    column: number;
}

interface CoordinateDelta {
    rowChange?: number;
    colChange: number;
}

async function readExcel(
    worksheet: Worksheet,
    searchText: string
): Promise<Coordinate> {
    const coordinate: Coordinate = { row: -1, column: -1 };

    worksheet.eachRow((row: Row, rowNumber: number) => {
        row.eachCell((cell: Cell, colNumber: number) => {
            if (cell.value?.toString() === searchText) {
                coordinate.row = rowNumber;
                coordinate.column = colNumber;
            }
        });
    });

    return coordinate;
}

async function writeExcelTest(
    searchText: string,
    replaceText: string | number,
    change: CoordinateDelta,
    filePath: string
): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Sheet1');
    if (!worksheet) {
        throw new Error("Worksheet 'Sheet1' was not found.");
    }

    const position = await readExcel(worksheet, searchText);
    if (position.row === -1 || position.column === -1) {
        throw new Error(`Text "${searchText}" was not found in the worksheet.`);
    }

    const targetRow = position.row + (change.rowChange ?? 0);
    const targetCol = position.column + change.colChange;

    const cell: Cell = worksheet.getCell(targetRow, targetCol);
    cell.value = replaceText;

    await workbook.xlsx.writeFile(filePath);
}

test('@Web upload download excel file', async ({ page }, testInfo) => {
    const textSearch = 'Mango';
    const updatedValue = '350';
    const filePath = testInfo.outputPath('download.xlsx');

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

    // Trigger and wait for download
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    await download.saveAs(filePath);

    // Edit file
    await writeExcelTest(textSearch, updatedValue, { rowChange: 0, colChange: 2 }, filePath);

    // Upload file (setInputFiles directly on the input element without clicking)
    await page.locator('#fileinput').setInputFiles(filePath);

    // Verify DOM update
    const textLocator = page.getByText(textSearch);
    const desiredRow = page.getByRole('row').filter({ has: textLocator });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updatedValue);
});