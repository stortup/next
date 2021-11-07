const messages: Record<string, string> = {
  FORBIDDEN: "شما دسترسی به این صفحه را ندارید",
};

export function ErrorHandler(props: { error: Error }) {
  return (
    <div className="w-100 text-center pt-5">
      <h1 className="fw-light">خطا</h1>
      <p>{messages[props.error.message] ?? props.error.message}</p>
    </div>
  );
}
