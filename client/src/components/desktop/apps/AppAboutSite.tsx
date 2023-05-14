import type { MutableRefObject } from "react";
import { AppMarkdownLayout } from "@/components/desktop/apps/layout/AppMarkdownLayout";

const md = `
## **About site**

This is Fahru personal site

<br />

## **Source Code**

Available on github:

[https://github.com/mfakhrusy/fahru.me](https://github.com/mfakhrusy/fahru.me) <ExternalLinkIcon />

<br />

## **Tech Stack & Libraries**

- typescript
- reactJS
- nextJS
- vercel
- xtermjs
- chakra-ui
- framer-motion

<br />

## **Icons**

[Moka Icons](https://snwh.org/moka) by [Sam Hewitt](https://samuelhewitt.com) 

licensed under [CC-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/) <ExternalLinkIcon />

<br />

## **Background**

[GitHub](https://github.com/PineAndApplePizza/open-wallpapers/) by PineAndApplePizza

licensed under [GPL](https://www.gnu.org/licenses/gpl-3.0.html)

original logo creator [u/Ishaan_P](https://www.reddit.com/user/Ishaan_P)

<br />

## **About site**

This is Fahru personal site

<br />

## **Source Code**

Available on github:

[https://github.com/mfakhrusy/fahru.me](https://github.com/mfakhrusy/fahru.me) <ExternalLinkIcon />

<br />

## **Tech Stack & Libraries**

- typescript
- reactJS
- nextJS
- vercel
- xtermjs
- chakra-ui
- framer-motion

<br />

## **Icons**

[Moka Icons](https://snwh.org/moka) by [Sam Hewitt](https://samuelhewitt.com) 

licensed under [CC-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/) <ExternalLinkIcon />

<br />

## **Background**

[GitHub](https://github.com/PineAndApplePizza/open-wallpapers/) by PineAndApplePizza

licensed under [GPL](https://www.gnu.org/licenses/gpl-3.0.html)

original logo creator [u/Ishaan_P](https://www.reddit.com/user/Ishaan_P)  
`;

type Props = {
  onClose: () => void;
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export function AppAboutSite({ onClose, isOpen, dragConstraintRef }: Props) {
  return (
    <AppMarkdownLayout
      markdown={md}
      title="About Site"
      onClose={onClose}
      isOpen={isOpen}
      dragConstraintRef={dragConstraintRef}
    />
  );
}
