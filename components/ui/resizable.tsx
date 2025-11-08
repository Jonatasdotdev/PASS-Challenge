"use client";

import * as React from "react";
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
  type ImperativePanelGroupHandle,
  type ImperativePanelHandle,
} from "react-resizable-panels";
import { cn } from "@/lib/utils";

export type ResizablePanelGroupProps = React.ComponentProps<typeof PanelGroup>;
export const ResizablePanelGroup = React.forwardRef<
  ImperativePanelGroupHandle,
  ResizablePanelGroupProps
>(({ className, ...props }, ref) => (
  <PanelGroup ref={ref} className={cn("w-full h-full", className)} {...props} />
));
ResizablePanelGroup.displayName = "ResizablePanelGroup";

export type ResizablePanelProps = React.ComponentProps<typeof Panel>;
export const ResizablePanel = React.forwardRef<
  ImperativePanelHandle,
  ResizablePanelProps
>(({ className, ...props }, ref) => (
  <Panel ref={ref} className={cn("min-h-0", className)} {...props} />
));
ResizablePanel.displayName = "ResizablePanel";

export type ResizableHandleProps = React.ComponentProps<typeof PanelResizeHandle>;
export const ResizableHandle = React.forwardRef<
  React.ElementRef<typeof PanelResizeHandle>,
  ResizableHandleProps
>(({ className, ...props }, ref) => (
  <PanelResizeHandle
    ref={ref}
    className={cn(
      "relative flex h-2 items-center justify-center",
      "after:absolute after:inset-x-0 after:h-px after:bg-border",
      className
    )}
    {...props}
  />
));
ResizableHandle.displayName = "ResizableHandle";
