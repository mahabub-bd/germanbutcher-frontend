import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editorRef = useRef(null);

  const editorConfig = useMemo(
    () => ({
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
        url: "/api/upload-image", // Optional: API endpoint for image uploads
      },
      height: 300,
      readonly: false,
      toolbar: true,
      toolbarAdaptive: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "video",
        "table",
        "link",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "copyformat",
        "fullsize",
        "print",
        "about",
      ],
      buttonsMD: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "image",
        "video",
        "table",
        "link",
        "|",
        "align",
        "undo",
        "redo",
      ],
      buttonsSM: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "image",
        "link",
      ],
      buttonsXS: ["bold", "italic", "underline", "|", "image", "link"],
      style: {
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
      },
      language: "en", // Set language (e.g., 'en', 'fr', 'es')
      placeholder: "Start typing here...", // Placeholder text
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: true,
    }),
    []
  );

  return (
    <JoditEditor
      ref={editorRef}
      value={value}
      config={editorConfig}
      onChange={onChange}
      className="bg-white border border-gray-300 rounded-lg overflow-hidden"
    />
  );
}
