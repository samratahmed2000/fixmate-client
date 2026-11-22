import TechnicianRequestsList from "@/app/components/technician/requests/TechnicianRequestsList";

const ManageRequestsPage = () => (
  <section className="space-y-6">
    <div>
      <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Service Requests
      </h1>
      <p className="mt-1 text-sm text-muted-foreground sm:text-base">
        Review customer requests and update the status of your repair work.
      </p>
    </div>
    <TechnicianRequestsList />
  </section>
);

export default ManageRequestsPage;
