lexer grammar FormGeneratorLexer;

OBJECT_START: '{';
OBJECT_END: '}';
LIST_START: '[';
LIST_END: ']';
ITEM_SEP: ',';

PAGES_START: 'pages:';
SECTIONS_START: 'sections:';
QUESTIONS_START: 'questions:';

ID_KEY: 'id:';
HEADER_KEY: 'header:';
GOTO_KEY: 'goTo:';
VARS_KEY: 'vars:';
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