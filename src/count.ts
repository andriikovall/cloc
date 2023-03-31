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
  const ast = acorn.parse(code, {
    ecmaVersion: 2017,
  });
  let logicalLinesCount = 0;

  const addLogicalLines = (n: number = 1) => (logicalLinesCount += n);
  const addLogicalLine = () => addLogicalLines(1);

  // todo: comment lines as well
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
    // todo: not count expressions inside
    ForStatement: addLogicalLine,
    ForInStatement: addLogicalLine,
    ForOfStatement: addLogicalLine,
    WhileStatement: addLogicalLine,
    DoWhileStatement: addLogicalLine,
  });

  //   walk.simple(ast, {
  //     Program: countNode,
  //     BlockStatement: countNode,
  //     FunctionDeclaration: countNode,
  //     IfStatement: countNode,
  //     SwitchStatement: countNode,
  //     TryStatement: countNode,
  //     ForStatement: countNode,
  //     WhileStatement: countNode,
  //     DoWhileStatement: countNode,
  //     ReturnStatement: countNode,
  //     BreakStatement: countNode,
  //     ContinueStatement: countNode,
  //     ThrowStatement: countNode,
  //     ExpressionStatement: countNode,
  //     EmptyStatement: countNode,
  //   });

  const { total, empty, physical } = countSimpleLines(code);
  return {
    total,
    empty,
    physical,
    logical: logicalLinesCount,
    // todo: this
    comments: {
      number: 0,
      level: 0,
    },
    node: ast,
  };
};
