<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Notifications\PatientRegistered;

class PatientController extends Controller
{
    public function store(Request $request)
    {

        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'unique:patients,email',
                'regex:/^[a-zA-Z0-9._%+-]+@gmail\.com$/'
            ],
            'phone' => 'required|string',
            'document_photo' => 'required|image|mimes:jpg|max:2048',
            ],[
            'email.regex' => 'Only mails from Gmail are allowed (@gmail.com).',
        ]);

        $photoPath = $request->file('document_photo')->store('photos', 'public');

        $patient = Patient::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'document_photo' => $photoPath
        ]);

        $patient->notify(new PatientRegistered());

        return back()->with([
            'message' => 'Patient created successfully'
        ]);
    }

    public function index()
    {
        return Inertia::render('home');
    }
}
