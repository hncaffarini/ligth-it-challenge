//import { useEffect, useState } from 'react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function PatientsList() {
  const { patients } = usePage<SharedData>().props;

  return (
    <div>
      <h1 className="my-6">Patients list:</h1>
      <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 lg:flex-row gap-6">
        {patients.length === 0 ? (
          <p>No patients registered.</p>
        ) : (
          patients.map((patient) => (
              <Card className="rounded-xl " key={patient.id}>
                  <CardHeader className="px-10 pt-8 pb-0 text-center">
                      <CardTitle className="text-xl">{patient.full_name}</CardTitle>
                      <CardDescription>
                        <p>{patient.email}</p>
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="px-10 py-8">
                    <p>Phone country: (+{patient.phone_country})</p>
                    <p>Phone number: {patient.phone_number}</p>
                    <img src={patient.document_photo} alt="Document" width="100" />
                  </CardContent>
              </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default PatientsList;
