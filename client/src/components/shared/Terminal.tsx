import dynamic from "next/dynamic";

export const Terminal = dynamic(() => import("./XTerm"), { ssr: false });
