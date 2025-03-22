<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Patient;
use App\Notifications\PatientRegistered;
use Illuminate\Support\Facades\Notification;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PatientTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_a_patient_successfully()
    {
        Notification::fake();
        Storage::fake('public');

        $file = UploadedFile::fake()->image('document.jpg');

        $response = $this->post(route('patient.store'), [
            'full_name' => 'John Doe',
            'email' => 'johndoe@gmail.com',
            'phone_country' => '11',
            'phone_number' => '1234567890',
            'document_photo' => $file,
        ]);

        $this->assertDatabaseHas('patients', [
            'full_name' => 'John Doe',
            'email' => 'johndoe@gmail.com',
            'phone_country' => '11',
            'phone_number' => '1234567890',
        ]);

        $patient = Patient::first();

        Storage::disk('public')->assertExists($patient->document_photo);

        Notification::assertSentTo(
            [$patient], PatientRegistered::class
        );

        $response->assertRedirect()->assertSessionHas('message', 'Patient created successfully');
    }

    public function test_it_rejects_non_gmail_emails()
    {
        $response = $this->post(route('patient.store'), [
            'full_name' => 'John Doe',
            'email' => 'johndoe@yahoo.com',
            'phone_country' => '11',
            'phone_number' => '1234567890',
            'document_photo' => UploadedFile::fake()->image('document.jpg'),
        ]);

        $response->assertSessionHasErrors(['email' => 'Only mails from Gmail are allowed (@gmail.com).']);
    }

    public function test_it_rejects_duplicate_emails()
    {
        Patient::create([
            'full_name' => 'Existing Patient',
            'email' => 'johndoe@gmail.com',
            'phone_country' => '11',
            'phone_number' => '1234567890',
            'document_photo' => 'photos/existing.jpg',
        ]);

        $response = $this->post(route('patient.store'), [
            'full_name' => 'John Doe',
            'email' => 'johndoe@gmail.com', // Correo duplicado
            'phone_country' => '11',
            'phone_number' => '1234567890',
            'document_photo' => UploadedFile::fake()->image('document.jpg'),
        ]);

        $response->assertSessionHasErrors(['email']);
    }

    public function test_it_rejects_invalid_document_photos()
    {
        $response = $this->post(route('patient.store'), [
            'full_name' => 'John Doe',
            'email' => 'johndoe@gmail.com',
            'phone_country' => '11',
            'phone_number' => '1234567890',
            'document_photo' => UploadedFile::fake()->create('document.pdf'), // Archivo no válido
        ]);

        $response->assertSessionHasErrors(['document_photo']);

        $response = $this->post(route('patient.store'), [
            'full_name' => 'John Doe',
            'email' => 'johndoe@gmail.com',
            'phone_country' => '11',
            'phone_number' => '1234567890',
            'document_photo' => UploadedFile::fake()->image('document.jpg')->size(3000), // 3 MB
        ]);

        $response->assertSessionHasErrors(['document_photo']);
    }

    
    public function test_it_rejects_missing_required_fields()
    {
        $response = $this->post(route('patient.store'), []);
        $response->assertSessionHasErrors(['full_name', 'email', 'phone_country', 'phone_number', 'document_photo']);
    }
}
