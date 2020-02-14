const THEME = {
  base: "vs-dark",
  inherit: false,
  rules: [
    { token: "comment", foreground: "00cc00", fontStyle: "italic ligther" },

    { token: "string", foreground: "ff8c1a" },
    /* operators */
    { token: "operator", foreground: "b1b1cd" },
    { token: "comparison", foreground: "d0d0e1" },
    {
      token: "booleanOperator",
      foreground: "d9b38c",
      fontStyle: "bold"
    },
    { token: "functionnalOperator", foreground: "ffb3ff" },
    /* */
    { token: "keyword", foreground: "80dfff" },
    { token: "function", foreground: "ff99ff" },
    /* */
    { token: "identifier", foreground: "ffe6b3" },
    /* numerics */
    { token: "number", foreground: "ccffb3" },
    { token: "number.float", foreground: "ccffb3" },
    { token: "number.hex", foreground: "ccffb3" },
    /* delimiters */
    { token: "delimiter", foreground: "ffff00" }
  ]
};

export default THEME;
