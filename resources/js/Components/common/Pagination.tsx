import React from 'react';
import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    total: number;
    onPageChange?: (url: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({ links, total, onPageChange }) => {
    return (
        <div className="flex items-center justify-between mt-4">
            <div>Total: {total}</div>
            <div className="flex space-x-2">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        className={`px-4 py-2 border rounded ${
                            link.active ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        onClick={(e) => {
                            if (!link.url) e.preventDefault();
                            if (onPageChange && link.url) onPageChange(link.url);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Pagination;
