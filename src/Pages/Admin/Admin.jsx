import { useState, useEffect } from "react";
import Login from "../../components/Admin/Login";
import Manager from "../../components/Admin/Manager";

export default function Admin() {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    if (!userToken) {
      const token = localStorage.getItem("token");
      if (token) {
        setUserToken(token);
      }
    }
  }, [userToken])
  return (
    <div className="text-white">
      <h1>Admin</h1>

      {!userToken ? (
        <Login />
      ) : (
        <Manager />
      )}
    </div>
  );
}
