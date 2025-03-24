import { useState } from 'react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'; // Importar los íconos
import styles from './PatientsList.module.css';
import Heading from '@/components/heading';

function PatientsList() {
  const { patients } = usePage<SharedData>().props;
  const [expandedPatientId, setExpandedPatientId] = useState<number | null>(null);

  const toggleExpand = (patientId: number) => {
    setExpandedPatientId(expandedPatientId === patientId ? null : patientId);
  };

  return (
    <div className="p-6">
      {patients.length > 0 && <h1 className="my-6 text-2xl font-semibold">Patients list:</h1>} {/* Título condicional */}
      <div className="flex flex-wrap justify-center gap-6 overflow-y-auto">
        {patients.length === 0 ? (
          <Heading title="No patients registered." description="If you want, you can run the DB seeders ;)" />
        ) : (
          patients.map((patient) => (
            <div
              key={patient.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5"
            >
              <Card
                className="rounded-xl cursor-pointer transition-all duration-300"
                onClick={() => toggleExpand(patient.id)}
              >
                <CardHeader className="px-8 pt-6 pb-0 text-center items-center justify-center">
                  <img
                    src={patient.document_photo}
                    alt="Document"
                    className="rounded-full w-24 h-24 object-cover border-4 border-white shadow-md"
                  />
                  <CardTitle className="text-xl flex items-center justify-between mt-4">
                    {patient.full_name}
                  </CardTitle>
                  <CardDescription>
                    <span
                      className={`transition-transform duration-300 text-xl ${
                        expandedPatientId === patient.id ? 'text-red-500' : 'text-green-500'
                      }`}
                    >
                      {expandedPatientId === patient.id ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <ChevronDownIcon className="h-6 w-6" />
                      )}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent
                  className={`px-10 ${styles['card-content-expandable']} ${
                    expandedPatientId === patient.id ? styles.expanded : ''
                  }`}
                >
                  <div>
                    <p className="text-muted-foreground text-sm">Email:</p>
                    <p>{patient.email}</p>
                    <p className="mt-2 text-muted-foreground text-sm">Phone number:</p>
                    <p>(+{patient.phone_country}) {patient.phone_number}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PatientsList;