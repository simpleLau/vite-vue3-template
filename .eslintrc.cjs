module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    defineEmits: true,
    document: true,
    localStorage: true,
    GLOBAL_VAR: true,
    window: true,
    defineProps: true,
    defineExpose: true,
    withDefaults: true
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', 'import'],
  rules: {
    indent: [
      2,
      2,
      {
        SwitchCase: 1
      }
    ],
    quotes: [2, 'single'], // 要求尽可能地使用单引号
    'no-plusplus': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ],
    'vue/multi-word-component-names': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-console': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'new-cap': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'vue/no-v-html': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'import/prefer-default-export': 'off',
    // 'no-redeclare': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/ban-types': 'warn'
  }
}
