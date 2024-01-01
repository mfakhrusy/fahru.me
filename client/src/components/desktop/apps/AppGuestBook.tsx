import { useDispatch } from "react-redux";
import { AppLayout } from "@/components/desktop/apps/layout/AppLayout";
import { setActiveDesktopApp } from "@/store/desktop";

export const AppGuestBook = () => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(setActiveDesktopApp("DesktopMainView"));

  return (
    <AppLayout onClose={onClose} title="Guest Book">
      <div id="wrapper">
        <div id="container">
          <section className="open-book">
            <header>
              <h1>Book Layout</h1>
              <h6>Erin E. Sullivan</h6>
            </header>
            <article>
              <h2 className="chapter-title">Waiting on projects</h2>
              <p>
                Erin chuckled to herself, This sounds crazy, but what if I
                develop a section of text that looks like a book?
              </p>
              <p>
                She paused, realizing that what she was about to do was a trend
                years ago. This severely increased the chance of her project
                being mocked after launch. What was the specific trend Erin
                remembered? Skeuomorphism.
              </p>
              <p>
                She began to jot down a list of elements that are typically in a
                novel:
              </p>
              <p>
                The true obstacle showed its form. Responsiveness. How on Earth
                will she make this work?
              </p>
              <p>
                Erin pulled out her notepad and started sketching. First she
                began to illustrate the wireframe of the book in its entirety.
                Then she recorded some notes on how each element would break
                down as the screen size got smaller. After several minutes, the
                blueprint was complete. She came to the conclusion that mobile
                viewing must stay minimal. The pages go away, which makes the
                page numbers no longer have a function so they must go away, and
                if those go away then there is no need for a cover since it is
                used to help hold and protect pages.
              </p>
              <p>
                She looks back at the blinking cursor of her blank canvas in
                Sublime Text 2. Doubt begins to linger in the back of her mind
                with the thought of her new code never being used and her time
                spent ends up being a waste. Her fingers were typing anyway.
              </p>
              <p>Erin smirked, Well at least I think its worth a try.</p>
            </article>
            <footer>
              <ol id="page-numbers">
                <li>1</li>
                <li>2</li>
              </ol>
            </footer>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};
