import { IStudientAttendance } from "../../interfaces/types";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { CheckboxCard } from "@/components/ui/checkbox-card";
import { Heading } from "@/components/ui/heading";

export function ValidateCard({
  studentAbsence,
}: {
  studentAbsence: IStudientAttendance;
}) {
  const cantAbsences = studentAbsence.absences.length;
  const dictionary: Record<number, string> = {
    0: "siempre presente",
    1: "faltó el día: ",
  };
  const paragraph =
    dictionary[cantAbsences] || `tiene ${cantAbsences} ausencias los días:`;

  return (
    <div>
      <Heading variant="primary" size="md" className="min-h-17">
        {studentAbsence.student}
      </Heading>
      <Text variant="muted" className="my-4">
        {paragraph}
      </Text>
      <div className="flex justify-center gap-2 flex-wrap min-h-35">
        {studentAbsence.absences.map((day) => (
          <CheckboxCard
            key={day + studentAbsence.student}
            variant="success"
            title={day.toString()}
            onCheckedChange={(checked) => console.log(day, checked)}
          />
        ))}
      </div>
    </div>
  );
}
