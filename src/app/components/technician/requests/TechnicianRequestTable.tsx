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
import type { TechnicianBooking } from "@/types/bookings";
import TechnicianRequestActions from "./TechnicianRequestActions";

const TechnicianRequestTable = ({
  bookings,
  onBookingUpdated,
}: {
  bookings: TechnicianBooking[];
  onBookingUpdated: (booking: TechnicianBooking) => void;
}) => (
  <div className="hidden overflow-hidden rounded-xl border bg-card shadow-xs md:block">
    <Table className="min-w-[960px] table-fixed">
      <TableHeader>
        <TableRow className="bg-muted/30">
          <TableHead className="w-[10%] whitespace-normal px-2 text-xs lg:text-sm">
            Customer
          </TableHead>
          <TableHead className="w-[12%] whitespace-normal px-2 text-xs lg:text-sm">
            Phone
          </TableHead>
          <TableHead className="w-[10%] whitespace-normal px-2 text-xs lg:text-sm">
            Address
          </TableHead>
          <TableHead className="w-[11%] whitespace-normal px-2 text-xs lg:text-sm">
            Preferred Date
          </TableHead>
          <TableHead className="w-[16%] whitespace-normal px-2 text-xs lg:text-sm">
            Problem Description
          </TableHead>
          <TableHead className="w-[12%] whitespace-normal px-2 text-xs lg:text-sm">
            Service
          </TableHead>
          <TableHead className="w-[9%] whitespace-normal px-1 text-center text-xs lg:text-sm">
            Status
          </TableHead>
          <TableHead className="w-[8%] whitespace-normal px-1 text-center text-xs lg:text-sm">
            Payment
          </TableHead>
          <TableHead className="w-[12%] whitespace-normal px-1 text-center text-xs lg:text-sm">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow
            key={booking._id}
            className="transition-colors hover:bg-muted/40"
          >
            <TableCell className="whitespace-normal break-words px-2 text-xs font-medium lg:text-sm">
              {booking.customerName || "—"}
            </TableCell>
            <TableCell className="whitespace-nowrap px-2 text-xs lg:text-sm">
              {booking.phone || "—"}
            </TableCell>
            <TableCell className="whitespace-normal break-words px-2 text-xs lg:text-sm">
              <span className="line-clamp-2" title={booking.address}>
                {booking.address || "—"}
              </span>
            </TableCell>
            <TableCell className="whitespace-nowrap px-2 text-xs lg:text-sm">
              {formatDate(booking.bookingDate)}
            </TableCell>
            <TableCell className="whitespace-normal break-words px-2 text-xs lg:text-sm">
              <span className="line-clamp-2" title={booking.problemDescription}>
                {booking.problemDescription || "—"}
              </span>
            </TableCell>
            <TableCell className="whitespace-normal break-words px-2 text-xs lg:text-sm">
              <span className="line-clamp-2">
                {booking.service?.title || "Service unavailable"}
              </span>
            </TableCell>
            <TableCell className="px-1 text-center">
              <BookingStatusBadge status={booking.status} />
            </TableCell>
            <TableCell className="px-1 text-center">
              <PaymentStatusBadge status={booking.paymentStatus} />
            </TableCell>
            <TableCell className="px-1 text-center">
              <TechnicianRequestActions
                booking={booking}
                onBookingUpdated={onBookingUpdated}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default TechnicianRequestTable;
