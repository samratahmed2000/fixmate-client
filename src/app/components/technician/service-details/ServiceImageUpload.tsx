"use client";

import * as React from "react";
import { ImagePlusIcon, Trash2Icon, UploadCloudIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ServiceImageUploadProps } from "@/types/services";

const ServiceImageUpload = ({
  id = "service-image",
  file,
  onFileChange,
  existingImageUrl,
  error,
  disabled,
}: ServiceImageUploadProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const activeImageUrl = previewUrl || existingImageUrl || null;

  const handleFiles = (files: FileList | null) => {
    const selected = files?.[0] ?? null;
    onFileChange(selected);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) return;
    handleFiles(event.dataTransfer.files);
  };

  const clearFile = () => {
    onFileChange(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  const sizeLabel = file
    ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
    : null;

  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>
        Service Image
        <span aria-hidden="true" className="text-destructive">
          *
        </span>
      </FieldLabel>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <label
          htmlFor={id}
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "group relative flex aspect-16/10 w-full shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed bg-muted/30 transition-colors outline-none sm:w-36",
            "hover:border-primary/50 hover:bg-primary/5 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
            isDragging && "border-primary bg-primary/10",
            error && "border-destructive/60 bg-destructive/5",
            disabled && "pointer-events-none opacity-60",
          )}
        >
          {activeImageUrl ? (
            <Image
              src={activeImageUrl}
              alt="Selected service preview"
              className="size-full object-cover"
              width={144}
              height={90}
            />
          ) : (
            <span className="flex flex-col items-center gap-1.5 px-4 text-center">
              <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground group-hover:text-primary">
                <ImagePlusIcon className="size-4" aria-hidden="true" />
              </span>
              <span className="text-xs font-medium text-foreground">
                Click to upload
              </span>
            </span>
          )}

          <input
            ref={inputRef}
            id={id}
            name="serviceImage"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            disabled={disabled}
            onChange={(event) => handleFiles(event.target.files)}
          />
        </label>

        <div className="flex min-w-0 flex-col gap-2">
          {sizeLabel ? (
            <p className="truncate text-xs text-muted-foreground">
              {file?.name} · {sizeLabel}
            </p>
          ) : null}

          {file || existingImageUrl ? (
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled}
                onClick={() => inputRef.current?.click()}
              >
                <UploadCloudIcon data-icon="inline-start" />
                {file ? "Replace" : "Change Image"}
              </Button>
              {file ? (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={disabled}
                  onClick={clearFile}
                >
                  <Trash2Icon data-icon="inline-start" />
                  Remove
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {error ? <FieldError>{error}</FieldError> : null}
    </Field>
  );
};

export default ServiceImageUpload;
