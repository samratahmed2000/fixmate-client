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

const TechnicianRequestsSkeleton = () => (
  <>
    <div className="hidden overflow-hidden rounded-xl border bg-card md:block">
      <Table className="min-w-[960px] table-fixed">
        <TableHeader>
          <TableRow>
            {Array.from({ length: 9 }, (_, index) => (
              <TableHead key={index}>
                <Skeleton className="h-4 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }, (_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: 9 }, (_, cellIndex) => (
                <TableCell key={cellIndex}>
                  <Skeleton className="h-8 w-20" />
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
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-9 w-full" />
        </Card>
      ))}
    </div>
  </>
);

export default TechnicianRequestsSkeleton;
