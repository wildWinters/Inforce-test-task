import {
  Card,
  CardContent,
  CardFooter,
} from "@/shared/shad-cn/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/shared/shad-cn/button";
import { fields } from "../mock/mock-dileds-card";

export function CardDemo() {
  return (
    <Card className="w-full  h-[300px]  overflow-y-scroll"> 
      <CardContent className="p-4"> 
        <form>
          <div className="flex flex-col gap-1"> 
            {fields.map(({ id, label, type, placeholder }) => (
              <div className="grid gap-1" key={id}> 
                <Label htmlFor={id} className="text-sm font-medium">
                  {label}
                </Label>
                <Input
                  id={id}
                  name={id}
                  type={type}
                  placeholder={placeholder}
                  required
                  className="h-8 text-sm"  
                />
              </div>
            ))}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2 px-4 pb-4">
        <Button type="submit" className="w-full text-sm py-2">
          Confirm
        </Button>
        <Button type="button" className="w-full text-sm py-2">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
