import styles from "./edveoLogo.module.css";

export type EdveoLogoVariant = "nav" | "navCompact" | "footer" | "default";

type Props = {
  variant?: EdveoLogoVariant;
};

export default function EdveoLogo({ variant = "default" }: Props) {
  const isWhite = variant === "nav" || variant === "footer";
  
  let imgClass = styles.imgDefault;
  if (variant === "footer") {
    imgClass = styles.imgFooter;
  } else if (variant === "navCompact") {
    imgClass = styles.imgNavCompact;
  } else if (variant === "nav") {
    imgClass = styles.imgNav;
  }

  return (
    <img 
      src="/edveo-logo.png" 
      alt="Edveo" 
      className={`${imgClass} ${isWhite ? styles.whiteFilter : ""}`} 
      decoding="async" 
    />
  );
}
