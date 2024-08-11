Here's a simplified version of the setup instructions with unnecessary details removed, including the steps to run the project and optimizations performed:

---

# React + TypeScript + Vite Template

This template provides a minimal setup to get React working in Vite with HMR.

## Setup

1. Install dependencies:
    ```bash
    npm install
    ```

2. Run the development server:
    ```bash
    npm run dev
    ```

## ESLint Configuration

For production applications, enable type-aware lint rules:

- Update `parserOptions`:

    ```js
    export default tseslint.config({
      languageOptions: {
        parserOptions: {
          project: ['./tsconfig.node.json', './tsconfig.app.json'],
          tsconfigRootDir: import.meta.dirname,
        },
      },
    })
    ```

- Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.
- Optionally add `...tseslint.configs.stylisticTypeChecked`.

- Install `eslint-plugin-react` and update the configuration:

    ```js
    import react from 'eslint-plugin-react'

    export default tseslint.config({
      settings: { react: { version: '18.3' } },
      plugins: {
        react,
      },
      rules: {
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
      },
    })
    ```

---

This version keeps the essential information for setup and configuration, focusing on the most important steps.
