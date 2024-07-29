import { cn } from "@/utils/shadcnUtils";
import ReactMarkdown from "react-markdown";

export function MarkdownRenderer({ className, ...props }) {
  return (
    <ReactMarkdown
      className={cn(
        "prose dark:prose-invert prose-slate max-w-full",
        className,
      )}
      {...props}
    />
  );
}
