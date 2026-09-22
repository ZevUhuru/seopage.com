import { CREATE_URL } from "@/lib/config";

/** Sends the reader to the builder app. Preview is free; they pay to publish there. */
export function CreateButton({
  label,
  className = "btn btn-accent btn-lg",
}: {
  label: string;
  className?: string;
}) {
  return (
    <a href={CREATE_URL} className={className}>
      {label}
    </a>
  );
}
