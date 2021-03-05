module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    /** https://eslint.org/docs/rules/arrow-parens */
    'arrow-parens': 'error',
    /** https://eslint.org/docs/rules/generator-star-spacing */
    'generator-star-spacing': 'error',
    /** https://eslint.org/docs/rules/camelcase */
    camelcase: [
      'error',
      {
        properties: 'never',
        ignoreDestructuring: true
      }
    ],
    /** https://eslint.org/docs/rules/consistent-this */
    'consistent-this': [
      'error',
      'self'
    ],
    /** https://eslint.org/docs/rules/prefer-const */
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false
      }
    ],
    /** https://eslint.org/docs/rules/quotes#enforce-the-consistent-use-of-either-backticks-double-or-single-quotes-quotes */
    quotes: [
      'error',
      'single',
      { allowTemplateLiterals: true }
    ],
    /** https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/attributes-order.md */
    'vue/attributes-order': [
      2,
      {
        order: [
          'GLOBAL',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'LIST_RENDERING',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
          'DEFINITION'
        ]
      }
    ],
    /** https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/html-closing-bracket-newline.md */
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ],
    /** https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/html-closing-bracket-spacing.md */
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'never'
      }
    ],
    /** https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-v-html.md */
    'vue/no-v-html': 'off',
    /** https://eslint.org/docs/rules/no-prototype-builtins */
    'no-prototype-builtins': 'off',
    /** https://eslint.org/docs/rules/no-restricted-imports */
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'lodash',
            message: 'Lodash is already available globally, please remove the import.'
          },
          {
            name: 'faker',
            importNames: [
              'fakerLorem',
              'fakerRand',
              'fakerInet'
            ],
            message: 'Please use the named import directly, i.e. lorem, rand etc.'
          }
        ]
      }
    ],
    /** https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/component-name-in-template-casing.md */
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true,
        ignores: []
      }
    ],
    /** https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/object-curly-spacing.md */
    'vue/object-curly-spacing': [
      'error',
      'always'
    ],
    /** https://eslint.vuejs.org/rules/padding-line-between-blocks.html#vue-padding-line-between-blocks */
    'vue/padding-line-between-blocks': [
      'error',
      'always'
    ],
    /** https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-unused-properties.md */
    'vue/no-unused-properties': ['warn', {
      groups: ['props', 'data', 'computed', 'methods']
    }]
  }
}
