import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Month } from "../interfaces/month.enum";

export function Form() {
  return (
    <div className="px-6 pb-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="projectLead" className="mb-2">
            Selecciona un mes:
          </Label>
          <Select defaultValue={Month.ENERO}>
            <SelectTrigger id="projectLead" className="ps-2">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(Month).map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
