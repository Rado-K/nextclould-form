import "./styles.scss";

const Logo = () => {
  return (
    <div className="logo-container">
      <h1 className="names">{process.env.NEXT_PUBLIC_TITLE}</h1>
      <p className="date">{process.env.NEXT_PUBLIC_DATE}</p>
    </div>
  );
};

export default Logo;
