import React from "react";

import Button from "../Button";

import { ToastContext } from "../ToastProvider";
import ToastShelf from "../ToastShelf/ToastShelf";
import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const { createToast } = React.useContext(ToastContext);

  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

  function handleCreateToast(event) {
    event.preventDefault();

    if (!message) {
      return;
    }

    createToast(message, variant);

    setMessage("");
    setVariant(VARIANT_OPTIONS[0]);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form className={styles.controlsWrapper} onSubmit={handleCreateToast}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              required
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                // Allow Cmd+Enter to submit the form
                if (e.key === "Enter" && e.metaKey) {
                  handleCreateToast(e);
                }
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((v) => (
              <label key={v} htmlFor={`variant-${v}`}>
                <input
                  id={`variant-${v}`}
                  type="radio"
                  name="variant"
                  value={v}
                  checked={variant === v}
                  onChange={() => setVariant(v)}
                />
                {v}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
