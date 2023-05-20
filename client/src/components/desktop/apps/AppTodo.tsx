import { AppMarkdownLayout } from "@/components/desktop/apps/layout/AppMarkdownLayout";

const md = `
List of things that I want to implement in the future: (no promises and in no particular order! edit: 2023 and still no promises)

<br />

- Background image (and color theme) variations based on this ["cute" linux-y wallpapers](https://github.com/PineAndApplePizza/open-wallpapers/)

- [Screen destroyer game](http://www.desktop-destroyer.net/)

- Accessibility support (e.g. screen reader)

- Port Space Cadet Pinball to emscripten and integrate it here, see the [GitHub Repo](https://github.com/k4zmu2a/SpaceCadetPinball). Someone already ported it in emscripten but I want to do it myself as an exercise.

- Implement multiple app windows (with performance in mind) and add minimize capability for each window.

- Custom right-click on the screen (e.g. to enlarge icons)
`;

export function AppTodo() {
  return <AppMarkdownLayout markdown={md} title="Todo" />;
}
