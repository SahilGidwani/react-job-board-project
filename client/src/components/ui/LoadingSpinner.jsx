import { cn } from "@/utils/shadcnUtils";
import { Loader } from "lucide-react";

export function LoadingSpinner({ className, ...props }) {
  return (
    <Loader className={cn("animate-spin h-4 w-4", className)} {...props} />
  );
}
