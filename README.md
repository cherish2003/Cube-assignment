Here's an updated README file for your GitHub repository:

# Cube Assignment

This project is a React-based application that displays customer details and their related photos fetched from an external API. It demonstrates the use of various React hooks, lazy loading, and performance optimization techniques.

## Setup

1. **Install dependencies:**
    ```bash
    npm install
    ```

2. **Run the development server:**
    ```bash
    npm run dev
    ```

## Performance Optimizations

1. **Memoization with `useMemo` and `useCallback`:**
   - The `getRandomQuery` function is memoized using `useMemo` to ensure that it doesn’t recalculate the random query unnecessarily.
   - The `fetchPhotos` function is wrapped in `useCallback` to prevent unnecessary re-creation of the function on each render, reducing the number of API calls.

2. **Lazy Loading with `React.lazy` and `Suspense`:**
   - The `CustomerDetails` component is lazy-loaded using `React.lazy` to improve the initial load time of the application.
   - A fallback UI is provided with `Suspense` while the component is loading, enhancing the user experience.

3. **Virtualization with `react-window`:**
   - The `CustomerList` component uses `react-window` to render only the visible items in the list, significantly improving performance when dealing with large data sets.

4. **Efficient State Management:**
   - State updates are minimized by using hooks like `useState` and `useEffect` effectively.
   - The `setInterval` in the `useEffect` hook is cleared on component unmount to prevent memory leaks.

5. **Optimized Image Loading:**
   - Images are loaded lazily with the `loading="lazy"` attribute to reduce initial page load time.
   - Blur effects are applied and removed once images are fully loaded to provide a smooth visual experience.

6. **Conditional Rendering:**
   - Conditional rendering is employed to avoid unnecessary rendering of components, further improving performance.

## ESLint Configuration

To enforce code quality and consistency, the project uses ESLint with type-aware linting rules for TypeScript. For production applications, enable type-aware lint rules:

- **Update `parserOptions`:**

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

- **Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.**
- Optionally add `...tseslint.configs.stylisticTypeChecked`.

- **Install `eslint-plugin-react` and update the configuration:**

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

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README provides a comprehensive overview of your project setup, performance optimizations, and ESLint configuration, making it easier for others to understand and contribute to the project.
