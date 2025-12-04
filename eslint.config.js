import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

// 如果你使用了 @umijs/max 提供的特定配置，可能需要单独导入其规则集。
// 但通常，UMI 的配置在项目运行时会被其内部机制处理，对于本地 `eslint` 命令，我们可以先简化。
// 如果迁移后出现大量 UMI 特有的规则错误，可能需要检查 UMI 文档或暂时调整。

export default [
  // --- 第一部分：忽略模式 (替代 .eslintignore) ---
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      'build/',
      'src/.umi/**',
      'src/.umi-production/**',
    ],
  },
  // --- 第二部分：基础JavaScript推荐规则集 (替代 `extends: 'eslint:recommended'`) ---
  js.configs.recommended,

  // --- 第三部分：主配置对象 (对应你原文件的大部分设置) ---
  {
    // 指定此配置对哪些文件生效
    files: ['**/*.{js,jsx,ts,tsx}'],
    // 语言和解析选项 (替代原来的 env 和 parserOptions)
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json', // 通常需要指定 tsconfig
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // 合并浏览器、Node等环境的全局变量
        ...globals.browser,
        ...globals.node,
        // --- 自定义的全局变量 (从原 globals 字段迁移) ---
        ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: 'readonly',
        page: 'readonly',
        publicPath: 'readonly',
        REACT_APP_ENV: 'readonly',
        CLIENT_ENV: 'readonly',
        NodeJS: 'readonly',
      },
    },
    // --- 插件声明 (从原 plugins 字段迁移) ---
    plugins: {
      // 键名是插件在规则中使用时的前缀，值是导入的插件对象
      react: react,
      '@typescript-eslint': typescriptEslint,
    },
    // --- 规则配置 (从原 rules 字段迁移) ---
    rules: {
      // 你的所有自定义规则保持不变，直接复制过来
      camelcase: 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/no-array-index-key': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'consistent-return': 'off',
      'prefer-promise-reject-errors': 'off',
      'func-names': 'off',
      'max-classes-per-file': 'off',
      'no-restricted-globals': 'off',
      'no-unused-expressions': 'off',
      'no-return-assign': 'off',
      'no-underscore-dangle': 'off',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
      'no-plusplus': 'off',
      'no-return-await': 'off',
      'no-use-before-define': 'off',
      'no-promise-executor-return': 'off',
      'no-async-promise-executor': 'off',
      'no-param-reassign': ['error', { props: false }],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off', // 防止变量在定义前就被使用，避免引用错误
      '@typescript-eslint/no-unused-expressions': 'off', // 检查是否有执行后不影响程序状态的表达式，能捕捉到一些逻辑错误
      '@typescript-eslint/ban-types': 'off', // 禁止使用一些被认为不安全的TypeScript类型，比如Object、{}等
      '@typescript-eslint/no-unused-vars': 'off', // 检查未使用的变量，但用户配置中忽略了以_开头的变量，这是常见的约定
      'no-useless-catch': 'off', // 检查是否有捕获异常后立即重新抛出的情况，这通常是不必要的
      eqeqeq: 'off', // 要求使用 === 和 !== 而不是 == 和 !=，避免类型转换带来的错误
      'guard-for-in': 'off', // 要求在 for-in 循环中使用 if 语句检查属性是否存在，避免遍历到原型链上的属性
      'array-callback-return': 'off', // 检查数组方法（如 map、filter、reduce 等）的回调函数是否有返回值，避免一些潜在的错误
      'no-redeclare': 'off', // 禁止在同一作用域内重复声明变量，避免混淆和错误
      '@typescript-eslint/no-redeclare': 'error', // 与 no-redeclare 相同，但针对 TypeScript 类型，要求类型声明不重复
      'no-prototype-builtins': 'off', // 禁止直接调用 Object.prototype 上的方法，因为这可能会导致错误或性能问题
    },
  },
];
