import dynamic from "next/dynamic";

export const Terminal = dynamic(
  () => import("./XTerm").then((mod) => mod.XTerm),
  { ssr: false }
);
