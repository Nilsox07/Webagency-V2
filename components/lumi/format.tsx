import React from "react";

/** Minimaler Markdown-Renderer für Lumi-Nachrichten: **fett**, Zeilenumbrüche, • Listen. */
export function formatMessage(text: string): React.ReactNode {
  return text.split("\n").map((line, i) => {
    if (line.trim() === "") return <br key={i} />;
    return (
      <p key={i} className={line.startsWith("•") || line.startsWith("-") ? "pl-1" : ""}>
        {renderBold(line)}
      </p>
    );
  });
}

function renderBold(line: string): React.ReactNode[] {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
