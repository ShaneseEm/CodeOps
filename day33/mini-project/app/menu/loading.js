/**
 * Exercise 6: Declarative loading state for app/menu/ segment
 */
export default function MenuLoading() {
  return (
    <div className="status-box loading-box">
      <div className="spinner"></div>
      <p className="loading-state">Loading fresh Ethiopian dishes from server...</p>
    </div>
  );
}
