import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MyServicesSkeleton = () => {
  return (
    <div aria-hidden="true" className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40 sm:w-48" />
          <Skeleton className="h-4 w-56 sm:w-72" />
        </div>
        <Skeleton className="h-9 w-32" />
      </header>

      <div className="hidden overflow-hidden rounded-xl border bg-card shadow-xs md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-[320px]">
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead className="text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-16" />
                </div>
              </TableHead>
              <TableHead className="text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-12" />
                </div>
              </TableHead>
              <TableHead className="text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-16" />
                </div>
              </TableHead>
              <TableHead className="text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-24" />
                </div>
              </TableHead>
              <TableHead className="text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-16" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 4 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-12 shrink-0 rounded-lg" />
                    <div className="space-y-1.5 text-left">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Skeleton className="h-4 w-16" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Skeleton className="size-8 rounded-md" />
                    <Skeleton className="size-8 rounded-md" />
                    <Skeleton className="size-8 rounded-md" />
                    <Skeleton className="size-8 rounded-md" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-3.5 md:hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="space-y-3.5 p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="size-16 shrink-0 rounded-lg" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-14" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-3 w-28" />
              </div>

              <div className="flex items-center justify-between border-y py-2">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-10 rounded-md" />
                <Skeleton className="h-10 rounded-md" />
                <Skeleton className="h-10 rounded-md" />
                <Skeleton className="h-10 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyServicesSkeleton;
