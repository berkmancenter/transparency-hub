# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

The Transparency Hub team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by emailing:

**[transparency-hub@cyber.harvard.edu](mailto:transparency-hub@cyber.harvard.edu)**

Include the following information in your report:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

This information will help us triage your report more quickly.

### What to Expect

- **Response Time**: You should receive a response within 48 hours acknowledging your report.
- **Investigation**: We will investigate the issue and determine its severity and impact.
- **Updates**: We will keep you informed about our progress as we work on a fix.
- **Resolution**: Once the issue is resolved, we will notify you and may include your name in our acknowledgments (if you wish).

### Security Update Process

1. The security issue is received and assigned to a primary handler
2. The problem is confirmed and affected versions are determined
3. Code is audited to find any similar problems
4. Fixes are prepared for all supported versions
5. Fixes are released and announced

## Security Best Practices for Contributors

When contributing to this project:

- Never commit sensitive information (credentials, API keys, etc.)
- Use environment variables for configuration
- Follow secure coding practices
- Keep dependencies up to date
- Review the [OWASP Top 10](https://owasp.org/www-project-top-ten/)

## Disclosure Policy

- We will investigate legitimate reports and make every effort to quickly resolve security issues
- We will publicly acknowledge security researchers who report valid vulnerabilities (unless they prefer to remain anonymous)
- We will coordinate with you on the disclosure timeline

## Comments on this Policy

If you have suggestions on how this process could be improved, please submit a pull request or open an issue.

---

**Note**: This project is maintained by the Berkman Klein Center for Internet & Society at Harvard University.
