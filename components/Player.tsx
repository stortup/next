import styles from "styles/Player.module.css";

export function Player() {
  return (
    <div className={styles.player}>
      <div className="ratio ratio-16x9">
        <iframe
          width="100%"
          height="100%"
          src="https://player.arvancloud.com/index.html?config=https://vd-test-st.arvanvod.com/9VB897bzdq/dkvRXmV9py/origin_config.json"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        />
      </div>
    </div>
  );
}
