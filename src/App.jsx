/**
 * Will You Be My Valentine – main app.
 * Login screen first (client-side only), then Valentine proposal with YES/NO and modal.
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { isLoggedIn, setLoggedIn, validate, clearAllAndLogout } from "./auth";
import { playPop, playSad, isSoundEnabled, setSoundEnabled } from "./sounds";

/** Duration (ms) of modal close animation – must match CSS .modal-overlay--closing */
const MODAL_CLOSE_DURATION = 300;

const PERSUASION_MESSAGES = [
  "Are you sure? 🥺",
  "But we'd look so cute together 💕",
  "Think again, pookie 😤💖",
  "This button is broken, try YES 😌",
  "My heart just cracked 💔",
  "Pookie said try YES 🧸💕",
  "Bubu is sad... 🐻‍❄️",
  "One more chance? Pretty please? 🙏",
  "The YES button is feeling lonely 😢",
  "I'll share my snacks with you 🍪💖",
];

function pickRandomMessage() {
  return PERSUASION_MESSAGES[
    Math.floor(Math.random() * PERSUASION_MESSAGES.length)
  ];
}

/** Login screen – username, mobile/password, client-side validation only. */
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (validate(username, password)) {
      setLoggedIn();
      onLogin();
    } else {
      setError("Hmm… you sure you're my Valentine? 🥺");
    }
  };

  return (
    <div className="app">
      <main className="card login-card">
        <h1 className="login-title">Ohhh , Helluuu ?</h1>
        <p className="login-subtitle">Sign in to continue</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="login-username">
            Some Name ?
          </label>
          <input
            id="login-username"
            type="text"
            className="login-input"
            placeholder="Remember the name I want to call you."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoCapitalize="off"
            aria-invalid={error ? "true" : undefined}
          />
          <label className="login-label" htmlFor="login-password">
            Some Digits ?
          </label>
          <input
            id="login-password"
            type="password "
            className="login-input"
            placeholder="Something related to me ?.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            aria-invalid={error ? "true" : undefined}
          />
          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn-yes login-btn">
            Login
          </button>
        </form>
      </main>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [noClickCount, setNoClickCount] = useState(0);
  const [persuasionMessage, setPersuasionMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [saidYes, setSaidYes] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled);

  const yesButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  const handleYes = () => {
    playPop();
    setSaidYes(true);
    setModalOpen(true);
  };

  const handleNo = () => {
    playSad();
    setNoClickCount((c) => c + 1);
    setPersuasionMessage(pickRandomMessage());
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const handleBackToLogin = () => {
    clearAllAndLogout();
    setIsAuthenticated(false);
  };

  const closeModal = useCallback(() => {
    setModalClosing(true);
  }, []);

  // After close animation finishes, unmount modal and restore focus
  useEffect(() => {
    if (!modalClosing) return;
    const id = setTimeout(() => {
      setModalOpen(false);
      setModalClosing(false);
      yesButtonRef.current?.focus();
    }, MODAL_CLOSE_DURATION);
    return () => clearTimeout(id);
  }, [modalClosing]);

  // When modal opens: lock body scroll and focus close button for keyboard users
  useEffect(() => {
    if (!modalOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const focusId = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });
    return () => {
      cancelAnimationFrame(focusId);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  // Escape key closes modal
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !modalClosing) closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, modalClosing, closeModal]);

  // Sync sound state with localStorage (e.g. after change in another tab)
  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  // Show login screen until client-side "auth" succeeds
  if (!isAuthenticated) {
    return (
      <>
        <div className="hearts" aria-hidden="true">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="heart" />
          ))}
        </div>
        <LoginScreen onLogin={() => setIsAuthenticated(true)} />
      </>
    );
  }

  return (
    <>
      {/* Background: decorative floating hearts (CSS-only animation) */}
      <div className="hearts" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="heart" />
        ))}
      </div>

      {/* Top-left: Back to login (fixed, not on card) */}
      <button
        type="button"
        className="back-to-login"
        onClick={handleBackToLogin}
        aria-label="Back to login (clears all stored data)"
        title="Back to login – clears localStorage, cookies & cache"
      >
        ← Back
      </button>

      {/* Top-right: avatar + name */}
      <div className="profile-corner">
        <div className="profile-avatar" aria-hidden="true">
          S
        </div>
        <span className="profile-name">Shashwati</span>
      </div>

      <div className="app">
        <main className="card">
          {/* Decorative stickers – subtle, romantic */}
          <span className="sticker sticker-1" aria-hidden="true">
            💕
          </span>
          <span className="sticker sticker-2" aria-hidden="true">
            ✨
          </span>
          <span className="sticker sticker-3" aria-hidden="true">
            🌸
          </span>
          <button
            type="button"
            className="sound-toggle"
            onClick={toggleSound}
            aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
            title={
              soundOn
                ? "Sound on (click to turn off)"
                : "Sound off (click to turn on)"
            }
          >
            {soundOn ? "🔊" : "🔇"}
          </button>
          <h1 className="title">Will you be my Valentine? 💘</h1>

          {saidYes ? (
            <p className="response">
              Yay! You made my day! 💕 Happy Valentine's Day!
            </p>
          ) : (
            <>
              <div className="actions">
                <button
                  ref={yesButtonRef}
                  type="button"
                  className="btn btn-yes"
                  onClick={handleYes}
                  aria-label="Yes, I'll be your Valentine"
                  style={{
                    "--yes-scale": Math.min(1.35, 1 + noClickCount * 0.045),
                    "--yes-glow": Math.min(1, noClickCount * 0.12),
                  }}
                >
                  YES 💕
                </button>
                <button
                  type="button"
                  className="btn btn-no"
                  onClick={handleNo}
                  aria-label="No"
                  style={{
                    "--no-scale": Math.max(0.52, 1 - noClickCount * 0.06),
                    "--no-wobble": noClickCount % 2 === 0 ? 1 : -1,
                  }}
                >
                  NO 😤
                </button>
              </div>
              {/* Random message on each NO click; key forces re-mount for entrance animation */}
              {persuasionMessage && (
                <p className="persuasion-message" key={persuasionMessage}>
                  {persuasionMessage}
                </p>
              )}
            </>
          )}
        </main>
      </div>

      {/* YES celebration modal: overlay + dialog, smooth open/close */}
      {modalOpen && (
        <div
          className={`modal-overlay ${modalClosing ? "modal-overlay--closing" : ""}`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
        >
          <div className="modal-heart-burst" aria-hidden="true">
            {[...Array(12)].map((_, i) => (
              <span key={i} className="modal-burst-heart" style={{ "--i": i }}>
                💕
              </span>
            ))}
          </div>
          {/* Stop propagation so clicking modal content doesn't close */}
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="modal-close"
              onClick={closeModal}
              aria-label="Close celebration modal"
            >
              ×
            </button>
            <h2 id="modal-title" className="modal-title">
              Yayyy!! 🥹💖
            </h2>
            <p id="modal-desc" className="modal-subtext">
              Pookie & Cute Bubu Forever 💕
            </p>
            <div className="modal-mascots">
              <div className="mascot">
                <span className="mascot-emoji" aria-hidden="true">
                  🧸
                </span>
                <span className="mascot-name">Pookie</span>
              </div>
              <span className="mascot-heart" aria-hidden="true">
                💕
              </span>
              <div className="mascot">
                <span className="mascot-emoji" aria-hidden="true">
                  🐻‍❄️
                </span>
                <span className="mascot-name">Bubu</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
