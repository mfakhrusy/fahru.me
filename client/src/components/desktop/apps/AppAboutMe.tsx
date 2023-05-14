import { MutableRefObject, memo } from "react";
import { AppLayout } from "@/components/desktop/apps/AppLayout";
import { Markdown } from "@/components/shared/Markdown";
import useDelayRenderOnTouchDevice from "@/lib/useDelayRenderOnTouchDevice";

const md = `
## **About me**
Fahru, Baltimore, MD, USA  
Origin: Indonesia  

<br />

## **What I do**
Software Engineer. Tinkerer. Hacker.  

<br />

## **Tech stacks I worked on**
- Web stacks: HTML5, CSS3, Javascript
- Typescript
- ReasonML
- React
- NodeJS
- PostgreSQL

<br />

## **Other skills**
- CI/CD with Gitlab CI, and GitHub Action
- Linux web server (nginx/apache) config
- DNS config
- Web animation & SVGs
- Docker

<br />

## **Currently interested about:**
- Web Assembly with either Rust/C++
- Building graphic-intensive web application
- Cyber Security (especially CTF)
- etc... follow me on [mastodon](https://fosstodon.org/fahru) to find out!

<br />

## **My take on software engineering**
- Problem solving at its core
- Maintainable and readable code is important
- Pragmatism on tight deadline
- Programming language is just a tool

<br />

**Hobbies**
- Learning stuffs. Anything, really.
- Writing. I'm preparing a blog!
- Building something cool. Tinkering about stuffs.
- Reading articles on the web & cool stuffs on twitter, still working on developing reading books as a habit.

`;

type Props = {
  onClose: () => void;
  isOpen: boolean;
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export const AppAboutMe = memo(function AppAboutMe({
  onClose,
  isOpen,
  dragConstraintRef,
}: Props) {
  const shouldRenderContent = useDelayRenderOnTouchDevice({ delayAmount: 150 });

  return (
    <AppLayout
      title="About Me"
      onClose={onClose}
      isOpen={isOpen}
      dragConstraintRef={dragConstraintRef}
    >
      {shouldRenderContent && (
        <Markdown>
          {md}
        </Markdown>
      )}
    </AppLayout>
  );
});
