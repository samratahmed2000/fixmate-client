import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/app/components/bookings/BookingBadges";
import { formatDate } from "@/lib/bookings/bookings";
import type { AdminBooking } from "@/types/bookings";

const AdminBookingsTable = ({ bookings }: { bookings: AdminBooking[] }) => (
  <div className="hidden overflow-hidden rounded-xl border bg-card shadow-xs md:block">
    <Table className="min-w-[900px]">
      <TableHeader>
        <TableRow className="bg-muted/30">
          <TableHead>Service</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Technician</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Payment Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking._id} className="hover:bg-muted/40">
            <TableCell className="max-w-56 truncate font-medium">
              {booking.service?.title || "Service unavailable"}
            </TableCell>
            <TableCell>{booking.customerName || "—"}</TableCell>
            <TableCell>{booking.technicianName || "—"}</TableCell>
            <TableCell>{formatDate(booking.bookingDate)}</TableCell>
            <TableCell className="text-center">
              <BookingStatusBadge status={booking.status} />
            </TableCell>
            <TableCell className="text-center">
              <PaymentStatusBadge status={booking.paymentStatus} />
            </TableCell>
            <TableCell className="text-right font-semibold tabular-nums">
              {booking.amount !== null ? `৳${booking.amount}` : "—"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default AdminBookingsTable;
