// Komponen akar aplikasi. Membungkus seluruh app dengan AppProvider,
// lalu menampilkan landing atau portal sesuai state `screen`. Toast selalu termount.
import React from "react";
import { AppProvider, useApp } from "./context/AppContext.jsx";
import Landing from "./layouts/Landing.jsx";
import PortalShell from "./layouts/PortalShell.jsx";
import Toast from "./components/common/Toast.jsx";

function Root() {
  const { screen } = useApp();
  return (
    <>
      {screen === "app" ? <PortalShell /> : <Landing />}
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}
