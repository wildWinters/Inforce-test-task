"use client";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/shad-cn/card";
import { Button } from "@/shared/shad-cn/button";
import { Pen, View } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/shared/lib/utils";
import { ITableCardWrapperProps } from "./types/i-table-card-wrapper-props";

export function EditableTableCardNoInputs({
  id,
  name,
  count,
  size,
  weight,
}: ITableCardWrapperProps) {
  const [activateMode, setActivateMode] = useState<"on" | "off">("off");

  const nameRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const widthRef = useRef<HTMLSpanElement>(null);
  const heightRef = useRef<HTMLSpanElement>(null);
  const weightRef = useRef<HTMLSpanElement>(null);

  const [formData, setFormData] = useState({
    name,
    count,
    width: size.width,
    height: size.height,
    weight,
  });

  const handleSave = () => {
    const updated = {
      name: nameRef.current?.innerText || formData.name,
      count: Number(countRef.current?.innerText) || formData.count,
      width: Number(widthRef.current?.innerText) || formData.width,
      height: Number(heightRef.current?.innerText) || formData.height,
      weight: Number(weightRef.current?.innerText) || formData.weight,
    };
    setFormData(updated);
    console.log("Збережені дані:", updated);
    setActivateMode("off");
  };

  const mode = activateMode === "on" ? "Edit mode" : "View mode";
  const sign = activateMode === "on" ? (
    <Pen className="w-5 h-5 text-red-500 cursor-pointer hover:text-blue-700 transition-colors" />
  ) : (
    <View className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700 transition-colors" />
  );

  return (
    <Card className="w-full max-w-sm shadow-lg rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <CardHeader className="bg-gray-50 px-4 py-3">
        <CardTitle
          onClick={() => setActivateMode(activateMode === "on" ? "off" : "on")}
          className={cn(
            "flex items-center justify-center gap-[5px] mx-auto cursor-pointer",
            activateMode === "on" ? "text-red-600" : "text-blue-600"
          )}
        >
          {mode} {sign}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription className="text-sm text-gray-700 space-y-2">
          <p>
            Name:{" "}
            <span
              ref={nameRef}
              contentEditable={activateMode === "on"}
              suppressContentEditableWarning
              className={activateMode === "on" ? "border-b border-dashed border-blue-400 px-1" : ""}
            >
              {formData.name}
            </span>
          </p>
          <p>
            Count:{" "}
            <span
              ref={countRef}
              contentEditable={activateMode === "on"}
              suppressContentEditableWarning
              className={activateMode === "on" ? "border-b border-dashed border-blue-400 px-1" : ""}
            >
              {formData.count}
            </span>
          </p>
          <p>
            Size:{" "}
            <span
              ref={widthRef}
              contentEditable={activateMode === "on"}
              suppressContentEditableWarning
              className={activateMode === "on" ? "border-b border-dashed border-blue-400 px-1" : ""}
            >
              {formData.width}
            </span>
            x
            <span
              ref={heightRef}
              contentEditable={activateMode === "on"}
              suppressContentEditableWarning
              className={activateMode === "on" ? "border-b border-dashed border-blue-400 px-1" : ""}
            >
              {formData.height}
            </span>
          </p>
          <p>
            Weight:{" "}
            <span
              ref={weightRef}
              contentEditable={activateMode === "on"}
              suppressContentEditableWarning
              className={activateMode === "on" ? "border-b border-dashed border-blue-400 px-1" : ""}
            >
              {formData.weight}
            </span>{" "}
            g
          </p>
        </CardDescription>
      </CardContent>

      {activateMode === "on" && (
        <CardFooter className="px-4 py-3 bg-gray-50 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setActivateMode("off")}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </CardFooter>
      )}
    </Card>
  );
}
