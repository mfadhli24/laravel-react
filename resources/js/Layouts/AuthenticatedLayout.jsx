import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import SidebarItem from "@/Components/SidebarItem";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import NavLink from "../Components/NavLink";

export default function AuthenticatedLayout({ header, children }) {
    const { auth, navigation_menus } = usePage().props;
    const user = auth.user;

    // State Sidebar Collapsed (Desktop) & Mobile Toggle
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showingSidebar, setShowingSidebar] = useState(false);

    // State & Efek Dark Mode
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            return (
                localStorage.getItem("theme") === "dark" ||
                (!("theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
            );
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 flex flex-col lg:flex-row text-gray-800 dark:text-gray-200">
            {/* Backdrop Overlay untuk Mobile (Sidebar Slide View) */}
            {showingSidebar && (
                <div
                    onClick={() => setShowingSidebar(false)}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* FLOATING SIDEBAR (Desktop) */}
            <aside
                className={`hidden lg:flex fixed top-4 bottom-4 left-4 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 flex-col justify-between transition-all duration-300 ${
                    isCollapsed ? "w-20" : "w-64"
                }`}
            >
                <div className="flex flex-col h-full overflow-hidden">
                    {/* Header Logo & Toggle Minimize */}
                    <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100 dark:border-gray-700/50">
                        <Link
                            href="/"
                            className="flex items-center gap-3 overflow-hidden"
                        >
                            <ApplicationLogo className="h-8 w-8 shrink-0 fill-current text-indigo-600 dark:text-indigo-400" />
                            {!isCollapsed && (
                                <span className="font-bold text-lg text-gray-800 dark:text-white tracking-wide truncate">
                                    Warehouse
                                </span>
                            )}
                        </Link>

                        {/* Tombol Toggle Minimize Sidebar */}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 transition"
                            title={
                                isCollapsed
                                    ? "Perbesar Sidebar"
                                    : "Kecilkan Sidebar"
                            }
                        >
                            <svg
                                className={`h-5 w-5 transform transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Area Navigasi Utama */}
                    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
                        {navigation_menus && navigation_menus.length > 0
                            ? navigation_menus.map((menu) => (
                                  <SidebarItem
                                      key={menu.id}
                                      item={menu}
                                      isCollapsed={isCollapsed}
                                  />
                              ))
                            : !isCollapsed && (
                                  <div className="px-3 py-2 text-xs text-gray-400">
                                    <li>
                                        <NavLink
                                            href={route('dashboard')}
                                            active={route().current('dashboard')}
                                        >
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            href={route('cpanel')}
                                            active={route().current('cpanel')}
                                        >
                                            Control Panel
                                        </NavLink>
                                    </li>
                                  </div>
                              )}
                    </nav>
                </div>

                {/* Bottom Card Profile & Theme Switcher */}
                {/* Note: overflow-visible agar Dropdown yang membuka ke atas tidak terpotong */}
                <div className="p-3 border-t border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-2xl relative overflow-visible">
                    <div className="flex items-center justify-between gap-1">
                        {/* Custom Dropdown Profil (Membuka ke Atas) */}
                        <div className="relative flex-1">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-3 w-full text-left p-1.5 rounded-xl hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex shrink-0 items-center justify-center font-bold text-sm shadow">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        {!isCollapsed && (
                                            <div className="truncate flex-1">
                                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight truncate">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-400 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                        )}
                                    </button>
                                </Dropdown.Trigger>

                                {/* Dropdown Content diposisikan melayang ke atas (bottom-full mb-2) */}
                                <Dropdown.Content
                                    align={isCollapsed ? "left" : "left"}
                                    width="48"
                                    contentClasses="py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-xl absolute bottom-full mb-2 z-50"
                                >
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Theme Switcher Button */}
                        {!isCollapsed && (
                            <button
                                type="button"
                                onClick={toggleDarkMode}
                                title="Ganti Tema"
                                className="p-2 rounded-xl text-gray-500 hover:bg-gray-200/60 dark:text-gray-400 dark:hover:bg-gray-700/60 transition shrink-0"
                            >
                                {darkMode ? (
                                    <i class="fa-solid fa-sun h-5 w-5 text-amber-400"></i>
                                ) : (
                                    <i class="fa-solid fa-moon h-5 w-5 text-indigo-500"></i>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 ${
                    isCollapsed ? "lg:pl-[6.5rem]" : "lg:pl-[17.5rem]"
                } pb-20 lg:pb-0`}
            >
                {/* Mobile Top App Bar */}
                <header className="lg:hidden flex items-center justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur px-4 py-3 m-4 mb-0 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center gap-3">
                        <ApplicationLogo className="h-7 w-7 fill-current text-indigo-600 dark:text-indigo-400" />
                        <span className="font-semibold text-gray-700 dark:text-gray-200">
                            AppName
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={toggleDarkMode}
                        className="p-2 rounded-xl text-gray-500 dark:text-gray-400"
                    >
                        {darkMode ? (
                            <i class="fa-solid fa-sun h-5 w-5 text-amber-400"></i>
                        ) : (
                            <i class="fa-solid fa-moon h-5 w-5 text-indigo-500"></i>
                        )}
                    </button>
                </header>

                {/* Page Title Header (Opsional) */}
                {header && (
                    <header className="px-6 pt-6 pb-2">
                        <div className="mx-auto max-w-7xl font-semibold text-xl text-gray-800 dark:text-gray-200">
                            {header}
                        </div>
                    </header>
                )}

                {/* Page Content Body */}
                <main className="flex-1 p-6">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </main>
            </div>

            {/* FLOATING BOTTOM NAVIGATION BAR (Khusus Mobile Layout) */}
            <div className="lg:hidden fixed bottom-3 left-4 right-4 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/60 dark:border-gray-700/60 px-4 py-2 flex items-center justify-around">
                {navigation_menus &&
                    navigation_menus.slice(0, 4).map((menu) => (
                        <Link
                            key={menu.id}
                            href={menu.url || "#"}
                            className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1"
                        >
                            {menu.icon ? (
                                <span className="text-xl">{menu.icon}</span>
                            ) : (
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                            <span className="text-[10px] font-medium tracking-tight truncate max-w-[60px]">
                                {menu.title}
                            </span>
                        </Link>
                    ))}

                {/* Profile Avatar Button / Trigger Dropdown Mobile */}
                <div className="relative">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex flex-col items-center gap-1 p-1">
                                <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400">
                                    Saya
                                </span>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content
                            align="right"
                            width="48"
                            contentClasses="py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-xl absolute bottom-full mb-3 right-0 z-50"
                        >
                            <Dropdown.Link href={route("profile.edit")}>
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}