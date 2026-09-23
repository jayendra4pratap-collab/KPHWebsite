"use client";

import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function DetailDialog({
  title,
  description,
  children,
  trigger,
}: {
  title: string;
  description: string;
  children: ReactNode;
  trigger: ReactNode;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Close
            className="icon-button dialog-close"
            aria-label="Close details"
          >
            <X size={20} />
          </Dialog.Close>
          <span className="eyebrow">FROM THE HUB</span>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          <div className="dialog-body">{children}</div>
          <p className="sample-note">Sample content for the design preview.</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
