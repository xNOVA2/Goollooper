"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import { Space_Grotesk } from "next/font/google";
import { useEffect } from "react";
import middle from "@/public/assets/Image/middle-align.svg";
import left from "@/public/assets/Image/left-align.svg";
import right from "@/public/assets/Image/right-align.svg";
import bold from "@/public/assets/Image/bold.svg";
import italic from "@/public/assets/Image/italic.svg";
import underline from "@/public/assets/Image/underline.svg";
import { modules, options } from "./Toolbar";
import { ScrollArea } from "../ui/scroll-area";

// const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// const Font = Quill.import('formats/font');
// Font.whitelist = ['mirza', 'roboto'];
// Quill.register(Font, true);

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
  // useEffect(() => {
  //   // Register the custom font
  //   const SpaceGroteskFont = Quill.import('attributors/class/font');
  //   SpaceGroteskFont.whitelist = ['Space Grotesk', ...SpaceGroteskFont.whitelist];
  //   Quill.register(SpaceGroteskFont, true);

  //   // Add custom CSS for Quill font picker
  //   const style = document.createElement('style');
  //   style.innerHTML = `
  //     .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Space Grotesk"]::before,
  //     .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Space Grotesk"]::before {
  //       font-family: "Space Grotesk", sans-serif;
  //       content: "Space Grotesk";
  //     }
  //     .ql-font-Space Grotesk {
  //       font-family: "Space Grotesk", sans-serif;
  //     }
  //   `;
  //   document.head.appendChild(style);

  //   return () => {
  //     document.head.removeChild(style);
  //   };
  // }, []);


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
