import styles from "./edveoLogo.module.css";

export type EdveoLogoVariant = "nav" | "navCompact" | "footer";

type Props = {
  variant: EdveoLogoVariant;
};

export default function EdveoLogo({ variant }: Props) {
  const imgClass =
    variant === "footer" ? styles.imgFooter : variant === "navCompact" ? styles.imgNavCompact : styles.imgNav;

  const img = <img src="/edveo-logo.png" alt="Edveo" className={imgClass} decoding="async" />;

  if (variant === "footer") {
    return <div className={styles.footerPad}>{img}</div>;
  }

  return img;
}
