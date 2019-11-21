const html = String.raw;
const css = String.raw;

exports.data = () => {
  return {
    layout: "layouts/default.11ty.js",
    styles,
    title: "CV",
  };
};

exports.render = () => {
  return html`
    <div class="grid">
      <header class="header">
        <div>
          <h1>Oliver Phillips</h1>
          <span>oliverjamesphillips@gmail.com</span>
        </div>
        <a href="https://cv.oliverjam.es" class="print-only">
          <span
            >cv.oliverjam.es
            <svg width="16" height="16"><use xlink:href="#external"></use></svg>
          </span>
        </a>
      </header>
      <div class="about">
        <section class="section" id="about">
          <h2>Bio</h2>
          <div class="card">
            <p style="font-size: 1.25rem;">
              I'm a fullstack developer who loves everything about the web. I'm
              passionate about performance, accessibility and user-experience. I
              enjoy coffee and shaving bytes off my SVGs. Teaching is one of my
              favourite things—I mentor a week long
              <a href="https://github.com/oliverjam/learn-react"
                >introduction to React</a
              >
              and
              <a href="https://github.com/oliverjam/learn-react-testing"
                >React testing</a
              >
              for each new Founders & Coders cohorts.
            </p>
          </div>
        </section>
      </div>
      <div class="main">
        <section class="section" id="experience">
          <h2>Experience</h2>
          <dl class="card">
            <dt class="u-visually-hidden">Company:</dt>
            <dd class="h3">Ticketmaster</dd>
            <dt class="u-visually-hidden">Role:</dt>
            <dd class="h4">Frontend Engineer III</dd>
            <dt class="u-visually-hidden">Period:</dt>
            <dd class="card__date">
              <time datetime="2017-02-18">Mar 19</time>
              -
              <time datetime="2018-08-18">Present</time>
            </dd>
            <dt class="u-visually-hidden">Details:</dt>
            <dd class="card__details">
              <p>
                Most recently I've been working on a library of reusable React
                components to be shared across Ticketmaster. I focused on
                building a comprehensive suite of accessible and user-friendly
                UI components that cover the majority of UI patterns I saw
                across the site. They're designed to have solid defaults with
                extensible APIs so developers don't feel like they have to start
                from scratch all the time. They also help us enforce design
                consistency across our products.
              </p>
            </dd>
          </dl>
          <dl class="card">
            <dt class="u-visually-hidden">Company:</dt>
            <dd class="h3">Ticketmaster</dd>
            <dt class="u-visually-hidden">Role:</dt>
            <dd class="h4">Frontend Engineer II</dd>
            <dt class="u-visually-hidden">Period:</dt>
            <dd class="card__date">
              <time datetime="2017-02-18">Jun 18</time>
              -
              <time datetime="2018-08-18">Mar 19</time>
            </dd>
            <dt class="u-visually-hidden">Details:</dt>
            <dd class="card__details">
              <p>
                I moved into the ticketmaster.co.uk team to help build the new
                resale platform, which is now live for all of the UK & Ireland,
                and about to roll out across Europe.
              </p>
              <p>
                We used primarily React, Redux, Reach Router and Styled
                Components. I was responsible for a lot of the UI development,
                as well as figuring out complex business logic to integrate
                several different legacy backends and bridge the gap between
                Ticketmaster events and Seatwave's resale database.
              </p>
              <p>
                I also built a Node server to coordinate the many internal
                services involved. This had a very robust logging setup as the
                complex architecture meant we needed to do lots of tracking and
                debugging.
              </p>
            </dd>
          </dl>
          <dl class="card">
            <dt class="u-visually-hidden">Company:</dt>
            <dd class="h3">Ticketmaster</dd>
            <dt class="u-visually-hidden">Role:</dt>
            <dd class="h4">Frontend Engineer I</dd>
            <dt class="u-visually-hidden">Period:</dt>
            <dd class="card__date">
              <time datetime="2017-02-18">Jul 17</time>
              -
              <time datetime="2018-08-18">Jun 18</time>
            </dd>
            <dt class="u-visually-hidden">Details:</dt>
            <dd class="card__details">
              <p>
                My team built the new checkout for customers buying resale
                tickets on ticketmaster.co.uk. It's a server-rendered React app
                with a GraphQL backend, relying on Flow for type-checking. We
                started out with Next.js but ended up rolling our own
                server-rendering solution for better control.
              </p>
              <p>
                As this was a greenfield project I was able to focus on
                performance, user-experience and accessibility. We progressively
                enhanced the site to work without JS, and I created a robust
                suite of tests with React Testing Library and Cypress.
              </p>
              <!-- <p>We operated as a product team separate from the wider business, following pretty strict Scrum, with frequent story refining, sprint planning and retros. This helped us iterate quickly and meant we had strong ownership of the product we were building.</p> -->
            </dd>
          </dl>
          <dl class="card print-break">
            <dt class="u-visually-hidden">Company:</dt>
            <dd class="h3">Founders & Coders</dd>
            <dt class="u-visually-hidden">Role:</dt>
            <dd class="h4">Student</dd>
            <dt class="u-visually-hidden">Period:</dt>
            <dd class="card__date">
              <time datetime="2017-02-18">Feb 17</time>
              -
              <time datetime="2017-06-18">Jun 17</time>
            </dd>
            <dt class="u-visually-hidden">Details:</dt>
            <dd class="card__details">
              <p>
                Founders & Coders is a free 16 week fullstack JavaScript
                development bootcamp. It was a life-changing experience for me,
                reinforcing my love for web development and teaching others.
              </p>
              <p>
                The course involved pair-programming almost all the time, with
                around half of each week spent in teams working on projects. We
                worked extensively with git and Github, learnt JS fundamentals
                rather than frameworks, practised agile design sprints, and did
                lots of testing. I also spent a week teaching the next cohort
                test-driven development
              </p>
            </dd>
          </dl>
          <dl class="card">
            <dt class="u-visually-hidden">Company:</dt>
            <dd class="h3">Lick Creative</dd>
            <dt class="u-visually-hidden">Role:</dt>
            <dd class="h4">Digital & Innovation Executive</dd>
            <dt class="u-visually-hidden">Period:</dt>
            <dd class="card__date">
              <time datetime="2017-02-18">Jan 13</time>
              -
              <time datetime="2017-06-18">Oct 16</time>
            </dd>
            <dt class="u-visually-hidden">Details:</dt>
            <dd>
              <p>
                I joined Lick as part of a new initiative to educate the
                creative teams on new technologies. I managed technology
                campaigns, communicating directly with clients and travelled
                abroad to project manage digital installations. My team
                successfully ran everything from one-off experiential events to
                technology-driven marketing campaigns.
              </p>
              <p>
                I was responsible for maintaining the website, which is how I
                fell in love with coding. After teaching myself HTML & CSS, I
                decided to and pursue a career in development.
              </p>
            </dd>
          </dl>
        </section>
      </div>
      <section class="education section">
        <aside class="projects">
          <section class="section" id="projects">
            <h2>Recent Projects</h2>
            <ul class="projects-grid">
              <li class="card">
                <h3>Imbibe</h3>
                <p>
                  An app to tell you what drinks you can make. Built using all
                  the cool new React stuff—suspense, hooks and lazy loading.
                </p>
                <a href="https://github.com/oliverjam/imbibe"
                  >github.com/oliverjam/imbibe</a
                >
              </li>
              <li class="card">
                <h3>Shitty Vegan</h3>
                <p>
                  A web app for tracking how many animal products you're eating
                  each day. Built with React & Emotion.
                </p>
                <a href="https://github.com/oliverjam/shitty-vegan"
                  >github.com/oliverjam/shitty-vegan</a
                >
              </li>
            </ul>
          </section>
        </aside>
        <h2>Education</h2>
        <div class="schools-grid">
          <dl class="card">
            <dt class="u-visually-hidden">Education level</dt>
            <dd class="h3">Undergraduate</dd>
            <dt class="u-visually-hidden">Institution</dt>
            <dd class="h4">University of Manchester</dd>
            <dt class="u-visually-hidden">Subject</dt>
            <dd>BA (Hons) Philosophy, Politics & Economics</dd>
            <dt class="u-visually-hidden">Date</dt>
            <dd class="card__date">
              <time datetime="2012-07-01">2012</time>
            </dd>
            <dt class="u-visually-hidden">Result</dt>
            <dd>Upper Second Class (2.1)</dd>
          </dl>
          <dl class="card">
            <dt class="u-visually-hidden">Education level</dt>
            <dd class="h3">A-Level</dd>
            <dt class="u-visually-hidden">Institution</dt>
            <dd class="h4">Bancroft's School</dd>
            <dt class="u-visually-hidden">Date</dt>
            <dd class="card__date">
              <time datetime="2009-07-01">2009</time>
            </dd>
            <dt class="u-visually-hidden">Results</dt>
            <dd>Maths: A</dd>
            <dd>Physics: A</dd>
            <dd>History: A</dd>
            <dd>Critical Thinking: A (AS)</dd>
          </dl>
          <dl class="card">
            <dt class="u-visually-hidden">Education level</dt>
            <dd class="h3">GCSE</dd>
            <dt class="u-visually-hidden">Institution</dt>
            <dd class="h4">Bancroft's School</dd>
            <dt class="u-visually-hidden">Date</dt>
            <dd class="card__date">
              <time datetime="2007-07-01">2007</time>
            </dd>
            <dt class="u-visually-hidden">Results</dt>
            <dd>5 A*s</dd>
            <dd>4 As</dd>
            <dd>Including English & Maths</dd>
          </dl>
        </div>
      </section>
    </div>
  `;
};

const styles = css`
  main {
    font-family: var(--sans-serif);
    text-align: left;
    display: block;
  }
  main a {
    --underline-color: var(--text-lc);
    text-decoration-line: underline;
    text-decoration-skip-ink: skip;
    text-decoration-color: var(--underline-color);
    text-decoration-thickness: 2px;
    text-underline-offset: 0.2rem;
    transition: text-decoration-color 0.25s;
  }
  main a:hover {
    --underline-color: var(--primary);
  }
  * + p {
    margin-top: 1em;
  }
  h1,
  h2,
  .h2,
  h3 {
    margin: 0;
    line-height: 1;
  }
  h1 {
    font-size: 2.369em;
    font-weight: 900;
  }
  .h2,
  h2 {
    font-size: 1.333em;
    font-weight: 700;
  }
  .h3,
  h3 {
    font-size: 1.125em;
    font-weight: 700;
  }

  .h4,
  h4 {
    font-size: 1em;
    font-weight: 700;
    margin-bottom: 0.5em;
  }
  .section {
    -webkit-box-direction: normal;
  }
  .grid {
    padding: 1.25em;
  }
  .grid > * + * {
    margin-top: 1.5em;
  }
  @media (min-width: 40em) {
    .grid {
      min-height: 100vh;
      max-width: 68em;
      margin: 0 auto;
    }
    @supports ((display: -ms-grid) or (display: grid)) {
      .grid {
        padding: 0 1.5em;
        display: -ms-grid;
        display: grid;
        -ms-grid-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        -ms-grid-rows: 5em auto auto auto auto 5em;
        grid-template-rows: 5em auto auto auto auto 5em;
        grid-gap: 1.5em;
        grid-template-areas: "header header header header header header" "about about about about about about" "main main main main education education";
      }
      .grid > * + * {
        margin-top: 0;
      }
    }
  }
  .about {
    grid-area: about;
  }
  .main {
    grid-area: main;
  }
  .education {
    grid-area: education;
  }
  .header {
    grid-area: header;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  h1 {
    position: relative;
    margin-bottom: 1rem;
  }
  h1::after {
    content: "";
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    width: 6rem;
    height: 0.25rem;
    background-color: var(--primary);
  }
  .projects-grid > * + * {
    margin-top: 1em;
  }
  .card {
    position: relative;
    padding: 1.25em;
  }
  .card__date {
    font-size: 0.8em;
    color: var(--text-lc);
  }
  @media (min-width: 22em) {
    .card__date {
      position: absolute;
      top: 1em;
      right: 1em;
    }
  }
  @media (min-width: 40em) {
    .tech {
      -ms-grid-columns: 1fr;
      grid-template-columns: 1fr;
    }
  }
  .schools-grid > * + * {
    margin-top: 1em;
  }
  .section {
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .section > * + * {
    margin-top: 1em;
  }
  .u-visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }

  .print-only {
    display: none;
  }

  @media print {
    body {
      padding-top: 3.75rem;
      font-size: 0.875rem;
      background-color: #fff;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    .print-only {
      display: initial;
    }
    .sidebar {
      display: none;
    }
    .card {
      background-color: #fff;
      box-shadow: none;
    }
  }
`;
