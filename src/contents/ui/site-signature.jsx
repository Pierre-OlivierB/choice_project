const LINKEDIN_URL = "https://www.linkedin.com/in/pierre-olivier-baudino/";

function SiteSignature() {
  return (
    <footer className="site-signature">
      <span>D&eacute;velopp&eacute;, &eacute;crit par</span>
      <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
        Pierre-Olivier B.
      </a>
      <span>(Powered by Codex)</span>
    </footer>
  );
}

export default SiteSignature;
