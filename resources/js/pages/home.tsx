import PatientsList from '@/pages/patients/PatientList/PatientsList';
import AddPatientButton from '@/pages/patients/AddPatientButton';
import { Separator } from '@radix-ui/react-separator';
import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';

function Home() {
  return (
    <>
        <Head title="Light-it" />
        <div style={{ padding: "20px", textAlign:"center", margin: "auto" }}>
          <Heading title='Light-it challenge' description='...a patient registration application using Laravel & React'></Heading>
          <AddPatientButton />
          <Separator className="my-6"/>
          <PatientsList />
        </div>
    </>
  );
}

export default Home;
