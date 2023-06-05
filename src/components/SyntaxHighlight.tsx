"use client";

import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import theme from "react-syntax-highlighter/dist/cjs/styles/hljs/atelier-dune-dark";

export default function SyntaxHighlight({ className, children }: { className: string; children: string }) {
  const language = className?.replace("language-", "");

  return (
    <SyntaxHighlighter language={language} style={theme} PreTag={React.Fragment}>
      {children}
    </SyntaxHighlighter>
  );
}
