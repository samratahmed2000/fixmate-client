import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CustomerBookingsSkeleton = () => (
  <>
    <div className="hidden rounded-xl border bg-card md:block">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: 7 }, (_, index) => (
              <TableHead key={index}>
                <Skeleton className="mx-auto h-4 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }, (_, index) => (
            <TableRow key={index}>
              {Array.from({ length: 7 }, (_, cellIndex) => (
                <TableCell key={cellIndex}>
                  <Skeleton className="mx-auto h-8 w-20" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <div className="space-y-3 md:hidden">
      {Array.from({ length: 3 }, (_, index) => (
        <Card key={index} className="gap-4 p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="size-14 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-9 w-full" />
        </Card>
      ))}
    </div>
  </>
);

export default CustomerBookingsSkeleton;
