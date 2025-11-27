import { Month } from "@/features/attendance/month";
import { New } from "@/features/attendance/new";
import { Quarter } from "@/features/attendance/quarter";
import { Separator } from "@/components/ui/separator";

export default function AsistenciaPage() {
  return (
    <div
      className="max-w-7xl 
                    flex flex-col 
                    gap-7 md:gap-10 lg:gap-20 
                    mx-3 md:mx-7 lg:mx-20 
                    my-5 md:my-10 lg:my-20
                    "
    >
      <New />
      <Separator className="my-4" />
      <Month />
      <Separator className="my-4" />
      <Quarter />
    </div>
  );
}
