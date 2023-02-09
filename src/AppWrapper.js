import { lazy, Suspense, useEffect, useState } from "react";
import "./index.css";
import md5 from "blueimp-md5";
const UnprotectedApp = () => {
  return (
    <div>
      <h1>Forbidden</h1>
      <p>You don't have permission to access this resource.</p>
    </div>
  );
};

const ProtectedApp = lazy(() => import("./ProtectedApp"));

export default function AppWrapper() {
  const [appSecret, setappSecret] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("secret")) {
    localStorage.setItem("secret", urlParams.get("secret"));
    urlParams.delete("secret")
    window.location = "/?"+urlParams.toString();
  }

  useEffect(() => {
    const secret = localStorage.getItem("secret") || "";
    setappSecret(md5(secret));
  }, []);

  return appSecret === process.env.REACT_APP_SECRET ? (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedApp />
    </Suspense>
  ) : (
    <UnprotectedApp />
  );
}
