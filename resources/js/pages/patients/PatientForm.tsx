import { useForm } from '@inertiajs/react';
import { LoaderCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { FormEventHandler, useState, useCallback } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type RegisterForm = {
    full_name: string;
    email: string;
    phone_country: string;
    phone_number: string;
    document_photo: File | null;
};

type RegisterProps = {
  onPatientAdded: () => void;
};

export default function Register({ onPatientAdded }: RegisterProps) {
    const { data, setData, post, processing, errors, reset, wasSuccessful, recentlySuccessful, hasErrors } = useForm<Required<RegisterForm>>({
        full_name: '',
        email: '',
        phone_country: '',
        phone_number: '',
        document_photo: null,
    });

    const [isDragging, setIsDragging] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const validateFullName = (fullName: string) => {
        const lettersRegex = /^[A-Za-z\s]+$/;
        if (!lettersRegex.test(fullName)) {
            return 'Only letters and spaces are allowed.';
        }
        return '';
    };

    const validateEmail = (email: string) => {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            return 'Only @gmail.com emails are allowed.';
        }
        return '';
    };

    const isFormValid = () => {
        const fullNameError = validateFullName(data.full_name);
        const emailError = validateEmail(data.email);

        const newValidationErrors = {
            full_name: fullNameError,
            email: emailError,
        };

        setValidationErrors(newValidationErrors);

        if (fullNameError || emailError) {
            return false;
        } else {
            return true;
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            return;
        }

        post(route('patient.store'), {
            onFinish: () => {
              console.log("Finish");
            }, 
            onSuccess: () => {
              console.log("Success");
              reset();
              setPreviewImage(null);
              setTimeout(() => {
                onPatientAdded();
              }, 3400);
            },
            onError: () => {
              console.log("Error");
            },
        });
    };

    const handlePhoneChange = (field: keyof RegisterForm, value: string) => {
        const numericValue = value.replace(/\D/g, '');
        setData(field, numericValue);
    };

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type === 'image/jpeg') {
            setData('document_photo', file);
            setPreviewImage(URL.createObjectURL(file));
        } else {
            alert('Only .jpg files are allowed');
        }
    }, [setData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type === 'image/jpeg') {
                setData('document_photo', file);
                setPreviewImage(URL.createObjectURL(file));
            } else {
                alert('Only .jpg files are allowed');
            }
        }
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
                <h1 className='font-semibold text-xl'>New patient</h1>
                <div className="grid grid-cols-[1fr_2fr] items-center gap-4">
                    <Label className='text-right' htmlFor="full_name">Full name</Label>
                    <Input
                        id="full_name"
                        type="text"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="full_name"
                        value={data.full_name}
                        onChange={(e) => setData('full_name', e.target.value)}
                        disabled={processing}
                        placeholder="Full name"
                    />
                    <InputError message={validationErrors.full_name || errors.full_name} className="col-span-2" />
                </div>

                <div className="grid grid-cols-[1fr_2fr] items-center gap-4">
                    <Label className='text-right' htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        tabIndex={2}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        disabled={processing}
                        placeholder="email@example.com"
                    />
                    <InputError message={validationErrors.email || errors.email} className="col-span-2" />
                </div>

                <div className="grid grid-cols-[1fr_2fr] items-center gap-4">
                    <Label className='text-right' htmlFor="phone_country">Country Code</Label>
                    <Input
                        id="phone_country"
                        type="text"
                        required
                        tabIndex={3}
                        autoComplete="phone_country"
                        value={data.phone_country}
                        onChange={(e) => handlePhoneChange('phone_country', e.target.value)}
                        disabled={processing}
                        placeholder="+598"
                    />
                    <InputError message={errors.phone_country} className="col-span-2" />
                </div>

                <div className="grid grid-cols-[1fr_2fr] items-center gap-4">
                    <Label className='text-right' htmlFor="phone_number">Phone Number</Label>
                    <Input
                        id="phone_number"
                        type="text"
                        required
                        tabIndex={4}
                        autoComplete="phone_number"
                        value={data.phone_number}
                        onChange={(e) => handlePhoneChange('phone_number', e.target.value)}
                        disabled={processing}
                        placeholder="11 2222 3333"
                    />
                    <InputError message={errors.phone_number} className="col-span-2" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="document_photo">Document</Label>
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center ${
                            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            />
                        ) : (
                            <p>Drag and drop a .jpg image here, or click to select.</p>
                        )}
                        <Input
                            id="document_photo"
                            type="file"
                            accept="image/jpeg"
                            required
                            tabIndex={5}
                            onChange={handleFileChange}
                            disabled={processing}
                            className="hidden"
                        />
                        <Label htmlFor="document_photo" className="cursor-pointer text-blue-500">
                            Select file
                        </Label>
                    </div>
                    <InputError message={errors.document_photo} />
                </div>
                
                <div className="flex items-center gap-4">
                    <Button
                        type="submit"
                        className={`mt-2 w-full text-white ${
                            wasSuccessful ? 'bg-green-500 hover:bg-green-600' :
                            hasErrors ? 'bg-red-500 hover:bg-red-600' :
                            'bg-blue-500 hover:bg-blue-600'
                        }`}
                        tabIndex={5}
                        disabled={processing}
                    >
                        {processing ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : wasSuccessful ? (
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>Patient added successfully!</span>
                            </div>
                        ) : hasErrors ? (
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                <span>Please review the patient data.</span>
                            </div>
                        ) : (
                            'Add Patient'
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}
