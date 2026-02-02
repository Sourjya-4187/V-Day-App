import { useState, useEffect } from 'react';

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
  return PERSUASION_MESSAGES[Math.floor(Math.random() * PERSUASION_MESSAGES.length)];
}

function App() {
  const [answered, setAnswered] = useState(false);
  const [yes, setYes] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [persuasionMessage, setPersuasionMessage] = useState(null);

  const handleYes = () => {
    setAnswered(true);
    setYes(true);
    setModalOpen(true);
  };

  const handleNo = () => {
    setPersuasionMessage(pickRandomMessage());
    setNoClickCount((c) => c + 1);
  };

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (modalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  return (
    <>
      <div className="hearts" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="heart" />
        ))}
      </div>
      <div className="app">
        <main className="card">
          <h1 className="title">Will you be my Valentine? 💘</h1>

          {!answered ? (
            <>
              <div className="actions">
                <button
                  className="btn btn-yes"
                  onClick={handleYes}
                  style={{
                    '--yes-scale': Math.min(1.35, 1 + noClickCount * 0.045),
                  }}
                >
                  YES 💕
                </button>
                <button
                  className="btn btn-no"
                  onClick={handleNo}
                  style={{
                    '--no-scale': Math.max(0.52, 1 - noClickCount * 0.06),
                    '--no-wobble': noClickCount % 2 === 0 ? 1 : -1,
                  }}
                >
                  NO 😤
                </button>
              </div>
              {persuasionMessage && (
                <p className="persuasion-message" key={persuasionMessage}>
                  {persuasionMessage}
                </p>
              )}
            </>
          ) : (
            <p className="response">
              {yes
                ? "Yay! You made my day! 💕 Happy Valentine's Day!"
                : "No worries! I'll be here. 💝"}
            </p>
          )}
        </main>
      </div>

      {modalOpen && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-heart-burst" aria-hidden="true">
            {[...Array(12)].map((_, i) => (
              <span key={i} className="modal-burst-heart" style={{ '--i': i }}>💕</span>
            ))}
          </div>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <h2 id="modal-title" className="modal-title">Yayyy!! 🥹💖</h2>
            <p className="modal-subtext">Pookie & Cute Bubu Forever 💕</p>
            <div className="modal-mascots">
              <div className="mascot">
                <span className="mascot-emoji" aria-hidden="true">🧸</span>
                <span className="mascot-name">Pookie</span>
              </div>
              <span className="mascot-heart" aria-hidden="true">💕</span>
              <div className="mascot">
                <span className="mascot-emoji" aria-hidden="true">🐻‍❄️</span>
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
