import type { MutableRefObject } from "react";
import { AppMarkdownLayout } from "@/components/desktop/apps/layout/AppMarkdownLayout";

const md = `
 **Email**

[hello@fahru.me](mailto:hello@fahru.me)

<br />

**Mastodon**

[Fahru](https://fosstodon.org/@fahru)

<br />

**Twitter (inactive)**

[@f_fakhrusy](https://twitter.com/f_fakhrusy)

<br />

**GitHub**

[mfakhrusy](https://github.com/mfakhrusy/)

<br />

**Stack Overflow**

[mfakhrusy](https://stackoverflow.com/users/5835100/mfakhrusy)

<br />

**LinkedIn**

[M Fahru](https://www.linkedin.com/in/mfakhrusy/)
 
`;

type Props = {
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export function AppContacts({ isOpen, dragConstraintRef }: Props) {

  return (
    <AppMarkdownLayout markdown={md} title="Contacts" isOpen={isOpen} dragConstraintRef={dragConstraintRef} />
  );
}
