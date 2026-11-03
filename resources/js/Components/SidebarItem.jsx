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

    // Helper untuk merender ikon (FontAwesome class atau String biasa)
    const renderIcon = (iconClass, activeState) => {
        if (!iconClass) return null;
        
        // Jika string diawali 'fa-', render sebagai tag <i> FontAwesome
        if (typeof iconClass === 'string' && iconClass.includes('fa-')) {
            return (
                <i className={`${iconClass} text-base w-5 text-center transition-all ${
                    activeState ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-[#DA4167]'
                }`}></i>
            );
        }

        // Render langsung jika berisi emoji / komponen lain
        return (
            <span className={`text-lg leading-none ${activeState ? 'text-white' : 'opacity-80 group-hover:opacity-100'}`}>
                {iconClass}
            </span>
        );
    };

    // --- RENDER MENU YANG MEMILIKI SUB-MENU (PARENT) ---
    if (hasChildren) {
        return (
            <div className="mb-1">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center justify-between w-full px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${
                        isParentActive
                            ? 'text-[#DA4167] dark:text-[#F0BCD4] bg-[#DA4167]/10 dark:bg-[#DA4167]/20 font-semibold'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                >
                    <div className="flex items-center gap-3 truncate">
                        {renderIcon(item.icon, isParentActive)}
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
                    <div className="mt-1 ml-4 pl-3 space-y-1 border-l-2 border-[#F0BCD4]/40 dark:border-gray-700/60 transition-all">
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
                    ? 'bg-[#DA4167] text-white shadow-md shadow-[#DA4167]/25 dark:bg-[#DA4167] dark:text-white font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
        >
            {renderIcon(item.icon, isActive)}
            <span className="truncate tracking-wide">{item.title}</span>
        </Link>
    );
}