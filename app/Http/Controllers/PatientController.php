<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Notifications\PatientRegistered;

class PatientController
{
    public function store(Request $request)
    {

        $request->validate([
            'full_name' => 'required|string|alpha:ascii|max:100',
            'email' => [
                'required',
                'email',
                'unique:patients,email',
                'regex:/^[a-zA-Z0-9._%+-]+@gmail\.com$/'
            ],
            'phone_country' => 'required|integer|max_digits:4',
            'phone_number' => 'required|integer|max_digits:15',
            'document_photo' => 'required|image|mimes:jpg|max:8192',
            ],[
            'email.regex' => 'Only mails from Gmail are allowed (@gmail.com).',
        ]);

        $photoPath = $request->file('document_photo')->store('photos', 'public');

        $patient = Patient::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone_country' => $request->phone_country,
            'phone_number' => $request->phone_number,
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
