import { Card } from "@/components/ui/card";
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/app/components/bookings/BookingBadges";
import { formatDate } from "@/lib/bookings/bookings";
import type { AdminBooking } from "@/types/bookings";

const AdminBookingCard = ({ booking }: { booking: AdminBooking }) => (
  <Card className="gap-4 p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">Service</p>
        <h2 className="mt-1 truncate font-semibold">
          {booking.service?.title || "Service unavailable"}
        </h2>
      </div>
      <BookingStatusBadge status={booking.status} />
    </div>

    <div className="grid gap-3 border-y py-3 text-sm sm:grid-cols-2">
      <div>
        <p className="text-xs text-muted-foreground">Customer</p>
        <p className="mt-1 font-medium">{booking.customerName || "—"}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Technician</p>
        <p className="mt-1 font-medium">{booking.technicianName || "—"}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Date</p>
        <p className="mt-1 font-medium">{formatDate(booking.bookingDate)}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Payment Status</p>
        <div className="mt-1">
          <PaymentStatusBadge status={booking.paymentStatus} />
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <p className="text-xs text-muted-foreground">Amount</p>
      <p className="font-semibold tabular-nums">
        {booking.amount !== null ? `৳${booking.amount}` : "—"}
      </p>
    </div>
  </Card>
);

export default AdminBookingCard;
