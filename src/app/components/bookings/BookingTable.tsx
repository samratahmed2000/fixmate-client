import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { BookingStatusBadge, PaymentStatusBadge } from "./BookingBadges";
import BookingActions from "./BookingActions";
import { CustomerBooking } from "@/types/bookings";
import { formatDate, getAmount } from "@/lib/bookings/bookings";
import { ServiceThumbnail } from "./ServiceThumbnail";

const BookingTable = ({
  bookings,
  onBookingCancelled,
}: {
  bookings: CustomerBooking[];
  onBookingCancelled: (bookingId: string) => void;
}) => (
  <div className="hidden overflow-hidden rounded-xl border bg-card shadow-xs md:block">
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/30">
          <TableHead className="w-67.5">Service</TableHead>
          <TableHead className="text-center">Technician</TableHead>
          <TableHead className="text-center">Preferred Date</TableHead>
          <TableHead className="text-center">Amount</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Payment</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => {
          const amount = getAmount(booking);

          return (
            <TableRow
              key={booking._id}
              className="transition-colors hover:bg-muted/40"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <ServiceThumbnail booking={booking} />
                  <span className="max-w-48 truncate font-semibold">
                    {booking.service?.title || "Service unavailable"}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                {booking.technicianName ||
                  booking.service?.technicianName ||
                  "—"}
              </TableCell>
              <TableCell className="text-center">
                {formatDate(booking.bookingDate)}
              </TableCell>
              <TableCell className="text-center font-semibold tabular-nums">
                {amount !== undefined ? `৳${amount}` : "—"}
              </TableCell>
              <TableCell className="text-center">
                <BookingStatusBadge status={booking.status} />
              </TableCell>
              <TableCell className="text-center">
                <PaymentStatusBadge status={booking.paymentStatus} />
              </TableCell>
              <TableCell className="text-center">
                <BookingActions
                  booking={booking}
                  onBookingCancelled={onBookingCancelled}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </div>
);

export default BookingTable;
