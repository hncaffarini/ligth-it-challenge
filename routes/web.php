<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Patient;

use App\Http\Controllers\PatientController;

Route::get('patient', [PatientController::class, 'index']);
Route::post('patient', [PatientController::class, 'store'])->name('patient.store');;

Route::get('/', function () {
    return Inertia::render('home');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
