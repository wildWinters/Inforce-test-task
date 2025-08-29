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
import { Textarea } from "@/shared/shad-cn/textarea";
import { kyInstance } from "@/shared/lib/ky";
import { Pen, Trash2, Triangle, View } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/shared/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ITableCardWrapperProps } from "./types/i-table-card-wrapper-props";


export function TableCardWrapper({
  id,
  name,
  count,
  size,
  weight,
}: ITableCardWrapperProps) {
  const queryClient = useQueryClient();
  const tanstackKey = "comments";
  const { data } = useQuery({
    queryKey: [tanstackKey, id],
    queryFn: () => kyInstance.get(`comments/${id}`).json(),
  });

  const [activateMode, setActivateMode] = useState<"on" | "off">("off");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const mode = activateMode === "on" ? "Edit mode" : "View mode";
  const sign =
    activateMode === "on" ? (
      <Pen className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700 transition-colors" />
    ) : (
      <View className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700 transition-colors" />
    );

  const handleDeleteComment = (id: string | number, index: number) => {
    kyInstance.delete(`comments/${id}/${index}`).then(() => {
      queryClient.invalidateQueries({ queryKey: [tanstackKey, id] });
    });
  };

  const updateCommentsButtonClick = (id: string | number, userComment: string) => {
    if (!userComment.trim()) return;
    kyInstance.post("comments", {
      json: { id, comment: userComment, date: new Date().toISOString() },
    }).then(() => {
      if (textAreaRef.current) textAreaRef.current.value = "";
      queryClient.invalidateQueries({ queryKey: [tanstackKey, id] });
    });
  };

  return (
    <Card className="w-full max-w-sm shadow-lg rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <CardHeader className="bg-gray-50 px-4 py-3 flex flex-col gap-2">
        <div
          onClick={() => setActivateMode(activateMode === "on" ? "off" : "on")}
          className={cn(
            "flex mx-auto items-center justify-center gap-2 cursor-pointer select-none font-semibold",
            activateMode === "on" ? "text-red-600" : "text-blue-600"
          )}
        >
          {mode} {sign}
        </div>
        <CardTitle className="mx-auto text-lg font-bold text-center">{name}</CardTitle>
        <CardDescription
          className={cn(
            "mt-2 flex justify-between text-sm text-gray-600 gap-2 flex-wrap",
            activateMode === "on" ? "flex-col items-center justify-center w-full" : "flex"
          )}
        >
          <RespondProductData id={id} label="Count" value={`${count}`} editMode={activateMode === "on"} field="count" />
          <RespondProductData id={id} label="Width" value={`${size.width}`} editMode={activateMode === "on"} field="width" />
          <RespondProductData id={id} label="Height" value={`${size.height}`} editMode={activateMode === "on"} field="height" />
          <RespondProductData id={id} label="Weight" value={`${weight}`} editMode={activateMode === "on"} field="weight" />
        </CardDescription>
      </CardHeader>

      {Array.isArray(data) && data.length > 0 && (
        <CardContent className="bg-white px-4 py-3 border-t border-gray-100">
          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {data.map((comment, index) => (
              <li
                className="flex justify-between items-center bg-gray-50 rounded-md px-3 py-2 hover:bg-gray-100 transition-colors"
                key={index}
              >
                <span className="text-gray-700 break-words">{comment}</span>
                <Trash2
                  onClick={() => handleDeleteComment(id, index)}
                  className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                />
              </li>
            ))}
          </ul>
        </CardContent>
      )}

      <CardFooter className="px-4 py-3 bg-gray-50 flex flex-col gap-2">
        <Textarea
          ref={textAreaRef}
          placeholder="Write a comment..."
          className="resize-none"
        />
        <Button
          className="w-full"
          onClick={() => updateCommentsButtonClick(id, textAreaRef.current?.value || "")}
        >
          Add Comment
        </Button>
      </CardFooter>
    </Card>
  );
}

export function RespondProductData({
  id,
  label,
  value,
  editMode,
  field,
}: {
  id: string | number;
  label: string;
  value: string;
  editMode: boolean;
  field: "count" | "width" | "height" | "weight";
}) {
  const [data, setData] = useState<number>(Number(removeLetters(value)));

  const handleUpdateBackend = (newValue: number) => {
    let payload: any = {};

    if (field === "width" || field === "height") {
      payload = { size: { [field]: newValue } };
    } else {
      payload = { [field]: newValue };
    }

    kyInstance.patch(`products/${id}`, { json: payload }).then((data) => { 
      setData(data)
    })
  };

  const handleIncrement = () => {
    const next = data + 1;
    setData(next);
    handleUpdateBackend(next);
  };

  const handleDecrement = () => {
    const next = data - 1;
    setData(next);
    handleUpdateBackend(next);
  };

  function removeLetters(str: string): string {
    return str.replace(/[^\d]/g, "");
  }

  return (
    <div className="flex items-center gap-1 min-w-[60px] gap-[10px]">
      <span className="text-gray-700">
        {label}: <strong>{data}</strong>
      </span>
      {editMode && (
        <div className="flex flex-col gap-1 items-center cursor-pointer justify-center">
          <Triangle size={16} className="text-gray-500 hover:text-gray-700 transition-colors" onClick={handleIncrement} />
          <Triangle size={16} className="rotate-180 text-gray-500 hover:text-gray-700 transition-colors" onClick={handleDecrement} />
        </div>
      )}
    </div>
  );
}
