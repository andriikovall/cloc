import { isSelectionStatement, isIterationStatement, isFunction, isNextChar, isForInStatement, isForOfStatement, isForStatement, isExportNamedDeclaration } from './utils';
import acorn from 'acorn';
import * as walk from 'acorn-walk';
import { countSimpleLines } from './countSimpleLines';

export const countCodeLines = (
  code: string,
): {
  total: number;
  empty: number;
  physical: number;
  logical: number;
  comments: {
    number: number;
    level: number;
  };
  node: acorn.Node;
} => {
  let commentCharsCount = 0;
  const ast = acorn.parse(code, {
    ecmaVersion: 2017,
    sourceType: 'module',
    onComment(_isBlock, _text, start, end) {
      commentCharsCount += end - start;
    },
  });
  let logicalLinesCount = 0;

  const addLogicalLines = (n: number = 1) => (logicalLinesCount += n);
  const addLogicalLine = () => addLogicalLines(1);

  walk.ancestor(ast, {
    // selection statements
    IfStatement: addLogicalLine,
    SwitchStatement(node) {
      addLogicalLine();
      addLogicalLines((node as any).cases.length);
    },
    ConditionalExpression: addLogicalLine,
    TryStatement: addLogicalLine,
    CatchClause: addLogicalLine,

    // iteration statements
    ForStatement: addLogicalLine,
    ForInStatement: addLogicalLine,
    ForOfStatement: addLogicalLine,
    WhileStatement: addLogicalLine,
    DoWhileStatement: addLogicalLine,
    
    // jump statements
    ReturnStatement: addLogicalLine,
    BreakStatement: addLogicalLine,
    ContinueStatement: addLogicalLine,
    LabeledStatement() {
      // do nothing
    },
    ThrowStatement: addLogicalLine,

    // expression statements
    ExpressionStatement: addLogicalLine,
    EmptyStatement: addLogicalLine,

    // statements in general, other statements are already counted
    DebuggerStatement: addLogicalLine,

    // block statements
    BlockStatement(node, _state, ancestors) {
      const parent = ancestors[ancestors.length - 2];
      const usedWithSelectionStatement = isSelectionStatement(parent);
      const usedWithIterationStatement = isIterationStatement(parent);
      const usedWithFunction = isFunction(parent);
      const isFollowedWithSemicolon = isNextChar(code, node.end, ';');
      
      if (usedWithSelectionStatement || usedWithIterationStatement || usedWithFunction || isFollowedWithSemicolon) {
        return;
      }
      addLogicalLine();
    },

    // data declarations
    VariableDeclaration(node, _, ancestors) {
      const parent = ancestors[ancestors.length - 2];
      if (isForInStatement(parent) || isForOfStatement(parent) || isForStatement(parent) || isExportNamedDeclaration(parent)) {
        return;
      }
      addLogicalLine();
    },
    FunctionDeclaration: addLogicalLine,
    // yeah, this should not be count but I think it's ok
    ClassDeclaration: addLogicalLine,
    ExportAllDeclaration: addLogicalLine,
    ExportDefaultDeclaration: addLogicalLine,
    ExportNamedDeclaration: addLogicalLine,
    ImportDeclaration: addLogicalLine,
  });

  const { total, empty, physical } = countSimpleLines(code);
  const levelOfComments = commentCharsCount / ast.end;
  
  // an approximation of number of comment lines
  const numberOfCommentsLines = Math.round(levelOfComments * total);
  return {
    total,
    empty,
    physical,
    logical: logicalLinesCount,
    comments: {
      number: numberOfCommentsLines,
      level: levelOfComments,
    },
    node: ast,
  };
};
