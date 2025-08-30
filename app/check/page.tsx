"use client";
import { TranslateTable } from "@/shared/components/translator";

export default function CheckPage() {
  return (
    <div>
      <TranslateTable
        text="привіт"
        language="uk"
        render={(translated) => <p>{translated}</p>}
      />
    </div>
  );
}
