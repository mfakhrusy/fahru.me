import { AppMarkdownLayout } from "@/components/desktop/apps/layout/AppMarkdownLayout";

const md = `
# Software Engineer

**Overleaf**

*Feb 2022 - Current, Full-time*

<br />

What will I write here, I wonder?

<br />

# Software Engineer (Frontend)

**Ruangguru, Indonesia**

*2019 - Aug 2021, Full-time*

<br />

Assigned to skillacademy.com team. I worked on:

<br />

1. Skillacademy client-facing web platform. Tech stacks: ReasonML, React + ReasonReact
    * Helped Build a B2C MOOC platform that includes (but is not limited to): Custom Video Player with DRM, Exam/Quiz Platform, Custom File Upload (for homework).
    * Implement a cashless payment method (OVO Indonesia) on the frontend with a websocket. I'm the first one to introduce websocket to the whole frontend team.
    * Main developer for a massive government project named Pra-Kerja that, at some point, is the major contributor to our company revenue.
    * Maintain the codebase by performing readable & maintainable code principles.
    * Develop platitude marketing campaigns on the site, including but not limited to: numerous flash sales, referral programs, and other ad-hoc advertisement campaigns.
    * Mentoring a few newcomers to become productive on our codebase since I have the most domain (at my engineering level) knowledge of the whole application.

<br />

2. Skillacademy Content Management System (CMS). Tech stack: Typescript and React
    * Initiate the rewrite of our CMS from javascript to typescript. This is one of the first typescript apps for the whole frontend team. We previously use Javascript + Flow or ReasonML for the frontend codebase.
    * Develop dynamic UI screen project for skillacademy where admin can change some parts of the UI of skillacademy.com with drag and drop method. This is useful for marketing campaigns too. (UNRELEASE -- SAD)
 
<br />

3. Skillacademy Cordova Platform for mobile application. Tech stack: Cordova.
    * I'm one of the maintainers of the Cordova application that used to be our main stack for the mobile application before the app was rewritten to react-native.

<br />

# Technical Founder

**Sirius Teknologi Indonesia**

*2019 - 2020*

<br />

A software agency focused on web and mobile application.

<br />

Project:

<br />

1. Built a document management system for an indonesian airline
   - Backend web application. Tech stacks: Typescript, NodeJS, Azure
   - Frontend web application. Tech stacks: Typescript, React, Redux
   - Mobile application. Tech stacks: Typescript, React Native, Redux
   - DevOps: Azure Web App for both frontend and backend, and Azure DevOps for CI/CD platform.

<br />

# Frontend Engineer

**Codemi, Indonesia**

*2018 - 2019, Full-time*

<br />
   
- Developed and maintained learning management system frontend in javascript & reactJS, both client side and admin dashboard
- Developed an online course platform frontend using javascript & reactJS
   
<br />

# Math, Physics, & Engineering course Tutor
   
**Smart Privat, Indonesia**

*2014 - 2017, Part-time*

<br />
   
- Taught mathematics & physics to a first year students at Bandung Institute of Technology
- Taught programming (C++) & engineering course to a second year student at Bandung Institute of Technology
   
`;

export function AppWorkHistory() {
  return <AppMarkdownLayout markdown={md} title="Work History" />;
}
