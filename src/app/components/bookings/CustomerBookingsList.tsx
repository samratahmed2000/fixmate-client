import type { CustomerBooking } from "@/types/bookings";
import BookingTable from "./BookingTable";
import BookingCard from "./BookingCard";

const CustomerBookingsList = ({
  bookings,
  onBookingCancelled,
}: {
  bookings: CustomerBooking[];
  onBookingCancelled: (bookingId: string) => void;
}) => (
  <>
    <BookingTable
      bookings={bookings}
      onBookingCancelled={onBookingCancelled}
    />
    <div className="space-y-3 md:hidden">
      {bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          onBookingCancelled={onBookingCancelled}
        />
      ))}
    </div>
  </>
);

export default CustomerBookingsList;
