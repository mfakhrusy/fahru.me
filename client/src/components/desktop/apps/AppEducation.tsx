import type { MutableRefObject } from "react";
import { AppMarkdownLayout } from "@/components/desktop/apps/layout/AppMarkdownLayout";

const md = `
  
## Undergraduate Degree

Bandung Institute of Technology, Indonesia

2012 - 2016

3.76 / 4.00 GPA

<br />

Major: Aerospace Engineering

<br />

Research Thesis: Direct Numerical Simulation for Computational Fluid Dynamic (forgot the exact title but it's close enough)

<br />

## Freecodecamp

2016 - 2018

<br />

My "formal" education for web development studies. I actually learnt from from whatever source I could find, but freecodecamp acted as my main study sources.

<br />

I didn't get certifications from the platform since I got my first web development job while I was still learning there.
`;

type Props = {
  dragConstraintRef?: MutableRefObject<HTMLDivElement>;
};

export function AppEducation({ dragConstraintRef }: Props) {
  return (
    <AppMarkdownLayout
      markdown={md}
      title="Education"
      dragConstraintRef={dragConstraintRef}
    />
  );
}
