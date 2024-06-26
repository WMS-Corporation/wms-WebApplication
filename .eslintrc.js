module.exports = {
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es2021: true,
        jest: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    overrides: [
        {
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "react" 
    ],
    rules: {
        "no-console": "warn", // Avverte se viene utilizzato console.log() o simili
        "no-unused-vars": "warn", // Avverte se vengono dichiarate variabili non utilizzate
        "no-undef": "error", // Errore se viene utilizzata una variabile non dichiarata
        "no-extra-semi": "error", // Errore se ci sono punti e virgola aggiuntivi non necessari
        "no-multiple-empty-lines": ["error", { max: 1 }], // Massimo una riga vuota consecutiva
        "space-infix-ops": ["error", { int32Hint: false }], // Richiede uno spazio attorno all'operatore di assegnazione (=)
        "arrow-spacing": ["error", { before: true, after: true }], // Richiede uno spazio attorno all'operatore di arrow function (=>)
        "comma-spacing": ["error", { before: false, after: true }], // Richiede uno spazio dopo la virgola e nessuno prima
        "brace-style": ["error", "1tbs"], // Tiene gli else sulla stessa linea della parentesi graffa.
        "no-useless-escape": 0,
        "react/react-in-jsx-scope": "off",
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};
