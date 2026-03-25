"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useEffect, useState } from "react";

const FaqRenderer = ({ content, onError }) => {
  const [hasError, setHasError] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc my-4 space-y-2",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "mb-4 last:mb-0",
          },
        },
      }),
      Underline.configure({
        HTMLAttributes: {
          class: "underline decoration-1",
        },
      }),
    ],
    content,
    editable: false, // Read-only mode
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none text-sm sm:text-base",
      },
      handleDOMEvents: {
        // Handle any parsing/rendering errors
        error: (view, event) => {
          setHasError(true);
          return true;
        },
      },
      // Enable parsing of all HTML content
      parseOptions: {
        preserveWhitespace: "full",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      try {
        editor.commands.setContent(content);
        setHasError(false);
      } catch (error) {
        setHasError(true);
      }
    }
  }, [content, editor]);

  if (hasError && onError) {
    return onError();
  }

  return <EditorContent editor={editor} />;
};

export default FaqRenderer;
