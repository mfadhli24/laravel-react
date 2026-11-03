<?php

namespace App\Http\Middleware;

use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            // Ambil hanya menu utama (parent_id is null) beserta anak-anaknya yang aktif
            'navigation_menus' => fn () => Menu::with(['children' => function ($query) {
                    $query->where('is_active', true)->orderBy('order', 'asc');
                }])
                ->whereNull('parent_id') // <--- KUNCI UTAMA: Hanya parent menu di root
                ->where('is_active', true)
                ->orderBy('order', 'asc')
                ->get(),
        ]);
    }
}
