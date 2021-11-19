module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "ignorePatterns": ["/dist", "ormconfig.js", ".eslintrc.js", "prettierrc.js", "index.ts"],
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
    }
};
