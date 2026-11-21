"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { MailIcon, ShieldCheckIcon, UserRoundIcon } from "lucide-react";
import { TechnicianInfoCardProps } from "@/types/services";
import { Field } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";

const TechnicianInfoCard = ({
  technicianName: propTechnicianName,
  technicianEmail: propTechnicianEmail,
}: TechnicianInfoCardProps = {}) => {
  const { data: session } = useSession();

  const technicianName = propTechnicianName || session?.user?.name || "";
  const technicianEmail = propTechnicianEmail || session?.user?.email || "";

  const badgeClass =
    "h-auto min-h-8 max-w-full justify-start gap-1.5 rounded-lg px-2.5 py-1 text-sm font-normal whitespace-normal [&>svg]:size-3.5!";
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheckIcon aria-hidden="true" className="size-4 text-primary" />
          Technician Info
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Field>
          <span>
            <Badge variant="secondary" className={badgeClass}>
              <UserRoundIcon
                aria-hidden="true"
                className="text-muted-foreground"
              />
              <span className="min-w-0 wrap-break-words">{technicianName}</span>
            </Badge>
          </span>

          <span>
            <Badge variant="secondary" className={badgeClass}>
              <MailIcon aria-hidden="true" className="text-muted-foreground" />
              <span className="min-w-0 wrap-break-words">
                {technicianEmail}
              </span>
            </Badge>
          </span>
        </Field>
      </CardContent>
    </Card>
  );
};

export default TechnicianInfoCard;
