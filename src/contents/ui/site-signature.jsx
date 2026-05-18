const LINKEDIN_URL = "https://www.linkedin.com/in/pierre-olivier-baudino/";

function SiteSignature() {
  return (
    <footer className="site-signature">
      <span>Developpe, ecrit par</span>
      <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
        Pierre-Olivier B.
      </a>
      <span>(Powered by Codex)</span>
    </footer>
  );
}

export default SiteSignature;
