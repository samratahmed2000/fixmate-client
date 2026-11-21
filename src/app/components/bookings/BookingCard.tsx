import { Card } from "@/components/ui/card";
import { CustomerBooking } from "@/types/bookings";
import { BookingStatusBadge, PaymentStatusBadge } from "./BookingBadges";
import BookingActions from "./BookingActions";
import { formatDate, getAmount } from "@/lib/bookings/bookings";
import { ServiceThumbnail } from "./ServiceThumbnail";

const BookingCard = ({
  booking,
  onBookingCancelled,
}: {
  booking: CustomerBooking;
  onBookingCancelled: (bookingId: string) => void;
}) => {
  const amount = getAmount(booking);

  return (
    <Card className="gap-0 p-4">
      <div className="flex min-w-0 items-center gap-3">
        <ServiceThumbnail booking={booking} />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold">
            {booking.service?.title || "Service unavailable"}
          </h2>
          <p className="mt-1 truncate text-[10px] text-muted-foreground">
            {booking.technicianName ||
              booking.service?.technicianName ||
              "Technician unavailable"}
          </p>
        </div>
        <p className="shrink-0 font-semibold tabular-nums">
          {amount !== undefined ? `৳${amount}` : "—"}
        </p>
      </div>

      <div className="flex gap-2 items-center mt-2 px-1">
        <p className="text-xs text-muted-foreground">Preferred date</p>
        <p className="text-[12px] font-medium">
          {formatDate(booking.bookingDate)}
        </p>
      </div>

      <div className="my-4 flex justify-between items-center border-y py-3 px-2 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Payment</p>
          <div className="mt-1">
            <PaymentStatusBadge status={booking.paymentStatus} />
          </div>
        </div>
        <div className="col-span-2">
          <p className="text-xs text-muted-foreground">Booking status</p>
          <div className="mt-1">
            <BookingStatusBadge status={booking.status} />
          </div>
        </div>
      </div>

      <BookingActions
        booking={booking}
        mobile
        onBookingCancelled={onBookingCancelled}
      />
    </Card>
  );
};

export default BookingCard;
