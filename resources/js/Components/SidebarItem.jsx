import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function SidebarItem({ item }) {
    const { url: currentUrl } = usePage();
    const hasChildren = item.children && item.children.length > 0;

    // Cek apakah halaman saat ini sama dengan URL item atau salah satu anak-anaknya
    const isChildActive = (children) => {
        return children?.some(child => 
            child.url === currentUrl || (child.children && isChildActive(child.children))
        );
    };

    const isActive = item.url === currentUrl;
    const isParentActive = hasChildren && isChildActive(item.children);

    // State open otomatis true jika salah satu child menu sedang aktif
    const [isOpen, setIsOpen] = useState(isParentActive);

    // --- RENDER MENU YANG MEMILIKI SUB-MENU (PARENT) ---
    if (hasChildren) {
        return (
            <div className="mb-1">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center justify-between w-full px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${
                        isParentActive
                            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/40'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                >
                    <div className="flex items-center gap-3 truncate">
                        {/* Render Ikon opsional jika ada di data */}
                        {item.icon && (
                            <span className="text-lg leading-none opacity-80 group-hover:opacity-100">
                                {item.icon}
                            </span>
                        )}
                        <span className="truncate tracking-wide">{item.title}</span>
                    </div>

                    {/* Indikator Panah Dropdown */}
                    <svg
                        className={`w-4 h-4 transition-transform duration-200 opacity-60 group-hover:opacity-100 ${
                            isOpen ? 'rotate-90' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Sub-menu Container (Rekursif) */}
                {isOpen && (
                    <div className="mt-1 ml-4 pl-3 space-y-1 border-l-2 border-gray-200/60 dark:border-gray-700/60 transition-all">
                        {item.children.map((child) => (
                            <SidebarItem key={child.id} item={child} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // --- RENDER MENU TUNGGAL (LEAF) ---
    return (
        <Link
            href={item.url || '#'}
            className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${
                isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 dark:bg-indigo-500 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
        >
            {item.icon && (
                <span className={`text-lg leading-none ${isActive ? 'text-white' : 'opacity-80 group-hover:opacity-100'}`}>
                    {item.icon}
                </span>
            )}
            <span className="truncate tracking-wide">{item.title}</span>
        </Link>
    );
}