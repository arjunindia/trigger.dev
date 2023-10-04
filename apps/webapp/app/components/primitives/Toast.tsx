import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Toaster, toast } from "sonner";

import { useTypedLoaderData } from "remix-typedjson";
import { loader } from "~/root";
import { useEffect } from "react";

const defaultToastDuration = 5000;
const permanentToastDuration = 60 * 60 * 24 * 1000;

export function Toast() {
  const { toastMessage } = useTypedLoaderData<typeof loader>();
  useEffect(() => {
    if (!toastMessage) {
      return;
    }
    const { message, type, options } = toastMessage;

    switch (type) {
      case "success":
        toast.custom((t) => <ToastUI variant="success" message={message} t={t as string} />, {
          duration: options.ephemeral ? defaultToastDuration : permanentToastDuration,
        });
        break;
      case "error":
        toast.custom((t) => <ToastUI variant="error" message={message} t={t as string} />, {
          duration: options.ephemeral ? defaultToastDuration : permanentToastDuration,
        });
        break;
      default:
        throw new Error(`${type} is not handled`);
    }
  }, [toastMessage]);

  return <Toaster />;
}

export function ToastUI({
  variant,
  message,
  t,
}: {
  variant: "error" | "success";
  message: string;
  t: string;
}) {
  return (
    <div
      className="flex gap-2 rounded-lg border border-slate-750 bg-no-repeat p-4 text-bright shadow-md"
      style={{
        background:
          "radial-gradient(at top, hsla(271, 91%, 65%, 0.18), hsla(221, 83%, 53%, 0.18)) hsla(221, 83%, 53%, 0.18)",
      }}
    >
      {variant === "success" ? (
        <CheckCircleIcon className="h-6 w-6 text-green-600" />
      ) : (
        <ExclamationCircleIcon className="h-6 w-6 text-rose-600" />
      )}
      {message}
      <button className="p-1" onClick={() => toast.dismiss(t)}>
        <XMarkIcon className="h-4 w-4 text-bright" />
      </button>
    </div>
  );
}
