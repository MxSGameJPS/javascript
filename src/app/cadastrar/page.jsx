import React, { Suspense } from "react";
import CadastrarClient from "./CadastrarClient";
export const dynamic = "force-dynamic";

export default function CadastrarPage() {
  // Server component: renderiza o componente client dentro de Suspense
  return (
    <Suspense fallback={<div></div>}>
      <CadastrarClient />
    </Suspense>
  );
}
