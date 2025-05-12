export const Toast = ({ message }: { message: string }) => {
  return (
    <div
      className="alert alert-success align-items-center text-success border-0"
      role="alert"
    >
      {message}
    </div>
  );
};
