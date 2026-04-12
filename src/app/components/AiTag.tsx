type Props = {
  text: string;
};

const TAG_STYLE: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  background: "linear-gradient(135deg, #025930, #006d41)",
  color: "#a7f3d0",
  borderRadius: "10px",
  padding: "10px 16px",
  fontSize: "0.8rem",
  fontWeight: 600,
  lineHeight: 1.4,
  marginTop: "24px",
};

const STAR_STYLE: React.CSSProperties = {
  color: "#6ee7b7",
  fontSize: "0.85rem",
  flexShrink: 0,
};

export default function AiTag({ text }: Props) {
  return (
    <div style={TAG_STYLE}>
      <span style={STAR_STYLE}>✦</span>
      <span>{text}</span>
    </div>
  );
}
