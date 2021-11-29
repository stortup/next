import styles from "styles/Player.module.css";

export function Player({ src }: { src: string }) {
  return (
    <div className={styles.player}>
      <div className="ratio ratio-16x9">
        <iframe
          width="100%"
          height="100%"
          src={src}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        />
      </div>
    </div>
  );
}
