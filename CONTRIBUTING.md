# Contributing to Games Platform

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## 🎯 How to Contribute

### Reporting Bugs

Found a bug? Please create a GitHub issue with:
- **Description**: Clear explanation of the bug
- **Steps to Reproduce**: How to recreate the issue
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, Node version, browser, etc.

### Suggesting Features

Have an idea? Open an issue with:
- **Title**: Short feature description
- **Use Case**: Why would this be useful?
- **Proposed Solution**: How you'd implement it (optional)
- **Alternatives**: Other approaches considered

### Submitting Code

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Games.git
   cd Games
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the code style (TypeScript, Vue 3)
   - Add tests for new features
   - Update documentation

4. **Test your changes**
   ```bash
   npm install
   npm run build
   npm run test
   ```

5. **Commit with clear messages**
   ```bash
   git commit -m "Brief description of changes"
   ```

6. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📋 Code Style

### TypeScript
- Use `strict: true` in tsconfig
- Prefer const over let
- Use meaningful variable names
- Add type annotations

### Vue Components
- Use `<script setup lang="ts">` syntax
- Keep components focused and small
- Use scoped styles
- Document props and events

### General
- 2 spaces for indentation
- Maximum line length: 100 characters
- No console.log in production code
- Use descriptive commit messages

## 🧪 Testing

- Write tests for new features
- Run tests before submitting PR
- Aim for >80% code coverage on changes

```bash
npm run test
npm run test -- --coverage
```

## 📚 Documentation

- Update README.md for new features
- Add JSDoc comments for public APIs
- Include usage examples
- Update changelog

## 🎮 Game Template Contributions

Want to add a new game template?

1. Create folder: `packages/templates/your-game/`
2. Include:
   - `package.json`
   - `game.json` (complete game file)
   - `README.md` (with controls, features, customization)
   - `src/` (game logic and scripts)
3. Ensure it's playable in the editor
4. Add documentation

### Template Requirements
- ✅ Fully playable in Games Editor
- ✅ Complete README with usage guide
- ✅ Example assets/entities
- ✅ Educational comments in code
- ✅ Works with latest engine version

## 🔄 Pull Request Process

1. **Before submitting:**
   - Ensure tests pass: `npm run test`
   - Check code style: `npm run lint` (when available)
   - Update documentation
   - Verify build works: `npm run build`

2. **PR Description:**
   - Link to related issues (#123)
   - Describe changes and why they're needed
   - Include before/after screenshots for UI changes

3. **Review Process:**
   - Maintainers will review within 1 week
   - Be responsive to feedback
   - Make requested changes

4. **Merging:**
   - PRs require approval before merging
   - Squash commits if requested
   - Delete feature branch after merge

## 📦 Monorepo Structure

This is a Turbo monorepo. When adding features:

```
packages/
├── engine/        # Core engine - physics, rendering, scripting
├── editor/        # Vue 3 web editor
└── templates/     # Game templates and examples
```

- **Engine changes**: May affect all packages
- **Editor changes**: Only affects editor and usage
- **Template additions**: Independent, just add to templates/

## 🚀 Development Workflow

```bash
# Install and setup
npm install

# Development (all packages)
npm run dev

# Build all
npm run build

# Test all
npm run test

# Type check
npm run type-check
```

## 🐛 Finding Issues to Work On

Look for issues labeled:
- `good first issue` - Great for new contributors
- `help wanted` - Needs assistance
- `enhancement` - New features
- `bug` - Bugs to fix

## 💬 Community

- **Discussions**: GitHub Discussions for ideas
- **Issues**: Bug reports and features
- **Slack**: Join our community (coming soon)

## 📝 Commit Message Format

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (no logic change)
- `refactor`: Code reorganization
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Build, dependencies, etc.

**Example:**
```
feat(editor): add undo/redo support

Implement undo/redo system for property changes in the editor.
Adds EditorHistory class and integrates with PropertyPanel.

Fixes #234
```

## 🙏 Thank You!

Your contributions make Games Platform better for everyone. We appreciate:
- 🐛 Bug reports
- 💡 Feature suggestions
- 🎨 Art and design
- 📖 Documentation improvements
- ✅ Code contributions
- 🤝 Helping others

---

Have questions? Open a discussion or reach out to the maintainers!
