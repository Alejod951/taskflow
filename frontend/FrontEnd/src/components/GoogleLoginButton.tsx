import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const handleSuccess = async (credentialResponse: any) => {
    const res = await fetch("http://localhost:5100/api/auth/google/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: credentialResponse.credential }),
    });

    const data = await res.json();
    console.log("Token recibido:", data.token);
    localStorage.setItem("token", data.token);
  };

  return (
    <GoogleOAuthProvider clientId="297782775017-itm1s01u8r1pcj1l2h0poi41slors7u4.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Error en Google Login")} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
