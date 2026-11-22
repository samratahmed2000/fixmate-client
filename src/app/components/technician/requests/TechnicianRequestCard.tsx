import { Card } from "@/components/ui/card";
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/app/components/bookings/BookingBadges";
import { formatDate } from "@/lib/bookings/bookings";
import type { TechnicianBooking } from "@/types/bookings";
import TechnicianRequestActions from "./TechnicianRequestActions";

const TechnicianRequestCard = ({
  booking,
  onBookingUpdated,
}: {
  booking: TechnicianBooking;
  onBookingUpdated: (booking: TechnicianBooking) => void;
}) => (
  <Card className="gap-4 p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">Service</p>
        <h2 className="mt-1 font-semibold">
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
        <p className="text-xs text-muted-foreground">Phone</p>
        <p className="mt-1 font-medium">{booking.phone || "—"}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Address</p>
        <p className="mt-1 wrap-break-words font-medium">
          {booking.address || "—"}
        </p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Preferred date</p>
        <p className="mt-1 font-medium">{formatDate(booking.bookingDate)}</p>
      </div>
      <div className="sm:col-span-2">
        <p className="text-xs text-muted-foreground">Problem description</p>
        <p className="mt-1 wrap-break-words font-medium">
          {booking.problemDescription || "—"}
        </p>
      </div>
    </div>

    <div className="space-y-3">
      <div>
        <p className="text-xs text-muted-foreground">Payment</p>
        <div className="mt-1">
          <PaymentStatusBadge status={booking.paymentStatus} />
        </div>
      </div>
      <TechnicianRequestActions
        booking={booking}
        mobile
        onBookingUpdated={onBookingUpdated}
      />
    </div>
  </Card>
);

export default TechnicianRequestCard;
