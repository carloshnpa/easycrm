import {Icons} from "@/components/icons";
import {Button} from "@/components/ui/button";
import {useState} from "react";

import XLSX from "xlsx";

type IBtnExport = {
    columnNames: string[]
    rows: Record<any, any>[]
    sheetName: string
    filename: string
}
export default function ButtonExcelExport(
    {
        columnNames,
        rows,
        sheetName,
        filename,
    }: IBtnExport
) {

    const [isLoading, setLoading] = useState<boolean>(false)
    const exportData = async () => {
        setLoading(true)
        try {
            const worksheet = XLSX.utils.json_to_sheet(rows);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

            XLSX.utils.sheet_add_aoa(worksheet, [columnNames], {origin: "A1"});

            const rowsFirstParam = Object.getOwnPropertyNames(rows[0])[0]

            const max_width = rows.reduce((w, r) => Math.max(w, r[rowsFirstParam].length), 10);
            worksheet["!cols"] = [{wch: max_width}];

            XLSX.writeFile(workbook, filename, {compression: true});
        } catch (e) {
            console.error(false)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Button variant="outline" size="sm" onClick={exportData}>
                <Icons.DownloadIcon className="h-4 w-4 mr-2"/>
                Export
            </Button>
        </>
    )
}
