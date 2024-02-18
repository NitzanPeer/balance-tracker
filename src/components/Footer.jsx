export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="footer-container container">
      <footer>{`Copyright © Nitzan Pe'er ${year}`}</footer>
    </div>
  );
}
