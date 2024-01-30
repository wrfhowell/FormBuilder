lexer grammar FormGeneratorLexer;


// Containers & Separators
OBJECT_START: '{';
OBJECT_END: '}';
LIST_START: '[';
LIST_END: ']';
SEP: ',';
COLON: ':';
PAREN_START: '(';
PAREN_END: ')';
ARROW: '=>';

/** Start Code Generated by Copilot on Jan 30, 2024 */
STRING: '"' (~["\\] | '\\' .)* '"';
NUM: '-'? [0-9]+ ('.' [0-9]+)?;
REGEX: '/' (~[/\\] | '\\' .)* '/';
/** End Code Generated by Copilot on Jan 30, 2024 */

//Object keys
PAGES_KEY: 'pages:';
QUESTIONS_KEY: 'questions:';
ID_KEY: 'id:';
HEADER_KEY: 'header:';
GOTO_KEY: 'goTo:';
IF_KEY: 'if:';
GO_KEY: 'go:';
VARIABLES_KEY: 'vars:';
INSTRUCTIONS_KEY: 'instructions:';
DISPLAY_QUESTIONS_KEY: 'displayQuestions:';
TYPE_KEY: 'type:';
LABEL_KEY: 'label:';
OPTIONS_KEY: 'options:';
DEPENDS_ON_KEY: 'dependsOn:';
DISPLAY_IF_KEY: 'displayIf:';
LOOP_KEY: 'loop:';
IS_REQUIRED_KEY: 'isRequired:';
CORRECT_ANSWER_KEY: 'correctAnswer:';

// Question Types
TEXT_INPUT: 'textInput';
RADIO: 'radio';
CHECKBOX: 'checkbox';
DROPDOWN: 'dropdown';

// Boolean 
TRUE: '1';
FALSE: '0';


// Math Operators
PLUS: '+';
MINUS: '-';
MULTIPLY: '*';
DIVIDE: '/';
MODULO: '%';


WS: [ \t\n\r]+ -> skip;