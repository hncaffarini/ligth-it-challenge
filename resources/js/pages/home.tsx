import PatientsList from '@/pages/patients/PatientsList';
import AddPatientButton from '@/pages/patients/AddPatientButton';
import { Separator } from '@radix-ui/react-separator';
//import { usePage } from '@inertiajs/react';

function Home() {
  //const { patients } = usePage().props;
  return (
    <div style={{ padding: "20px", textAlign:"center", margin: "auto" }}>
      <h1>Patient Registration</h1>
      <AddPatientButton />
      <Separator className="my-6 md:hidden"/>
      <PatientsList />
    </div>
  );
}

export default Home;
