import { useRouter } from "next/router";
import { useEffect } from "react";

const messages: Record<string, string> = {
  FORBIDDEN: "شما دسترسی به این صفحه را ندارید",
};

export function ErrorHandler(props: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    if (props.error.message === "UNAUTHORIZED") {
      router.push("/login");
    }
  });

  if (props.error.message === "UNAUTHORIZED") {
    return <></>;
  }

  return (
    <div className="w-100 text-center pt-5">
      <h1 className="fw-light">خطا</h1>
      <p>{messages[props.error.message] ?? props.error.message}</p>
    </div>
  );
}
