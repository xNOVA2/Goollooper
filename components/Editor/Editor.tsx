"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { modules, options } from "./Toolbar";
import { ScrollArea } from "../ui/scroll-area";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {

  return (
    <ScrollArea className="h-calc-editor-screen">
      <QuillNoSSRWrapper
        theme="snow"
        modules={modules}
        formats={options}
        className="!border-none px-[2.375em]"
        value={value}
        onChange={onChange}
      />
    </ScrollArea>
  );
}
