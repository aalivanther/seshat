import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // export estático: la app empaquetada la sirve el binario Go (embed.FS)
  output: "export",
  // Permite abrir el dev server desde otros dispositivos de la red local
  // (Next bloquea con 403 los assets a orígenes que no sean localhost).
  allowedDevOrigins: [
    "127.0.0.1",
    "192.168.0.*",
    "192.168.1.*",
    "10.0.0.*",
    "*.local",
  ],
};

export default nextConfig;
