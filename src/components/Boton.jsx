import "./Boton.css";

function Boton({ text, onPress, variant = "primary" }) {
  return (
    <button
      className={`boton boton--${variant}`}
      onClick={onPress ? () => onPress() : undefined}
      type={onPress ? "button" : "submit"}
    >
      {text}
    </button>
  );
}

export default Boton;
