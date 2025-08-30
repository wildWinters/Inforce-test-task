"use client"
import { useState, useEffect, ReactNode } from "react";
import ky from "ky";

export interface ITranslateTable {
  render: (translated: string) => ReactNode;
  text: string;
  language: "uk" | "en";
} 

export function TranslateTable({ 
  render,
  text,
  language
  }: ITranslateTable) {
  const [translated, setTranslated] = useState<string>("");

  useEffect(() => {
    if (!text || !text.trim()) {
      setTranslated("");
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const downloadTranslating = async () => {
      try {
        const data = await ky.post("https://uk.libretranslate.com/translate", {
          json: {
            q: text,
            source: "auto",    
            target: language,   
            format: "text"
          },
          headers: {
            "accept": "application/json",
            "content-type": "application/json"
          },
          signal
        }).json<{ translatedText: string }>();

        if (!signal.aborted) {
          setTranslated(data.translatedText);
        }
      } catch (err) {
        if ((err as any)?.name === 'AbortError') return;
        console.error("Помилка перекладу:", err);

        if (!signal.aborted) setTranslated(text);
      }
    };

    downloadTranslating();
    return () => controller.abort();
  }, [text, language]);

  const output = translated || text;

  return <>{render(output)}</>;
}
