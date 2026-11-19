import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'

function Bear() {
  return (
    <svg
      className="bear__art"
      viewBox="0 0 220 250"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="110" cy="232" rx="72" ry="11" fill="#47202c" opacity="0.14" />

      <path
        d="M47 218c0-40 25-68 63-68s63 28 63 68v3H47z"
        fill="var(--bear-fur)"
      />
      <ellipse cx="73" cy="218" rx="23" ry="16" fill="var(--bear-paw)" />
      <ellipse cx="145" cy="218" rx="23" ry="16" fill="var(--bear-paw)" />
      <circle cx="73" cy="219" r="7" fill="var(--bear-fur)" opacity="0.5" />
      <circle cx="145" cy="219" r="7" fill="var(--bear-fur)" opacity="0.5" />

      <circle cx="64" cy="61" r="28" fill="var(--bear-fur)" />
      <circle cx="64" cy="61" r="15" fill="var(--bear-inner-ear)" />
      <circle cx="145" cy="57" r="27" fill="var(--bear-fur)" />
      <circle cx="145" cy="57" r="14" fill="var(--bear-inner-ear)" />

      <circle cx="105" cy="111" r="65" fill="var(--bear-fur)" />
      <ellipse cx="143" cy="132" rx="41" ry="31" fill="var(--bear-muzzle)" />
      <ellipse cx="170" cy="119" rx="10" ry="8" fill="#3e222b" />
      <path
        d="M164 132c-5 7-13 10-21 8"
        fill="none"
        stroke="#5d3540"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M124 94c5-5 12-5 17 0"
        fill="none"
        stroke="#3e222b"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse
        cx="129"
        cy="124"
        rx="11"
        ry="7"
        fill="#e47784"
        opacity="0.38"
      />
      <path
        d="M53 181c-18 3-25 19-18 32 5 9 19 10 28 2"
        fill="none"
        stroke="var(--bear-fur)"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M158 185c13 4 19 16 15 27"
        fill="none"
        stroke="var(--bear-fur)"
        strokeWidth="18"
        strokeLinecap="round"
      />
    </svg>
  )
}

const floatingHearts = [
  { className: 'heart heart--one', glyph: '♥' },
  { className: 'heart heart--two', glyph: '♥' },
  { className: 'heart heart--three', glyph: '♥' },
]

const photos = [
  {
    src: '/gallery/IMG_0348.jpg',
    alt: 'The two of you taking a mirror selfie together',
    caption: 'you & me',
    width: 900,
    height: 1200,
  },
  {
    src: '/gallery/1F721F23-8087-4D27-A5BC-87DCF19652AF.jpg',
    alt: 'A sunset selfie with her',
    caption: 'golden hour',
    width: 900,
    height: 1200,
  },
  {
    src: '/gallery/IMG_1516.jpg',
    alt: 'A playful paintball moment',
    caption: 'the playful one',
    width: 1200,
    height: 900,
  },
  {
    src: '/gallery/IMG_1555.jpg',
    alt: 'A brightly lit ferris wheel at night',
    caption: 'our kind of night',
    width: 900,
    height: 1200,
  },
  {
    src: '/gallery/IMG_1591.jpg',
    alt: 'Two drinks sitting on a table at a restaurant',
    caption: 'little moments',
    width: 900,
    height: 1200,
  },
  {
    src: '/gallery/IMG_7038.jpg',
    alt: 'A city view from the top of a mountain',
    caption: 'a view worth keeping',
    width: 900,
    height: 1200,
  },
  {
    src: '/gallery/IMG_8667.jpg',
    alt: 'A leafy path leading toward a welcome sign',
    caption: 'the way back to you',
    width: 900,
    height: 1200,
  },
  {
    src: '/gallery/IMG_8688.jpg',
    alt: 'Her smiling under the carnival lights',
    caption: 'my favourite smile',
    width: 900,
    height: 1200,
  },
]

function Gallery({ onBack }) {
  return (
    <section className="photo-book" aria-labelledby="photo-book-title">
      <header className="photo-book__header">
        <span className="photo-book__eyebrow">Chapter two</span>
        <h2 id="photo-book-title">Us, in little moments</h2>
        <p>Every picture has a piece of my heart in it.</p>
      </header>

      <div className="photo-grid">
        {photos.map((photo, index) => (
          <figure className={`photo-card photo-card--${index + 1}`} key={photo.src}>
            <div className="photo-card__frame">
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
            <figcaption>
              <span aria-hidden="true">♥</span>
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="photo-book__ending" aria-hidden="true">
        <span>♥</span>
        <span>♥</span>
        <span>♥</span>
      </div>

      <button type="button" className="back-button" onClick={onBack}>
        <span aria-hidden="true">‹</span> Back to my letter
      </button>
    </section>
  )
}

function App() {
  const [runId, setRunId] = useState(0)
  const [view, setView] = useState('letter')
  const [flipState, setFlipState] = useState('idle')
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [view])

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const scrollToTop = (smooth = true) => {
    window.scrollTo({
      top: 0,
      behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto',
    })
  }

  const replay = () => {
    setRunId((current) => current + 1)
    scrollToTop()
  }

  const flipTo = (nextView) => {
    if (flipState !== 'idle') return

    if (prefersReducedMotion()) {
      setView(nextView)
      scrollToTop(false)
      return
    }

    setFlipState('out')
    timers.current.push(
      window.setTimeout(() => {
        setView(nextView)
        setFlipState('in')
        scrollToTop(false)
        timers.current.push(window.setTimeout(() => setFlipState('idle'), 650))
      }, 430),
    )
  }

  return (
    <main className="page">
      <div className="ambient" aria-hidden="true">
        <span className="ambient__heart ambient__heart--one">♥</span>
        <span className="ambient__heart ambient__heart--two">♥</span>
        <span className="ambient__heart ambient__heart--three">♥</span>
        <span className="ambient__sparkle ambient__sparkle--one">✦</span>
        <span className="ambient__sparkle ambient__sparkle--two">✦</span>
      </div>

      <div
        className={[
          'experience',
          `experience--${view}`,
          flipState === 'out' && 'is-flipping-out',
          flipState === 'in' && 'is-flipping-in',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {view === 'letter' ? (
          <div className="story" key={runId}>
            <section className="intro" aria-label="Two bears kissing">
              <div className="bear-stage">
                <div className="bear bear--left">
                  <Bear />
                </div>
                <div className="bear bear--right">
                  <Bear />
                </div>

                <span className="kiss-mark" aria-hidden="true">
                  ♥
                </span>
                {floatingHearts.map((heart) => (
                  <span
                    key={heart.className}
                    className={heart.className}
                    aria-hidden="true"
                  >
                    {heart.glyph}
                  </span>
                ))}
              </div>

              <p className="love-word" aria-label="love">
                love<span aria-hidden="true">♥</span>
              </p>
              <p className="intro-note">For you, always</p>
            </section>

            <section className="letter" aria-labelledby="letter-title">
              <div className="letter__heading">
                <span className="letter__eyebrow">A little message for you</span>
                <h1 id="letter-title">Baby,</h1>
              </div>

              <div className="letter__body">
                <p>
                  I understood everything you have said, and I am well aware of
                  your feelings, and I love you. But please kindly note that I
                  love you with my whole heart, and this doesn&apos;t change how
                  I view you.
                </p>
                <p>
                  Although we had an uncomfortable conversation, how we ended it
                  is better than how we did before. I love you and I care about
                  you, and I am deeply sorry.
                </p>
              </div>

              <div className="letter__actions">
                <button
                  type="button"
                  className="page-turn"
                  onClick={() => flipTo('gallery')}
                >
                  Turn the page <span aria-hidden="true">♥</span>
                </button>
                <button type="button" className="replay" onClick={replay}>
                  Watch it again
                </button>
              </div>
            </section>
          </div>
        ) : (
          <Gallery onBack={() => flipTo('letter')} />
        )}
      </div>
    </main>
  )
}

export default App
