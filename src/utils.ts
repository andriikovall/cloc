import acorn from 'acorn';

export const trim = (n: number, from: number, to: number) => {
  return Math.max(from, Math.min(to, n));
};

export const isSelectionStatement = (node: acorn.Node) => {
  return node.type === 'IfStatement' ||
    node.type === 'SwitchStatement' ||
    node.type === 'ConditionalExpression' ||
    node.type === 'TryStatement' ||
    node.type === 'CatchClause';
}

export const isIterationStatement = (node: acorn.Node) => {
  return node.type === 'ForStatement' ||
    node.type === 'ForInStatement' ||
    node.type === 'ForOfStatement' ||
    node.type === 'WhileStatement' ||
    node.type === 'DoWhileStatement';
}

export const isFunction = (node: acorn.Node) => {
  return node.type === 'FunctionDeclaration' ||
    node.type === 'FunctionExpression';
}

export const isNextChar = (code: string, index: number, char: string) => {
  for (let i = index; i < code.length; i++) {
    const currChar = code[i];
    if (currChar === char) {
      return true;
    } 
    const isWhitespace = /\s/.test(currChar);
    if (!isWhitespace) {
      return false;
    }
  }

  return false;
}