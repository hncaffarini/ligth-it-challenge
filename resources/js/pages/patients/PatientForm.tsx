import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type RegisterForm = {
    full_name: string;
    email: string;
    phone: string;
    document_photo: File | null;
};

type RegisterProps = {
  onPatientAdded: () => void;
};

export default function Register({ onPatientAdded }: RegisterProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        full_name: '',
        email: '',
        phone: '',
        document_photo: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('patient.store'), {
            onFinish: () => {
              console.log("Finish");
              //onPatientAdded();
            }, 
            onSuccess: () => {
              console.log("Success");
              reset();
              onPatientAdded();
            },
            onError: () => {
              console.log("Error");
            },
        });
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="full_name">Full name</Label>
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
                    <InputError message={errors.full_name} className="mt-2" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
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
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                        id="phone"
                        type="text"
                        required
                        tabIndex={3}
                        autoComplete="phone"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        disabled={processing}
                        placeholder="phone"
                    />
                    <InputError message={errors.phone} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="document_photo">Document</Label>
                    <Input
                        id="document_photo"
                        type="file"
                        accept="image/*"
                        required
                        tabIndex={4}
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setData('document_photo', e.target.files[0]);
                            }
                        }}
                        disabled={processing}
                    />
                    <InputError message={errors.document_photo} />
                </div>

                <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Add Patient
                </Button>
            </div>
        </form>
    );
}
