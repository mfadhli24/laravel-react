<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/percobaan', function () {
    return Inertia::render('Percobaan');
});

Route::get('/test', function () {
    return Inertia::render('test/Test');
});

Route::get('/login', function () {
    return Inertia::render('auth/Login');
});
