import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export interface TableColumn<T> {
  key: keyof T | string;
  title: string;
  render?: (row: T) => ReactNode;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
}: {
  columns: TableColumn<T>[];
  data: T[];
}) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-700">
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-6 py-4 text-slate-900">
                    {column.render ? column.render(row) : String(row[column.key as keyof T] ?? "-")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
