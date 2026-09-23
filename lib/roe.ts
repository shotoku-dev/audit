export const ROE_TEXT = `
Rules of Engagement — Breakpoint Security Audit

1. Authorized target. Testing is limited to the application/agent and URL
   submitted by the signer, and only the environment or access explicitly
   provided (staging endpoint, test account, or API docs).

2. Test window. Testing begins once working access is received and
   completes within 72 hours of that access, unless both parties agree in
   writing to extend it.

3. Exclusions. No load or denial-of-service testing. No use of, or
   testing against, real production data. No testing of third-party
   systems, vendors, or infrastructure not owned or controlled by the
   signer, even if reachable from the target.

4. Method. Testing is manual, conducted off-platform, and limited to
   techniques necessary to identify and demonstrate vulnerabilities mapped
   to the OWASP LLM Top 10. No automated scanning tools are run against the
   target without prior notice.

5. Authority. The signer declares that they are an authorized
   representative of the company that owns or operates the target, and
   have the right to authorize security testing against it.

6. Confidentiality. Findings are shared only with the signer and are not
   disclosed publicly without written consent, except in redacted,
   non-identifying form.
`.trim();
