"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    ["link", "image"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

export const options = [
  "header",
  "bold",
  "italic",
  "underline",
  "align",
  "align",
  "align",
  "justify",
  "link",
  "image",
];

export default function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="">
      <QuillNoSSRWrapper
        theme="snow"
        modules={modules}
        formats={options}
        className="!border-none"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
