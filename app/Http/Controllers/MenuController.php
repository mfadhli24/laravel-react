<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuRequest;
use App\Models\Menu;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class MenuController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Cpanel');
    }

    public function store(MenuRequest $request): RedirectResponse
    {
        $data = $request->validated();
        if (empty($data['url'])) {
            $data['url'] = Str::url($data['title']);
        }

            // Pastikan boolean aman
        $data['is_active'] = $request->boolean('is_active');

        Menu::create($data);

        return redirect()->route('dashboard')->with('success', 'Menu berhasil ditambahkan!');
        // return redirect()->route('cpanel')
        //     ->with('success', 'Menu berhasil ditambahkan.');
    }
}
