parser grammar FormGeneratorParser;
options { tokenVocab=FormGeneratorLexer; }

program: OBJECT_START pages (SEP functions)? (SEP variables)?  OBJECT_END EOF;

// Pages Array
pages: PAGES_KEY COLON page_array;
page_array: LIST_START page (SEP page)* LIST_END;
page: OBJECT_START page_fields OBJECT_END;
page_fields: page_field (SEP page_field)*;
page_field: (page_id_field | header_field | instructions_field | goTo_field | questions_field | displayQuestions_field);
page_id_field: ID_KEY COLON STRING;
header_field: HEADER_KEY COLON text_field_value;
instructions_field: INSTRUCTIONS_KEY COLON text_field_value;
questions_field: QUESTIONS_KEY COLON question_array;
goTo_field: GOTO_KEY COLON text_field_value;
displayQuestions_field: DISPLAY_QUESTIONS_KEY COLON (DISPLAY_ALL | NUM);
text_field_value: (STRING | VARIABLE_NAME | function_call);

// Vars object
variables: VARIABLES_KEY COLON variables_object;
variables_object: OBJECT_START (variable (SEP variable)*)? OBJECT_END;
variable: VARIABLE_NAME COLON variable_value;
variable_value: NUM | STRING | boolean | array | form_state_access | function_call;

// Question Array
question_array: LIST_START (question (SEP question)*)? LIST_END;
question: OBJECT_START question_fields OBJECT_END;
question_fields: question_field (SEP question_field)*;
question_field: id_field | type_field | label_field | options_field | dependsOn_field | displayIf_field | loop_field | isRequired_field | correctAnswer_field | variables;
id_field: ID_KEY COLON text_field_value;
type_field: TYPE_KEY COLON question_type;
label_field: LABEL_KEY COLON text_field_value;
options_field: OPTIONS_KEY COLON (VARIABLE_NAME | function_call | array);
dependsOn_field: DEPENDS_ON_KEY COLON STRING;
displayIf_field: DISPLAY_IF_KEY COLON STRING;
loop_field: LOOP_KEY COLON NUM;
isRequired_field: IS_REQUIRED_KEY COLON boolean;
correctAnswer_field: CORRECT_ANSWER_KEY COLON (STRING | NUM | VARIABLE_NAME | function_call);


// Array & object definition
/** Start Code Generated by Copilot on Jan 30, 2024 */
array: LIST_START (array_value (SEP array_value)*)? LIST_END;
array_value: NUM | STRING | VARIABLE_NAME;
/** End Code Generated by Copilot on Jan 30, 2024 */

// Question Types
question_type: TEXT_INPUT | RADIO | CHECKBOX | DROPDOWN;

// Functions
functions: FUNCTIONS_KEY COLON function_array;
function_array: LIST_START (function (SEP function)*)? LIST_END;
function: VARIABLE_NAME function_params function_body;
function_params: PAREN_START (parameter (SEP parameter)*)? PAREN_END;
parameter: STRING | NUM | VARIABLE_NAME | function_call | form_state_access;
function_body: OBJECT_START (statement)* (RETURN returnValue)? OBJECT_END;
statement: expression | conditional | var_assignment;
var_assignment: VARIABLE_NAME ASSIGN returnValue;
returnValue: ( STRING | NUM | VARIABLE_NAME | array | expression | function_call);
function_call: VARIABLE_NAME function_params;

// Conditional Statements
conditional: (if_cond) (else_if_cond)* (else_cond)?;
if_cond: IF_KEY condition cond_body;
else_if_cond: ELSE_KEY IF_KEY condition function_body;
else_cond: ELSE_KEY cond_body;
condition: PAREN_START (VARIABLE_NAME | function_call) PAREN_END;
cond_body: OBJECT_START (statement)* (RETURN returnValueIf)? OBJECT_END;
returnValueIf: returnValue;


// math expressions
/** START Code inspired by Robert Jasobson - Feb 13
    https://www.robertjacobson.dev/the-grammar-of-mathematical-expressions */
expression:	(NUM | VARIABLE_NAME) |	(PAREN_START math_expression PAREN_END);	//parentheses
math_expression: expression (extended_math_expression)+;
extended_math_expression: math_op expression;
math_op: DIVIDE | MULTIPLY | PLUS | MINUS;
/** END Code inspired by Robert Jasobson - Feb 13
    https://www.robertjacobson.dev/the-grammar-of-mathematical-expressions */


// Form State
form_state_access: FORM_STATE_KEY path_to_key; // FormState['pg-1-id'][q-1-id']
path_to_key: LIST_START path_to_page_key LIST_END LIST_START path_to_question_key LIST_END; // ['pg-1-id'][q-1-id']
path_to_page_key: STRING;
path_to_question_key: STRING;

// Misc
boolean: (TRUE | FALSE);
