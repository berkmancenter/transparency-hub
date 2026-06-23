# Contributing to Transparency Hub

Thank you for your interest in contributing to Transparency Hub! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

## Code of Conduct

This project is part of the Berkman Klein Center's research initiatives. We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and professional in all interactions.

## How to Contribute

There are many ways to contribute to Transparency Hub:

- **Report bugs** and issues
- **Suggest new features** or enhancements
- **Improve documentation**
- **Submit bug fixes** or new features
- **Review pull requests**
- **Improve test coverage**

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- MongoDB (local or cloud instance)
- A code editor (we recommend VS Code)

### Getting Started

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/transparency-hub.git
   cd transparency_hub
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/berkmancenter/transparency-hub.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your local configuration.

6. **Start the development server**:
   ```bash
   npm run dev
   ```

7. **Open your browser** to [http://localhost:3002](http://localhost:3002)

## Coding Guidelines

### Code Style

- Use **TypeScript** for all new code
- Follow the existing code structure and naming conventions
- Use **functional components** with hooks for React components
- Keep components small and focused on a single responsibility
- Use **meaningful variable and function names**

### TypeScript

- Avoid using `any` types when possible
- Define proper interfaces and types for data structures
- Export types that might be useful in other modules

### React Best Practices

- Use **React Server Components** (RSC) by default in the App Router
- Mark components with `'use client'` only when necessary (hooks, events, browser APIs)
- Prefer server-side data fetching when possible
- Keep client-side state minimal

### File Organization

- Place UI components in `components/ui/`
- Place shared utilities in `components/lib/`
- Place API routes in `app/api/`
- Place page components in their respective route folders under `app/`

### Commit Messages

Write clear and descriptive commit messages:

- Use the imperative mood ("Add feature" not "Added feature")
- Keep the first line under 72 characters
- Reference issue numbers when applicable
- Examples:
  ```
  Add policy comparison filter functionality
  
  Fix pagination bug in policy index (#123)
  
  Update README with installation instructions
  ```

## Submitting Changes

### Before Submitting

1. **Sync with upstream**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run linting**:
   ```bash
   npm run lint
   ```

3. **Test your changes** thoroughly in the browser

4. **Check for TypeScript errors**:
   ```bash
   npm run build
   ```

### Pull Request Process

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit them with clear messages

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request** on GitHub:
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes
   - Describe how to test your changes

5. **Respond to feedback** from reviewers

6. **Once approved**, a maintainer will merge your PR

### Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Update documentation if needed
- Add comments to complex code sections
- Ensure the PR description explains the "why" not just the "what"

## Reporting Bugs

If you find a bug, please open an issue with:

- **Clear title** describing the problem
- **Steps to reproduce** the bug
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version)
- **Error messages** or console output

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., macOS 14]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.17.0]

**Additional context**
Any other information about the problem.
```

## Feature Requests

We welcome feature suggestions! When requesting a feature:

- **Check existing issues** first to avoid duplicates
- **Describe the use case** - why is this feature needed?
- **Provide examples** of how it would work
- **Consider the scope** - is it aligned with the project's goals?

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Other solutions or features you've considered.

**Additional context**
Screenshots, mockups, or examples.
```

## Questions?

If you have questions about contributing:

- Check the [README](README.md)
- Open a GitHub Discussion
- Review existing issues and PRs

## License

By contributing to Transparency Hub, you agree that your contributions will be licensed under the [AGPL-3.0 License](LICENSE).

---

Thank you for contributing to Transparency Hub! 🎉
