import { useState } from "react";
import PatientForm from "./PatientForm";
import { Button } from "@/components/ui/button";

function AddPatientButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 lg:flex-row">
      <Button onClick={() => setIsOpen(true)} className="mt-2 w-max">
        Add Patient
      </Button>
      {isOpen && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "#1c1c1c2d",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <div style={{ backgroundColor: "#1c1c1c", padding: "20px", borderRadius: "5px" }}>
            <PatientForm onPatientAdded={() => setIsOpen(false)} />
            <button onClick={() => setIsOpen(false)} style={{ marginTop: "10px" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddPatientButton;
