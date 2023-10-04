import type { Meta, StoryObj } from "@storybook/react";
import { Toaster, toast } from "sonner";
import { ToastUI } from "../primitives/Toast";
import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "../primitives/Buttons";

const meta: Meta = {
  title: "Primitives/Toast",
};

export default meta;

type Story = StoryObj<typeof Collection>;

export const Toasts: Story = {
  render: () => <Collection />,
};

function Collection() {
  return (
    <div className="flex flex-col items-start gap-y-4 p-4">
      <ToastUI variant="success" message="Success UI" t="-" />
      <ToastUI variant="error" message="Error UI" t="-" />
      <br />
      <Button
        variant="primary/large"
        onClick={() =>
          toast.custom((t) => <ToastUI variant="success" message="Success" t={t as string} />, {
            duration: 5000,
          })
        }
      >
        Success
      </Button>
      <Button
        variant="primary/large"
        onClick={() =>
          toast.custom((t) => <ToastUI variant="error" message="Error" t={t as string} />, {
            duration: 5000,
          })
        }
      >
        Error
      </Button>
      <Toaster />
    </div>
  );
}
