import { Suspense } from "react";
import AddServiceFormSkeleton from "@/app/components/technician/add-service/AddServiceFormSkeleton";
import AddServiceSection from "@/app/components/technician/add-service/AddServiceSection";

const AddServicePage = () => {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <header className="space-y-1.5">
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Add New Service
        </h1>
        <p className="text-sm text-pretty text-muted-foreground sm:text-base">
          Publish a repair service to the FixMate marketplace with service
          details.
        </p>
      </header>

      <Suspense fallback={<AddServiceFormSkeleton />}>
        <AddServiceSection />
      </Suspense>
    </div>
  );
};

export default AddServicePage;
