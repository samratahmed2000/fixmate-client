import PaymentCancelledView from "@/app/components/bookings/PaymentCancelledView";
import { requireDashboardRole } from "@/lib/core/server";

const PaymentCancelledPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ booking_id?: string | string[] }>;
}) => {
  await requireDashboardRole("customer");
  const { booking_id: bookingIdParam } = await searchParams;
  const bookingId = Array.isArray(bookingIdParam)
    ? bookingIdParam[0]
    : bookingIdParam;

  return <PaymentCancelledView bookingId={bookingId ?? ""} />;
};

export default PaymentCancelledPage;
