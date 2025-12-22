# Contributing to Autism Simulator

Thank you for your interest in contributing to the Autism Simulator project! This document provides guidelines and instructions for contributing.

## Table of Contents

- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Content Guidelines](#content-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## How Can I Contribute?

### Types of Contributions We Welcome

- **Bug Reports**: Help us identify and fix issues
- **Feature Requests**: Suggest new features or improvements
- **Code Contributions**: Submit bug fixes or new features
- **Documentation**: Improve or expand documentation
- **Narrative Content**: Contribute new story scenarios (see [Content Guidelines](#content-guidelines))
- **Accessibility Improvements**: Help make the simulator more accessible
- **Testing**: Add or improve test coverage

### Content Sensitivity

Given the sensitive nature of this project, we especially welcome contributions from:

- Autistic individuals who can provide authentic perspectives
- Mental health professionals with expertise in autism and workplace accommodations
- Accessibility experts
- Anyone with lived experience navigating workplace environments while neurodivergent

## Development Setup

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** (recommended) or npm
- **Git**

### Getting Started

1. **Fork the repository** on GitHub

2. **Clone your fork**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/autism-simulator.git
   cd autism-simulator
   ```

3. **Install dependencies**:

   ```bash
   pnpm install
   ```

4. **Start the development server**:

   ```bash
   pnpm run dev
   ```

5. **Run tests**:

   ```bash
   # Type checking
   pnpm run typecheck

   # Linting
   pnpm run lint

   # Unit tests
   pnpm run test:unit

   # E2E tests
   pnpm run test:e2e
   ```

### Project Structure

- `src/` - Main application source code
  - `components/` - React components
  - `content/` - Narrative content (Ink files)
  - `utils/` - Utility functions
- `scripts/` - Build and utility scripts
- `tests/` - E2E and integration tests
- `public/` - Static assets
- `docs/` - Documentation

For detailed architecture information, see [`.github/copilot-instructions.md`](.github/copilot-instructions.md).

## Pull Request Process

1. **Create a feature branch** from `master`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Write clear, self-documenting code
   - Add tests for new functionality
   - Update documentation as needed
   - Follow the coding standards below

3. **Test your changes**:

   ```bash
   pnpm run typecheck
   pnpm run lint
   pnpm run test:unit
   pnpm run test:e2e
   ```

4. **Commit your changes**:
   - Use clear, descriptive commit messages
   - Follow conventional commit format when possible:
     ```
     feat: add new workplace scenario
     fix: correct stat calculation bug
     docs: update REPURPOSING_GUIDE
     ```

5. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**:
   - Provide a clear description of the changes
   - Reference any related issues
   - Include screenshots for UI changes
   - Ensure all CI checks pass

7. **Address review feedback**:
   - Be responsive to reviewer comments
   - Make requested changes promptly
   - Ask questions if feedback is unclear

## Coding Standards

### TypeScript

- Use **strict TypeScript** - no `any` types without justification
- Define proper interfaces for all data structures
- Use type inference where appropriate
- Document complex types with TSDoc comments

### React

- Use functional components with hooks
- Keep components focused and single-purpose
- Use proper TypeScript types for props
- Avoid prop drilling - use context or state management when appropriate

### Code Style

- **Formatting**: Run `pnpm run format` before committing
- **Linting**: Ensure `pnpm run lint` passes with no errors
- **Comments**: Use TSDoc for public APIs, inline comments for complex logic
- **Naming**: Use clear, descriptive names for variables and functions

### Testing

- Write tests for new features
- Maintain existing test coverage
- Use the `GameHelper` class for E2E tests (see `tests/helpers/game-helpers.ts`)
- Test edge cases and error conditions

## Content Guidelines

### Writing Narrative Content

When contributing to the Ink narrative (`src/content/main.ink`):

1. **Authenticity**: Base scenarios on real experiences when possible
2. **Sensitivity**: Avoid stereotypes and ableist language
3. **Balance**: Include both challenges and moments of success/relief
4. **Workplace Focus**: Keep scenarios grounded in professional environments
5. **Stat Tags**: Use consistent delta tags for stat changes:
   ```ink
   * [Take a break] #delta:energy=+10 #delta:masking=-5
       You step away from your desk for a few minutes.
   ```

### Stat Change Guidelines

- **Energy**: -15 to +15 (daily changes)
- **Masking**: -10 to +10 (effort/relaxation)
- **Competence**: -8 to +8 (task success/failure)
- **Relationships**: -5 to +5 (social interactions)

### Review Process for Content

Narrative content changes will be reviewed for:

- Authenticity and accuracy
- Sensitivity and respectfulness
- Game balance and stat impact
- Writing quality and clarity

## Reporting Bugs

### Before Submitting a Bug Report

1. **Check existing issues** to see if it's already reported
2. **Try the latest version** to see if it's already fixed
3. **Collect information**:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots or videos
   - Browser and OS information
   - Console errors (if applicable)

### Submitting a Bug Report

Create a GitHub issue with:

- Clear, descriptive title
- Detailed reproduction steps
- Expected and actual behavior
- System information
- Screenshots or error messages
- Label as `bug`

## Suggesting Features

### Before Submitting a Feature Request

1. **Check existing issues** to see if it's already suggested
2. **Consider if it aligns** with the project's goals
3. **Think about implementation** - is it feasible?

### Submitting a Feature Request

Create a GitHub issue with:

- Clear, descriptive title
- Detailed explanation of the feature
- Use cases and benefits
- Potential implementation approach (if you have ideas)
- Label as `enhancement`

## Questions?

If you have questions that aren't covered here:

- Open a GitHub issue with the `question` label
- Check existing documentation in `docs/`
- Review the [Copilot Instructions](.github/copilot-instructions.md) for technical details

## Thank You!

Your contributions make this project better and help create greater understanding and empathy for autistic professionals. We appreciate your time and effort!
