export const LoadingFallback = ({ message }: { message: string }) => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <p style={{ fontSize: "1.25rem", color: "#888" }}>{message}</p>
    </div>
  );
};
