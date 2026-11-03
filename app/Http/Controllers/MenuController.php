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
    public function create(MenuRequest $request): RedirectResponse
    {
        $data = $request->validated();
        if (empty($data['url'])) {
            $data['url'] = Str::url($data['title']);
        }

        Menu::create($data);

        return Redirect::route('dashboard')->with('success', 'Yeay!');
        // return redirect()->route('cpanel')
        //     ->with('success', 'Menu berhasil ditambahkan.');
    }
}
