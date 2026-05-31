"use client";

import { useEffect } from "react";

export default function RightDrawer({
  isOpen,
  onClose,
  title,
  overline,
  children,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <button
        type="button"
        aria-label="Close drawer"
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          border: "none",
          backgroundColor: "rgba(0,0,0,0.52)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          cursor: "pointer",
          animation: "wc_drawerFadeIn 220ms ease-out both",
        }}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: "relative",
          width: "min(440px, 92vw)",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(14,14,14,0.94), rgba(10,10,10,0.96))",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "-24px 0 80px rgba(0,0,0,0.45)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          display: "flex",
          flexDirection: "column",
          animation: "wc_drawerSlideIn 260ms ease-out both",
        }}
      >
        <header
          style={{
            padding: "20px 20px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          <div style={{ minWidth: 0 }}>
            {overline ? (
              <div
                style={{
                  color: "rgba(255,255,255,0.46)",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                {overline}
              </div>
            ) : null}
            <h2
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.92)",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              appearance: "none",
              border: "1px solid rgba(255,255,255,0.10)",
              backgroundColor: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.72)",
              borderRadius: "10px",
              width: "32px",
              height: "32px",
              cursor: "pointer",
              fontSize: "18px",
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </header>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
          }}
        >
          {children}
        </div>
      </aside>
    </div>
  );
}
