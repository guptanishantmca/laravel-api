import React from 'react';

interface Column {
    key: string;
    label: string;
}

interface TableProps {
    columns: Column[];
    data: Record<string, any>[]; // Array of objects representing rows
    actions?: (row: Record<string, any>) => React.ReactNode; // Optional action buttons
}

const Table: React.FC<TableProps> = ({ columns, data, actions }) => {
    console.log('data',data);
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700"
                            >
                                {col.label}
                            </th>
                        ))}
                        {actions && <th className="border border-gray-300 px-4 py-2">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="even:bg-gray-50">
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className="border border-gray-300 px-4 py-2 text-sm text-gray-600"
                                    >
                                        {row[col.key]}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="border border-gray-300 px-4 py-2">
                                        {actions(row)}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length + (actions ? 1 : 0)}
                                className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-500"
                            >
                                No data available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
