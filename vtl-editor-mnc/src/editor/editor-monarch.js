// Data Set
// Data Point
// Identifier Component
// Measure Component
// Attribute Component
// Data Set Component
// Value Domain Subset
// Value Domain

export default {
  // Set defaultToken to invalid to see what you do not tokenize yet
  // defaultToken: 'invalid',

  // AS                : 'as';

  functions: [
    "current_date",
    "on",
    "drop",
    "keep",
    "calc",
    "attrcalc",
    "rename",
    "between",
    "in",
    "not_in",
    "isnull",
    "ex",
    "union",
    "diff",
    "symdiff",
    "intersect",
    "keys",
    // CARTESIAN_PER     : ',';
    // INTYEAR           : 'intyear';
    // INTMONTH          : 'intmonth';
    // INTDAY            : 'intday';
    // CHECK             : 'check';
    "exists_in"

    // IMBALANCE         : 'imbalance';
    // ERRORCODE         : 'errorcode';
    // ALL               : 'all';
    // AGGREGATE         : 'aggr';
    // ERRORLEVEL        : 'errorlevel';
    // ORDER             : 'order';
    // BY                : 'by';
    // RANK              : 'rank';
    // ASC               : 'asc';
    // DESC              : 'desc';
    // MIN               : 'min';
    // MAX               : 'max';
    // FIRST             : 'first';
    // LAST              : 'last';
    // INDEXOF           : 'indexof';
    // ABS               : 'abs';
    // KEY               : 'key';
    // LN                : 'ln';
    // LOG               : 'log';
    // TRUNC             : 'trunc';
    // ROUND             : 'round';
    // POWER             : 'power';
    // MOD               : 'mod';
    // LEN               : 'length';
    // CONCAT            : '||';
    // TRIM              : 'trim';
    // UCASE             : 'upper';
    // LCASE             : 'lower';
    // SUBSTR            : 'substr';
    // SUM               : 'sum';
    // AVG               : 'avg';
    // MEDIAN            : 'median';
    // COUNT             : 'count';
    // DIMENSION         : 'identifier';
    // MEASURE           : 'measure';
    // ATTRIBUTE         : 'attribute';
    // FILTER            : 'filter';
    // MERGE             : 'merge';
    // EXP               : 'exp';
    // ROLE              : 'role';
    // VIRAL             : 'viral';
    // CHARSET_MATCH     : 'match_characters';
    // TYPE              : 'type';
    // NVL               : 'nvl';
    // HIERARCHY         : 'hierarchy';
    // OPTIONAL			: '_';
    // INVALID			: 'invalid';

    // VALUE_DOMAIN			          : 'valuedomain';
    // VARIABLE				            : 'variable';
    // DATA			                  : 'data';
    // STRUCTURE			              : 'structure';
    // DATASET				              : 'dataset';
    // OPERATOR                    : 'operator';
    // DEFINE						          : 'define';
    // PUT_SYMBOL                  : '<-';
    // DATAPOINT						        : 'datapoint';
    // HIERARCHICAL					      : 'hierarchical';
    // RULESET						          : 'ruleset';
    // RULE									: 'rule';
    // END							            : 'end';
    // ALTER_DATASET					      : 'alterDataset';
    // LTRIM							          : 'ltrim';
    // RTRIM							          : 'rtrim';
    // INSTR							          : 'instr';
    // REPLACE						          : 'replace';
    // CEIL							          : 'ceil';
    // FLOOR							          : 'floor';
    // SQRT							          : 'sqrt';
    // ANY							            : 'any';
    // SETDIFF						          : 'setdiff';
    // STDDEV_POP					        : 'stddev_pop';
    // STDDEV_SAMP							: 'stddev_samp';
    // VAR_POP						          : 'var_pop';
    // VAR_SAMP						        : 'var_samp';
    // GROUP									: 'group';
    // EXCEPT								: 'except';
    // HAVING								: 'having';
    // FIRST_VALUE					        : 'first_value';
    // LAST_VALUE					        : 'last_value';
    // LAG						        	: 'lag';
    // LEAD									: 'lead';
    // RATIO_TO_REPORT				      : 'ratio_to_report';
    // OVER							          : 'over';
    // PRECEDING                   : 'preceding';
    // FOLLOWING                   : 'following';
    // UNBOUNDED					  : 'unbounded';
    // PARTITION					          : 'partition';
    // ROWS							          : 'rows';
    // RANGE							          : 'range';
    // CURRENT					        : 'current';
    // VALID							          : 'valid';
    // FILL_TIME_SERIES				    : 'fill_time_series';
    // FLOW_TO_STOCK					      : 'flow_to_stock';
    // STOCK_TO_FLOW					      : 'stock_to_flow';
    // TIMESHIFT						        : 'timeshift';
    // MEASURES						        : 'measures';
    // NO_MEASURES							: 'no_measures';
    // CONDITION					          : 'condition';
    // BOOLEAN							  : 'boolean';
    // DATE							          : 'date';
    // TIME_PERIOD						 :'time_period';
    // NUMBER                      : 'number';
    // STRING						          : 'string';
    // INTEGER						          : 'integer';
    // FLOAT                       : 'float';
    // LIST							          : 'list';
    // RECORD						          : 'record';
    // RESTRICT						        : 'restrict';
    // YYYY							          : 'yyyy';
    // MM							            : 'mm';
    // DD							            : 'dd';
    // MAX_LENGTH					        : 'maxLength';
    // REGEXP						          : 'regexp';

    // AGGREGATES         			    : 'aggregates';
    // POINTS						          : 'points';
    // POINT									  : 'point';
    // TOTAL							          : 'total';
    // PARTIAL						          : 'partial';
    // ALWAYS								  : 'always';
    // INNER_JOIN							    : 'inner_join';
    // LEFT_JOIN							      : 'left_join';
    // CROSS_JOIN							    : 'cross_join';
    // FULL_JOIN                   : 'full_join';
    // MAPS_FROM						        : 'maps_from';
    // MAPS_TO						          : 'maps_to';
    // MAP_TO						          : 'map_to';
    // MAP_FROM						        : 'map_from';
    // RETURNS						          : 'returns';
    // PIVOT                       : 'pivot';
    // UNPIVOT                     : 'unpivot';
    // SUBSPACE                    : 'sub';
    // APPLY                       : 'apply';
    // CONDITIONED				  : 'conditioned';
    // PERIOD_INDICATOR			  : 'period_indicator';
    // SINGLE					  : 'single';
    // DURATION					  : 'duration';
    // TIME_AGG					  : 'time_agg';
    // UNIT						  : 'unit';
    // VALUE						  : 'Value';
    // VALUEDOMAINS				  : 'valuedomains';
    // VARIABLES					  : 'variables';
    // INPUT						  : 'input';
    // OUTPUT					  : 'output';
    // CAST						  : 'cast';
    // RULE_PRIORITY			      : 'rule_priority';
    // DATASET_PRIORITY			  : 'dataset_priority';

    // CHECK_DATAPOINT			  : 'check_datapoint';
    // CHECK_HIERARCHY			  : 'check_hierarchy';
    // COMPUTED					  : 'computed';
    // NON_NULL					  : 'non_null';
    // NON_ZERO					  : 'non_zero';
    // PARTIAL_NULL				  : 'partial_null';
    // PARTIAL_ZERO				  : 'partial_zero';
    // ALWAYS_NULL				  : 'always_null';
    // ALWAYS_ZERO				  : 'always_zero';
    // COMPONENTS				  : 'components';
    // ALL_MEASURES				  : 'all_measures';
    // SCALAR					  : 'scalar';
    // COMPONENT					  : 'component';
    // DATAPOINT_ON_VD			  : 'datapoint_on_valuedomains';
    // DATAPOINT_ON_VAR			  : 'datapoint_on_variables';
    // HIERARCHICAL_ON_VD		  : 'hierarchical_on_valuedomains';
    // HIERARCHICAL_ON_VAR		  : 'hierarchical_on_variables';
    // SET						  : 'set';
    // LANGUAGE					  : 'language';
  ],

  keywords: [
    "if",
    "then",
    "else",
    "using",
    "with",
    "to", // TO
    "return" // RETURN
    // DEFAULT					  : 'default';
    // IS							            : 'is';
    // WHEN							          : 'when';
    // FROM							          : 'from';
  ],

  booleanOperators: ["and", "or", "xor", "not"],

  functionnalOperators: ["eval"],

  comparisonOperators: ["=", "<", ">", ">=", "<=", "<>"],

  operators: ["+", "-", "*", "/", ":=", "#", "<-", "||", "&&"],

  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*/^%#]+/,

  // C# style strings
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // identifiers and keywords
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            "@keywords": "keyword",
            "@functions": "function",
            "@booleanOperators": "booleanOperator",
            "@functionnalOperators": "functionnalOperator",
            "@default": "identifier"
          }
        }
      ],
      [/[A-Z][\w$]*/, "type.identifier"], // to show class names nicely

      // whitespace
      { include: "@whitespace" },

      // delimiters and operators
      [/[{}()[\]]/, "@brackets"],
      [/[<>](?!@symbols)/, "@brackets"],
      [
        /@symbols/,
        {
          cases: {
            "@operators": "operator",
            "@comparisonOperators": "comparison",
            "@default": ""
          }
        }
      ],

      // @ annotations.
      // As an example, we emit a debugging log message on these tokens.
      // Note: message are supressed during the first load -- change some lines to see them.
      [
        /@\s*[a-zA-Z_$][\w$]*/,
        { token: "annotation", log: "annotation token: $0" }
      ],

      // numbers
      [/\d*\.\d+([eE][-+]?\d+)?/, "number.float"],
      [/0[xX][0-9a-fA-F]+/, "number.hex"],
      [/\d+/, "number"],

      // delimiter: after number because of .\d floats
      [/[;,.]/, "delimiter"],

      // strings
      [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],

      // characters
      [/'[^\\']'/, "string"],
      [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
      [/'/, "string.invalid"]
    ],

    comment: [
      [/[^/*]+/, "comment"],
      [/\/\*/, "comment", "@push"], // nested comment
      ["\\*/", "comment", "@pop"],
      [/[/*]/, "comment"]
    ],

    string: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }]
    ],

    whitespace: [
      [/[ \t\r\n]+/, "white"],
      [/\/\*/, "comment", "@comment"],
      [/\/\/.*$/, "comment"]
    ]
  }
};
