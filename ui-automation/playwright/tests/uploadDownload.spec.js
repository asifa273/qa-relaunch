const ExcelJS = require('exceljs');
const { expect, test } = require('@playwright/test');
const path = require('node:path');

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}


async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                // console.log(rowNumber);
                // console.log(colNumber);
                output.row = rowNumber;
                output.column = colNumber;
            }
        })

    })
    return output;
}

test('@Web upload download excel file', async ({ page }) => {
    const textSearch = 'Mango';
    const updatedValue = '350';
    const filePath = '/Users/asifabegum/downloads/download.xlsx';

    // const filePath = path.join(__dirname, 'download.xlsx');
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    // getByRole('button', { name: 'Download' })

    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    await download.saveAs(filePath);
    // await waitForEvent

    await writeExcelTest(textSearch, updatedValue, { rowChange: 0, colChange: 2 }, filePath);

    await page.getByRole('button', { name: 'Choose File' }).click();
    await page.getByRole('button', { name: 'Choose File' }).setInputFiles(filePath);
    const textLocator = await page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({ has: textLocator });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updatedValue);

});