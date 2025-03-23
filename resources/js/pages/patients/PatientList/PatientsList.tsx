import { useState } from 'react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import styles from './PatientsList.module.css';

function PatientsList() {
  const { patients } = usePage<SharedData>().props;
  const [expandedPatientId, setExpandedPatientId] = useState<number | null>(null);

  const toggleExpand = (patientId: number) => {
    setExpandedPatientId(expandedPatientId === patientId ? null : patientId);
  };

  return (
    <div>
      <h1 className="my-6">Patients list:</h1>
      <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 lg:flex-row gap-6">
        {patients.length === 0 ? (
          <p>No patients registered.</p>
        ) : (
          patients.map((patient) => (
            <Card
              className="rounded-xl cursor-pointer transition-all duration-300"
              key={patient.id}
              onClick={() => toggleExpand(patient.id)}
            >
              <CardHeader className="px-8 pt-6 pb-0 text-center items-center justify-center">
                <img src={patient.document_photo} alt="Document" className="rounded-full w-24 h-24 object-cover border-4 border-white shadow-md" />
                <CardTitle className="text-xl flex items-center justify-between">
                  {patient.full_name}
                </CardTitle>
                <CardDescription>
                    <span
                      className={`transition-transform duration-300 text-xl ${
                        expandedPatientId === patient.id ? 'text-red-500' : 'text-green-500'
                      }`}
                    >
                    {expandedPatientId === patient.id ? '-' : '+'}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent 
                  className={`px-10 ${styles['card-content-expandable']} ${
                      expandedPatientId === patient.id ? styles.expanded : ''
                  }`}>

                  <div>
                    <p className="text-muted-foreground text-sm">
                      Email:
                    </p>
                    <p>{patient.email}</p>
                    <p className="mt-2 text-muted-foreground text-sm">
                      Phone number:
                    </p>
                    <p>(+{patient.phone_country}) {patient.phone_number}</p>
                  </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default PatientsList;
