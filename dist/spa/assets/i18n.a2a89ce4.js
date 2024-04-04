import { d as defineComponent, h, e as effectScope, i as inject, o as onMounted, a as onUnmounted, r as ref, c as computed, w as watch, F as Fragment, g as getCurrentInstance, b as isRef, s as setupDevtoolsPlugin, f as createVNode, T as Text, j as boot } from "./index.f08ad2f1.js";
/*!
  * shared v9.3.0
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const inBrowser = typeof window !== "undefined";
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
const assign$1 = Object.assign;
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function escapeHtml(rawText) {
  return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject$1 = (val) => val !== null && typeof val === "object";
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => {
  if (!isObject$1(val))
    return false;
  const proto = Object.getPrototypeOf(val);
  return proto === null || proto.constructor === Object;
};
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function join$1(items, separator = "") {
  return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
}
function incrementer(code2) {
  let current = code2;
  return () => ++current;
}
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
function createEmitter() {
  const events = /* @__PURE__ */ new Map();
  const emitter = {
    events,
    on(event, handler) {
      const handlers = events.get(event);
      const added = handlers && handlers.push(handler);
      if (!added) {
        events.set(event, [handler]);
      }
    },
    off(event, handler) {
      const handlers = events.get(event);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    emit(event, payload) {
      (events.get(event) || []).slice().map((handler) => handler(payload));
      (events.get("*") || []).slice().map((handler) => handler(event, payload));
    }
  };
  return emitter;
}
/*!
  * message-compiler v9.3.0
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
function createPosition(line, column, offset) {
  return { line, column, offset };
}
function createLocation(start, end, source) {
  const loc = { start, end };
  if (source != null) {
    loc.source = source;
  }
  return loc;
}
const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
function format$1(message, ...args) {
  if (args.length === 1 && isObject(args[0])) {
    args = args[0];
  }
  if (!args || !args.hasOwnProperty) {
    args = {};
  }
  return message.replace(RE_ARGS, (match, identifier) => {
    return args.hasOwnProperty(identifier) ? args[identifier] : "";
  });
}
const assign = Object.assign;
const isString = (val) => typeof val === "string";
const isObject = (val) => val !== null && typeof val === "object";
function join(items, separator = "") {
  return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
}
const CompileErrorCodes = {
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  UNHANDLED_MINIFIER_NODE_TYPE: 16,
  __EXTEND_POINT__: 17
};
const errorMessages = {
  [CompileErrorCodes.EXPECTED_TOKEN]: `Expected token: '{0}'`,
  [CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER]: `Invalid token in placeholder: '{0}'`,
  [CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: `Unterminated single quote in placeholder`,
  [CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE]: `Unknown escape sequence: \\{0}`,
  [CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE]: `Invalid unicode escape sequence: {0}`,
  [CompileErrorCodes.UNBALANCED_CLOSING_BRACE]: `Unbalanced closing brace`,
  [CompileErrorCodes.UNTERMINATED_CLOSING_BRACE]: `Unterminated closing brace`,
  [CompileErrorCodes.EMPTY_PLACEHOLDER]: `Empty placeholder`,
  [CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER]: `Not allowed nest placeholder`,
  [CompileErrorCodes.INVALID_LINKED_FORMAT]: `Invalid linked format`,
  [CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL]: `Plural must have messages`,
  [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER]: `Unexpected empty linked modifier`,
  [CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY]: `Unexpected empty linked key`,
  [CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS]: `Unexpected lexical analysis in token: '{0}'`,
  [CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE]: `unhandled codegen node type: '{0}'`,
  [CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE]: `unhandled mimifier node type: '{0}'`
};
function createCompileError(code2, loc, options = {}) {
  const { domain, messages: messages2, args } = options;
  const msg = format$1((messages2 || errorMessages)[code2] || "", ...args || []);
  const error = new SyntaxError(String(msg));
  error.code = code2;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
function defaultOnError(error) {
  throw error;
}
const CHAR_SP = " ";
const CHAR_CR = "\r";
const CHAR_LF = "\n";
const CHAR_LS = String.fromCharCode(8232);
const CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
  const _buf = str;
  let _index = 0;
  let _line = 1;
  let _column = 1;
  let _peekOffset = 0;
  const isCRLF = (index2) => _buf[index2] === CHAR_CR && _buf[index2 + 1] === CHAR_LF;
  const isLF = (index2) => _buf[index2] === CHAR_LF;
  const isPS = (index2) => _buf[index2] === CHAR_PS;
  const isLS = (index2) => _buf[index2] === CHAR_LS;
  const isLineEnd = (index2) => isCRLF(index2) || isLF(index2) || isPS(index2) || isLS(index2);
  const index = () => _index;
  const line = () => _line;
  const column = () => _column;
  const peekOffset = () => _peekOffset;
  const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
  const currentChar = () => charAt(_index);
  const currentPeek = () => charAt(_index + _peekOffset);
  function next() {
    _peekOffset = 0;
    if (isLineEnd(_index)) {
      _line++;
      _column = 0;
    }
    if (isCRLF(_index)) {
      _index++;
    }
    _index++;
    _column++;
    return _buf[_index];
  }
  function peek() {
    if (isCRLF(_index + _peekOffset)) {
      _peekOffset++;
    }
    _peekOffset++;
    return _buf[_index + _peekOffset];
  }
  function reset() {
    _index = 0;
    _line = 1;
    _column = 1;
    _peekOffset = 0;
  }
  function resetPeek(offset = 0) {
    _peekOffset = offset;
  }
  function skipToPeek() {
    const target = _index + _peekOffset;
    while (target !== _index) {
      next();
    }
    _peekOffset = 0;
  }
  return {
    index,
    line,
    column,
    peekOffset,
    charAt,
    currentChar,
    currentPeek,
    next,
    peek,
    reset,
    resetPeek,
    skipToPeek
  };
}
const EOF = void 0;
const DOT = ".";
const LITERAL_DELIMITER = "'";
const ERROR_DOMAIN$3 = "tokenizer";
function createTokenizer(source, options = {}) {
  const location = options.location !== false;
  const _scnr = createScanner(source);
  const currentOffset = () => _scnr.index();
  const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
  const _initLoc = currentPosition();
  const _initOffset = currentOffset();
  const _context = {
    currentType: 14,
    offset: _initOffset,
    startLoc: _initLoc,
    endLoc: _initLoc,
    lastType: 14,
    lastOffset: _initOffset,
    lastStartLoc: _initLoc,
    lastEndLoc: _initLoc,
    braceNest: 0,
    inLinked: false,
    text: ""
  };
  const context = () => _context;
  const { onError } = options;
  function emitError(code2, pos, offset, ...args) {
    const ctx = context();
    pos.column += offset;
    pos.offset += offset;
    if (onError) {
      const loc = location ? createLocation(ctx.startLoc, pos) : null;
      const err = createCompileError(code2, loc, {
        domain: ERROR_DOMAIN$3,
        args
      });
      onError(err);
    }
  }
  function getToken(context2, type, value) {
    context2.endLoc = currentPosition();
    context2.currentType = type;
    const token = { type };
    if (location) {
      token.loc = createLocation(context2.startLoc, context2.endLoc);
    }
    if (value != null) {
      token.value = value;
    }
    return token;
  }
  const getEndToken = (context2) => getToken(context2, 14);
  function eat(scnr, ch) {
    if (scnr.currentChar() === ch) {
      scnr.next();
      return ch;
    } else {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
      return "";
    }
  }
  function peekSpaces(scnr) {
    let buf = "";
    while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
      buf += scnr.currentPeek();
      scnr.peek();
    }
    return buf;
  }
  function skipSpaces(scnr) {
    const buf = peekSpaces(scnr);
    scnr.skipToPeek();
    return buf;
  }
  function isIdentifierStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc === 95;
  }
  function isNumberStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function isNamedIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isListIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek();
    const ret = isNumberStart(ch);
    scnr.resetPeek();
    return ret;
  }
  function isLiteralStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === LITERAL_DELIMITER;
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDotStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 8) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ".";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedModifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 9) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDelimiterStart(scnr, context2) {
    const { currentType } = context2;
    if (!(currentType === 8 || currentType === 12)) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ":";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedReferStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 10) {
      return false;
    }
    const fn = () => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return isIdentifierStart(scnr.peek());
      } else if (ch === "@" || ch === "%" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) {
        return false;
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn();
      } else {
        return isIdentifierStart(ch);
      }
    };
    const ret = fn();
    scnr.resetPeek();
    return ret;
  }
  function isPluralStart(scnr) {
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === "|";
    scnr.resetPeek();
    return ret;
  }
  function detectModuloStart(scnr) {
    const spaces = peekSpaces(scnr);
    const ret = scnr.currentPeek() === "%" && scnr.peek() === "{";
    scnr.resetPeek();
    return {
      isModulo: ret,
      hasSpace: spaces.length > 0
    };
  }
  function isTextStart(scnr, reset = true) {
    const fn = (hasSpace = false, prev = "", detectModulo = false) => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return prev === "%" ? false : hasSpace;
      } else if (ch === "@" || !ch) {
        return prev === "%" ? true : hasSpace;
      } else if (ch === "%") {
        scnr.peek();
        return fn(hasSpace, "%", true);
      } else if (ch === "|") {
        return prev === "%" || detectModulo ? true : !(prev === CHAR_SP || prev === CHAR_LF);
      } else if (ch === CHAR_SP) {
        scnr.peek();
        return fn(true, CHAR_SP, detectModulo);
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn(true, CHAR_LF, detectModulo);
      } else {
        return true;
      }
    };
    const ret = fn();
    reset && scnr.resetPeek();
    return ret;
  }
  function takeChar(scnr, fn) {
    const ch = scnr.currentChar();
    if (ch === EOF) {
      return EOF;
    }
    if (fn(ch)) {
      scnr.next();
      return ch;
    }
    return null;
  }
  function takeIdentifierChar(scnr) {
    const closure = (ch) => {
      const cc = ch.charCodeAt(0);
      return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || cc === 95 || cc === 36;
    };
    return takeChar(scnr, closure);
  }
  function takeDigit(scnr) {
    const closure = (ch) => {
      const cc = ch.charCodeAt(0);
      return cc >= 48 && cc <= 57;
    };
    return takeChar(scnr, closure);
  }
  function takeHexDigit(scnr) {
    const closure = (ch) => {
      const cc = ch.charCodeAt(0);
      return cc >= 48 && cc <= 57 || cc >= 65 && cc <= 70 || cc >= 97 && cc <= 102;
    };
    return takeChar(scnr, closure);
  }
  function getDigits(scnr) {
    let ch = "";
    let num = "";
    while (ch = takeDigit(scnr)) {
      num += ch;
    }
    return num;
  }
  function readModulo(scnr) {
    skipSpaces(scnr);
    const ch = scnr.currentChar();
    if (ch !== "%") {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
    }
    scnr.next();
    return "%";
  }
  function readText(scnr) {
    let buf = "";
    while (true) {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) {
        break;
      } else if (ch === "%") {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else {
          break;
        }
      } else if (ch === CHAR_SP || ch === CHAR_LF) {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else if (isPluralStart(scnr)) {
          break;
        } else {
          buf += ch;
          scnr.next();
        }
      } else {
        buf += ch;
        scnr.next();
      }
    }
    return buf;
  }
  function readNamedIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let name = "";
    while (ch = takeIdentifierChar(scnr)) {
      name += ch;
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return name;
  }
  function readListIdentifier(scnr) {
    skipSpaces(scnr);
    let value = "";
    if (scnr.currentChar() === "-") {
      scnr.next();
      value += `-${getDigits(scnr)}`;
    } else {
      value += getDigits(scnr);
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return value;
  }
  function readLiteral(scnr) {
    skipSpaces(scnr);
    eat(scnr, `'`);
    let ch = "";
    let literal = "";
    const fn = (x) => x !== LITERAL_DELIMITER && x !== CHAR_LF;
    while (ch = takeChar(scnr, fn)) {
      if (ch === "\\") {
        literal += readEscapeSequence(scnr);
      } else {
        literal += ch;
      }
    }
    const current = scnr.currentChar();
    if (current === CHAR_LF || current === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
      if (current === CHAR_LF) {
        scnr.next();
        eat(scnr, `'`);
      }
      return literal;
    }
    eat(scnr, `'`);
    return literal;
  }
  function readEscapeSequence(scnr) {
    const ch = scnr.currentChar();
    switch (ch) {
      case "\\":
      case `'`:
        scnr.next();
        return `\\${ch}`;
      case "u":
        return readUnicodeEscapeSequence(scnr, ch, 4);
      case "U":
        return readUnicodeEscapeSequence(scnr, ch, 6);
      default:
        emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
        return "";
    }
  }
  function readUnicodeEscapeSequence(scnr, unicode, digits) {
    eat(scnr, unicode);
    let sequence = "";
    for (let i = 0; i < digits; i++) {
      const ch = takeHexDigit(scnr);
      if (!ch) {
        emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
        break;
      }
      sequence += ch;
    }
    return `\\${unicode}${sequence}`;
  }
  function readInvalidIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let identifiers = "";
    const closure = (ch2) => ch2 !== "{" && ch2 !== "}" && ch2 !== CHAR_SP && ch2 !== CHAR_LF;
    while (ch = takeChar(scnr, closure)) {
      identifiers += ch;
    }
    return identifiers;
  }
  function readLinkedModifier(scnr) {
    let ch = "";
    let name = "";
    while (ch = takeIdentifierChar(scnr)) {
      name += ch;
    }
    return name;
  }
  function readLinkedRefer(scnr) {
    const fn = (detect = false, buf) => {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "%" || ch === "@" || ch === "|" || !ch) {
        return buf;
      } else if (ch === CHAR_SP) {
        return buf;
      } else if (ch === CHAR_LF || ch === DOT) {
        buf += ch;
        scnr.next();
        return fn(detect, buf);
      } else if (!isIdentifierStart(ch)) {
        return buf;
      } else {
        buf += ch;
        scnr.next();
        return fn(true, buf);
      }
    };
    return fn(false, "");
  }
  function readPlural(scnr) {
    skipSpaces(scnr);
    const plural = eat(scnr, "|");
    skipSpaces(scnr);
    return plural;
  }
  function readTokenInPlaceholder(scnr, context2) {
    let token = null;
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        if (context2.braceNest >= 1) {
          emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(context2, 2, "{");
        skipSpaces(scnr);
        context2.braceNest++;
        return token;
      case "}":
        if (context2.braceNest > 0 && context2.currentType === 2) {
          emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(context2, 3, "}");
        context2.braceNest--;
        context2.braceNest > 0 && skipSpaces(scnr);
        if (context2.inLinked && context2.braceNest === 0) {
          context2.inLinked = false;
        }
        return token;
      case "@":
        if (context2.braceNest > 0) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
        }
        token = readTokenInLinked(scnr, context2) || getEndToken(context2);
        context2.braceNest = 0;
        return token;
      default:
        let validNamedIdentifier = true;
        let validListIdentifier = true;
        let validLiteral = true;
        if (isPluralStart(scnr)) {
          if (context2.braceNest > 0) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (context2.braceNest > 0 && (context2.currentType === 5 || context2.currentType === 6 || context2.currentType === 7)) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          context2.braceNest = 0;
          return readToken(scnr, context2);
        }
        if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) {
          token = getToken(context2, 5, readNamedIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validListIdentifier = isListIdentifierStart(scnr, context2)) {
          token = getToken(context2, 6, readListIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validLiteral = isLiteralStart(scnr, context2)) {
          token = getToken(context2, 7, readLiteral(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
          token = getToken(context2, 13, readInvalidIdentifier(scnr));
          emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
          skipSpaces(scnr);
          return token;
        }
        break;
    }
    return token;
  }
  function readTokenInLinked(scnr, context2) {
    const { currentType } = context2;
    let token = null;
    const ch = scnr.currentChar();
    if ((currentType === 8 || currentType === 9 || currentType === 12 || currentType === 10) && (ch === CHAR_LF || ch === CHAR_SP)) {
      emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
    }
    switch (ch) {
      case "@":
        scnr.next();
        token = getToken(context2, 8, "@");
        context2.inLinked = true;
        return token;
      case ".":
        skipSpaces(scnr);
        scnr.next();
        return getToken(context2, 9, ".");
      case ":":
        skipSpaces(scnr);
        scnr.next();
        return getToken(context2, 10, ":");
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2)) {
          skipSpaces(scnr);
          return readTokenInLinked(scnr, context2);
        }
        if (isLinkedModifierStart(scnr, context2)) {
          skipSpaces(scnr);
          return getToken(context2, 12, readLinkedModifier(scnr));
        }
        if (isLinkedReferStart(scnr, context2)) {
          skipSpaces(scnr);
          if (ch === "{") {
            return readTokenInPlaceholder(scnr, context2) || token;
          } else {
            return getToken(context2, 11, readLinkedRefer(scnr));
          }
        }
        if (currentType === 8) {
          emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
        }
        context2.braceNest = 0;
        context2.inLinked = false;
        return readToken(scnr, context2);
    }
  }
  function readToken(scnr, context2) {
    let token = { type: 14 };
    if (context2.braceNest > 0) {
      return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
    }
    if (context2.inLinked) {
      return readTokenInLinked(scnr, context2) || getEndToken(context2);
    }
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
      case "}":
        emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
        scnr.next();
        return getToken(context2, 3, "}");
      case "@":
        return readTokenInLinked(scnr, context2) || getEndToken(context2);
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        const { isModulo, hasSpace } = detectModuloStart(scnr);
        if (isModulo) {
          return hasSpace ? getToken(context2, 0, readText(scnr)) : getToken(context2, 4, readModulo(scnr));
        }
        if (isTextStart(scnr)) {
          return getToken(context2, 0, readText(scnr));
        }
        break;
    }
    return token;
  }
  function nextToken() {
    const { currentType, offset, startLoc, endLoc } = _context;
    _context.lastType = currentType;
    _context.lastOffset = offset;
    _context.lastStartLoc = startLoc;
    _context.lastEndLoc = endLoc;
    _context.offset = currentOffset();
    _context.startLoc = currentPosition();
    if (_scnr.currentChar() === EOF) {
      return getToken(_context, 14);
    }
    return readToken(_scnr, _context);
  }
  return {
    nextToken,
    currentOffset,
    currentPosition,
    context
  };
}
const ERROR_DOMAIN$2 = "parser";
const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function fromEscapeSequence(match, codePoint4, codePoint6) {
  switch (match) {
    case `\\\\`:
      return `\\`;
    case `\\'`:
      return `'`;
    default: {
      const codePoint = parseInt(codePoint4 || codePoint6, 16);
      if (codePoint <= 55295 || codePoint >= 57344) {
        return String.fromCodePoint(codePoint);
      }
      return "\uFFFD";
    }
  }
}
function createParser(options = {}) {
  const location = options.location !== false;
  const { onError } = options;
  function emitError(tokenzer, code2, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onError) {
      const loc = location ? createLocation(start, end) : null;
      const err = createCompileError(code2, loc, {
        domain: ERROR_DOMAIN$2,
        args
      });
      onError(err);
    }
  }
  function startNode(type, offset, loc) {
    const node = { type };
    if (location) {
      node.start = offset;
      node.end = offset;
      node.loc = { start: loc, end: loc };
    }
    return node;
  }
  function endNode(node, offset, pos, type) {
    if (type) {
      node.type = type;
    }
    if (location) {
      node.end = offset;
      if (node.loc) {
        node.loc.end = pos;
      }
    }
  }
  function parseText(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(3, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseList(tokenizer, index) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(5, offset, loc);
    node.index = parseInt(index, 10);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseNamed(tokenizer, key) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(4, offset, loc);
    node.key = key;
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLiteral(tokenizer, value) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(9, offset, loc);
    node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinkedModifier(tokenizer) {
    const token = tokenizer.nextToken();
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(8, offset, loc);
    if (token.type !== 12) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
      node.value = "";
      endNode(node, offset, loc);
      return {
        nextConsumeToken: token,
        node
      };
    }
    if (token.value == null) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    node.value = token.value || "";
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node
    };
  }
  function parseLinkedKey(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(7, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinked(tokenizer) {
    const context = tokenizer.context();
    const linkedNode = startNode(6, context.offset, context.startLoc);
    let token = tokenizer.nextToken();
    if (token.type === 9) {
      const parsed = parseLinkedModifier(tokenizer);
      linkedNode.modifier = parsed.node;
      token = parsed.nextConsumeToken || tokenizer.nextToken();
    }
    if (token.type !== 10) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    token = tokenizer.nextToken();
    if (token.type === 2) {
      token = tokenizer.nextToken();
    }
    switch (token.type) {
      case 11:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
        break;
      case 5:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseNamed(tokenizer, token.value || "");
        break;
      case 6:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseList(tokenizer, token.value || "");
        break;
      case 7:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLiteral(tokenizer, token.value || "");
        break;
      default:
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
        const nextContext = tokenizer.context();
        const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
        emptyLinkedKeyNode.value = "";
        endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
        linkedNode.key = emptyLinkedKeyNode;
        endNode(linkedNode, nextContext.offset, nextContext.startLoc);
        return {
          nextConsumeToken: token,
          node: linkedNode
        };
    }
    endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node: linkedNode
    };
  }
  function parseMessage(tokenizer) {
    const context = tokenizer.context();
    const startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset;
    const startLoc = context.currentType === 1 ? context.endLoc : context.startLoc;
    const node = startNode(2, startOffset, startLoc);
    node.items = [];
    let nextToken = null;
    do {
      const token = nextToken || tokenizer.nextToken();
      nextToken = null;
      switch (token.type) {
        case 0:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseText(tokenizer, token.value || ""));
          break;
        case 6:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseList(tokenizer, token.value || ""));
          break;
        case 5:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseNamed(tokenizer, token.value || ""));
          break;
        case 7:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseLiteral(tokenizer, token.value || ""));
          break;
        case 8:
          const parsed = parseLinked(tokenizer);
          node.items.push(parsed.node);
          nextToken = parsed.nextConsumeToken || null;
          break;
      }
    } while (context.currentType !== 14 && context.currentType !== 1);
    const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset();
    const endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
    endNode(node, endOffset, endLoc);
    return node;
  }
  function parsePlural(tokenizer, offset, loc, msgNode) {
    const context = tokenizer.context();
    let hasEmptyMessage = msgNode.items.length === 0;
    const node = startNode(1, offset, loc);
    node.cases = [];
    node.cases.push(msgNode);
    do {
      const msg = parseMessage(tokenizer);
      if (!hasEmptyMessage) {
        hasEmptyMessage = msg.items.length === 0;
      }
      node.cases.push(msg);
    } while (context.currentType !== 14);
    if (hasEmptyMessage) {
      emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseResource(tokenizer) {
    const context = tokenizer.context();
    const { offset, startLoc } = context;
    const msgNode = parseMessage(tokenizer);
    if (context.currentType === 14) {
      return msgNode;
    } else {
      return parsePlural(tokenizer, offset, startLoc, msgNode);
    }
  }
  function parse2(source) {
    const tokenizer = createTokenizer(source, assign({}, options));
    const context = tokenizer.context();
    const node = startNode(0, context.offset, context.startLoc);
    if (location && node.loc) {
      node.loc.source = source;
    }
    node.body = parseResource(tokenizer);
    if (options.onCacheKey) {
      node.cacheKey = options.onCacheKey(source);
    }
    if (context.currentType !== 14) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  return { parse: parse2 };
}
function getTokenCaption(token) {
  if (token.type === 14) {
    return "EOF";
  }
  const name = (token.value || "").replace(/\r?\n/gu, "\\n");
  return name.length > 10 ? name.slice(0, 9) + "\u2026" : name;
}
function createTransformer(ast, options = {}) {
  const _context = {
    ast,
    helpers: /* @__PURE__ */ new Set()
  };
  const context = () => _context;
  const helper = (name) => {
    _context.helpers.add(name);
    return name;
  };
  return { context, helper };
}
function traverseNodes(nodes, transformer) {
  for (let i = 0; i < nodes.length; i++) {
    traverseNode(nodes[i], transformer);
  }
}
function traverseNode(node, transformer) {
  switch (node.type) {
    case 1:
      traverseNodes(node.cases, transformer);
      transformer.helper("plural");
      break;
    case 2:
      traverseNodes(node.items, transformer);
      break;
    case 6:
      const linked = node;
      traverseNode(linked.key, transformer);
      transformer.helper("linked");
      transformer.helper("type");
      break;
    case 5:
      transformer.helper("interpolate");
      transformer.helper("list");
      break;
    case 4:
      transformer.helper("interpolate");
      transformer.helper("named");
      break;
  }
}
function transform(ast, options = {}) {
  const transformer = createTransformer(ast);
  transformer.helper("normalize");
  ast.body && traverseNode(ast.body, transformer);
  const context = transformer.context();
  ast.helpers = Array.from(context.helpers);
}
function optimize(ast) {
  const body = ast.body;
  if (body.type === 2) {
    optimizeMessageNode(body);
  } else {
    body.cases.forEach((c) => optimizeMessageNode(c));
  }
  return ast;
}
function optimizeMessageNode(message) {
  if (message.items.length === 1) {
    const item = message.items[0];
    if (item.type === 3 || item.type === 9) {
      message.static = item.value;
      delete item.value;
    }
  } else {
    const values = [];
    for (let i = 0; i < message.items.length; i++) {
      const item = message.items[i];
      if (!(item.type === 3 || item.type === 9)) {
        break;
      }
      if (item.value == null) {
        break;
      }
      values.push(item.value);
    }
    if (values.length === message.items.length) {
      message.static = join(values);
      for (let i = 0; i < message.items.length; i++) {
        const item = message.items[i];
        if (item.type === 3 || item.type === 9) {
          delete item.value;
        }
      }
    }
  }
}
const ERROR_DOMAIN$1 = "minifier";
function minify(node) {
  node.t = node.type;
  switch (node.type) {
    case 0:
      const resource = node;
      minify(resource.body);
      resource.b = resource.body;
      delete resource.body;
      break;
    case 1:
      const plural = node;
      const cases = plural.cases;
      for (let i = 0; i < cases.length; i++) {
        minify(cases[i]);
      }
      plural.c = cases;
      delete plural.cases;
      break;
    case 2:
      const message = node;
      const items = message.items;
      for (let i = 0; i < items.length; i++) {
        minify(items[i]);
      }
      message.i = items;
      delete message.items;
      if (message.static) {
        message.s = message.static;
        delete message.static;
      }
      break;
    case 3:
    case 9:
    case 8:
    case 7:
      const valueNode = node;
      if (valueNode.value) {
        valueNode.v = valueNode.value;
        delete valueNode.value;
      }
      break;
    case 6:
      const linked = node;
      minify(linked.key);
      linked.k = linked.key;
      delete linked.key;
      if (linked.modifier) {
        minify(linked.modifier);
        linked.m = linked.modifier;
        delete linked.modifier;
      }
      break;
    case 5:
      const list = node;
      list.i = list.index;
      delete list.index;
      break;
    case 4:
      const named = node;
      named.k = named.key;
      delete named.key;
      break;
    default: {
      throw createCompileError(CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE, null, {
        domain: ERROR_DOMAIN$1,
        args: [node.type]
      });
    }
  }
  delete node.type;
}
const ERROR_DOMAIN = "parser";
function createCodeGenerator(ast, options) {
  const { sourceMap, filename, breakLineCode, needIndent: _needIndent } = options;
  const location = options.location !== false;
  const _context = {
    filename,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode,
    needIndent: _needIndent,
    indentLevel: 0
  };
  if (location && ast.loc) {
    _context.source = ast.loc.source;
  }
  const context = () => _context;
  function push(code2, node) {
    _context.code += code2;
  }
  function _newline(n, withBreakLine = true) {
    const _breakLineCode = withBreakLine ? breakLineCode : "";
    push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
  }
  function indent(withNewLine = true) {
    const level = ++_context.indentLevel;
    withNewLine && _newline(level);
  }
  function deindent(withNewLine = true) {
    const level = --_context.indentLevel;
    withNewLine && _newline(level);
  }
  function newline() {
    _newline(_context.indentLevel);
  }
  const helper = (key) => `_${key}`;
  const needIndent = () => _context.needIndent;
  return {
    context,
    push,
    indent,
    deindent,
    newline,
    helper,
    needIndent
  };
}
function generateLinkedNode(generator, node) {
  const { helper } = generator;
  generator.push(`${helper("linked")}(`);
  generateNode(generator, node.key);
  if (node.modifier) {
    generator.push(`, `);
    generateNode(generator, node.modifier);
    generator.push(`, _type`);
  } else {
    generator.push(`, undefined, _type`);
  }
  generator.push(`)`);
}
function generateMessageNode(generator, node) {
  const { helper, needIndent } = generator;
  generator.push(`${helper("normalize")}([`);
  generator.indent(needIndent());
  const length = node.items.length;
  for (let i = 0; i < length; i++) {
    generateNode(generator, node.items[i]);
    if (i === length - 1) {
      break;
    }
    generator.push(", ");
  }
  generator.deindent(needIndent());
  generator.push("])");
}
function generatePluralNode(generator, node) {
  const { helper, needIndent } = generator;
  if (node.cases.length > 1) {
    generator.push(`${helper("plural")}([`);
    generator.indent(needIndent());
    const length = node.cases.length;
    for (let i = 0; i < length; i++) {
      generateNode(generator, node.cases[i]);
      if (i === length - 1) {
        break;
      }
      generator.push(", ");
    }
    generator.deindent(needIndent());
    generator.push(`])`);
  }
}
function generateResource(generator, node) {
  if (node.body) {
    generateNode(generator, node.body);
  } else {
    generator.push("null");
  }
}
function generateNode(generator, node) {
  const { helper } = generator;
  switch (node.type) {
    case 0:
      generateResource(generator, node);
      break;
    case 1:
      generatePluralNode(generator, node);
      break;
    case 2:
      generateMessageNode(generator, node);
      break;
    case 6:
      generateLinkedNode(generator, node);
      break;
    case 8:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 7:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 5:
      generator.push(`${helper("interpolate")}(${helper("list")}(${node.index}))`, node);
      break;
    case 4:
      generator.push(`${helper("interpolate")}(${helper("named")}(${JSON.stringify(node.key)}))`, node);
      break;
    case 9:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 3:
      generator.push(JSON.stringify(node.value), node);
      break;
    default: {
      throw createCompileError(CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE, null, {
        domain: ERROR_DOMAIN,
        args: [node.type]
      });
    }
  }
}
const generate = (ast, options = {}) => {
  const mode = isString(options.mode) ? options.mode : "normal";
  const filename = isString(options.filename) ? options.filename : "message.intl";
  const sourceMap = !!options.sourceMap;
  const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
  const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
  const helpers = ast.helpers || [];
  const generator = createCodeGenerator(ast, {
    mode,
    filename,
    sourceMap,
    breakLineCode,
    needIndent
  });
  generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
  generator.indent(needIndent);
  if (helpers.length > 0) {
    generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`);
    generator.newline();
  }
  generator.push(`return `);
  generateNode(generator, ast);
  generator.deindent(needIndent);
  generator.push(`}`);
  delete ast.helpers;
  const { code: code2, map } = generator.context();
  return {
    ast,
    code: code2,
    map: map ? map.toJSON() : void 0
  };
};
function baseCompile$1(source, options = {}) {
  const assignedOptions = assign({}, options);
  const jit = !!assignedOptions.jit;
  const enalbeMinify = !!assignedOptions.minify;
  const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
  const parser = createParser(assignedOptions);
  const ast = parser.parse(source);
  if (!jit) {
    transform(ast, assignedOptions);
    return generate(ast, assignedOptions);
  } else {
    enambeOptimize && optimize(ast);
    enalbeMinify && minify(ast);
    return { ast, code: "" };
  }
}
/*!
  * devtools-if v9.3.0
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const IntlifyDevToolsHooks = {
  I18nInit: "i18n:init",
  FunctionTranslate: "function:translate"
};
/*!
  * core-base v9.3.0
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
function initFeatureFlags$1() {
  if (typeof __INTLIFY_JIT_COMPILATION__ !== "boolean") {
    getGlobalThis().__INTLIFY_JIT_COMPILATION__ = false;
  }
  if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== "boolean") {
    getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
  }
}
const pathStateMachine = [];
pathStateMachine[0] = {
  ["w"]: [0],
  ["i"]: [3, 0],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[1] = {
  ["w"]: [1],
  ["."]: [2],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[2] = {
  ["w"]: [2],
  ["i"]: [3, 0],
  ["0"]: [3, 0]
};
pathStateMachine[3] = {
  ["i"]: [3, 0],
  ["0"]: [3, 0],
  ["w"]: [1, 1],
  ["."]: [2, 1],
  ["["]: [4, 1],
  ["o"]: [7, 1]
};
pathStateMachine[4] = {
  ["'"]: [5, 0],
  ['"']: [6, 0],
  ["["]: [
    4,
    2
  ],
  ["]"]: [1, 3],
  ["o"]: 8,
  ["l"]: [4, 0]
};
pathStateMachine[5] = {
  ["'"]: [4, 0],
  ["o"]: 8,
  ["l"]: [5, 0]
};
pathStateMachine[6] = {
  ['"']: [4, 0],
  ["o"]: 8,
  ["l"]: [6, 0]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code2 = ch.charCodeAt(0);
  switch (code2) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return ch;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys = [];
  let index = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[0] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[1] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[2] = () => {
    actions[0]();
    subPathDepth++;
  };
  actions[3] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[0]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[1]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index++;
      newChar = "\\" + nextChar;
      actions[0]();
      return true;
    }
  }
  while (mode !== null) {
    index++;
    c = path[index];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap["l"] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject$1(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject$1(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const val = last[hit[i]];
    if (val === void 0) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join$1(values);
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject$1(options.pluralRules) && isString$1(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject$1(options.pluralRules) && isString$1(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages2) => {
    return messages2[pluralRule(pluralIndex, messages2.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index) => _list[index];
  const _named = options.named || {};
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key) {
    const msg = isFunction(options.messages) ? options.messages(key) : isObject$1(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString$1(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject$1(arg1)) {
        modifier = arg1.modifier || modifier;
        type2 = arg1.type || type2;
      } else if (isString$1(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString$1(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString$1(arg2)) {
        type2 = arg2 || type2;
      }
    }
    const ret = message(key)(ctx);
    const msg = type2 === "vnode" && isArray(ret) && modifier ? ret[0] : ret;
    return modifier ? _modifier(modifier)(msg, type2) : msg;
  };
  const ctx = {
    ["list"]: list,
    ["named"]: named,
    ["plural"]: plural,
    ["linked"]: linked,
    ["message"]: message,
    ["type"]: type,
    ["interpolate"]: interpolate,
    ["normalize"]: normalize,
    ["values"]: assign$1({}, _list, _named)
  };
  return ctx;
}
let devtools = null;
function setDevToolsHook(hook) {
  devtools = hook;
}
function initI18nDevTools(i18n2, version, meta) {
  devtools && devtools.emit(IntlifyDevToolsHooks.I18nInit, {
    timestamp: Date.now(),
    i18n: i18n2,
    version,
    meta
  });
}
const translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
function createDevToolsHook(hook) {
  return (payloads) => devtools && devtools.emit(hook, payloads);
}
const CoreWarnCodes = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
  __EXTEND_POINT__: 8
};
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray(fallback) ? fallback : isObject$1(fallback) ? Object.keys(fallback) : isString$1(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString$1(start) ? start : DEFAULT_LOCALE;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString$1(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString$1(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
const VERSION$1 = "9.3.0";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString$1(val) ? val.toUpperCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString$1(val) ? val.toLowerCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString$1(val) ? capitalize(val) : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
    }
  };
}
let _compiler;
function registerMessageCompiler(compiler) {
  _compiler = compiler;
}
let _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
let _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
let _additionalMeta = null;
const setAdditionalMeta = (meta) => {
  _additionalMeta = meta;
};
const getAdditionalMeta = () => _additionalMeta;
let _fallbackContext = null;
const setFallbackContext = (context) => {
  _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
let _cid = 0;
function createCoreContext(options = {}) {
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const version = isString$1(options.version) ? options.version : VERSION$1;
  const locale = isString$1(options.locale) ? options.locale : DEFAULT_LOCALE;
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
  const messages2 = isPlainObject(options.messages) ? options.messages : { [locale]: {} };
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [locale]: {} };
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [locale]: {} };
  const modifiers = assign$1({}, options.modifiers || {}, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || {};
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject$1(options.fallbackContext) ? options.fallbackContext : void 0;
  const internalOptions = options;
  const __datetimeFormatters = isObject$1(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject$1(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject$1(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version,
    cid: _cid,
    locale,
    fallbackLocale,
    messages: messages2,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  {
    initI18nDevTools(context, version, __meta);
  }
  return context;
}
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString$1(ret) ? ret : key;
  } else {
    return key;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
function format(ast) {
  const msg = (ctx) => formatParts(ctx, ast);
  return msg;
}
function formatParts(ctx, ast) {
  const body = ast.b || ast.body;
  if ((body.t || body.type) === 1) {
    const plural = body;
    const cases = plural.c || plural.cases;
    return ctx.plural(cases.reduce((messages2, c) => [
      ...messages2,
      formatMessageParts(ctx, c)
    ], []));
  } else {
    return formatMessageParts(ctx, body);
  }
}
function formatMessageParts(ctx, node) {
  const _static = node.s || node.static;
  if (_static) {
    return ctx.type === "text" ? _static : ctx.normalize([_static]);
  } else {
    const messages2 = (node.i || node.items).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
    return ctx.normalize(messages2);
  }
}
function formatMessagePart(ctx, node) {
  const type = node.t || node.type;
  switch (type) {
    case 3:
      const text = node;
      return text.v || text.value;
    case 9:
      const literal = node;
      return literal.v || literal.value;
    case 4:
      const named = node;
      return ctx.interpolate(ctx.named(named.k || named.key));
    case 5:
      const list = node;
      return ctx.interpolate(ctx.list(list.i || list.index));
    case 6:
      const linked = node;
      const modifier = linked.m || linked.modifier;
      return ctx.linked(formatMessagePart(ctx, linked.k || linked.key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
    case 7:
      const linkedKey = node;
      return linkedKey.v || linkedKey.value;
    case 8:
      const linkedModifier = node;
      return linkedModifier.v || linkedModifier.value;
    default:
      throw new Error(`unhandled node type on format message part: ${type}`);
  }
}
const code$2 = CompileErrorCodes.__EXTEND_POINT__;
const inc$2 = incrementer(code$2);
const CoreErrorCodes = {
  INVALID_ARGUMENT: code$2,
  INVALID_DATE_ARGUMENT: inc$2(),
  INVALID_ISO_DATE_ARGUMENT: inc$2(),
  NOT_SUPPORT_NON_STRING_MESSAGE: inc$2(),
  __EXTEND_POINT__: inc$2()
};
function createCoreError(code2) {
  return createCompileError(code2, null, void 0);
}
const defaultOnCacheKey = (message) => message;
let compileCache = /* @__PURE__ */ Object.create(null);
const isMessageAST = (val) => isObject$1(val) && (val.t === 0 || val.type === 0) && ("b" in val || "body" in val);
function baseCompile(message, options = {}) {
  let detectError = false;
  const onError = options.onError || defaultOnError;
  options.onError = (err) => {
    detectError = true;
    onError(err);
  };
  return { ...baseCompile$1(message, options), detectError };
}
function compile(message, context) {
  if (__INTLIFY_JIT_COMPILATION__ && !__INTLIFY_DROP_MESSAGE_COMPILER__ && isString$1(message)) {
    isBoolean(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
    const onCacheKey = context.onCacheKey || defaultOnCacheKey;
    const cacheKey = onCacheKey(message);
    const cached = compileCache[cacheKey];
    if (cached) {
      return cached;
    }
    const { ast, detectError } = baseCompile(message, {
      ...context,
      location: false,
      jit: true
    });
    const msg = format(ast);
    return !detectError ? compileCache[cacheKey] = msg : msg;
  } else {
    const cacheKey = message.cacheKey;
    if (cacheKey) {
      const cached = compileCache[cacheKey];
      if (cached) {
        return cached;
      }
      return compileCache[cacheKey] = format(message);
    } else {
      return format(message);
    }
  }
}
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages: messages2 } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString$1(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : "";
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
  const locale = isString$1(options.locale) ? options.locale : context.locale;
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages2[locale] || {}
  ];
  let format2 = formatScope;
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString$1(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let occurred = false;
  const onError = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  const ret = postTranslation ? postTranslation(messaged, key) : messaged;
  {
    const payloads = {
      timestamp: Date.now(),
      key: isString$1(key) ? key : isMessageFunction(format2) ? format2.key : "",
      locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
      format: isString$1(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
      message: ret
    };
    payloads.meta = assign$1({}, context.__meta, getAdditionalMeta() || {});
    translateDevTools(payloads);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString$1(item) ? escapeHtml(item) : item);
  } else if (isObject$1(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString$1(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages: messages2, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales = localeFallbacker(context, fallbackLocale, locale);
  let message = {};
  let targetLocale;
  let format2 = null;
  const type = "translate";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    message = messages2[targetLocale] || {};
    if ((format2 = resolveValue2(message, key)) === null) {
      format2 = message[key];
    }
    if (isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) {
      break;
    }
    const missingRet = handleMissing(
      context,
      key,
      targetLocale,
      missingWarn,
      type
    );
    if (missingRet !== key) {
      format2 = missingRet;
    }
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  if (messageCompiler == null) {
    const msg2 = () => format2;
    msg2.locale = targetLocale;
    msg2.key = key;
    return msg2;
  }
  const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  const messaged = msg(msgCtx);
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = {};
  if (!isString$1(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString$1(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString$1(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign$1(options, arg3);
  }
  return [key, options];
}
function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
  return {
    locale,
    key,
    warnHtmlMessage,
    onError: (err) => {
      onError && onError(err);
      {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key) => {
    let val = resolveValue2(message, key);
    if (val == null && fallbackContext) {
      const [, , message2] = resolveMessageFormat(fallbackContext, key, locale, fallbackLocale, fallbackWarn, missingWarn);
      val = resolveValue2(message2, key);
    }
    if (isString$1(val) || isMessageAST(val)) {
      let occurred = false;
      const onError = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, onError);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString$1(options.locale) ? options.locale : context.locale;
  const locales = localeFallbacker(
    context,
    fallbackLocale,
    locale
  );
  if (!isString$1(key) || key === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "datetime format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString$1(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign$1({}, format2, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  let value;
  if (isString$1(arg1)) {
    const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch (e) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString$1(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString$1(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString$1(options.locale) ? options.locale : context.locale;
  const locales = localeFallbacker(
    context,
    fallbackLocale,
    locale
  );
  if (!isString$1(key) || key === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "number format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString$1(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign$1({}, format2, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString$1(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString$1(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
{
  initFeatureFlags$1();
}
/*!
  * vue-devtools v9.3.0
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const VueDevToolsLabels = {
  ["vue-devtools-plugin-vue-i18n"]: "Vue I18n devtools",
  ["vue-i18n-resource-inspector"]: "I18n Resources",
  ["vue-i18n-timeline"]: "Vue I18n"
};
const VueDevToolsPlaceholders = {
  ["vue-i18n-resource-inspector"]: "Search for scopes ..."
};
const VueDevToolsTimelineColors = {
  ["vue-i18n-timeline"]: 16764185
};
/*!
  * vue-i18n v9.3.0
  * (c) 2023 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.3.0";
function initFeatureFlags() {
  if (typeof __INTLIFY_JIT_COMPILATION__ !== "boolean") {
    getGlobalThis().__INTLIFY_JIT_COMPILATION__ = false;
  }
  if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== "boolean") {
    getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
  }
}
const code$1 = CoreWarnCodes.__EXTEND_POINT__;
const inc$1 = incrementer(code$1);
({
  FALLBACK_TO_ROOT: code$1,
  NOT_SUPPORTED_PRESERVE: inc$1(),
  NOT_SUPPORTED_FORMATTER: inc$1(),
  NOT_SUPPORTED_PRESERVE_DIRECTIVE: inc$1(),
  NOT_SUPPORTED_GET_CHOICE_INDEX: inc$1(),
  COMPONENT_NAME_LEGACY_COMPATIBLE: inc$1(),
  NOT_FOUND_PARENT_SCOPE: inc$1(),
  IGNORE_OBJ_FLATTEN: inc$1(),
  NOTICE_DROP_ALLOW_COMPOSITION: inc$1()
});
const code = CoreErrorCodes.__EXTEND_POINT__;
const inc = incrementer(code);
const I18nErrorCodes = {
  UNEXPECTED_RETURN_TYPE: code,
  INVALID_ARGUMENT: inc(),
  MUST_BE_CALL_SETUP_TOP: inc(),
  NOT_INSTALLED: inc(),
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  REQUIRED_VALUE: inc(),
  INVALID_VALUE: inc(),
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  NOT_INSTALLED_WITH_PROVIDE: inc(),
  UNEXPECTED_ERROR: inc(),
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  __EXTEND_POINT__: inc()
};
function createI18nError(code2, ...args) {
  return createCompileError(code2, null, void 0);
}
const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol("__translateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const EnableEmitter = /* @__PURE__ */ makeSymbol("__enableEmitter");
const DisableEmitter = /* @__PURE__ */ makeSymbol("__disableEmitter");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
makeSymbol("__intlifyMeta");
const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol("__injectWithOption");
const DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
function handleFlatJson(obj) {
  if (!isObject$1(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject$1(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      let hasStringValue = false;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        if (!isObject$1(currentObj[subKeys[i]])) {
          hasStringValue = true;
          break;
        }
        currentObj = currentObj[subKeys[i]];
      }
      if (!hasStringValue) {
        currentObj[subKeys[lastIndex]] = obj[key];
        delete obj[key];
      }
      if (isObject$1(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages: messages2, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages2) ? messages2 : isArray(__i18n) ? {} : { [locale]: {} };
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString$1(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
  for (const key in src) {
    if (hasOwn(src, key)) {
      if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
        des[key] = src[key];
      } else {
        deepCopy(src[key], des[key]);
      }
    }
  }
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(gl, options, componentOptions) {
  let messages2 = isObject$1(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages2 = getLocaleMessages(gl.locale.value, {
      messages: messages2,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages2);
  if (locales.length) {
    locales.forEach((locale) => {
      gl.mergeLocaleMessage(locale, messages2[locale]);
    });
  }
  {
    if (isObject$1(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject$1(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
const getMetaInfo = () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}, VueI18nLegacy) {
  const { __root, __injectWithOption } = options;
  const _isGlobal = __root === void 0;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(
    __root && _inheritLocale ? __root.locale.value : isString$1(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = ref(
    __root && _inheritLocale ? __root.fallbackLocale.value : isString$1(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      messageCompiler: options.messageCompiler,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages2 = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    try {
      if (true) {
        setAdditionalMeta(getMetaInfo());
      }
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0;
      }
      ret = fn(_context);
    } finally {
      {
        setAdditionalMeta(null);
      }
      if (!_isGlobal) {
        _context.fallbackContext = void 0;
      }
    }
    if (isNumber(ret) && ret === NOT_REOSLVED) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString$1(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject$1(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign$1({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val));
  }
  function normalize(values) {
    return values.map((val) => isString$1(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      (root) => root[TranslateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      (root) => root[NumberPartsSymbol](...args),
      () => [],
      (val) => isString$1(val) || isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      (root) => root[DatetimePartsSymbol](...args),
      () => [],
      (val) => isString$1(val) || isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    const targetLocale = isString$1(locale2) ? locale2 : _locale.value;
    const message = getLocaleMessage(targetLocale);
    return _context.messageResolver(message, key) !== null;
  }
  function resolveMessages(key) {
    let messages3 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages3 = messageValue;
        break;
      }
    }
    return messages3;
  }
  function tm(key) {
    const messages3 = resolveMessages(key);
    return messages3 != null ? messages3 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign$1(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign$1(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages: messages2,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOptionSymbol] = __injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function getFragmentableTag(tag) {
  return Fragment;
}
const TranslationImpl = /* @__PURE__ */ defineComponent({
  name: "i18n-t",
  props: assign$1({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n2 = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key !== "_");
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString$1(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n2[TranslateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign$1({}, attrs);
      const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
});
const Translation = TranslationImpl;
function isVNode(target) {
  return isArray(target) && !isString$1(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString$1(props.format)) {
      options.key = props.format;
    } else if (isObject$1(props.format)) {
      if (isString$1(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign$1({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (isString$1(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign$1({}, attrs);
    const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent({
  name: "i18n-n",
  props: assign$1({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n2 = props.i18n || useI18n({
      useScope: "parent",
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => i18n2[NumberPartsSymbol](...args));
  }
});
const NumberFormat = NumberFormatImpl;
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
  name: "i18n-d",
  props: assign$1({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n2 = props.i18n || useI18n({
      useScope: "parent",
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => i18n2[DatetimePartsSymbol](...args));
  }
});
const DatetimeFormat = DatetimeFormatImpl;
function getComposer$2(i18n2, instance) {
  const i18nInternal = i18n2;
  if (i18n2.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n2.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n2.global.__composer;
  }
}
function vTDirective(i18n2) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$2(i18n2, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    if (inBrowser && i18n2.global === composer) {
      el.__i18nWatcher = watch(composer.locale, () => {
        binding.instance && binding.instance.$forceUpdate();
      });
    }
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (inBrowser && el.__i18nWatcher) {
      el.__i18nWatcher();
      el.__i18nWatcher = void 0;
      delete el.__i18nWatcher;
    }
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString$1(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString$1(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n2, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    [!useI18nComponentName ? Translation.name : "i18n", "I18nT"].forEach((name) => app.component(name, Translation));
    [NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
    [DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
  }
  {
    app.directive("t", vTDirective(i18n2));
  }
}
const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
let devtoolsApi;
async function enableDevTools(app, i18n2) {
  return new Promise((resolve, reject) => {
    try {
      setupDevtoolsPlugin({
        id: "vue-devtools-plugin-vue-i18n",
        label: VueDevToolsLabels["vue-devtools-plugin-vue-i18n"],
        packageName: "vue-i18n",
        homepage: "https://vue-i18n.intlify.dev",
        logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
        componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
        app
      }, (api) => {
        devtoolsApi = api;
        api.on.visitComponentTree(({ componentInstance, treeNode }) => {
          updateComponentTreeTags(componentInstance, treeNode, i18n2);
        });
        api.on.inspectComponent(({ componentInstance, instanceData }) => {
          if (componentInstance.vnode.el && componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
            if (i18n2.mode === "legacy") {
              if (componentInstance.vnode.el.__VUE_I18N__ !== i18n2.global.__composer) {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            } else {
              inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
            }
          }
        });
        api.addInspector({
          id: "vue-i18n-resource-inspector",
          label: VueDevToolsLabels["vue-i18n-resource-inspector"],
          icon: "language",
          treeFilterPlaceholder: VueDevToolsPlaceholders["vue-i18n-resource-inspector"]
        });
        api.on.getInspectorTree((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            registerScope(payload, i18n2);
          }
        });
        const roots = /* @__PURE__ */ new Map();
        api.on.getInspectorState(async (payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            api.unhighlightElement();
            inspectScope(payload, i18n2);
            if (payload.nodeId === "global") {
              if (!roots.has(payload.app)) {
                const [root] = await api.getComponentInstances(payload.app);
                roots.set(payload.app, root);
              }
              api.highlightElement(roots.get(payload.app));
            } else {
              const instance = getComponentInstance(payload.nodeId, i18n2);
              instance && api.highlightElement(instance);
            }
          }
        });
        api.on.editInspectorState((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            editScope(payload, i18n2);
          }
        });
        api.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: VueDevToolsLabels["vue-i18n-timeline"],
          color: VueDevToolsTimelineColors["vue-i18n-timeline"]
        });
        resolve(true);
      });
    } catch (e) {
      console.error(e);
      reject(false);
    }
  });
}
function getI18nScopeLable(instance) {
  return instance.type.name || instance.type.displayName || instance.type.__file || "Anonymous";
}
function updateComponentTreeTags(instance, treeNode, i18n2) {
  const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  if (instance && instance.vnode.el && instance.vnode.el.__VUE_I18N__) {
    if (instance.vnode.el.__VUE_I18N__ !== global2) {
      const tag = {
        label: `i18n (${getI18nScopeLable(instance)} Scope)`,
        textColor: 0,
        backgroundColor: 16764185
      };
      treeNode.tags.push(tag);
    }
  }
}
function inspectComposer(instanceData, composer) {
  const type = VUE_I18N_COMPONENT_TYPES;
  instanceData.state.push({
    type,
    key: "locale",
    editable: true,
    value: composer.locale.value
  });
  instanceData.state.push({
    type,
    key: "availableLocales",
    editable: false,
    value: composer.availableLocales
  });
  instanceData.state.push({
    type,
    key: "fallbackLocale",
    editable: true,
    value: composer.fallbackLocale.value
  });
  instanceData.state.push({
    type,
    key: "inheritLocale",
    editable: true,
    value: composer.inheritLocale
  });
  instanceData.state.push({
    type,
    key: "messages",
    editable: false,
    value: getLocaleMessageValue(composer.messages.value)
  });
  {
    instanceData.state.push({
      type,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
}
function getLocaleMessageValue(messages2) {
  const value = {};
  Object.keys(messages2).forEach((key) => {
    const v = messages2[key];
    if (isFunction(v) && "source" in v) {
      value[key] = getMessageFunctionDetails(v);
    } else if (isMessageAST(v) && v.loc && v.loc.source) {
      value[key] = v.loc.source;
    } else if (isObject$1(v)) {
      value[key] = getLocaleMessageValue(v);
    } else {
      value[key] = v;
    }
  });
  return value;
}
const ESC = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function escape(s) {
  return s.replace(/[<>"&]/g, escapeChar);
}
function escapeChar(a) {
  return ESC[a] || a;
}
function getMessageFunctionDetails(func) {
  const argString = func.source ? `("${escape(func.source)}")` : `(?)`;
  return {
    _custom: {
      type: "function",
      display: `<span>\u0192</span> ${argString}`
    }
  };
}
function registerScope(payload, i18n2) {
  payload.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  for (const [keyInstance, instance] of i18n2.__instances) {
    const composer = i18n2.mode === "composition" ? instance : instance.__composer;
    if (global2 === composer) {
      continue;
    }
    payload.rootNodes.push({
      id: composer.id.toString(),
      label: `${getI18nScopeLable(keyInstance)} Scope`
    });
  }
}
function getComponentInstance(nodeId, i18n2) {
  let instance = null;
  if (nodeId !== "global") {
    for (const [component, composer] of i18n2.__instances.entries()) {
      if (composer.id.toString() === nodeId) {
        instance = component;
        break;
      }
    }
  }
  return instance;
}
function getComposer$1(nodeId, i18n2) {
  if (nodeId === "global") {
    return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  } else {
    const instance = Array.from(i18n2.__instances.values()).find((item) => item.id.toString() === nodeId);
    if (instance) {
      return i18n2.mode === "composition" ? instance : instance.__composer;
    } else {
      return null;
    }
  }
}
function inspectScope(payload, i18n2) {
  const composer = getComposer$1(payload.nodeId, i18n2);
  if (composer) {
    payload.state = makeScopeInspectState(composer);
  }
  return null;
}
function makeScopeInspectState(composer) {
  const state = {};
  const localeType = "Locale related info";
  const localeStates = [
    {
      type: localeType,
      key: "locale",
      editable: true,
      value: composer.locale.value
    },
    {
      type: localeType,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    },
    {
      type: localeType,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    },
    {
      type: localeType,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    }
  ];
  state[localeType] = localeStates;
  const localeMessagesType = "Locale messages info";
  const localeMessagesStates = [
    {
      type: localeMessagesType,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    }
  ];
  state[localeMessagesType] = localeMessagesStates;
  {
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
  }
  return state;
}
function addTimelineEvent(event, payload) {
  if (devtoolsApi) {
    let groupId;
    if (payload && "groupId" in payload) {
      groupId = payload.groupId;
      delete payload.groupId;
    }
    devtoolsApi.addTimelineEvent({
      layerId: "vue-i18n-timeline",
      event: {
        title: event,
        groupId,
        time: Date.now(),
        meta: {},
        data: payload || {},
        logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
      }
    });
  }
}
function editScope(payload, i18n2) {
  const composer = getComposer$1(payload.nodeId, i18n2);
  if (composer) {
    const [field] = payload.path;
    if (field === "locale" && isString$1(payload.state.value)) {
      composer.locale.value = payload.state.value;
    } else if (field === "fallbackLocale" && (isString$1(payload.state.value) || isArray(payload.state.value) || isObject$1(payload.state.value))) {
      composer.fallbackLocale.value = payload.state.value;
    } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
      composer.inheritLocale = payload.state.value;
    }
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __allowComposition = true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = /* @__PURE__ */ makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  {
    const i18n2 = {
      get mode() {
        return "composition";
      },
      get allowComposition() {
        return __allowComposition;
      },
      async install(app, ...options2) {
        {
          app.__VUE_I18N__ = i18n2;
        }
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n2);
        if (isPlainObject(options2[0])) {
          const opts = options2[0];
          i18n2.__composerExtend = opts.__composerExtend;
          i18n2.__vueI18nExtend = opts.__vueI18nExtend;
        }
        let globalReleaseHandler = null;
        if (__globalInjection) {
          globalReleaseHandler = injectGlobalFields(app, i18n2.global);
        }
        {
          apply(app, i18n2, ...options2);
        }
        const unmountApp = app.unmount;
        app.unmount = () => {
          globalReleaseHandler && globalReleaseHandler();
          i18n2.dispose();
          unmountApp();
        };
        {
          const ret = await enableDevTools(app, i18n2);
          if (!ret) {
            throw createI18nError(I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
          }
          const emitter = createEmitter();
          {
            const _composer = __global;
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
          }
          emitter.on("*", addTimelineEvent);
        }
      },
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      __instances,
      __getInstance,
      __setInstance,
      __deleteInstance
    };
    return i18n2;
  }
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
  }
  const i18n2 = getI18nInstance(instance);
  const gl = getGlobalComposer(i18n2);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(gl, options, componentOptions);
    return gl;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n2, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = gl;
    }
    return composer2;
  }
  const i18nInternal = i18n2;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign$1({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (gl) {
      composerOptions.__root = gl;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
    }
    setupLifeCycle(i18nInternal, instance, composer);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  {
    const obj = scope.run(() => createComposer(options));
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
}
function getI18nInstance(instance) {
  {
    const i18n2 = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n2) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
    }
    return i18n2;
  }
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n2) {
  return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
}
function getComposer(i18n2, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = getParentComponentInstance(target, useComponent);
  while (current != null) {
    const i18nInternal = i18n2;
    if (i18n2.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function getParentComponentInstance(target, useComponent = false) {
  if (target == null) {
    return null;
  }
  {
    return !useComponent ? target.parent : target.vnode.ctx || target.parent;
  }
}
function setupLifeCycle(i18n2, target, composer) {
  let emitter = null;
  {
    onMounted(() => {
      if (target.vnode.el) {
        target.vnode.el.__VUE_I18N__ = composer;
        emitter = createEmitter();
        const _composer = composer;
        _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        emitter.on("*", addTimelineEvent);
      }
    }, target);
    onUnmounted(() => {
      const _composer = composer;
      if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
        emitter && emitter.off("*", addTimelineEvent);
        _composer[DisableEmitter] && _composer[DisableEmitter]();
        delete target.vnode.el.__VUE_I18N__;
      }
      i18n2.__deleteInstance(target);
      const dispose = _composer[DisposeSymbol];
      if (dispose) {
        dispose();
        delete _composer[DisposeSymbol];
      }
    }, target);
  }
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app, composer) {
  const i18n2 = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n2, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n2;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
  const dispose = () => {
    delete app.config.globalProperties.$i18n;
    globalExportMethods.forEach((method) => {
      delete app.config.globalProperties[`$${method}`];
    });
  };
  return dispose;
}
{
  initFeatureFlags();
}
if (__INTLIFY_JIT_COMPILATION__) {
  registerMessageCompiler(compile);
}
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
{
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
var enUS = {
  failed: "Action failed",
  success: "Action was successful"
};
var messages = {
  "en-US": enUS
};
var i18n = boot(({ app }) => {
  const i18n2 = createI18n({
    locale: "en-US",
    legacy: false,
    messages
  });
  app.use(i18n2);
});
export { i18n as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5hMmE4OWNlNC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BpbnRsaWZ5L3NoYXJlZC9kaXN0L3NoYXJlZC5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGludGxpZnkvbWVzc2FnZS1jb21waWxlci9kaXN0L21lc3NhZ2UtY29tcGlsZXIuZXNtLWJyb3dzZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGludGxpZnkvZGV2dG9vbHMtaWYvZGlzdC9kZXZ0b29scy1pZi5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGludGxpZnkvY29yZS1iYXNlL2Rpc3QvY29yZS1iYXNlLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AaW50bGlmeS92dWUtZGV2dG9vbHMvZGlzdC92dWUtZGV2dG9vbHMubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1pMThuL2Rpc3QvdnVlLWkxOG4ucnVudGltZS5tanMiLCIuLi8uLi8uLi9zcmMvaTE4bi9lbi1VUy9pbmRleC50cyIsIi4uLy4uLy4uL3NyYy9pMThuL2luZGV4LnRzIiwiLi4vLi4vLi4vc3JjL2Jvb3QvaTE4bi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAgKiBzaGFyZWQgdjkuMy4wXG4gICogKGMpIDIwMjMga2F6dXlhIGthd2FndWNoaVxuICAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAgKi9cbi8qKlxuICogT3JpZ2luYWwgVXRpbGl0aWVzXG4gKiB3cml0dGVuIGJ5IGthenV5YSBrYXdhZ3VjaGlcbiAqL1xuY29uc3QgaW5Ccm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG5sZXQgbWFyaztcbmxldCBtZWFzdXJlO1xuaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgIGNvbnN0IHBlcmYgPSBpbkJyb3dzZXIgJiYgd2luZG93LnBlcmZvcm1hbmNlO1xuICAgIGlmIChwZXJmICYmXG4gICAgICAgIHBlcmYubWFyayAmJlxuICAgICAgICBwZXJmLm1lYXN1cmUgJiZcbiAgICAgICAgcGVyZi5jbGVhck1hcmtzICYmXG4gICAgICAgIC8vIEB0cy1pZ25vcmUgYnJvd3NlciBjb21wYXRcbiAgICAgICAgcGVyZi5jbGVhck1lYXN1cmVzKSB7XG4gICAgICAgIG1hcmsgPSAodGFnKSA9PiB7XG4gICAgICAgICAgICBwZXJmLm1hcmsodGFnKTtcbiAgICAgICAgfTtcbiAgICAgICAgbWVhc3VyZSA9IChuYW1lLCBzdGFydFRhZywgZW5kVGFnKSA9PiB7XG4gICAgICAgICAgICBwZXJmLm1lYXN1cmUobmFtZSwgc3RhcnRUYWcsIGVuZFRhZyk7XG4gICAgICAgICAgICBwZXJmLmNsZWFyTWFya3Moc3RhcnRUYWcpO1xuICAgICAgICAgICAgcGVyZi5jbGVhck1hcmtzKGVuZFRhZyk7XG4gICAgICAgIH07XG4gICAgfVxufVxuY29uc3QgUkVfQVJHUyA9IC9cXHsoWzAtOWEtekEtWl0rKVxcfS9nO1xuLyogZXNsaW50LWRpc2FibGUgKi9cbmZ1bmN0aW9uIGZvcm1hdChtZXNzYWdlLCAuLi5hcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIGlzT2JqZWN0KGFyZ3NbMF0pKSB7XG4gICAgICAgIGFyZ3MgPSBhcmdzWzBdO1xuICAgIH1cbiAgICBpZiAoIWFyZ3MgfHwgIWFyZ3MuaGFzT3duUHJvcGVydHkpIHtcbiAgICAgICAgYXJncyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gbWVzc2FnZS5yZXBsYWNlKFJFX0FSR1MsIChtYXRjaCwgaWRlbnRpZmllcikgPT4ge1xuICAgICAgICByZXR1cm4gYXJncy5oYXNPd25Qcm9wZXJ0eShpZGVudGlmaWVyKSA/IGFyZ3NbaWRlbnRpZmllcl0gOiAnJztcbiAgICB9KTtcbn1cbmNvbnN0IG1ha2VTeW1ib2wgPSAobmFtZSwgc2hhcmVhYmxlID0gZmFsc2UpID0+ICFzaGFyZWFibGUgPyBTeW1ib2wobmFtZSkgOiBTeW1ib2wuZm9yKG5hbWUpO1xuY29uc3QgZ2VuZXJhdGVGb3JtYXRDYWNoZUtleSA9IChsb2NhbGUsIGtleSwgc291cmNlKSA9PiBmcmllbmRseUpTT05zdHJpbmdpZnkoeyBsOiBsb2NhbGUsIGs6IGtleSwgczogc291cmNlIH0pO1xuY29uc3QgZnJpZW5kbHlKU09Oc3RyaW5naWZ5ID0gKGpzb24pID0+IEpTT04uc3RyaW5naWZ5KGpzb24pXG4gICAgLnJlcGxhY2UoL1xcdTIwMjgvZywgJ1xcXFx1MjAyOCcpXG4gICAgLnJlcGxhY2UoL1xcdTIwMjkvZywgJ1xcXFx1MjAyOScpXG4gICAgLnJlcGxhY2UoL1xcdTAwMjcvZywgJ1xcXFx1MDAyNycpO1xuY29uc3QgaXNOdW1iZXIgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWwpO1xuY29uc3QgaXNEYXRlID0gKHZhbCkgPT4gdG9UeXBlU3RyaW5nKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbmNvbnN0IGlzUmVnRXhwID0gKHZhbCkgPT4gdG9UeXBlU3RyaW5nKHZhbCkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xuY29uc3QgaXNFbXB0eU9iamVjdCA9ICh2YWwpID0+IGlzUGxhaW5PYmplY3QodmFsKSAmJiBPYmplY3Qua2V5cyh2YWwpLmxlbmd0aCA9PT0gMDtcbmNvbnN0IGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5sZXQgX2dsb2JhbFRoaXM7XG5jb25zdCBnZXRHbG9iYWxUaGlzID0gKCkgPT4ge1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIHJldHVybiAoX2dsb2JhbFRoaXMgfHxcbiAgICAgICAgKF9nbG9iYWxUaGlzID1cbiAgICAgICAgICAgIHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgICAgID8gZ2xvYmFsVGhpc1xuICAgICAgICAgICAgICAgIDogdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgICAgID8gc2VsZlxuICAgICAgICAgICAgICAgICAgICA6IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHdpbmRvd1xuICAgICAgICAgICAgICAgICAgICAgICAgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZ2xvYmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB7fSkpO1xufTtcbmZ1bmN0aW9uIGVzY2FwZUh0bWwocmF3VGV4dCkge1xuICAgIHJldHVybiByYXdUZXh0XG4gICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAgICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgICAgIC5yZXBsYWNlKC8nL2csICcmYXBvczsnKTtcbn1cbmNvbnN0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbmZ1bmN0aW9uIGhhc093bihvYmosIGtleSkge1xuICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbn1cbi8qIGVzbGludC1lbmFibGUgKi9cbi8qKlxuICogVXNlZnVsIFV0aWxpdGllcyBCeSBFdmFuIHlvdVxuICogTW9kaWZpZWQgYnkga2F6dXlhIGthd2FndWNoaVxuICogTUlUIExpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy92dWUtbmV4dC9ibG9iL21hc3Rlci9wYWNrYWdlcy9zaGFyZWQvc3JjL2luZGV4LnRzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdnVlanMvdnVlLW5leHQvYmxvYi9tYXN0ZXIvcGFja2FnZXMvc2hhcmVkL3NyYy9jb2RlZnJhbWUudHNcbiAqL1xuY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5jb25zdCBpc0Z1bmN0aW9uID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJztcbmNvbnN0IGlzU3RyaW5nID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG5jb25zdCBpc0Jvb2xlYW4gPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSAnYm9vbGVhbic7XG5jb25zdCBpc1N5bWJvbCA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09ICdzeW1ib2wnO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmNvbnN0IGlzT2JqZWN0ID0gKHZhbCkgPT4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmNvbnN0IGlzUHJvbWlzZSA9ICh2YWwpID0+IHtcbiAgICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC50aGVuKSAmJiBpc0Z1bmN0aW9uKHZhbC5jYXRjaCk7XG59O1xuY29uc3Qgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuY29uc3QgdG9UeXBlU3RyaW5nID0gKHZhbHVlKSA9PiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbmNvbnN0IGlzUGxhaW5PYmplY3QgPSAodmFsKSA9PiB7XG4gICAgaWYgKCFpc09iamVjdCh2YWwpKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgICByZXR1cm4gcHJvdG8gPT09IG51bGwgfHwgcHJvdG8uY29uc3RydWN0b3IgPT09IE9iamVjdDtcbn07XG4vLyBmb3IgY29udmVydGluZyBsaXN0IGFuZCBuYW1lZCB2YWx1ZXMgdG8gZGlzcGxheWVkIHN0cmluZ3MuXG5jb25zdCB0b0Rpc3BsYXlTdHJpbmcgPSAodmFsKSA9PiB7XG4gICAgcmV0dXJuIHZhbCA9PSBudWxsXG4gICAgICAgID8gJydcbiAgICAgICAgOiBpc0FycmF5KHZhbCkgfHwgKGlzUGxhaW5PYmplY3QodmFsKSAmJiB2YWwudG9TdHJpbmcgPT09IG9iamVjdFRvU3RyaW5nKVxuICAgICAgICAgICAgPyBKU09OLnN0cmluZ2lmeSh2YWwsIG51bGwsIDIpXG4gICAgICAgICAgICA6IFN0cmluZyh2YWwpO1xufTtcbmZ1bmN0aW9uIGpvaW4oaXRlbXMsIHNlcGFyYXRvciA9ICcnKSB7XG4gICAgcmV0dXJuIGl0ZW1zLnJlZHVjZSgoc3RyLCBpdGVtLCBpbmRleCkgPT4gKGluZGV4ID09PSAwID8gc3RyICsgaXRlbSA6IHN0ciArIHNlcGFyYXRvciArIGl0ZW0pLCAnJyk7XG59XG5jb25zdCBSQU5HRSA9IDI7XG5mdW5jdGlvbiBnZW5lcmF0ZUNvZGVGcmFtZShzb3VyY2UsIHN0YXJ0ID0gMCwgZW5kID0gc291cmNlLmxlbmd0aCkge1xuICAgIGNvbnN0IGxpbmVzID0gc291cmNlLnNwbGl0KC9cXHI/XFxuLyk7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBjb25zdCByZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvdW50ICs9IGxpbmVzW2ldLmxlbmd0aCArIDE7XG4gICAgICAgIGlmIChjb3VudCA+PSBzdGFydCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgLSBSQU5HRTsgaiA8PSBpICsgUkFOR0UgfHwgZW5kID4gY291bnQ7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChqIDwgMCB8fCBqID49IGxpbmVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZSA9IGogKyAxO1xuICAgICAgICAgICAgICAgIHJlcy5wdXNoKGAke2xpbmV9JHsnICcucmVwZWF0KDMgLSBTdHJpbmcobGluZSkubGVuZ3RoKX18ICAke2xpbmVzW2pdfWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVMZW5ndGggPSBsaW5lc1tqXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKGogPT09IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCB1bmRlcmxpbmVcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFkID0gc3RhcnQgLSAoY291bnQgLSBsaW5lTGVuZ3RoKSArIDE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IE1hdGgubWF4KDEsIGVuZCA+IGNvdW50ID8gbGluZUxlbmd0aCAtIHBhZCA6IGVuZCAtIHN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goYCAgIHwgIGAgKyAnICcucmVwZWF0KHBhZCkgKyAnXicucmVwZWF0KGxlbmd0aCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChqID4gaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kID4gY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IE1hdGgubWF4KE1hdGgubWluKGVuZCAtIGNvdW50LCBsaW5lTGVuZ3RoKSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMucHVzaChgICAgfCAgYCArICdeJy5yZXBlYXQobGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY291bnQgKz0gbGluZUxlbmd0aCArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcy5qb2luKCdcXG4nKTtcbn1cbmZ1bmN0aW9uIGluY3JlbWVudGVyKGNvZGUpIHtcbiAgICBsZXQgY3VycmVudCA9IGNvZGU7XG4gICAgcmV0dXJuICgpID0+ICsrY3VycmVudDtcbn1cblxuZnVuY3Rpb24gd2Fybihtc2csIGVycikge1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBbaW50bGlmeV0gYCArIG1zZyk7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyLnN0YWNrKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNvbnN0IGhhc1dhcm5lZCA9IHt9O1xuZnVuY3Rpb24gd2Fybk9uY2UobXNnKSB7XG4gICAgaWYgKCFoYXNXYXJuZWRbbXNnXSkge1xuICAgICAgICBoYXNXYXJuZWRbbXNnXSA9IHRydWU7XG4gICAgICAgIHdhcm4obXNnKTtcbiAgICB9XG59XG5cbi8qKlxuICogRXZlbnQgZW1pdHRlciwgZm9ya2VkIGZyb20gdGhlIGJlbG93OlxuICogLSBvcmlnaW5hbCByZXBvc2l0b3J5IHVybDogaHR0cHM6Ly9naXRodWIuY29tL2RldmVsb3BpdC9taXR0XG4gKiAtIGNvZGUgdXJsOiBodHRwczovL2dpdGh1Yi5jb20vZGV2ZWxvcGl0L21pdHQvYmxvYi9tYXN0ZXIvc3JjL2luZGV4LnRzXG4gKiAtIGF1dGhvcjogSmFzb24gTWlsbGVyIChodHRwczovL2dpdGh1Yi5jb20vZGV2ZWxvcGl0KVxuICogLSBsaWNlbnNlOiBNSVRcbiAqL1xuLyoqXG4gKiBDcmVhdGUgYSBldmVudCBlbWl0dGVyXG4gKlxuICogQHJldHVybnMgQW4gZXZlbnQgZW1pdHRlclxuICovXG5mdW5jdGlvbiBjcmVhdGVFbWl0dGVyKCkge1xuICAgIGNvbnN0IGV2ZW50cyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBlbWl0dGVyID0ge1xuICAgICAgICBldmVudHMsXG4gICAgICAgIG9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVycyA9IGV2ZW50cy5nZXQoZXZlbnQpO1xuICAgICAgICAgICAgY29uc3QgYWRkZWQgPSBoYW5kbGVycyAmJiBoYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICAgICAgICAgICAgaWYgKCFhZGRlZCkge1xuICAgICAgICAgICAgICAgIGV2ZW50cy5zZXQoZXZlbnQsIFtoYW5kbGVyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9mZihldmVudCwgaGFuZGxlcikge1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlcnMgPSBldmVudHMuZ2V0KGV2ZW50KTtcbiAgICAgICAgICAgIGlmIChoYW5kbGVycykge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJzLnNwbGljZShoYW5kbGVycy5pbmRleE9mKGhhbmRsZXIpID4+PiAwLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW1pdChldmVudCwgcGF5bG9hZCkge1xuICAgICAgICAgICAgKGV2ZW50cy5nZXQoZXZlbnQpIHx8IFtdKVxuICAgICAgICAgICAgICAgIC5zbGljZSgpXG4gICAgICAgICAgICAgICAgLm1hcChoYW5kbGVyID0+IGhhbmRsZXIocGF5bG9hZCkpO1xuICAgICAgICAgICAgKGV2ZW50cy5nZXQoJyonKSB8fCBbXSlcbiAgICAgICAgICAgICAgICAuc2xpY2UoKVxuICAgICAgICAgICAgICAgIC5tYXAoaGFuZGxlciA9PiBoYW5kbGVyKGV2ZW50LCBwYXlsb2FkKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBlbWl0dGVyO1xufVxuXG5leHBvcnQgeyBhc3NpZ24sIGNyZWF0ZUVtaXR0ZXIsIGVzY2FwZUh0bWwsIGZvcm1hdCwgZnJpZW5kbHlKU09Oc3RyaW5naWZ5LCBnZW5lcmF0ZUNvZGVGcmFtZSwgZ2VuZXJhdGVGb3JtYXRDYWNoZUtleSwgZ2V0R2xvYmFsVGhpcywgaGFzT3duLCBpbkJyb3dzZXIsIGluY3JlbWVudGVyLCBpc0FycmF5LCBpc0Jvb2xlYW4sIGlzRGF0ZSwgaXNFbXB0eU9iamVjdCwgaXNGdW5jdGlvbiwgaXNOdW1iZXIsIGlzT2JqZWN0LCBpc1BsYWluT2JqZWN0LCBpc1Byb21pc2UsIGlzUmVnRXhwLCBpc1N0cmluZywgaXNTeW1ib2wsIGpvaW4sIG1ha2VTeW1ib2wsIG1hcmssIG1lYXN1cmUsIG9iamVjdFRvU3RyaW5nLCB0b0Rpc3BsYXlTdHJpbmcsIHRvVHlwZVN0cmluZywgd2Fybiwgd2Fybk9uY2UgfTtcbiIsIi8qIVxuICAqIG1lc3NhZ2UtY29tcGlsZXIgdjkuMy4wXG4gICogKGMpIDIwMjMga2F6dXlhIGthd2FndWNoaVxuICAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAgKi9cbmNvbnN0IExPQ0FUSU9OX1NUVUIgPSB7XG4gICAgc3RhcnQ6IHsgbGluZTogMSwgY29sdW1uOiAxLCBvZmZzZXQ6IDAgfSxcbiAgICBlbmQ6IHsgbGluZTogMSwgY29sdW1uOiAxLCBvZmZzZXQ6IDAgfVxufTtcbmZ1bmN0aW9uIGNyZWF0ZVBvc2l0aW9uKGxpbmUsIGNvbHVtbiwgb2Zmc2V0KSB7XG4gICAgcmV0dXJuIHsgbGluZSwgY29sdW1uLCBvZmZzZXQgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKHN0YXJ0LCBlbmQsIHNvdXJjZSkge1xuICAgIGNvbnN0IGxvYyA9IHsgc3RhcnQsIGVuZCB9O1xuICAgIGlmIChzb3VyY2UgIT0gbnVsbCkge1xuICAgICAgICBsb2Muc291cmNlID0gc291cmNlO1xuICAgIH1cbiAgICByZXR1cm4gbG9jO1xufVxuXG4vKipcbiAqIE9yaWdpbmFsIFV0aWxpdGllc1xuICogd3JpdHRlbiBieSBrYXp1eWEga2F3YWd1Y2hpXG4gKi9cbmNvbnN0IFJFX0FSR1MgPSAvXFx7KFswLTlhLXpBLVpdKylcXH0vZztcbi8qIGVzbGludC1kaXNhYmxlICovXG5mdW5jdGlvbiBmb3JtYXQobWVzc2FnZSwgLi4uYXJncykge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiBpc09iamVjdChhcmdzWzBdKSkge1xuICAgICAgICBhcmdzID0gYXJnc1swXTtcbiAgICB9XG4gICAgaWYgKCFhcmdzIHx8ICFhcmdzLmhhc093blByb3BlcnR5KSB7XG4gICAgICAgIGFyZ3MgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIG1lc3NhZ2UucmVwbGFjZShSRV9BUkdTLCAobWF0Y2gsIGlkZW50aWZpZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIGFyZ3MuaGFzT3duUHJvcGVydHkoaWRlbnRpZmllcikgPyBhcmdzW2lkZW50aWZpZXJdIDogJyc7XG4gICAgfSk7XG59XG5jb25zdCBhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuY29uc3QgaXNTdHJpbmcgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5jb25zdCBpc09iamVjdCA9ICh2YWwpID0+IHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JztcbmZ1bmN0aW9uIGpvaW4oaXRlbXMsIHNlcGFyYXRvciA9ICcnKSB7XG4gICAgcmV0dXJuIGl0ZW1zLnJlZHVjZSgoc3RyLCBpdGVtLCBpbmRleCkgPT4gKGluZGV4ID09PSAwID8gc3RyICsgaXRlbSA6IHN0ciArIHNlcGFyYXRvciArIGl0ZW0pLCAnJyk7XG59XG5cbmNvbnN0IENvbXBpbGVFcnJvckNvZGVzID0ge1xuICAgIC8vIHRva2VuaXplciBlcnJvciBjb2Rlc1xuICAgIEVYUEVDVEVEX1RPS0VOOiAxLFxuICAgIElOVkFMSURfVE9LRU5fSU5fUExBQ0VIT0xERVI6IDIsXG4gICAgVU5URVJNSU5BVEVEX1NJTkdMRV9RVU9URV9JTl9QTEFDRUhPTERFUjogMyxcbiAgICBVTktOT1dOX0VTQ0FQRV9TRVFVRU5DRTogNCxcbiAgICBJTlZBTElEX1VOSUNPREVfRVNDQVBFX1NFUVVFTkNFOiA1LFxuICAgIFVOQkFMQU5DRURfQ0xPU0lOR19CUkFDRTogNixcbiAgICBVTlRFUk1JTkFURURfQ0xPU0lOR19CUkFDRTogNyxcbiAgICBFTVBUWV9QTEFDRUhPTERFUjogOCxcbiAgICBOT1RfQUxMT1dfTkVTVF9QTEFDRUhPTERFUjogOSxcbiAgICBJTlZBTElEX0xJTktFRF9GT1JNQVQ6IDEwLFxuICAgIC8vIHBhcnNlciBlcnJvciBjb2Rlc1xuICAgIE1VU1RfSEFWRV9NRVNTQUdFU19JTl9QTFVSQUw6IDExLFxuICAgIFVORVhQRUNURURfRU1QVFlfTElOS0VEX01PRElGSUVSOiAxMixcbiAgICBVTkVYUEVDVEVEX0VNUFRZX0xJTktFRF9LRVk6IDEzLFxuICAgIFVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUzogMTQsXG4gICAgLy8gZ2VuZXJhdG9yIGVycm9yIGNvZGVzXG4gICAgVU5IQU5ETEVEX0NPREVHRU5fTk9ERV9UWVBFOiAxNSxcbiAgICAvLyBtaW5pZmllciBlcnJvciBjb2Rlc1xuICAgIFVOSEFORExFRF9NSU5JRklFUl9OT0RFX1RZUEU6IDE2LFxuICAgIC8vIFNwZWNpYWwgdmFsdWUgZm9yIGhpZ2hlci1vcmRlciBjb21waWxlcnMgdG8gcGljayB1cCB0aGUgbGFzdCBjb2RlXG4gICAgLy8gdG8gYXZvaWQgY29sbGlzaW9uIG9mIGVycm9yIGNvZGVzLiBUaGlzIHNob3VsZCBhbHdheXMgYmUga2VwdCBhcyB0aGUgbGFzdFxuICAgIC8vIGl0ZW0uXG4gICAgX19FWFRFTkRfUE9JTlRfXzogMTdcbn07XG4vKiogQGludGVybmFsICovXG5jb25zdCBlcnJvck1lc3NhZ2VzID0ge1xuICAgIC8vIHRva2VuaXplciBlcnJvciBtZXNzYWdlc1xuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5FWFBFQ1RFRF9UT0tFTl06IGBFeHBlY3RlZCB0b2tlbjogJ3swfSdgLFxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5JTlZBTElEX1RPS0VOX0lOX1BMQUNFSE9MREVSXTogYEludmFsaWQgdG9rZW4gaW4gcGxhY2Vob2xkZXI6ICd7MH0nYCxcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuVU5URVJNSU5BVEVEX1NJTkdMRV9RVU9URV9JTl9QTEFDRUhPTERFUl06IGBVbnRlcm1pbmF0ZWQgc2luZ2xlIHF1b3RlIGluIHBsYWNlaG9sZGVyYCxcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuVU5LTk9XTl9FU0NBUEVfU0VRVUVOQ0VdOiBgVW5rbm93biBlc2NhcGUgc2VxdWVuY2U6IFxcXFx7MH1gLFxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5JTlZBTElEX1VOSUNPREVfRVNDQVBFX1NFUVVFTkNFXTogYEludmFsaWQgdW5pY29kZSBlc2NhcGUgc2VxdWVuY2U6IHswfWAsXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLlVOQkFMQU5DRURfQ0xPU0lOR19CUkFDRV06IGBVbmJhbGFuY2VkIGNsb3NpbmcgYnJhY2VgLFxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5VTlRFUk1JTkFURURfQ0xPU0lOR19CUkFDRV06IGBVbnRlcm1pbmF0ZWQgY2xvc2luZyBicmFjZWAsXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLkVNUFRZX1BMQUNFSE9MREVSXTogYEVtcHR5IHBsYWNlaG9sZGVyYCxcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuTk9UX0FMTE9XX05FU1RfUExBQ0VIT0xERVJdOiBgTm90IGFsbG93ZWQgbmVzdCBwbGFjZWhvbGRlcmAsXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLklOVkFMSURfTElOS0VEX0ZPUk1BVF06IGBJbnZhbGlkIGxpbmtlZCBmb3JtYXRgLFxuICAgIC8vIHBhcnNlciBlcnJvciBtZXNzYWdlc1xuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5NVVNUX0hBVkVfTUVTU0FHRVNfSU5fUExVUkFMXTogYFBsdXJhbCBtdXN0IGhhdmUgbWVzc2FnZXNgLFxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VNUFRZX0xJTktFRF9NT0RJRklFUl06IGBVbmV4cGVjdGVkIGVtcHR5IGxpbmtlZCBtb2RpZmllcmAsXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfRU1QVFlfTElOS0VEX0tFWV06IGBVbmV4cGVjdGVkIGVtcHR5IGxpbmtlZCBrZXlgLFxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVNdOiBgVW5leHBlY3RlZCBsZXhpY2FsIGFuYWx5c2lzIGluIHRva2VuOiAnezB9J2AsXG4gICAgLy8gZ2VuZXJhdG9yIGVycm9yIG1lc3NhZ2VzXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLlVOSEFORExFRF9DT0RFR0VOX05PREVfVFlQRV06IGB1bmhhbmRsZWQgY29kZWdlbiBub2RlIHR5cGU6ICd7MH0nYCxcbiAgICAvLyBtaW5pbWl6ZXIgZXJyb3IgbWVzc2FnZXNcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuVU5IQU5ETEVEX01JTklGSUVSX05PREVfVFlQRV06IGB1bmhhbmRsZWQgbWltaWZpZXIgbm9kZSB0eXBlOiAnezB9J2Bcbn07XG5mdW5jdGlvbiBjcmVhdGVDb21waWxlRXJyb3IoY29kZSwgbG9jLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7IGRvbWFpbiwgbWVzc2FnZXMsIGFyZ3MgfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgbXNnID0gZm9ybWF0KChtZXNzYWdlcyB8fCBlcnJvck1lc3NhZ2VzKVtjb2RlXSB8fCAnJywgLi4uKGFyZ3MgfHwgW10pKVxuICAgICAgICA7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgU3ludGF4RXJyb3IoU3RyaW5nKG1zZykpO1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICAgIGlmIChsb2MpIHtcbiAgICAgICAgZXJyb3IubG9jYXRpb24gPSBsb2M7XG4gICAgfVxuICAgIGVycm9yLmRvbWFpbiA9IGRvbWFpbjtcbiAgICByZXR1cm4gZXJyb3I7XG59XG4vKiogQGludGVybmFsICovXG5mdW5jdGlvbiBkZWZhdWx0T25FcnJvcihlcnJvcikge1xuICAgIHRocm93IGVycm9yO1xufVxuXG5jb25zdCBSRV9IVE1MX1RBRyA9IC88XFwvP1tcXHdcXHM9XCIvLic6OyMtXFwvXSs+LztcbmNvbnN0IGRldGVjdEh0bWxUYWcgPSAoc291cmNlKSA9PiBSRV9IVE1MX1RBRy50ZXN0KHNvdXJjZSk7XG5cbmNvbnN0IENIQVJfU1AgPSAnICc7XG5jb25zdCBDSEFSX0NSID0gJ1xccic7XG5jb25zdCBDSEFSX0xGID0gJ1xcbic7XG5jb25zdCBDSEFSX0xTID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweDIwMjgpO1xuY29uc3QgQ0hBUl9QUyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHgyMDI5KTtcbmZ1bmN0aW9uIGNyZWF0ZVNjYW5uZXIoc3RyKSB7XG4gICAgY29uc3QgX2J1ZiA9IHN0cjtcbiAgICBsZXQgX2luZGV4ID0gMDtcbiAgICBsZXQgX2xpbmUgPSAxO1xuICAgIGxldCBfY29sdW1uID0gMTtcbiAgICBsZXQgX3BlZWtPZmZzZXQgPSAwO1xuICAgIGNvbnN0IGlzQ1JMRiA9IChpbmRleCkgPT4gX2J1ZltpbmRleF0gPT09IENIQVJfQ1IgJiYgX2J1ZltpbmRleCArIDFdID09PSBDSEFSX0xGO1xuICAgIGNvbnN0IGlzTEYgPSAoaW5kZXgpID0+IF9idWZbaW5kZXhdID09PSBDSEFSX0xGO1xuICAgIGNvbnN0IGlzUFMgPSAoaW5kZXgpID0+IF9idWZbaW5kZXhdID09PSBDSEFSX1BTO1xuICAgIGNvbnN0IGlzTFMgPSAoaW5kZXgpID0+IF9idWZbaW5kZXhdID09PSBDSEFSX0xTO1xuICAgIGNvbnN0IGlzTGluZUVuZCA9IChpbmRleCkgPT4gaXNDUkxGKGluZGV4KSB8fCBpc0xGKGluZGV4KSB8fCBpc1BTKGluZGV4KSB8fCBpc0xTKGluZGV4KTtcbiAgICBjb25zdCBpbmRleCA9ICgpID0+IF9pbmRleDtcbiAgICBjb25zdCBsaW5lID0gKCkgPT4gX2xpbmU7XG4gICAgY29uc3QgY29sdW1uID0gKCkgPT4gX2NvbHVtbjtcbiAgICBjb25zdCBwZWVrT2Zmc2V0ID0gKCkgPT4gX3BlZWtPZmZzZXQ7XG4gICAgY29uc3QgY2hhckF0ID0gKG9mZnNldCkgPT4gaXNDUkxGKG9mZnNldCkgfHwgaXNQUyhvZmZzZXQpIHx8IGlzTFMob2Zmc2V0KSA/IENIQVJfTEYgOiBfYnVmW29mZnNldF07XG4gICAgY29uc3QgY3VycmVudENoYXIgPSAoKSA9PiBjaGFyQXQoX2luZGV4KTtcbiAgICBjb25zdCBjdXJyZW50UGVlayA9ICgpID0+IGNoYXJBdChfaW5kZXggKyBfcGVla09mZnNldCk7XG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgX3BlZWtPZmZzZXQgPSAwO1xuICAgICAgICBpZiAoaXNMaW5lRW5kKF9pbmRleCkpIHtcbiAgICAgICAgICAgIF9saW5lKys7XG4gICAgICAgICAgICBfY29sdW1uID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNDUkxGKF9pbmRleCkpIHtcbiAgICAgICAgICAgIF9pbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIF9pbmRleCsrO1xuICAgICAgICBfY29sdW1uKys7XG4gICAgICAgIHJldHVybiBfYnVmW19pbmRleF07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBlZWsoKSB7XG4gICAgICAgIGlmIChpc0NSTEYoX2luZGV4ICsgX3BlZWtPZmZzZXQpKSB7XG4gICAgICAgICAgICBfcGVla09mZnNldCsrO1xuICAgICAgICB9XG4gICAgICAgIF9wZWVrT2Zmc2V0Kys7XG4gICAgICAgIHJldHVybiBfYnVmW19pbmRleCArIF9wZWVrT2Zmc2V0XTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIF9pbmRleCA9IDA7XG4gICAgICAgIF9saW5lID0gMTtcbiAgICAgICAgX2NvbHVtbiA9IDE7XG4gICAgICAgIF9wZWVrT2Zmc2V0ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVzZXRQZWVrKG9mZnNldCA9IDApIHtcbiAgICAgICAgX3BlZWtPZmZzZXQgPSBvZmZzZXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNraXBUb1BlZWsoKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IF9pbmRleCArIF9wZWVrT2Zmc2V0O1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5tb2RpZmllZC1sb29wLWNvbmRpdGlvblxuICAgICAgICB3aGlsZSAodGFyZ2V0ICE9PSBfaW5kZXgpIHtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICBfcGVla09mZnNldCA9IDA7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGluZGV4LFxuICAgICAgICBsaW5lLFxuICAgICAgICBjb2x1bW4sXG4gICAgICAgIHBlZWtPZmZzZXQsXG4gICAgICAgIGNoYXJBdCxcbiAgICAgICAgY3VycmVudENoYXIsXG4gICAgICAgIGN1cnJlbnRQZWVrLFxuICAgICAgICBuZXh0LFxuICAgICAgICBwZWVrLFxuICAgICAgICByZXNldCxcbiAgICAgICAgcmVzZXRQZWVrLFxuICAgICAgICBza2lwVG9QZWVrXG4gICAgfTtcbn1cblxuY29uc3QgRU9GID0gdW5kZWZpbmVkO1xuY29uc3QgRE9UID0gJy4nO1xuY29uc3QgTElURVJBTF9ERUxJTUlURVIgPSBcIidcIjtcbmNvbnN0IEVSUk9SX0RPTUFJTiQzID0gJ3Rva2VuaXplcic7XG5mdW5jdGlvbiBjcmVhdGVUb2tlbml6ZXIoc291cmNlLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IG9wdGlvbnMubG9jYXRpb24gIT09IGZhbHNlO1xuICAgIGNvbnN0IF9zY25yID0gY3JlYXRlU2Nhbm5lcihzb3VyY2UpO1xuICAgIGNvbnN0IGN1cnJlbnRPZmZzZXQgPSAoKSA9PiBfc2Nuci5pbmRleCgpO1xuICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9ICgpID0+IGNyZWF0ZVBvc2l0aW9uKF9zY25yLmxpbmUoKSwgX3NjbnIuY29sdW1uKCksIF9zY25yLmluZGV4KCkpO1xuICAgIGNvbnN0IF9pbml0TG9jID0gY3VycmVudFBvc2l0aW9uKCk7XG4gICAgY29uc3QgX2luaXRPZmZzZXQgPSBjdXJyZW50T2Zmc2V0KCk7XG4gICAgY29uc3QgX2NvbnRleHQgPSB7XG4gICAgICAgIGN1cnJlbnRUeXBlOiAxNCAvKiBUb2tlblR5cGVzLkVPRiAqLyxcbiAgICAgICAgb2Zmc2V0OiBfaW5pdE9mZnNldCxcbiAgICAgICAgc3RhcnRMb2M6IF9pbml0TG9jLFxuICAgICAgICBlbmRMb2M6IF9pbml0TG9jLFxuICAgICAgICBsYXN0VHlwZTogMTQgLyogVG9rZW5UeXBlcy5FT0YgKi8sXG4gICAgICAgIGxhc3RPZmZzZXQ6IF9pbml0T2Zmc2V0LFxuICAgICAgICBsYXN0U3RhcnRMb2M6IF9pbml0TG9jLFxuICAgICAgICBsYXN0RW5kTG9jOiBfaW5pdExvYyxcbiAgICAgICAgYnJhY2VOZXN0OiAwLFxuICAgICAgICBpbkxpbmtlZDogZmFsc2UsXG4gICAgICAgIHRleHQ6ICcnXG4gICAgfTtcbiAgICBjb25zdCBjb250ZXh0ID0gKCkgPT4gX2NvbnRleHQ7XG4gICAgY29uc3QgeyBvbkVycm9yIH0gPSBvcHRpb25zO1xuICAgIGZ1bmN0aW9uIGVtaXRFcnJvcihjb2RlLCBwb3MsIG9mZnNldCwgLi4uYXJncykge1xuICAgICAgICBjb25zdCBjdHggPSBjb250ZXh0KCk7XG4gICAgICAgIHBvcy5jb2x1bW4gKz0gb2Zmc2V0O1xuICAgICAgICBwb3Mub2Zmc2V0ICs9IG9mZnNldDtcbiAgICAgICAgaWYgKG9uRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvYyA9IGxvY2F0aW9uID8gY3JlYXRlTG9jYXRpb24oY3R4LnN0YXJ0TG9jLCBwb3MpIDogbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IGNyZWF0ZUNvbXBpbGVFcnJvcihjb2RlLCBsb2MsIHtcbiAgICAgICAgICAgICAgICBkb21haW46IEVSUk9SX0RPTUFJTiQzLFxuICAgICAgICAgICAgICAgIGFyZ3NcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb25FcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFRva2VuKGNvbnRleHQsIHR5cGUsIHZhbHVlKSB7XG4gICAgICAgIGNvbnRleHQuZW5kTG9jID0gY3VycmVudFBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnRleHQuY3VycmVudFR5cGUgPSB0eXBlO1xuICAgICAgICBjb25zdCB0b2tlbiA9IHsgdHlwZSB9O1xuICAgICAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgICAgICAgIHRva2VuLmxvYyA9IGNyZWF0ZUxvY2F0aW9uKGNvbnRleHQuc3RhcnRMb2MsIGNvbnRleHQuZW5kTG9jKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdG9rZW4udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgfVxuICAgIGNvbnN0IGdldEVuZFRva2VuID0gKGNvbnRleHQpID0+IGdldFRva2VuKGNvbnRleHQsIDE0IC8qIFRva2VuVHlwZXMuRU9GICovKTtcbiAgICBmdW5jdGlvbiBlYXQoc2NuciwgY2gpIHtcbiAgICAgICAgaWYgKHNjbnIuY3VycmVudENoYXIoKSA9PT0gY2gpIHtcbiAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgcmV0dXJuIGNoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLkVYUEVDVEVEX1RPS0VOLCBjdXJyZW50UG9zaXRpb24oKSwgMCwgY2gpO1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBlZWtTcGFjZXMoc2Nucikge1xuICAgICAgICBsZXQgYnVmID0gJyc7XG4gICAgICAgIHdoaWxlIChzY25yLmN1cnJlbnRQZWVrKCkgPT09IENIQVJfU1AgfHwgc2Nuci5jdXJyZW50UGVlaygpID09PSBDSEFSX0xGKSB7XG4gICAgICAgICAgICBidWYgKz0gc2Nuci5jdXJyZW50UGVlaygpO1xuICAgICAgICAgICAgc2Nuci5wZWVrKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2tpcFNwYWNlcyhzY25yKSB7XG4gICAgICAgIGNvbnN0IGJ1ZiA9IHBlZWtTcGFjZXMoc2Nucik7XG4gICAgICAgIHNjbnIuc2tpcFRvUGVlaygpO1xuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0lkZW50aWZpZXJTdGFydChjaCkge1xuICAgICAgICBpZiAoY2ggPT09IEVPRikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNjID0gY2guY2hhckNvZGVBdCgwKTtcbiAgICAgICAgcmV0dXJuICgoY2MgPj0gOTcgJiYgY2MgPD0gMTIyKSB8fCAvLyBhLXpcbiAgICAgICAgICAgIChjYyA+PSA2NSAmJiBjYyA8PSA5MCkgfHwgLy8gQS1aXG4gICAgICAgICAgICBjYyA9PT0gOTUgLy8gX1xuICAgICAgICApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc051bWJlclN0YXJ0KGNoKSB7XG4gICAgICAgIGlmIChjaCA9PT0gRU9GKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2MgPSBjaC5jaGFyQ29kZUF0KDApO1xuICAgICAgICByZXR1cm4gY2MgPj0gNDggJiYgY2MgPD0gNTc7IC8vIDAtOVxuICAgIH1cbiAgICBmdW5jdGlvbiBpc05hbWVkSWRlbnRpZmllclN0YXJ0KHNjbnIsIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSB9ID0gY29udGV4dDtcbiAgICAgICAgaWYgKGN1cnJlbnRUeXBlICE9PSAyIC8qIFRva2VuVHlwZXMuQnJhY2VMZWZ0ICovKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcGVla1NwYWNlcyhzY25yKTtcbiAgICAgICAgY29uc3QgcmV0ID0gaXNJZGVudGlmaWVyU3RhcnQoc2Nuci5jdXJyZW50UGVlaygpKTtcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNMaXN0SWRlbnRpZmllclN0YXJ0KHNjbnIsIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSB9ID0gY29udGV4dDtcbiAgICAgICAgaWYgKGN1cnJlbnRUeXBlICE9PSAyIC8qIFRva2VuVHlwZXMuQnJhY2VMZWZ0ICovKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcGVla1NwYWNlcyhzY25yKTtcbiAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRQZWVrKCkgPT09ICctJyA/IHNjbnIucGVlaygpIDogc2Nuci5jdXJyZW50UGVlaygpO1xuICAgICAgICBjb25zdCByZXQgPSBpc051bWJlclN0YXJ0KGNoKTtcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNMaXRlcmFsU3RhcnQoc2NuciwgY29udGV4dCkge1xuICAgICAgICBjb25zdCB7IGN1cnJlbnRUeXBlIH0gPSBjb250ZXh0O1xuICAgICAgICBpZiAoY3VycmVudFR5cGUgIT09IDIgLyogVG9rZW5UeXBlcy5CcmFjZUxlZnQgKi8pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwZWVrU3BhY2VzKHNjbnIpO1xuICAgICAgICBjb25zdCByZXQgPSBzY25yLmN1cnJlbnRQZWVrKCkgPT09IExJVEVSQUxfREVMSU1JVEVSO1xuICAgICAgICBzY25yLnJlc2V0UGVlaygpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0xpbmtlZERvdFN0YXJ0KHNjbnIsIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSB9ID0gY29udGV4dDtcbiAgICAgICAgaWYgKGN1cnJlbnRUeXBlICE9PSA4IC8qIFRva2VuVHlwZXMuTGlua2VkQWxpYXMgKi8pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwZWVrU3BhY2VzKHNjbnIpO1xuICAgICAgICBjb25zdCByZXQgPSBzY25yLmN1cnJlbnRQZWVrKCkgPT09IFwiLlwiIC8qIFRva2VuQ2hhcnMuTGlua2VkRG90ICovO1xuICAgICAgICBzY25yLnJlc2V0UGVlaygpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0xpbmtlZE1vZGlmaWVyU3RhcnQoc2NuciwgY29udGV4dCkge1xuICAgICAgICBjb25zdCB7IGN1cnJlbnRUeXBlIH0gPSBjb250ZXh0O1xuICAgICAgICBpZiAoY3VycmVudFR5cGUgIT09IDkgLyogVG9rZW5UeXBlcy5MaW5rZWREb3QgKi8pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwZWVrU3BhY2VzKHNjbnIpO1xuICAgICAgICBjb25zdCByZXQgPSBpc0lkZW50aWZpZXJTdGFydChzY25yLmN1cnJlbnRQZWVrKCkpO1xuICAgICAgICBzY25yLnJlc2V0UGVlaygpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0xpbmtlZERlbGltaXRlclN0YXJ0KHNjbnIsIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSB9ID0gY29udGV4dDtcbiAgICAgICAgaWYgKCEoY3VycmVudFR5cGUgPT09IDggLyogVG9rZW5UeXBlcy5MaW5rZWRBbGlhcyAqLyB8fFxuICAgICAgICAgICAgY3VycmVudFR5cGUgPT09IDEyIC8qIFRva2VuVHlwZXMuTGlua2VkTW9kaWZpZXIgKi8pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcGVla1NwYWNlcyhzY25yKTtcbiAgICAgICAgY29uc3QgcmV0ID0gc2Nuci5jdXJyZW50UGVlaygpID09PSBcIjpcIiAvKiBUb2tlbkNoYXJzLkxpbmtlZERlbGltaXRlciAqLztcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNMaW5rZWRSZWZlclN0YXJ0KHNjbnIsIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSB9ID0gY29udGV4dDtcbiAgICAgICAgaWYgKGN1cnJlbnRUeXBlICE9PSAxMCAvKiBUb2tlblR5cGVzLkxpbmtlZERlbGltaXRlciAqLykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZuID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRQZWVrKCk7XG4gICAgICAgICAgICBpZiAoY2ggPT09IFwie1wiIC8qIFRva2VuQ2hhcnMuQnJhY2VMZWZ0ICovKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzSWRlbnRpZmllclN0YXJ0KHNjbnIucGVlaygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBcIkBcIiAvKiBUb2tlbkNoYXJzLkxpbmtlZEFsaWFzICovIHx8XG4gICAgICAgICAgICAgICAgY2ggPT09IFwiJVwiIC8qIFRva2VuQ2hhcnMuTW9kdWxvICovIHx8XG4gICAgICAgICAgICAgICAgY2ggPT09IFwifFwiIC8qIFRva2VuQ2hhcnMuUGlwZSAqLyB8fFxuICAgICAgICAgICAgICAgIGNoID09PSBcIjpcIiAvKiBUb2tlbkNoYXJzLkxpbmtlZERlbGltaXRlciAqLyB8fFxuICAgICAgICAgICAgICAgIGNoID09PSBcIi5cIiAvKiBUb2tlbkNoYXJzLkxpbmtlZERvdCAqLyB8fFxuICAgICAgICAgICAgICAgIGNoID09PSBDSEFSX1NQIHx8XG4gICAgICAgICAgICAgICAgIWNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IENIQVJfTEYpIHtcbiAgICAgICAgICAgICAgICBzY25yLnBlZWsoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG90aGVyIGNoYXJhY3RlcnNcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNJZGVudGlmaWVyU3RhcnQoY2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXQgPSBmbigpO1xuICAgICAgICBzY25yLnJlc2V0UGVlaygpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1BsdXJhbFN0YXJ0KHNjbnIpIHtcbiAgICAgICAgcGVla1NwYWNlcyhzY25yKTtcbiAgICAgICAgY29uc3QgcmV0ID0gc2Nuci5jdXJyZW50UGVlaygpID09PSBcInxcIiAvKiBUb2tlbkNoYXJzLlBpcGUgKi87XG4gICAgICAgIHNjbnIucmVzZXRQZWVrKCk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRldGVjdE1vZHVsb1N0YXJ0KHNjbnIpIHtcbiAgICAgICAgY29uc3Qgc3BhY2VzID0gcGVla1NwYWNlcyhzY25yKTtcbiAgICAgICAgY29uc3QgcmV0ID0gc2Nuci5jdXJyZW50UGVlaygpID09PSBcIiVcIiAvKiBUb2tlbkNoYXJzLk1vZHVsbyAqLyAmJlxuICAgICAgICAgICAgc2Nuci5wZWVrKCkgPT09IFwie1wiIC8qIFRva2VuQ2hhcnMuQnJhY2VMZWZ0ICovO1xuICAgICAgICBzY25yLnJlc2V0UGVlaygpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXNNb2R1bG86IHJldCxcbiAgICAgICAgICAgIGhhc1NwYWNlOiBzcGFjZXMubGVuZ3RoID4gMFxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1RleHRTdGFydChzY25yLCByZXNldCA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgZm4gPSAoaGFzU3BhY2UgPSBmYWxzZSwgcHJldiA9ICcnLCBkZXRlY3RNb2R1bG8gPSBmYWxzZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRQZWVrKCk7XG4gICAgICAgICAgICBpZiAoY2ggPT09IFwie1wiIC8qIFRva2VuQ2hhcnMuQnJhY2VMZWZ0ICovKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXYgPT09IFwiJVwiIC8qIFRva2VuQ2hhcnMuTW9kdWxvICovID8gZmFsc2UgOiBoYXNTcGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBcIkBcIiAvKiBUb2tlbkNoYXJzLkxpbmtlZEFsaWFzICovIHx8ICFjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2ID09PSBcIiVcIiAvKiBUb2tlbkNoYXJzLk1vZHVsbyAqLyA/IHRydWUgOiBoYXNTcGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBcIiVcIiAvKiBUb2tlbkNoYXJzLk1vZHVsbyAqLykge1xuICAgICAgICAgICAgICAgIHNjbnIucGVlaygpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmbihoYXNTcGFjZSwgXCIlXCIgLyogVG9rZW5DaGFycy5Nb2R1bG8gKi8sIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IFwifFwiIC8qIFRva2VuQ2hhcnMuUGlwZSAqLykge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2ID09PSBcIiVcIiAvKiBUb2tlbkNoYXJzLk1vZHVsbyAqLyB8fCBkZXRlY3RNb2R1bG9cbiAgICAgICAgICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICAgICAgICAgIDogIShwcmV2ID09PSBDSEFSX1NQIHx8IHByZXYgPT09IENIQVJfTEYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IENIQVJfU1ApIHtcbiAgICAgICAgICAgICAgICBzY25yLnBlZWsoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4odHJ1ZSwgQ0hBUl9TUCwgZGV0ZWN0TW9kdWxvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBDSEFSX0xGKSB7XG4gICAgICAgICAgICAgICAgc2Nuci5wZWVrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKHRydWUsIENIQVJfTEYsIGRldGVjdE1vZHVsbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmV0ID0gZm4oKTtcbiAgICAgICAgcmVzZXQgJiYgc2Nuci5yZXNldFBlZWsoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgZnVuY3Rpb24gdGFrZUNoYXIoc2NuciwgZm4pIHtcbiAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XG4gICAgICAgIGlmIChjaCA9PT0gRU9GKSB7XG4gICAgICAgICAgICByZXR1cm4gRU9GO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmbihjaCkpIHtcbiAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgcmV0dXJuIGNoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0YWtlSWRlbnRpZmllckNoYXIoc2Nucikge1xuICAgICAgICBjb25zdCBjbG9zdXJlID0gKGNoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjYyA9IGNoLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICByZXR1cm4gKChjYyA+PSA5NyAmJiBjYyA8PSAxMjIpIHx8IC8vIGEtelxuICAgICAgICAgICAgICAgIChjYyA+PSA2NSAmJiBjYyA8PSA5MCkgfHwgLy8gQS1aXG4gICAgICAgICAgICAgICAgKGNjID49IDQ4ICYmIGNjIDw9IDU3KSB8fCAvLyAwLTlcbiAgICAgICAgICAgICAgICBjYyA9PT0gOTUgfHwgLy8gX1xuICAgICAgICAgICAgICAgIGNjID09PSAzNiAvLyAkXG4gICAgICAgICAgICApO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGFrZUNoYXIoc2NuciwgY2xvc3VyZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRha2VEaWdpdChzY25yKSB7XG4gICAgICAgIGNvbnN0IGNsb3N1cmUgPSAoY2gpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNjID0gY2guY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgIHJldHVybiBjYyA+PSA0OCAmJiBjYyA8PSA1NzsgLy8gMC05XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0YWtlQ2hhcihzY25yLCBjbG9zdXJlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdGFrZUhleERpZ2l0KHNjbnIpIHtcbiAgICAgICAgY29uc3QgY2xvc3VyZSA9IChjaCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2MgPSBjaC5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgcmV0dXJuICgoY2MgPj0gNDggJiYgY2MgPD0gNTcpIHx8IC8vIDAtOVxuICAgICAgICAgICAgICAgIChjYyA+PSA2NSAmJiBjYyA8PSA3MCkgfHwgLy8gQS1GXG4gICAgICAgICAgICAgICAgKGNjID49IDk3ICYmIGNjIDw9IDEwMikpOyAvLyBhLWZcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRha2VDaGFyKHNjbnIsIGNsb3N1cmUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXREaWdpdHMoc2Nucikge1xuICAgICAgICBsZXQgY2ggPSAnJztcbiAgICAgICAgbGV0IG51bSA9ICcnO1xuICAgICAgICB3aGlsZSAoKGNoID0gdGFrZURpZ2l0KHNjbnIpKSkge1xuICAgICAgICAgICAgbnVtICs9IGNoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRNb2R1bG8oc2Nucikge1xuICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICBjb25zdCBjaCA9IHNjbnIuY3VycmVudENoYXIoKTtcbiAgICAgICAgaWYgKGNoICE9PSBcIiVcIiAvKiBUb2tlbkNoYXJzLk1vZHVsbyAqLykge1xuICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLkVYUEVDVEVEX1RPS0VOLCBjdXJyZW50UG9zaXRpb24oKSwgMCwgY2gpO1xuICAgICAgICB9XG4gICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICByZXR1cm4gXCIlXCIgLyogVG9rZW5DaGFycy5Nb2R1bG8gKi87XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRUZXh0KHNjbnIpIHtcbiAgICAgICAgbGV0IGJ1ZiA9ICcnO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XG4gICAgICAgICAgICBpZiAoY2ggPT09IFwie1wiIC8qIFRva2VuQ2hhcnMuQnJhY2VMZWZ0ICovIHx8XG4gICAgICAgICAgICAgICAgY2ggPT09IFwifVwiIC8qIFRva2VuQ2hhcnMuQnJhY2VSaWdodCAqLyB8fFxuICAgICAgICAgICAgICAgIGNoID09PSBcIkBcIiAvKiBUb2tlbkNoYXJzLkxpbmtlZEFsaWFzICovIHx8XG4gICAgICAgICAgICAgICAgY2ggPT09IFwifFwiIC8qIFRva2VuQ2hhcnMuUGlwZSAqLyB8fFxuICAgICAgICAgICAgICAgICFjaCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IFwiJVwiIC8qIFRva2VuQ2hhcnMuTW9kdWxvICovKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzVGV4dFN0YXJ0KHNjbnIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1ZiArPSBjaDtcbiAgICAgICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gQ0hBUl9TUCB8fCBjaCA9PT0gQ0hBUl9MRikge1xuICAgICAgICAgICAgICAgIGlmIChpc1RleHRTdGFydChzY25yKSkge1xuICAgICAgICAgICAgICAgICAgICBidWYgKz0gY2g7XG4gICAgICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc1BsdXJhbFN0YXJ0KHNjbnIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmICs9IGNoO1xuICAgICAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWYgKz0gY2g7XG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZE5hbWVkSWRlbnRpZmllcihzY25yKSB7XG4gICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgIGxldCBjaCA9ICcnO1xuICAgICAgICBsZXQgbmFtZSA9ICcnO1xuICAgICAgICB3aGlsZSAoKGNoID0gdGFrZUlkZW50aWZpZXJDaGFyKHNjbnIpKSkge1xuICAgICAgICAgICAgbmFtZSArPSBjaDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2Nuci5jdXJyZW50Q2hhcigpID09PSBFT0YpIHtcbiAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTlRFUk1JTkFURURfQ0xPU0lOR19CUkFDRSwgY3VycmVudFBvc2l0aW9uKCksIDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWFkTGlzdElkZW50aWZpZXIoc2Nucikge1xuICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICBsZXQgdmFsdWUgPSAnJztcbiAgICAgICAgaWYgKHNjbnIuY3VycmVudENoYXIoKSA9PT0gJy0nKSB7XG4gICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgIHZhbHVlICs9IGAtJHtnZXREaWdpdHMoc2Nucil9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlICs9IGdldERpZ2l0cyhzY25yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2Nuci5jdXJyZW50Q2hhcigpID09PSBFT0YpIHtcbiAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTlRFUk1JTkFURURfQ0xPU0lOR19CUkFDRSwgY3VycmVudFBvc2l0aW9uKCksIDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZExpdGVyYWwoc2Nucikge1xuICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICBlYXQoc2NuciwgYFxcJ2ApO1xuICAgICAgICBsZXQgY2ggPSAnJztcbiAgICAgICAgbGV0IGxpdGVyYWwgPSAnJztcbiAgICAgICAgY29uc3QgZm4gPSAoeCkgPT4geCAhPT0gTElURVJBTF9ERUxJTUlURVIgJiYgeCAhPT0gQ0hBUl9MRjtcbiAgICAgICAgd2hpbGUgKChjaCA9IHRha2VDaGFyKHNjbnIsIGZuKSkpIHtcbiAgICAgICAgICAgIGlmIChjaCA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgICAgbGl0ZXJhbCArPSByZWFkRXNjYXBlU2VxdWVuY2Uoc2Nucik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaXRlcmFsICs9IGNoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBzY25yLmN1cnJlbnRDaGFyKCk7XG4gICAgICAgIGlmIChjdXJyZW50ID09PSBDSEFSX0xGIHx8IGN1cnJlbnQgPT09IEVPRikge1xuICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOVEVSTUlOQVRFRF9TSU5HTEVfUVVPVEVfSU5fUExBQ0VIT0xERVIsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcbiAgICAgICAgICAgIC8vIFRPRE86IElzIGl0IGNvcnJlY3QgcmVhbGx5P1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT09IENIQVJfTEYpIHtcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgICAgICBlYXQoc2NuciwgYFxcJ2ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpdGVyYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWF0KHNjbnIsIGBcXCdgKTtcbiAgICAgICAgcmV0dXJuIGxpdGVyYWw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRFc2NhcGVTZXF1ZW5jZShzY25yKSB7XG4gICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50Q2hhcigpO1xuICAgICAgICBzd2l0Y2ggKGNoKSB7XG4gICAgICAgICAgICBjYXNlICdcXFxcJzpcbiAgICAgICAgICAgIGNhc2UgYFxcJ2A6XG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBcXFxcJHtjaH1gO1xuICAgICAgICAgICAgY2FzZSAndSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRVbmljb2RlRXNjYXBlU2VxdWVuY2Uoc2NuciwgY2gsIDQpO1xuICAgICAgICAgICAgY2FzZSAnVSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRVbmljb2RlRXNjYXBlU2VxdWVuY2Uoc2NuciwgY2gsIDYpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuVU5LTk9XTl9FU0NBUEVfU0VRVUVOQ0UsIGN1cnJlbnRQb3NpdGlvbigpLCAwLCBjaCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRVbmljb2RlRXNjYXBlU2VxdWVuY2Uoc2NuciwgdW5pY29kZSwgZGlnaXRzKSB7XG4gICAgICAgIGVhdChzY25yLCB1bmljb2RlKTtcbiAgICAgICAgbGV0IHNlcXVlbmNlID0gJyc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlnaXRzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNoID0gdGFrZUhleERpZ2l0KHNjbnIpO1xuICAgICAgICAgICAgaWYgKCFjaCkge1xuICAgICAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5JTlZBTElEX1VOSUNPREVfRVNDQVBFX1NFUVVFTkNFLCBjdXJyZW50UG9zaXRpb24oKSwgMCwgYFxcXFwke3VuaWNvZGV9JHtzZXF1ZW5jZX0ke3NjbnIuY3VycmVudENoYXIoKX1gKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlcXVlbmNlICs9IGNoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgXFxcXCR7dW5pY29kZX0ke3NlcXVlbmNlfWA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWRJbnZhbGlkSWRlbnRpZmllcihzY25yKSB7XG4gICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgIGxldCBjaCA9ICcnO1xuICAgICAgICBsZXQgaWRlbnRpZmllcnMgPSAnJztcbiAgICAgICAgY29uc3QgY2xvc3VyZSA9IChjaCkgPT4gY2ggIT09IFwie1wiIC8qIFRva2VuQ2hhcnMuQnJhY2VMZWZ0ICovICYmXG4gICAgICAgICAgICBjaCAhPT0gXCJ9XCIgLyogVG9rZW5DaGFycy5CcmFjZVJpZ2h0ICovICYmXG4gICAgICAgICAgICBjaCAhPT0gQ0hBUl9TUCAmJlxuICAgICAgICAgICAgY2ggIT09IENIQVJfTEY7XG4gICAgICAgIHdoaWxlICgoY2ggPSB0YWtlQ2hhcihzY25yLCBjbG9zdXJlKSkpIHtcbiAgICAgICAgICAgIGlkZW50aWZpZXJzICs9IGNoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZGVudGlmaWVycztcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhZExpbmtlZE1vZGlmaWVyKHNjbnIpIHtcbiAgICAgICAgbGV0IGNoID0gJyc7XG4gICAgICAgIGxldCBuYW1lID0gJyc7XG4gICAgICAgIHdoaWxlICgoY2ggPSB0YWtlSWRlbnRpZmllckNoYXIoc2NucikpKSB7XG4gICAgICAgICAgICBuYW1lICs9IGNoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWFkTGlua2VkUmVmZXIoc2Nucikge1xuICAgICAgICBjb25zdCBmbiA9IChkZXRlY3QgPSBmYWxzZSwgYnVmKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaCA9IHNjbnIuY3VycmVudENoYXIoKTtcbiAgICAgICAgICAgIGlmIChjaCA9PT0gXCJ7XCIgLyogVG9rZW5DaGFycy5CcmFjZUxlZnQgKi8gfHxcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCIlXCIgLyogVG9rZW5DaGFycy5Nb2R1bG8gKi8gfHxcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCJAXCIgLyogVG9rZW5DaGFycy5MaW5rZWRBbGlhcyAqLyB8fFxuICAgICAgICAgICAgICAgIGNoID09PSBcInxcIiAvKiBUb2tlbkNoYXJzLlBpcGUgKi8gfHxcbiAgICAgICAgICAgICAgICAhY2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IENIQVJfU1ApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IENIQVJfTEYgfHwgY2ggPT09IERPVCkge1xuICAgICAgICAgICAgICAgIGJ1ZiArPSBjaDtcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4oZGV0ZWN0LCBidWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIWlzSWRlbnRpZmllclN0YXJ0KGNoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBidWY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWYgKz0gY2g7XG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKHRydWUsIGJ1Zik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmbihmYWxzZSwgJycpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWFkUGx1cmFsKHNjbnIpIHtcbiAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgY29uc3QgcGx1cmFsID0gZWF0KHNjbnIsIFwifFwiIC8qIFRva2VuQ2hhcnMuUGlwZSAqLyk7XG4gICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgIHJldHVybiBwbHVyYWw7XG4gICAgfVxuICAgIC8vIFRPRE86IFdlIG5lZWQgcmVmYWN0b3Jpbmcgb2YgdG9rZW4gcGFyc2luZyAuLi5cbiAgICBmdW5jdGlvbiByZWFkVG9rZW5JblBsYWNlaG9sZGVyKHNjbnIsIGNvbnRleHQpIHtcbiAgICAgICAgbGV0IHRva2VuID0gbnVsbDtcbiAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XG4gICAgICAgIHN3aXRjaCAoY2gpIHtcbiAgICAgICAgICAgIGNhc2UgXCJ7XCIgLyogVG9rZW5DaGFycy5CcmFjZUxlZnQgKi86XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuYnJhY2VOZXN0ID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLk5PVF9BTExPV19ORVNUX1BMQUNFSE9MREVSLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgMiAvKiBUb2tlblR5cGVzLkJyYWNlTGVmdCAqLywgXCJ7XCIgLyogVG9rZW5DaGFycy5CcmFjZUxlZnQgKi8pO1xuICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgICAgICBjYXNlIFwifVwiIC8qIFRva2VuQ2hhcnMuQnJhY2VSaWdodCAqLzpcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5icmFjZU5lc3QgPiAwICYmXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY3VycmVudFR5cGUgPT09IDIgLyogVG9rZW5UeXBlcy5CcmFjZUxlZnQgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLkVNUFRZX1BMQUNFSE9MREVSLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgMyAvKiBUb2tlblR5cGVzLkJyYWNlUmlnaHQgKi8sIFwifVwiIC8qIFRva2VuQ2hhcnMuQnJhY2VSaWdodCAqLyk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QtLTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCA+IDAgJiYgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5pbkxpbmtlZCAmJiBjb250ZXh0LmJyYWNlTmVzdCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmluTGlua2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgIGNhc2UgXCJAXCIgLyogVG9rZW5DaGFycy5MaW5rZWRBbGlhcyAqLzpcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5icmFjZU5lc3QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTlRFUk1JTkFURURfQ0xPU0lOR19CUkFDRSwgY3VycmVudFBvc2l0aW9uKCksIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b2tlbiA9IHJlYWRUb2tlbkluTGlua2VkKHNjbnIsIGNvbnRleHQpIHx8IGdldEVuZFRva2VuKGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2VOZXN0ID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGxldCB2YWxpZE5hbWVkSWRlbnRpZmllciA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IHZhbGlkTGlzdElkZW50aWZpZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCB2YWxpZExpdGVyYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChpc1BsdXJhbFN0YXJ0KHNjbnIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LmJyYWNlTmVzdCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTlRFUk1JTkFURURfQ0xPU0lOR19CUkFDRSwgY3VycmVudFBvc2l0aW9uKCksIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgMSAvKiBUb2tlblR5cGVzLlBpcGUgKi8sIHJlYWRQbHVyYWwoc2NucikpO1xuICAgICAgICAgICAgICAgICAgICAvLyByZXNldFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuaW5MaW5rZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5icmFjZU5lc3QgPiAwICYmXG4gICAgICAgICAgICAgICAgICAgIChjb250ZXh0LmN1cnJlbnRUeXBlID09PSA1IC8qIFRva2VuVHlwZXMuTmFtZWQgKi8gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY3VycmVudFR5cGUgPT09IDYgLyogVG9rZW5UeXBlcy5MaXN0ICovIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmN1cnJlbnRUeXBlID09PSA3IC8qIFRva2VuVHlwZXMuTGl0ZXJhbCAqLykpIHtcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2VOZXN0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRUb2tlbihzY25yLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCh2YWxpZE5hbWVkSWRlbnRpZmllciA9IGlzTmFtZWRJZGVudGlmaWVyU3RhcnQoc2NuciwgY29udGV4dCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgNSAvKiBUb2tlblR5cGVzLk5hbWVkICovLCByZWFkTmFtZWRJZGVudGlmaWVyKHNjbnIpKTtcbiAgICAgICAgICAgICAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKHZhbGlkTGlzdElkZW50aWZpZXIgPSBpc0xpc3RJZGVudGlmaWVyU3RhcnQoc2NuciwgY29udGV4dCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgNiAvKiBUb2tlblR5cGVzLkxpc3QgKi8sIHJlYWRMaXN0SWRlbnRpZmllcihzY25yKSk7XG4gICAgICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCh2YWxpZExpdGVyYWwgPSBpc0xpdGVyYWxTdGFydChzY25yLCBjb250ZXh0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCA3IC8qIFRva2VuVHlwZXMuTGl0ZXJhbCAqLywgcmVhZExpdGVyYWwoc2NucikpO1xuICAgICAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdmFsaWROYW1lZElkZW50aWZpZXIgJiYgIXZhbGlkTGlzdElkZW50aWZpZXIgJiYgIXZhbGlkTGl0ZXJhbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB3ZSBzaG91bGQgYmUgcmUtZGVzaWduZWQgaW52YWxpZCBjYXNlcywgd2hlbiB3ZSB3aWxsIGV4dGVuZCBtZXNzYWdlIHN5bnRheCBuZWFyIHRoZSBmdXR1cmUgLi4uXG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgMTMgLyogVG9rZW5UeXBlcy5JbnZhbGlkUGxhY2UgKi8sIHJlYWRJbnZhbGlkSWRlbnRpZmllcihzY25yKSk7XG4gICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5JTlZBTElEX1RPS0VOX0lOX1BMQUNFSE9MREVSLCBjdXJyZW50UG9zaXRpb24oKSwgMCwgdG9rZW4udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG4gICAgLy8gVE9ETzogV2UgbmVlZCByZWZhY3RvcmluZyBvZiB0b2tlbiBwYXJzaW5nIC4uLlxuICAgIGZ1bmN0aW9uIHJlYWRUb2tlbkluTGlua2VkKHNjbnIsIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSB9ID0gY29udGV4dDtcbiAgICAgICAgbGV0IHRva2VuID0gbnVsbDtcbiAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XG4gICAgICAgIGlmICgoY3VycmVudFR5cGUgPT09IDggLyogVG9rZW5UeXBlcy5MaW5rZWRBbGlhcyAqLyB8fFxuICAgICAgICAgICAgY3VycmVudFR5cGUgPT09IDkgLyogVG9rZW5UeXBlcy5MaW5rZWREb3QgKi8gfHxcbiAgICAgICAgICAgIGN1cnJlbnRUeXBlID09PSAxMiAvKiBUb2tlblR5cGVzLkxpbmtlZE1vZGlmaWVyICovIHx8XG4gICAgICAgICAgICBjdXJyZW50VHlwZSA9PT0gMTAgLyogVG9rZW5UeXBlcy5MaW5rZWREZWxpbWl0ZXIgKi8pICYmXG4gICAgICAgICAgICAoY2ggPT09IENIQVJfTEYgfHwgY2ggPT09IENIQVJfU1ApKSB7XG4gICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuSU5WQUxJRF9MSU5LRURfRk9STUFULCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChjaCkge1xuICAgICAgICAgICAgY2FzZSBcIkBcIiAvKiBUb2tlbkNoYXJzLkxpbmtlZEFsaWFzICovOlxuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgOCAvKiBUb2tlblR5cGVzLkxpbmtlZEFsaWFzICovLCBcIkBcIiAvKiBUb2tlbkNoYXJzLkxpbmtlZEFsaWFzICovKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmluTGlua2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgICAgICBjYXNlIFwiLlwiIC8qIFRva2VuQ2hhcnMuTGlua2VkRG90ICovOlxuICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldFRva2VuKGNvbnRleHQsIDkgLyogVG9rZW5UeXBlcy5MaW5rZWREb3QgKi8sIFwiLlwiIC8qIFRva2VuQ2hhcnMuTGlua2VkRG90ICovKTtcbiAgICAgICAgICAgIGNhc2UgXCI6XCIgLyogVG9rZW5DaGFycy5MaW5rZWREZWxpbWl0ZXIgKi86XG4gICAgICAgICAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0VG9rZW4oY29udGV4dCwgMTAgLyogVG9rZW5UeXBlcy5MaW5rZWREZWxpbWl0ZXIgKi8sIFwiOlwiIC8qIFRva2VuQ2hhcnMuTGlua2VkRGVsaW1pdGVyICovKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKGlzUGx1cmFsU3RhcnQoc2NucikpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCAxIC8qIFRva2VuVHlwZXMuUGlwZSAqLywgcmVhZFBsdXJhbChzY25yKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc2V0XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2VOZXN0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5pbkxpbmtlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc0xpbmtlZERvdFN0YXJ0KHNjbnIsIGNvbnRleHQpIHx8XG4gICAgICAgICAgICAgICAgICAgIGlzTGlua2VkRGVsaW1pdGVyU3RhcnQoc2NuciwgY29udGV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRUb2tlbkluTGlua2VkKHNjbnIsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNMaW5rZWRNb2RpZmllclN0YXJ0KHNjbnIsIGNvbnRleHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRUb2tlbihjb250ZXh0LCAxMiAvKiBUb2tlblR5cGVzLkxpbmtlZE1vZGlmaWVyICovLCByZWFkTGlua2VkTW9kaWZpZXIoc2NucikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNMaW5rZWRSZWZlclN0YXJ0KHNjbnIsIGNvbnRleHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gXCJ7XCIgLyogVG9rZW5DaGFycy5CcmFjZUxlZnQgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNjYW4gdGhlIHBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFRva2VuSW5QbGFjZWhvbGRlcihzY25yLCBjb250ZXh0KSB8fCB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRUb2tlbihjb250ZXh0LCAxMSAvKiBUb2tlblR5cGVzLkxpbmtlZEtleSAqLywgcmVhZExpbmtlZFJlZmVyKHNjbnIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFR5cGUgPT09IDggLyogVG9rZW5UeXBlcy5MaW5rZWRBbGlhcyAqLykge1xuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuSU5WQUxJRF9MSU5LRURfRk9STUFULCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2VOZXN0ID0gMDtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmluTGlua2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRUb2tlbihzY25yLCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBUT0RPOiBXZSBuZWVkIHJlZmFjdG9yaW5nIG9mIHRva2VuIHBhcnNpbmcgLi4uXG4gICAgZnVuY3Rpb24gcmVhZFRva2VuKHNjbnIsIGNvbnRleHQpIHtcbiAgICAgICAgbGV0IHRva2VuID0geyB0eXBlOiAxNCAvKiBUb2tlblR5cGVzLkVPRiAqLyB9O1xuICAgICAgICBpZiAoY29udGV4dC5icmFjZU5lc3QgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVhZFRva2VuSW5QbGFjZWhvbGRlcihzY25yLCBjb250ZXh0KSB8fCBnZXRFbmRUb2tlbihjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGV4dC5pbkxpbmtlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlYWRUb2tlbkluTGlua2VkKHNjbnIsIGNvbnRleHQpIHx8IGdldEVuZFRva2VuKGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50Q2hhcigpO1xuICAgICAgICBzd2l0Y2ggKGNoKSB7XG4gICAgICAgICAgICBjYXNlIFwie1wiIC8qIFRva2VuQ2hhcnMuQnJhY2VMZWZ0ICovOlxuICAgICAgICAgICAgICAgIHJldHVybiByZWFkVG9rZW5JblBsYWNlaG9sZGVyKHNjbnIsIGNvbnRleHQpIHx8IGdldEVuZFRva2VuKGNvbnRleHQpO1xuICAgICAgICAgICAgY2FzZSBcIn1cIiAvKiBUb2tlbkNoYXJzLkJyYWNlUmlnaHQgKi86XG4gICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOQkFMQU5DRURfQ0xPU0lOR19CUkFDRSwgY3VycmVudFBvc2l0aW9uKCksIDApO1xuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRUb2tlbihjb250ZXh0LCAzIC8qIFRva2VuVHlwZXMuQnJhY2VSaWdodCAqLywgXCJ9XCIgLyogVG9rZW5DaGFycy5CcmFjZVJpZ2h0ICovKTtcbiAgICAgICAgICAgIGNhc2UgXCJAXCIgLyogVG9rZW5DaGFycy5MaW5rZWRBbGlhcyAqLzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFRva2VuSW5MaW5rZWQoc2NuciwgY29udGV4dCkgfHwgZ2V0RW5kVG9rZW4oY29udGV4dCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmIChpc1BsdXJhbFN0YXJ0KHNjbnIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgMSAvKiBUb2tlblR5cGVzLlBpcGUgKi8sIHJlYWRQbHVyYWwoc2NucikpO1xuICAgICAgICAgICAgICAgICAgICAvLyByZXNldFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuaW5MaW5rZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB7IGlzTW9kdWxvLCBoYXNTcGFjZSB9ID0gZGV0ZWN0TW9kdWxvU3RhcnQoc2Nucik7XG4gICAgICAgICAgICAgICAgaWYgKGlzTW9kdWxvKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNTcGFjZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBnZXRUb2tlbihjb250ZXh0LCAwIC8qIFRva2VuVHlwZXMuVGV4dCAqLywgcmVhZFRleHQoc2NucikpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGdldFRva2VuKGNvbnRleHQsIDQgLyogVG9rZW5UeXBlcy5Nb2R1bG8gKi8sIHJlYWRNb2R1bG8oc2NucikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNUZXh0U3RhcnQoc2NucikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldFRva2VuKGNvbnRleHQsIDAgLyogVG9rZW5UeXBlcy5UZXh0ICovLCByZWFkVGV4dChzY25yKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gbmV4dFRva2VuKCkge1xuICAgICAgICBjb25zdCB7IGN1cnJlbnRUeXBlLCBvZmZzZXQsIHN0YXJ0TG9jLCBlbmRMb2MgfSA9IF9jb250ZXh0O1xuICAgICAgICBfY29udGV4dC5sYXN0VHlwZSA9IGN1cnJlbnRUeXBlO1xuICAgICAgICBfY29udGV4dC5sYXN0T2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICBfY29udGV4dC5sYXN0U3RhcnRMb2MgPSBzdGFydExvYztcbiAgICAgICAgX2NvbnRleHQubGFzdEVuZExvYyA9IGVuZExvYztcbiAgICAgICAgX2NvbnRleHQub2Zmc2V0ID0gY3VycmVudE9mZnNldCgpO1xuICAgICAgICBfY29udGV4dC5zdGFydExvYyA9IGN1cnJlbnRQb3NpdGlvbigpO1xuICAgICAgICBpZiAoX3NjbnIuY3VycmVudENoYXIoKSA9PT0gRU9GKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0VG9rZW4oX2NvbnRleHQsIDE0IC8qIFRva2VuVHlwZXMuRU9GICovKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVhZFRva2VuKF9zY25yLCBfY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIG5leHRUb2tlbixcbiAgICAgICAgY3VycmVudE9mZnNldCxcbiAgICAgICAgY3VycmVudFBvc2l0aW9uLFxuICAgICAgICBjb250ZXh0XG4gICAgfTtcbn1cblxuY29uc3QgRVJST1JfRE9NQUlOJDIgPSAncGFyc2VyJztcbi8vIEJhY2tzbGFzaCBiYWNrc2xhc2gsIGJhY2tzbGFzaCBxdW90ZSwgdUhISEgsIFVISEhISEguXG5jb25zdCBLTk9XTl9FU0NBUEVTID0gLyg/OlxcXFxcXFxcfFxcXFwnfFxcXFx1KFswLTlhLWZBLUZdezR9KXxcXFxcVShbMC05YS1mQS1GXXs2fSkpL2c7XG5mdW5jdGlvbiBmcm9tRXNjYXBlU2VxdWVuY2UobWF0Y2gsIGNvZGVQb2ludDQsIGNvZGVQb2ludDYpIHtcbiAgICBzd2l0Y2ggKG1hdGNoKSB7XG4gICAgICAgIGNhc2UgYFxcXFxcXFxcYDpcbiAgICAgICAgICAgIHJldHVybiBgXFxcXGA7XG4gICAgICAgIGNhc2UgYFxcXFxcXCdgOlxuICAgICAgICAgICAgcmV0dXJuIGBcXCdgO1xuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICBjb25zdCBjb2RlUG9pbnQgPSBwYXJzZUludChjb2RlUG9pbnQ0IHx8IGNvZGVQb2ludDYsIDE2KTtcbiAgICAgICAgICAgIGlmIChjb2RlUG9pbnQgPD0gMHhkN2ZmIHx8IGNvZGVQb2ludCA+PSAweGUwMDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGludmFsaWQgLi4uXG4gICAgICAgICAgICAvLyBSZXBsYWNlIHRoZW0gd2l0aCBVK0ZGRkQgUkVQTEFDRU1FTlQgQ0hBUkFDVEVSLlxuICAgICAgICAgICAgcmV0dXJuICfvv70nO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlUGFyc2VyKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gb3B0aW9ucy5sb2NhdGlvbiAhPT0gZmFsc2U7XG4gICAgY29uc3QgeyBvbkVycm9yIH0gPSBvcHRpb25zO1xuICAgIGZ1bmN0aW9uIGVtaXRFcnJvcih0b2tlbnplciwgY29kZSwgc3RhcnQsIG9mZnNldCwgLi4uYXJncykge1xuICAgICAgICBjb25zdCBlbmQgPSB0b2tlbnplci5jdXJyZW50UG9zaXRpb24oKTtcbiAgICAgICAgZW5kLm9mZnNldCArPSBvZmZzZXQ7XG4gICAgICAgIGVuZC5jb2x1bW4gKz0gb2Zmc2V0O1xuICAgICAgICBpZiAob25FcnJvcikge1xuICAgICAgICAgICAgY29uc3QgbG9jID0gbG9jYXRpb24gPyBjcmVhdGVMb2NhdGlvbihzdGFydCwgZW5kKSA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBjcmVhdGVDb21waWxlRXJyb3IoY29kZSwgbG9jLCB7XG4gICAgICAgICAgICAgICAgZG9tYWluOiBFUlJPUl9ET01BSU4kMixcbiAgICAgICAgICAgICAgICBhcmdzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9uRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzdGFydE5vZGUodHlwZSwgb2Zmc2V0LCBsb2MpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHsgdHlwZSB9O1xuICAgICAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgICAgICAgIG5vZGUuc3RhcnQgPSBvZmZzZXQ7XG4gICAgICAgICAgICBub2RlLmVuZCA9IG9mZnNldDtcbiAgICAgICAgICAgIG5vZGUubG9jID0geyBzdGFydDogbG9jLCBlbmQ6IGxvYyB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlbmROb2RlKG5vZGUsIG9mZnNldCwgcG9zLCB0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICBub2RlLnR5cGUgPSB0eXBlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgICAgICAgbm9kZS5lbmQgPSBvZmZzZXQ7XG4gICAgICAgICAgICBpZiAobm9kZS5sb2MpIHtcbiAgICAgICAgICAgICAgICBub2RlLmxvYy5lbmQgPSBwb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VUZXh0KHRva2VuaXplciwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFydE5vZGUoMyAvKiBOb2RlVHlwZXMuVGV4dCAqLywgY29udGV4dC5vZmZzZXQsIGNvbnRleHQuc3RhcnRMb2MpO1xuICAgICAgICBub2RlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlTGlzdCh0b2tlbml6ZXIsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xuICAgICAgICBjb25zdCB7IGxhc3RPZmZzZXQ6IG9mZnNldCwgbGFzdFN0YXJ0TG9jOiBsb2MgfSA9IGNvbnRleHQ7IC8vIGdldCBicmFjZSBsZWZ0IGxvY1xuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDUgLyogTm9kZVR5cGVzLkxpc3QgKi8sIG9mZnNldCwgbG9jKTtcbiAgICAgICAgbm9kZS5pbmRleCA9IHBhcnNlSW50KGluZGV4LCAxMCk7XG4gICAgICAgIHRva2VuaXplci5uZXh0VG9rZW4oKTsgLy8gc2tpcCBicmFjaCByaWdodFxuICAgICAgICBlbmROb2RlKG5vZGUsIHRva2VuaXplci5jdXJyZW50T2Zmc2V0KCksIHRva2VuaXplci5jdXJyZW50UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZU5hbWVkKHRva2VuaXplciwga2V5KSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xuICAgICAgICBjb25zdCB7IGxhc3RPZmZzZXQ6IG9mZnNldCwgbGFzdFN0YXJ0TG9jOiBsb2MgfSA9IGNvbnRleHQ7IC8vIGdldCBicmFjZSBsZWZ0IGxvY1xuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDQgLyogTm9kZVR5cGVzLk5hbWVkICovLCBvZmZzZXQsIGxvYyk7XG4gICAgICAgIG5vZGUua2V5ID0ga2V5O1xuICAgICAgICB0b2tlbml6ZXIubmV4dFRva2VuKCk7IC8vIHNraXAgYnJhY2ggcmlnaHRcbiAgICAgICAgZW5kTm9kZShub2RlLCB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpLCB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCkpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VMaXRlcmFsKHRva2VuaXplciwgdmFsdWUpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XG4gICAgICAgIGNvbnN0IHsgbGFzdE9mZnNldDogb2Zmc2V0LCBsYXN0U3RhcnRMb2M6IGxvYyB9ID0gY29udGV4dDsgLy8gZ2V0IGJyYWNlIGxlZnQgbG9jXG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFydE5vZGUoOSAvKiBOb2RlVHlwZXMuTGl0ZXJhbCAqLywgb2Zmc2V0LCBsb2MpO1xuICAgICAgICBub2RlLnZhbHVlID0gdmFsdWUucmVwbGFjZShLTk9XTl9FU0NBUEVTLCBmcm9tRXNjYXBlU2VxdWVuY2UpO1xuICAgICAgICB0b2tlbml6ZXIubmV4dFRva2VuKCk7IC8vIHNraXAgYnJhY2ggcmlnaHRcbiAgICAgICAgZW5kTm9kZShub2RlLCB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpLCB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCkpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VMaW5rZWRNb2RpZmllcih0b2tlbml6ZXIpIHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbml6ZXIubmV4dFRva2VuKCk7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xuICAgICAgICBjb25zdCB7IGxhc3RPZmZzZXQ6IG9mZnNldCwgbGFzdFN0YXJ0TG9jOiBsb2MgfSA9IGNvbnRleHQ7IC8vIGdldCBsaW5rZWQgZG90IGxvY1xuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDggLyogTm9kZVR5cGVzLkxpbmtlZE1vZGlmaWVyICovLCBvZmZzZXQsIGxvYyk7XG4gICAgICAgIGlmICh0b2tlbi50eXBlICE9PSAxMiAvKiBUb2tlblR5cGVzLkxpbmtlZE1vZGlmaWVyICovKSB7XG4gICAgICAgICAgICAvLyBlbXB0eSBtb2RpZmllclxuICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FTVBUWV9MSU5LRURfTU9ESUZJRVIsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwKTtcbiAgICAgICAgICAgIG5vZGUudmFsdWUgPSAnJztcbiAgICAgICAgICAgIGVuZE5vZGUobm9kZSwgb2Zmc2V0LCBsb2MpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBuZXh0Q29uc3VtZVRva2VuOiB0b2tlbixcbiAgICAgICAgICAgICAgICBub2RlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIGNoZWNrIHRva2VuXG4gICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcbiAgICAgICAgfVxuICAgICAgICBub2RlLnZhbHVlID0gdG9rZW4udmFsdWUgfHwgJyc7XG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vZGVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VMaW5rZWRLZXkodG9rZW5pemVyLCB2YWx1ZSkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YXJ0Tm9kZSg3IC8qIE5vZGVUeXBlcy5MaW5rZWRLZXkgKi8sIGNvbnRleHQub2Zmc2V0LCBjb250ZXh0LnN0YXJ0TG9jKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBlbmROb2RlKG5vZGUsIHRva2VuaXplci5jdXJyZW50T2Zmc2V0KCksIHRva2VuaXplci5jdXJyZW50UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZUxpbmtlZCh0b2tlbml6ZXIpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XG4gICAgICAgIGNvbnN0IGxpbmtlZE5vZGUgPSBzdGFydE5vZGUoNiAvKiBOb2RlVHlwZXMuTGlua2VkICovLCBjb250ZXh0Lm9mZnNldCwgY29udGV4dC5zdGFydExvYyk7XG4gICAgICAgIGxldCB0b2tlbiA9IHRva2VuaXplci5uZXh0VG9rZW4oKTtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IDkgLyogVG9rZW5UeXBlcy5MaW5rZWREb3QgKi8pIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlTGlua2VkTW9kaWZpZXIodG9rZW5pemVyKTtcbiAgICAgICAgICAgIGxpbmtlZE5vZGUubW9kaWZpZXIgPSBwYXJzZWQubm9kZTtcbiAgICAgICAgICAgIHRva2VuID0gcGFyc2VkLm5leHRDb25zdW1lVG9rZW4gfHwgdG9rZW5pemVyLm5leHRUb2tlbigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFzc2V0IGNoZWNrIHRva2VuXG4gICAgICAgIGlmICh0b2tlbi50eXBlICE9PSAxMCAvKiBUb2tlblR5cGVzLkxpbmtlZERlbGltaXRlciAqLykge1xuICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XG4gICAgICAgIH1cbiAgICAgICAgdG9rZW4gPSB0b2tlbml6ZXIubmV4dFRva2VuKCk7XG4gICAgICAgIC8vIHNraXAgYnJhY2UgbGVmdFxuICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gMiAvKiBUb2tlblR5cGVzLkJyYWNlTGVmdCAqLykge1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbml6ZXIubmV4dFRva2VuKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIDExIC8qIFRva2VuVHlwZXMuTGlua2VkS2V5ICovOlxuICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsaW5rZWROb2RlLmtleSA9IHBhcnNlTGlua2VkS2V5KHRva2VuaXplciwgdG9rZW4udmFsdWUgfHwgJycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1IC8qIFRva2VuVHlwZXMuTmFtZWQgKi86XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxpbmtlZE5vZGUua2V5ID0gcGFyc2VOYW1lZCh0b2tlbml6ZXIsIHRva2VuLnZhbHVlIHx8ICcnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNiAvKiBUb2tlblR5cGVzLkxpc3QgKi86XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxpbmtlZE5vZGUua2V5ID0gcGFyc2VMaXN0KHRva2VuaXplciwgdG9rZW4udmFsdWUgfHwgJycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA3IC8qIFRva2VuVHlwZXMuTGl0ZXJhbCAqLzpcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGlua2VkTm9kZS5rZXkgPSBwYXJzZUxpdGVyYWwodG9rZW5pemVyLCB0b2tlbi52YWx1ZSB8fCAnJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIGVtcHR5IGtleVxuICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfRU1QVFlfTElOS0VEX0tFWSwgY29udGV4dC5sYXN0U3RhcnRMb2MsIDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRDb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbXB0eUxpbmtlZEtleU5vZGUgPSBzdGFydE5vZGUoNyAvKiBOb2RlVHlwZXMuTGlua2VkS2V5ICovLCBuZXh0Q29udGV4dC5vZmZzZXQsIG5leHRDb250ZXh0LnN0YXJ0TG9jKTtcbiAgICAgICAgICAgICAgICBlbXB0eUxpbmtlZEtleU5vZGUudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICBlbmROb2RlKGVtcHR5TGlua2VkS2V5Tm9kZSwgbmV4dENvbnRleHQub2Zmc2V0LCBuZXh0Q29udGV4dC5zdGFydExvYyk7XG4gICAgICAgICAgICAgICAgbGlua2VkTm9kZS5rZXkgPSBlbXB0eUxpbmtlZEtleU5vZGU7XG4gICAgICAgICAgICAgICAgZW5kTm9kZShsaW5rZWROb2RlLCBuZXh0Q29udGV4dC5vZmZzZXQsIG5leHRDb250ZXh0LnN0YXJ0TG9jKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBuZXh0Q29uc3VtZVRva2VuOiB0b2tlbixcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogbGlua2VkTm9kZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZW5kTm9kZShsaW5rZWROb2RlLCB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpLCB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCkpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbm9kZTogbGlua2VkTm9kZVxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZU1lc3NhZ2UodG9rZW5pemVyKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xuICAgICAgICBjb25zdCBzdGFydE9mZnNldCA9IGNvbnRleHQuY3VycmVudFR5cGUgPT09IDEgLyogVG9rZW5UeXBlcy5QaXBlICovXG4gICAgICAgICAgICA/IHRva2VuaXplci5jdXJyZW50T2Zmc2V0KClcbiAgICAgICAgICAgIDogY29udGV4dC5vZmZzZXQ7XG4gICAgICAgIGNvbnN0IHN0YXJ0TG9jID0gY29udGV4dC5jdXJyZW50VHlwZSA9PT0gMSAvKiBUb2tlblR5cGVzLlBpcGUgKi9cbiAgICAgICAgICAgID8gY29udGV4dC5lbmRMb2NcbiAgICAgICAgICAgIDogY29udGV4dC5zdGFydExvYztcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YXJ0Tm9kZSgyIC8qIE5vZGVUeXBlcy5NZXNzYWdlICovLCBzdGFydE9mZnNldCwgc3RhcnRMb2MpO1xuICAgICAgICBub2RlLml0ZW1zID0gW107XG4gICAgICAgIGxldCBuZXh0VG9rZW4gPSBudWxsO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IG5leHRUb2tlbiB8fCB0b2tlbml6ZXIubmV4dFRva2VuKCk7XG4gICAgICAgICAgICBuZXh0VG9rZW4gPSBudWxsO1xuICAgICAgICAgICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwIC8qIFRva2VuVHlwZXMuVGV4dCAqLzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuaXRlbXMucHVzaChwYXJzZVRleHQodG9rZW5pemVyLCB0b2tlbi52YWx1ZSB8fCAnJykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDYgLyogVG9rZW5UeXBlcy5MaXN0ICovOlxuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm9kZS5pdGVtcy5wdXNoKHBhcnNlTGlzdCh0b2tlbml6ZXIsIHRva2VuLnZhbHVlIHx8ICcnKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNSAvKiBUb2tlblR5cGVzLk5hbWVkICovOlxuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm9kZS5pdGVtcy5wdXNoKHBhcnNlTmFtZWQodG9rZW5pemVyLCB0b2tlbi52YWx1ZSB8fCAnJykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDcgLyogVG9rZW5UeXBlcy5MaXRlcmFsICovOlxuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm9kZS5pdGVtcy5wdXNoKHBhcnNlTGl0ZXJhbCh0b2tlbml6ZXIsIHRva2VuLnZhbHVlIHx8ICcnKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgOCAvKiBUb2tlblR5cGVzLkxpbmtlZEFsaWFzICovOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUxpbmtlZCh0b2tlbml6ZXIpO1xuICAgICAgICAgICAgICAgICAgICBub2RlLml0ZW1zLnB1c2gocGFyc2VkLm5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0VG9rZW4gPSBwYXJzZWQubmV4dENvbnN1bWVUb2tlbiB8fCBudWxsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoY29udGV4dC5jdXJyZW50VHlwZSAhPT0gMTQgLyogVG9rZW5UeXBlcy5FT0YgKi8gJiZcbiAgICAgICAgICAgIGNvbnRleHQuY3VycmVudFR5cGUgIT09IDEgLyogVG9rZW5UeXBlcy5QaXBlICovKTtcbiAgICAgICAgLy8gYWRqdXN0IG1lc3NhZ2Ugbm9kZSBsb2NcbiAgICAgICAgY29uc3QgZW5kT2Zmc2V0ID0gY29udGV4dC5jdXJyZW50VHlwZSA9PT0gMSAvKiBUb2tlblR5cGVzLlBpcGUgKi9cbiAgICAgICAgICAgID8gY29udGV4dC5sYXN0T2Zmc2V0XG4gICAgICAgICAgICA6IHRva2VuaXplci5jdXJyZW50T2Zmc2V0KCk7XG4gICAgICAgIGNvbnN0IGVuZExvYyA9IGNvbnRleHQuY3VycmVudFR5cGUgPT09IDEgLyogVG9rZW5UeXBlcy5QaXBlICovXG4gICAgICAgICAgICA/IGNvbnRleHQubGFzdEVuZExvY1xuICAgICAgICAgICAgOiB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCk7XG4gICAgICAgIGVuZE5vZGUobm9kZSwgZW5kT2Zmc2V0LCBlbmRMb2MpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VQbHVyYWwodG9rZW5pemVyLCBvZmZzZXQsIGxvYywgbXNnTm9kZSkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcbiAgICAgICAgbGV0IGhhc0VtcHR5TWVzc2FnZSA9IG1zZ05vZGUuaXRlbXMubGVuZ3RoID09PSAwO1xuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDEgLyogTm9kZVR5cGVzLlBsdXJhbCAqLywgb2Zmc2V0LCBsb2MpO1xuICAgICAgICBub2RlLmNhc2VzID0gW107XG4gICAgICAgIG5vZGUuY2FzZXMucHVzaChtc2dOb2RlKTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY29uc3QgbXNnID0gcGFyc2VNZXNzYWdlKHRva2VuaXplcik7XG4gICAgICAgICAgICBpZiAoIWhhc0VtcHR5TWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIGhhc0VtcHR5TWVzc2FnZSA9IG1zZy5pdGVtcy5sZW5ndGggPT09IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLmNhc2VzLnB1c2gobXNnKTtcbiAgICAgICAgfSB3aGlsZSAoY29udGV4dC5jdXJyZW50VHlwZSAhPT0gMTQgLyogVG9rZW5UeXBlcy5FT0YgKi8pO1xuICAgICAgICBpZiAoaGFzRW1wdHlNZXNzYWdlKSB7XG4gICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5NVVNUX0hBVkVfTUVTU0FHRVNfSU5fUExVUkFMLCBsb2MsIDApO1xuICAgICAgICB9XG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlUmVzb3VyY2UodG9rZW5pemVyKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xuICAgICAgICBjb25zdCB7IG9mZnNldCwgc3RhcnRMb2MgfSA9IGNvbnRleHQ7XG4gICAgICAgIGNvbnN0IG1zZ05vZGUgPSBwYXJzZU1lc3NhZ2UodG9rZW5pemVyKTtcbiAgICAgICAgaWYgKGNvbnRleHQuY3VycmVudFR5cGUgPT09IDE0IC8qIFRva2VuVHlwZXMuRU9GICovKSB7XG4gICAgICAgICAgICByZXR1cm4gbXNnTm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVBsdXJhbCh0b2tlbml6ZXIsIG9mZnNldCwgc3RhcnRMb2MsIG1zZ05vZGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlKHNvdXJjZSkge1xuICAgICAgICBjb25zdCB0b2tlbml6ZXIgPSBjcmVhdGVUb2tlbml6ZXIoc291cmNlLCBhc3NpZ24oe30sIG9wdGlvbnMpKTtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFydE5vZGUoMCAvKiBOb2RlVHlwZXMuUmVzb3VyY2UgKi8sIGNvbnRleHQub2Zmc2V0LCBjb250ZXh0LnN0YXJ0TG9jKTtcbiAgICAgICAgaWYgKGxvY2F0aW9uICYmIG5vZGUubG9jKSB7XG4gICAgICAgICAgICBub2RlLmxvYy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5ib2R5ID0gcGFyc2VSZXNvdXJjZSh0b2tlbml6ZXIpO1xuICAgICAgICBpZiAob3B0aW9ucy5vbkNhY2hlS2V5KSB7XG4gICAgICAgICAgICBub2RlLmNhY2hlS2V5ID0gb3B0aW9ucy5vbkNhY2hlS2V5KHNvdXJjZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYXNzZXJ0IHdoZXRoZXIgYWNoaWV2ZWQgdG8gRU9GXG4gICAgICAgIGlmIChjb250ZXh0LmN1cnJlbnRUeXBlICE9PSAxNCAvKiBUb2tlblR5cGVzLkVPRiAqLykge1xuICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgc291cmNlW2NvbnRleHQub2Zmc2V0XSB8fCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZW5kTm9kZShub2RlLCB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpLCB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCkpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcGFyc2UgfTtcbn1cbmZ1bmN0aW9uIGdldFRva2VuQ2FwdGlvbih0b2tlbikge1xuICAgIGlmICh0b2tlbi50eXBlID09PSAxNCAvKiBUb2tlblR5cGVzLkVPRiAqLykge1xuICAgICAgICByZXR1cm4gJ0VPRic7XG4gICAgfVxuICAgIGNvbnN0IG5hbWUgPSAodG9rZW4udmFsdWUgfHwgJycpLnJlcGxhY2UoL1xccj9cXG4vZ3UsICdcXFxcbicpO1xuICAgIHJldHVybiBuYW1lLmxlbmd0aCA+IDEwID8gbmFtZS5zbGljZSgwLCA5KSArICfigKYnIDogbmFtZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHJhbnNmb3JtZXIoYXN0LCBvcHRpb25zID0ge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuKSB7XG4gICAgY29uc3QgX2NvbnRleHQgPSB7XG4gICAgICAgIGFzdCxcbiAgICAgICAgaGVscGVyczogbmV3IFNldCgpXG4gICAgfTtcbiAgICBjb25zdCBjb250ZXh0ID0gKCkgPT4gX2NvbnRleHQ7XG4gICAgY29uc3QgaGVscGVyID0gKG5hbWUpID0+IHtcbiAgICAgICAgX2NvbnRleHQuaGVscGVycy5hZGQobmFtZSk7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH07XG4gICAgcmV0dXJuIHsgY29udGV4dCwgaGVscGVyIH07XG59XG5mdW5jdGlvbiB0cmF2ZXJzZU5vZGVzKG5vZGVzLCB0cmFuc2Zvcm1lcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdHJhdmVyc2VOb2RlKG5vZGVzW2ldLCB0cmFuc2Zvcm1lcik7XG4gICAgfVxufVxuZnVuY3Rpb24gdHJhdmVyc2VOb2RlKG5vZGUsIHRyYW5zZm9ybWVyKSB7XG4gICAgLy8gVE9ETzogaWYgd2UgbmVlZCBwcmUtaG9vayBvZiB0cmFuc2Zvcm0sIHNob3VsZCBiZSBpbXBsZW1lbnRlZCB0byBoZXJlXG4gICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgICAgY2FzZSAxIC8qIE5vZGVUeXBlcy5QbHVyYWwgKi86XG4gICAgICAgICAgICB0cmF2ZXJzZU5vZGVzKG5vZGUuY2FzZXMsIHRyYW5zZm9ybWVyKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVyLmhlbHBlcihcInBsdXJhbFwiIC8qIEhlbHBlck5hbWVNYXAuUExVUkFMICovKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDIgLyogTm9kZVR5cGVzLk1lc3NhZ2UgKi86XG4gICAgICAgICAgICB0cmF2ZXJzZU5vZGVzKG5vZGUuaXRlbXMsIHRyYW5zZm9ybWVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDYgLyogTm9kZVR5cGVzLkxpbmtlZCAqLzpcbiAgICAgICAgICAgIGNvbnN0IGxpbmtlZCA9IG5vZGU7XG4gICAgICAgICAgICB0cmF2ZXJzZU5vZGUobGlua2VkLmtleSwgdHJhbnNmb3JtZXIpO1xuICAgICAgICAgICAgdHJhbnNmb3JtZXIuaGVscGVyKFwibGlua2VkXCIgLyogSGVscGVyTmFtZU1hcC5MSU5LRUQgKi8pO1xuICAgICAgICAgICAgdHJhbnNmb3JtZXIuaGVscGVyKFwidHlwZVwiIC8qIEhlbHBlck5hbWVNYXAuVFlQRSAqLyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1IC8qIE5vZGVUeXBlcy5MaXN0ICovOlxuICAgICAgICAgICAgdHJhbnNmb3JtZXIuaGVscGVyKFwiaW50ZXJwb2xhdGVcIiAvKiBIZWxwZXJOYW1lTWFwLklOVEVSUE9MQVRFICovKTtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVyLmhlbHBlcihcImxpc3RcIiAvKiBIZWxwZXJOYW1lTWFwLkxJU1QgKi8pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNCAvKiBOb2RlVHlwZXMuTmFtZWQgKi86XG4gICAgICAgICAgICB0cmFuc2Zvcm1lci5oZWxwZXIoXCJpbnRlcnBvbGF0ZVwiIC8qIEhlbHBlck5hbWVNYXAuSU5URVJQT0xBVEUgKi8pO1xuICAgICAgICAgICAgdHJhbnNmb3JtZXIuaGVscGVyKFwibmFtZWRcIiAvKiBIZWxwZXJOYW1lTWFwLk5BTUVEICovKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBUT0RPOiBpZiB3ZSBuZWVkIHBvc3QtaG9vayBvZiB0cmFuc2Zvcm0sIHNob3VsZCBiZSBpbXBsZW1lbnRlZCB0byBoZXJlXG59XG4vLyB0cmFuc2Zvcm0gQVNUXG5mdW5jdGlvbiB0cmFuc2Zvcm0oYXN0LCBvcHRpb25zID0ge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuKSB7XG4gICAgY29uc3QgdHJhbnNmb3JtZXIgPSBjcmVhdGVUcmFuc2Zvcm1lcihhc3QpO1xuICAgIHRyYW5zZm9ybWVyLmhlbHBlcihcIm5vcm1hbGl6ZVwiIC8qIEhlbHBlck5hbWVNYXAuTk9STUFMSVpFICovKTtcbiAgICAvLyB0cmF2ZXJzZVxuICAgIGFzdC5ib2R5ICYmIHRyYXZlcnNlTm9kZShhc3QuYm9keSwgdHJhbnNmb3JtZXIpO1xuICAgIC8vIHNldCBtZXRhIGluZm9ybWF0aW9uXG4gICAgY29uc3QgY29udGV4dCA9IHRyYW5zZm9ybWVyLmNvbnRleHQoKTtcbiAgICBhc3QuaGVscGVycyA9IEFycmF5LmZyb20oY29udGV4dC5oZWxwZXJzKTtcbn1cblxuZnVuY3Rpb24gb3B0aW1pemUoYXN0KSB7XG4gICAgY29uc3QgYm9keSA9IGFzdC5ib2R5O1xuICAgIGlmIChib2R5LnR5cGUgPT09IDIgLyogTm9kZVR5cGVzLk1lc3NhZ2UgKi8pIHtcbiAgICAgICAgb3B0aW1pemVNZXNzYWdlTm9kZShib2R5KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGJvZHkuY2FzZXMuZm9yRWFjaChjID0+IG9wdGltaXplTWVzc2FnZU5vZGUoYykpO1xuICAgIH1cbiAgICByZXR1cm4gYXN0O1xufVxuZnVuY3Rpb24gb3B0aW1pemVNZXNzYWdlTm9kZShtZXNzYWdlKSB7XG4gICAgaWYgKG1lc3NhZ2UuaXRlbXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBtZXNzYWdlLml0ZW1zWzBdO1xuICAgICAgICBpZiAoaXRlbS50eXBlID09PSAzIC8qIE5vZGVUeXBlcy5UZXh0ICovIHx8IGl0ZW0udHlwZSA9PT0gOSAvKiBOb2RlVHlwZXMuTGl0ZXJhbCAqLykge1xuICAgICAgICAgICAgbWVzc2FnZS5zdGF0aWMgPSBpdGVtLnZhbHVlO1xuICAgICAgICAgICAgZGVsZXRlIGl0ZW0udmFsdWU7IC8vIG9wdGltaXphdGlvbiBmb3Igc2l6ZVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXNzYWdlLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbWVzc2FnZS5pdGVtc1tpXTtcbiAgICAgICAgICAgIGlmICghKGl0ZW0udHlwZSA9PT0gMyAvKiBOb2RlVHlwZXMuVGV4dCAqLyB8fCBpdGVtLnR5cGUgPT09IDkgLyogTm9kZVR5cGVzLkxpdGVyYWwgKi8pKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXRlbS52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZXMucHVzaChpdGVtLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gbWVzc2FnZS5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG1lc3NhZ2Uuc3RhdGljID0gam9pbih2YWx1ZXMpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXNzYWdlLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IG1lc3NhZ2UuaXRlbXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gMyAvKiBOb2RlVHlwZXMuVGV4dCAqLyB8fCBpdGVtLnR5cGUgPT09IDkgLyogTm9kZVR5cGVzLkxpdGVyYWwgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0udmFsdWU7IC8vIG9wdGltaXphdGlvbiBmb3Igc2l6ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgRVJST1JfRE9NQUlOJDEgPSAnbWluaWZpZXInO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuZnVuY3Rpb24gbWluaWZ5KG5vZGUpIHtcbiAgICBub2RlLnQgPSBub2RlLnR5cGU7XG4gICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgICAgY2FzZSAwIC8qIE5vZGVUeXBlcy5SZXNvdXJjZSAqLzpcbiAgICAgICAgICAgIGNvbnN0IHJlc291cmNlID0gbm9kZTtcbiAgICAgICAgICAgIG1pbmlmeShyZXNvdXJjZS5ib2R5KTtcbiAgICAgICAgICAgIHJlc291cmNlLmIgPSByZXNvdXJjZS5ib2R5O1xuICAgICAgICAgICAgZGVsZXRlIHJlc291cmNlLmJvZHk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxIC8qIE5vZGVUeXBlcy5QbHVyYWwgKi86XG4gICAgICAgICAgICBjb25zdCBwbHVyYWwgPSBub2RlO1xuICAgICAgICAgICAgY29uc3QgY2FzZXMgPSBwbHVyYWwuY2FzZXM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbWluaWZ5KGNhc2VzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBsdXJhbC5jID0gY2FzZXM7XG4gICAgICAgICAgICBkZWxldGUgcGx1cmFsLmNhc2VzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMiAvKiBOb2RlVHlwZXMuTWVzc2FnZSAqLzpcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBub2RlO1xuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBtZXNzYWdlLml0ZW1zO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG1pbmlmeShpdGVtc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZXNzYWdlLmkgPSBpdGVtcztcbiAgICAgICAgICAgIGRlbGV0ZSBtZXNzYWdlLml0ZW1zO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2Uuc3RhdGljKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5zID0gbWVzc2FnZS5zdGF0aWM7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG1lc3NhZ2Uuc3RhdGljO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMyAvKiBOb2RlVHlwZXMuVGV4dCAqLzpcbiAgICAgICAgY2FzZSA5IC8qIE5vZGVUeXBlcy5MaXRlcmFsICovOlxuICAgICAgICBjYXNlIDggLyogTm9kZVR5cGVzLkxpbmtlZE1vZGlmaWVyICovOlxuICAgICAgICBjYXNlIDcgLyogTm9kZVR5cGVzLkxpbmtlZEtleSAqLzpcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlTm9kZSA9IG5vZGU7XG4gICAgICAgICAgICBpZiAodmFsdWVOb2RlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVOb2RlLnYgPSB2YWx1ZU5vZGUudmFsdWU7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHZhbHVlTm9kZS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDYgLyogTm9kZVR5cGVzLkxpbmtlZCAqLzpcbiAgICAgICAgICAgIGNvbnN0IGxpbmtlZCA9IG5vZGU7XG4gICAgICAgICAgICBtaW5pZnkobGlua2VkLmtleSk7XG4gICAgICAgICAgICBsaW5rZWQuayA9IGxpbmtlZC5rZXk7XG4gICAgICAgICAgICBkZWxldGUgbGlua2VkLmtleTtcbiAgICAgICAgICAgIGlmIChsaW5rZWQubW9kaWZpZXIpIHtcbiAgICAgICAgICAgICAgICBtaW5pZnkobGlua2VkLm1vZGlmaWVyKTtcbiAgICAgICAgICAgICAgICBsaW5rZWQubSA9IGxpbmtlZC5tb2RpZmllcjtcbiAgICAgICAgICAgICAgICBkZWxldGUgbGlua2VkLm1vZGlmaWVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNSAvKiBOb2RlVHlwZXMuTGlzdCAqLzpcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBub2RlO1xuICAgICAgICAgICAgbGlzdC5pID0gbGlzdC5pbmRleDtcbiAgICAgICAgICAgIGRlbGV0ZSBsaXN0LmluZGV4O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNCAvKiBOb2RlVHlwZXMuTmFtZWQgKi86XG4gICAgICAgICAgICBjb25zdCBuYW1lZCA9IG5vZGU7XG4gICAgICAgICAgICBuYW1lZC5rID0gbmFtZWQua2V5O1xuICAgICAgICAgICAgZGVsZXRlIG5hbWVkLmtleTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZUNvbXBpbGVFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTkhBTkRMRURfTUlOSUZJRVJfTk9ERV9UWVBFLCBudWxsLCB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogRVJST1JfRE9NQUlOJDEsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IFtub2RlLnR5cGVdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZSBub2RlLnR5cGU7XG59XG4vKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cblxuY29uc3QgRVJST1JfRE9NQUlOID0gJ3BhcnNlcic7XG5mdW5jdGlvbiBjcmVhdGVDb2RlR2VuZXJhdG9yKGFzdCwgb3B0aW9ucykge1xuICAgIGNvbnN0IHsgc291cmNlTWFwLCBmaWxlbmFtZSwgYnJlYWtMaW5lQ29kZSwgbmVlZEluZGVudDogX25lZWRJbmRlbnQgfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgbG9jYXRpb24gPSBvcHRpb25zLmxvY2F0aW9uICE9PSBmYWxzZTtcbiAgICBjb25zdCBfY29udGV4dCA9IHtcbiAgICAgICAgZmlsZW5hbWUsXG4gICAgICAgIGNvZGU6ICcnLFxuICAgICAgICBjb2x1bW46IDEsXG4gICAgICAgIGxpbmU6IDEsXG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgbWFwOiB1bmRlZmluZWQsXG4gICAgICAgIGJyZWFrTGluZUNvZGUsXG4gICAgICAgIG5lZWRJbmRlbnQ6IF9uZWVkSW5kZW50LFxuICAgICAgICBpbmRlbnRMZXZlbDogMFxuICAgIH07XG4gICAgaWYgKGxvY2F0aW9uICYmIGFzdC5sb2MpIHtcbiAgICAgICAgX2NvbnRleHQuc291cmNlID0gYXN0LmxvYy5zb3VyY2U7XG4gICAgfVxuICAgIGNvbnN0IGNvbnRleHQgPSAoKSA9PiBfY29udGV4dDtcbiAgICBmdW5jdGlvbiBwdXNoKGNvZGUsIG5vZGUpIHtcbiAgICAgICAgX2NvbnRleHQuY29kZSArPSBjb2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBfbmV3bGluZShuLCB3aXRoQnJlYWtMaW5lID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBfYnJlYWtMaW5lQ29kZSA9IHdpdGhCcmVha0xpbmUgPyBicmVha0xpbmVDb2RlIDogJyc7XG4gICAgICAgIHB1c2goX25lZWRJbmRlbnQgPyBfYnJlYWtMaW5lQ29kZSArIGAgIGAucmVwZWF0KG4pIDogX2JyZWFrTGluZUNvZGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbmRlbnQod2l0aE5ld0xpbmUgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGxldmVsID0gKytfY29udGV4dC5pbmRlbnRMZXZlbDtcbiAgICAgICAgd2l0aE5ld0xpbmUgJiYgX25ld2xpbmUobGV2ZWwpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZWluZGVudCh3aXRoTmV3TGluZSA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgbGV2ZWwgPSAtLV9jb250ZXh0LmluZGVudExldmVsO1xuICAgICAgICB3aXRoTmV3TGluZSAmJiBfbmV3bGluZShsZXZlbCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG5ld2xpbmUoKSB7XG4gICAgICAgIF9uZXdsaW5lKF9jb250ZXh0LmluZGVudExldmVsKTtcbiAgICB9XG4gICAgY29uc3QgaGVscGVyID0gKGtleSkgPT4gYF8ke2tleX1gO1xuICAgIGNvbnN0IG5lZWRJbmRlbnQgPSAoKSA9PiBfY29udGV4dC5uZWVkSW5kZW50O1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIHB1c2gsXG4gICAgICAgIGluZGVudCxcbiAgICAgICAgZGVpbmRlbnQsXG4gICAgICAgIG5ld2xpbmUsXG4gICAgICAgIGhlbHBlcixcbiAgICAgICAgbmVlZEluZGVudFxuICAgIH07XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUxpbmtlZE5vZGUoZ2VuZXJhdG9yLCBub2RlKSB7XG4gICAgY29uc3QgeyBoZWxwZXIgfSA9IGdlbmVyYXRvcjtcbiAgICBnZW5lcmF0b3IucHVzaChgJHtoZWxwZXIoXCJsaW5rZWRcIiAvKiBIZWxwZXJOYW1lTWFwLkxJTktFRCAqLyl9KGApO1xuICAgIGdlbmVyYXRlTm9kZShnZW5lcmF0b3IsIG5vZGUua2V5KTtcbiAgICBpZiAobm9kZS5tb2RpZmllcikge1xuICAgICAgICBnZW5lcmF0b3IucHVzaChgLCBgKTtcbiAgICAgICAgZ2VuZXJhdGVOb2RlKGdlbmVyYXRvciwgbm9kZS5tb2RpZmllcik7XG4gICAgICAgIGdlbmVyYXRvci5wdXNoKGAsIF90eXBlYCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZW5lcmF0b3IucHVzaChgLCB1bmRlZmluZWQsIF90eXBlYCk7XG4gICAgfVxuICAgIGdlbmVyYXRvci5wdXNoKGApYCk7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZU1lc3NhZ2VOb2RlKGdlbmVyYXRvciwgbm9kZSkge1xuICAgIGNvbnN0IHsgaGVscGVyLCBuZWVkSW5kZW50IH0gPSBnZW5lcmF0b3I7XG4gICAgZ2VuZXJhdG9yLnB1c2goYCR7aGVscGVyKFwibm9ybWFsaXplXCIgLyogSGVscGVyTmFtZU1hcC5OT1JNQUxJWkUgKi8pfShbYCk7XG4gICAgZ2VuZXJhdG9yLmluZGVudChuZWVkSW5kZW50KCkpO1xuICAgIGNvbnN0IGxlbmd0aCA9IG5vZGUuaXRlbXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZ2VuZXJhdGVOb2RlKGdlbmVyYXRvciwgbm9kZS5pdGVtc1tpXSk7XG4gICAgICAgIGlmIChpID09PSBsZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBnZW5lcmF0b3IucHVzaCgnLCAnKTtcbiAgICB9XG4gICAgZ2VuZXJhdG9yLmRlaW5kZW50KG5lZWRJbmRlbnQoKSk7XG4gICAgZ2VuZXJhdG9yLnB1c2goJ10pJyk7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVBsdXJhbE5vZGUoZ2VuZXJhdG9yLCBub2RlKSB7XG4gICAgY29uc3QgeyBoZWxwZXIsIG5lZWRJbmRlbnQgfSA9IGdlbmVyYXRvcjtcbiAgICBpZiAobm9kZS5jYXNlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGdlbmVyYXRvci5wdXNoKGAke2hlbHBlcihcInBsdXJhbFwiIC8qIEhlbHBlck5hbWVNYXAuUExVUkFMICovKX0oW2ApO1xuICAgICAgICBnZW5lcmF0b3IuaW5kZW50KG5lZWRJbmRlbnQoKSk7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IG5vZGUuY2FzZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBnZW5lcmF0ZU5vZGUoZ2VuZXJhdG9yLCBub2RlLmNhc2VzW2ldKTtcbiAgICAgICAgICAgIGlmIChpID09PSBsZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZW5lcmF0b3IucHVzaCgnLCAnKTtcbiAgICAgICAgfVxuICAgICAgICBnZW5lcmF0b3IuZGVpbmRlbnQobmVlZEluZGVudCgpKTtcbiAgICAgICAgZ2VuZXJhdG9yLnB1c2goYF0pYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2VuZXJhdGVSZXNvdXJjZShnZW5lcmF0b3IsIG5vZGUpIHtcbiAgICBpZiAobm9kZS5ib2R5KSB7XG4gICAgICAgIGdlbmVyYXRlTm9kZShnZW5lcmF0b3IsIG5vZGUuYm9keSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZW5lcmF0b3IucHVzaCgnbnVsbCcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdlbmVyYXRlTm9kZShnZW5lcmF0b3IsIG5vZGUpIHtcbiAgICBjb25zdCB7IGhlbHBlciB9ID0gZ2VuZXJhdG9yO1xuICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgIGNhc2UgMCAvKiBOb2RlVHlwZXMuUmVzb3VyY2UgKi86XG4gICAgICAgICAgICBnZW5lcmF0ZVJlc291cmNlKGdlbmVyYXRvciwgbm9kZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxIC8qIE5vZGVUeXBlcy5QbHVyYWwgKi86XG4gICAgICAgICAgICBnZW5lcmF0ZVBsdXJhbE5vZGUoZ2VuZXJhdG9yLCBub2RlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDIgLyogTm9kZVR5cGVzLk1lc3NhZ2UgKi86XG4gICAgICAgICAgICBnZW5lcmF0ZU1lc3NhZ2VOb2RlKGdlbmVyYXRvciwgbm9kZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA2IC8qIE5vZGVUeXBlcy5MaW5rZWQgKi86XG4gICAgICAgICAgICBnZW5lcmF0ZUxpbmtlZE5vZGUoZ2VuZXJhdG9yLCBub2RlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDggLyogTm9kZVR5cGVzLkxpbmtlZE1vZGlmaWVyICovOlxuICAgICAgICAgICAgZ2VuZXJhdG9yLnB1c2goSlNPTi5zdHJpbmdpZnkobm9kZS52YWx1ZSksIG5vZGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNyAvKiBOb2RlVHlwZXMuTGlua2VkS2V5ICovOlxuICAgICAgICAgICAgZ2VuZXJhdG9yLnB1c2goSlNPTi5zdHJpbmdpZnkobm9kZS52YWx1ZSksIG5vZGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNSAvKiBOb2RlVHlwZXMuTGlzdCAqLzpcbiAgICAgICAgICAgIGdlbmVyYXRvci5wdXNoKGAke2hlbHBlcihcImludGVycG9sYXRlXCIgLyogSGVscGVyTmFtZU1hcC5JTlRFUlBPTEFURSAqLyl9KCR7aGVscGVyKFwibGlzdFwiIC8qIEhlbHBlck5hbWVNYXAuTElTVCAqLyl9KCR7bm9kZS5pbmRleH0pKWAsIG5vZGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNCAvKiBOb2RlVHlwZXMuTmFtZWQgKi86XG4gICAgICAgICAgICBnZW5lcmF0b3IucHVzaChgJHtoZWxwZXIoXCJpbnRlcnBvbGF0ZVwiIC8qIEhlbHBlck5hbWVNYXAuSU5URVJQT0xBVEUgKi8pfSgke2hlbHBlcihcIm5hbWVkXCIgLyogSGVscGVyTmFtZU1hcC5OQU1FRCAqLyl9KCR7SlNPTi5zdHJpbmdpZnkobm9kZS5rZXkpfSkpYCwgbm9kZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA5IC8qIE5vZGVUeXBlcy5MaXRlcmFsICovOlxuICAgICAgICAgICAgZ2VuZXJhdG9yLnB1c2goSlNPTi5zdHJpbmdpZnkobm9kZS52YWx1ZSksIG5vZGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMyAvKiBOb2RlVHlwZXMuVGV4dCAqLzpcbiAgICAgICAgICAgIGdlbmVyYXRvci5wdXNoKEpTT04uc3RyaW5naWZ5KG5vZGUudmFsdWUpLCBub2RlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZUNvbXBpbGVFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTkhBTkRMRURfQ09ERUdFTl9OT0RFX1RZUEUsIG51bGwsIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tYWluOiBFUlJPUl9ET01BSU4sXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IFtub2RlLnR5cGVdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgfVxufVxuLy8gZ2VuZXJhdGUgY29kZSBmcm9tIEFTVFxuY29uc3QgZ2VuZXJhdGUgPSAoYXN0LCBvcHRpb25zID0ge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuKSA9PiB7XG4gICAgY29uc3QgbW9kZSA9IGlzU3RyaW5nKG9wdGlvbnMubW9kZSkgPyBvcHRpb25zLm1vZGUgOiAnbm9ybWFsJztcbiAgICBjb25zdCBmaWxlbmFtZSA9IGlzU3RyaW5nKG9wdGlvbnMuZmlsZW5hbWUpXG4gICAgICAgID8gb3B0aW9ucy5maWxlbmFtZVxuICAgICAgICA6ICdtZXNzYWdlLmludGwnO1xuICAgIGNvbnN0IHNvdXJjZU1hcCA9ICEhb3B0aW9ucy5zb3VyY2VNYXA7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgYnJlYWtMaW5lQ29kZSA9IG9wdGlvbnMuYnJlYWtMaW5lQ29kZSAhPSBudWxsXG4gICAgICAgID8gb3B0aW9ucy5icmVha0xpbmVDb2RlXG4gICAgICAgIDogbW9kZSA9PT0gJ2Fycm93J1xuICAgICAgICAgICAgPyAnOydcbiAgICAgICAgICAgIDogJ1xcbic7XG4gICAgY29uc3QgbmVlZEluZGVudCA9IG9wdGlvbnMubmVlZEluZGVudCA/IG9wdGlvbnMubmVlZEluZGVudCA6IG1vZGUgIT09ICdhcnJvdyc7XG4gICAgY29uc3QgaGVscGVycyA9IGFzdC5oZWxwZXJzIHx8IFtdO1xuICAgIGNvbnN0IGdlbmVyYXRvciA9IGNyZWF0ZUNvZGVHZW5lcmF0b3IoYXN0LCB7XG4gICAgICAgIG1vZGUsXG4gICAgICAgIGZpbGVuYW1lLFxuICAgICAgICBzb3VyY2VNYXAsXG4gICAgICAgIGJyZWFrTGluZUNvZGUsXG4gICAgICAgIG5lZWRJbmRlbnRcbiAgICB9KTtcbiAgICBnZW5lcmF0b3IucHVzaChtb2RlID09PSAnbm9ybWFsJyA/IGBmdW5jdGlvbiBfX21zZ19fIChjdHgpIHtgIDogYChjdHgpID0+IHtgKTtcbiAgICBnZW5lcmF0b3IuaW5kZW50KG5lZWRJbmRlbnQpO1xuICAgIGlmIChoZWxwZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZ2VuZXJhdG9yLnB1c2goYGNvbnN0IHsgJHtqb2luKGhlbHBlcnMubWFwKHMgPT4gYCR7c306IF8ke3N9YCksICcsICcpfSB9ID0gY3R4YCk7XG4gICAgICAgIGdlbmVyYXRvci5uZXdsaW5lKCk7XG4gICAgfVxuICAgIGdlbmVyYXRvci5wdXNoKGByZXR1cm4gYCk7XG4gICAgZ2VuZXJhdGVOb2RlKGdlbmVyYXRvciwgYXN0KTtcbiAgICBnZW5lcmF0b3IuZGVpbmRlbnQobmVlZEluZGVudCk7XG4gICAgZ2VuZXJhdG9yLnB1c2goYH1gKTtcbiAgICBkZWxldGUgYXN0LmhlbHBlcnM7XG4gICAgY29uc3QgeyBjb2RlLCBtYXAgfSA9IGdlbmVyYXRvci5jb250ZXh0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXN0LFxuICAgICAgICBjb2RlLFxuICAgICAgICBtYXA6IG1hcCA/IG1hcC50b0pTT04oKSA6IHVuZGVmaW5lZCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICB9O1xufTtcblxuZnVuY3Rpb24gYmFzZUNvbXBpbGUoc291cmNlLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBhc3NpZ25lZE9wdGlvbnMgPSBhc3NpZ24oe30sIG9wdGlvbnMpO1xuICAgIGNvbnN0IGppdCA9ICEhYXNzaWduZWRPcHRpb25zLmppdDtcbiAgICBjb25zdCBlbmFsYmVNaW5pZnkgPSAhIWFzc2lnbmVkT3B0aW9ucy5taW5pZnk7XG4gICAgY29uc3QgZW5hbWJlT3B0aW1pemUgPSBhc3NpZ25lZE9wdGlvbnMub3B0aW1pemUgPT0gbnVsbCA/IHRydWUgOiBhc3NpZ25lZE9wdGlvbnMub3B0aW1pemU7XG4gICAgLy8gcGFyc2Ugc291cmNlIGNvZGVzXG4gICAgY29uc3QgcGFyc2VyID0gY3JlYXRlUGFyc2VyKGFzc2lnbmVkT3B0aW9ucyk7XG4gICAgY29uc3QgYXN0ID0gcGFyc2VyLnBhcnNlKHNvdXJjZSk7XG4gICAgaWYgKCFqaXQpIHtcbiAgICAgICAgLy8gdHJhbnNmb3JtIEFTVHNcbiAgICAgICAgdHJhbnNmb3JtKGFzdCwgYXNzaWduZWRPcHRpb25zKTtcbiAgICAgICAgLy8gZ2VuZXJhdGUgamF2YXNjcmlwdCBjb2Rlc1xuICAgICAgICByZXR1cm4gZ2VuZXJhdGUoYXN0LCBhc3NpZ25lZE9wdGlvbnMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gb3B0aW1pemUgQVNUc1xuICAgICAgICBlbmFtYmVPcHRpbWl6ZSAmJiBvcHRpbWl6ZShhc3QpO1xuICAgICAgICAvLyBtaW5pbWl6ZSBBU1RzXG4gICAgICAgIGVuYWxiZU1pbmlmeSAmJiBtaW5pZnkoYXN0KTtcbiAgICAgICAgLy8gSW4gSklUIG1vZGUsIG5vIGFzdCB0cmFuc2Zvcm0sIG5vIGNvZGUgZ2VuZXJhdGlvbi5cbiAgICAgICAgcmV0dXJuIHsgYXN0LCBjb2RlOiAnJyB9O1xuICAgIH1cbn1cblxuZXhwb3J0IHsgQ29tcGlsZUVycm9yQ29kZXMsIEVSUk9SX0RPTUFJTiQyIGFzIEVSUk9SX0RPTUFJTiwgTE9DQVRJT05fU1RVQiwgYmFzZUNvbXBpbGUsIGNyZWF0ZUNvbXBpbGVFcnJvciwgY3JlYXRlTG9jYXRpb24sIGNyZWF0ZVBhcnNlciwgY3JlYXRlUG9zaXRpb24sIGRlZmF1bHRPbkVycm9yLCBkZXRlY3RIdG1sVGFnLCBlcnJvck1lc3NhZ2VzIH07XG4iLCIvKiFcbiAgKiBkZXZ0b29scy1pZiB2OS4zLjBcbiAgKiAoYykgMjAyMyBrYXp1eWEga2F3YWd1Y2hpXG4gICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICAqL1xuY29uc3QgSW50bGlmeURldlRvb2xzSG9va3MgPSAge1xuICAgIEkxOG5Jbml0OiAnaTE4bjppbml0JyxcbiAgICBGdW5jdGlvblRyYW5zbGF0ZTogJ2Z1bmN0aW9uOnRyYW5zbGF0ZSdcbn07XG5cbmV4cG9ydCB7IEludGxpZnlEZXZUb29sc0hvb2tzIH07XG4iLCIvKiFcbiAgKiBjb3JlLWJhc2UgdjkuMy4wXG4gICogKGMpIDIwMjMga2F6dXlhIGthd2FndWNoaVxuICAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAgKi9cbmltcG9ydCB7IGdldEdsb2JhbFRoaXMsIGlzT2JqZWN0LCBpc1N0cmluZywgaXNGdW5jdGlvbiwgaXNOdW1iZXIsIGlzUGxhaW5PYmplY3QsIGFzc2lnbiwgam9pbiwgdG9EaXNwbGF5U3RyaW5nLCBpc0FycmF5LCBmb3JtYXQgYXMgZm9ybWF0JDEsIGlzQm9vbGVhbiwgd2FybiwgaXNSZWdFeHAsIHdhcm5PbmNlLCBpbmNyZW1lbnRlciwgZXNjYXBlSHRtbCwgaW5Ccm93c2VyLCBtYXJrLCBtZWFzdXJlLCBpc0VtcHR5T2JqZWN0LCBnZW5lcmF0ZUNvZGVGcmFtZSwgZ2VuZXJhdGVGb3JtYXRDYWNoZUtleSwgaXNEYXRlIH0gZnJvbSAnQGludGxpZnkvc2hhcmVkJztcbmltcG9ydCB7IENvbXBpbGVFcnJvckNvZGVzLCBjcmVhdGVDb21waWxlRXJyb3IsIGRldGVjdEh0bWxUYWcsIGRlZmF1bHRPbkVycm9yLCBiYXNlQ29tcGlsZSBhcyBiYXNlQ29tcGlsZSQxIH0gZnJvbSAnQGludGxpZnkvbWVzc2FnZS1jb21waWxlcic7XG5leHBvcnQgeyBDb21waWxlRXJyb3JDb2RlcywgY3JlYXRlQ29tcGlsZUVycm9yIH0gZnJvbSAnQGludGxpZnkvbWVzc2FnZS1jb21waWxlcic7XG5pbXBvcnQgeyBJbnRsaWZ5RGV2VG9vbHNIb29rcyB9IGZyb20gJ0BpbnRsaWZ5L2RldnRvb2xzLWlmJztcblxuLyoqXG4gKiBUaGlzIGlzIG9ubHkgY2FsbGVkIGluIGVzbS1idW5kbGVyIGJ1aWxkcy5cbiAqIGlzdGFuYnVsLWlnbm9yZS1uZXh0XG4gKi9cbmZ1bmN0aW9uIGluaXRGZWF0dXJlRmxhZ3MoKSB7XG4gICAgaWYgKHR5cGVvZiBfX0lOVExJRllfUFJPRF9ERVZUT09MU19fICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18gPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBfX0lOVExJRllfSklUX0NPTVBJTEFUSU9OX18gIT09ICdib29sZWFuJykge1xuICAgICAgICBnZXRHbG9iYWxUaGlzKCkuX19JTlRMSUZZX0pJVF9DT01QSUxBVElPTl9fID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgX19JTlRMSUZZX0RST1BfTUVTU0FHRV9DT01QSUxFUl9fICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fSU5UTElGWV9EUk9QX01FU1NBR0VfQ09NUElMRVJfXyA9IGZhbHNlO1xuICAgIH1cbn1cblxuY29uc3QgcGF0aFN0YXRlTWFjaGluZSA9ICBbXTtcbnBhdGhTdGF0ZU1hY2hpbmVbMCAvKiBTdGF0ZXMuQkVGT1JFX1BBVEggKi9dID0ge1xuICAgIFtcIndcIiAvKiBQYXRoQ2hhclR5cGVzLldPUktTUEFDRSAqL106IFswIC8qIFN0YXRlcy5CRUZPUkVfUEFUSCAqL10sXG4gICAgW1wiaVwiIC8qIFBhdGhDaGFyVHlwZXMuSURFTlQgKi9dOiBbMyAvKiBTdGF0ZXMuSU5fSURFTlQgKi8sIDAgLyogQWN0aW9ucy5BUFBFTkQgKi9dLFxuICAgIFtcIltcIiAvKiBQYXRoQ2hhclR5cGVzLkxFRlRfQlJBQ0tFVCAqL106IFs0IC8qIFN0YXRlcy5JTl9TVUJfUEFUSCAqL10sXG4gICAgW1wib1wiIC8qIFBhdGhDaGFyVHlwZXMuRU5EX09GX0ZBSUwgKi9dOiBbNyAvKiBTdGF0ZXMuQUZURVJfUEFUSCAqL11cbn07XG5wYXRoU3RhdGVNYWNoaW5lWzEgLyogU3RhdGVzLklOX1BBVEggKi9dID0ge1xuICAgIFtcIndcIiAvKiBQYXRoQ2hhclR5cGVzLldPUktTUEFDRSAqL106IFsxIC8qIFN0YXRlcy5JTl9QQVRIICovXSxcbiAgICBbXCIuXCIgLyogUGF0aENoYXJUeXBlcy5ET1QgKi9dOiBbMiAvKiBTdGF0ZXMuQkVGT1JFX0lERU5UICovXSxcbiAgICBbXCJbXCIgLyogUGF0aENoYXJUeXBlcy5MRUZUX0JSQUNLRVQgKi9dOiBbNCAvKiBTdGF0ZXMuSU5fU1VCX1BBVEggKi9dLFxuICAgIFtcIm9cIiAvKiBQYXRoQ2hhclR5cGVzLkVORF9PRl9GQUlMICovXTogWzcgLyogU3RhdGVzLkFGVEVSX1BBVEggKi9dXG59O1xucGF0aFN0YXRlTWFjaGluZVsyIC8qIFN0YXRlcy5CRUZPUkVfSURFTlQgKi9dID0ge1xuICAgIFtcIndcIiAvKiBQYXRoQ2hhclR5cGVzLldPUktTUEFDRSAqL106IFsyIC8qIFN0YXRlcy5CRUZPUkVfSURFTlQgKi9dLFxuICAgIFtcImlcIiAvKiBQYXRoQ2hhclR5cGVzLklERU5UICovXTogWzMgLyogU3RhdGVzLklOX0lERU5UICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXSxcbiAgICBbXCIwXCIgLyogUGF0aENoYXJUeXBlcy5aRVJPICovXTogWzMgLyogU3RhdGVzLklOX0lERU5UICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXVxufTtcbnBhdGhTdGF0ZU1hY2hpbmVbMyAvKiBTdGF0ZXMuSU5fSURFTlQgKi9dID0ge1xuICAgIFtcImlcIiAvKiBQYXRoQ2hhclR5cGVzLklERU5UICovXTogWzMgLyogU3RhdGVzLklOX0lERU5UICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXSxcbiAgICBbXCIwXCIgLyogUGF0aENoYXJUeXBlcy5aRVJPICovXTogWzMgLyogU3RhdGVzLklOX0lERU5UICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXSxcbiAgICBbXCJ3XCIgLyogUGF0aENoYXJUeXBlcy5XT1JLU1BBQ0UgKi9dOiBbMSAvKiBTdGF0ZXMuSU5fUEFUSCAqLywgMSAvKiBBY3Rpb25zLlBVU0ggKi9dLFxuICAgIFtcIi5cIiAvKiBQYXRoQ2hhclR5cGVzLkRPVCAqL106IFsyIC8qIFN0YXRlcy5CRUZPUkVfSURFTlQgKi8sIDEgLyogQWN0aW9ucy5QVVNIICovXSxcbiAgICBbXCJbXCIgLyogUGF0aENoYXJUeXBlcy5MRUZUX0JSQUNLRVQgKi9dOiBbNCAvKiBTdGF0ZXMuSU5fU1VCX1BBVEggKi8sIDEgLyogQWN0aW9ucy5QVVNIICovXSxcbiAgICBbXCJvXCIgLyogUGF0aENoYXJUeXBlcy5FTkRfT0ZfRkFJTCAqL106IFs3IC8qIFN0YXRlcy5BRlRFUl9QQVRIICovLCAxIC8qIEFjdGlvbnMuUFVTSCAqL11cbn07XG5wYXRoU3RhdGVNYWNoaW5lWzQgLyogU3RhdGVzLklOX1NVQl9QQVRIICovXSA9IHtcbiAgICBbXCInXCIgLyogUGF0aENoYXJUeXBlcy5TSU5HTEVfUVVPVEUgKi9dOiBbNSAvKiBTdGF0ZXMuSU5fU0lOR0xFX1FVT1RFICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXSxcbiAgICBbXCJcXFwiXCIgLyogUGF0aENoYXJUeXBlcy5ET1VCTEVfUVVPVEUgKi9dOiBbNiAvKiBTdGF0ZXMuSU5fRE9VQkxFX1FVT1RFICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXSxcbiAgICBbXCJbXCIgLyogUGF0aENoYXJUeXBlcy5MRUZUX0JSQUNLRVQgKi9dOiBbXG4gICAgICAgIDQgLyogU3RhdGVzLklOX1NVQl9QQVRIICovLFxuICAgICAgICAyIC8qIEFjdGlvbnMuSU5DX1NVQl9QQVRIX0RFUFRIICovXG4gICAgXSxcbiAgICBbXCJdXCIgLyogUGF0aENoYXJUeXBlcy5SSUdIVF9CUkFDS0VUICovXTogWzEgLyogU3RhdGVzLklOX1BBVEggKi8sIDMgLyogQWN0aW9ucy5QVVNIX1NVQl9QQVRIICovXSxcbiAgICBbXCJvXCIgLyogUGF0aENoYXJUeXBlcy5FTkRfT0ZfRkFJTCAqL106IDggLyogU3RhdGVzLkVSUk9SICovLFxuICAgIFtcImxcIiAvKiBQYXRoQ2hhclR5cGVzLkVMU0UgKi9dOiBbNCAvKiBTdGF0ZXMuSU5fU1VCX1BBVEggKi8sIDAgLyogQWN0aW9ucy5BUFBFTkQgKi9dXG59O1xucGF0aFN0YXRlTWFjaGluZVs1IC8qIFN0YXRlcy5JTl9TSU5HTEVfUVVPVEUgKi9dID0ge1xuICAgIFtcIidcIiAvKiBQYXRoQ2hhclR5cGVzLlNJTkdMRV9RVU9URSAqL106IFs0IC8qIFN0YXRlcy5JTl9TVUJfUEFUSCAqLywgMCAvKiBBY3Rpb25zLkFQUEVORCAqL10sXG4gICAgW1wib1wiIC8qIFBhdGhDaGFyVHlwZXMuRU5EX09GX0ZBSUwgKi9dOiA4IC8qIFN0YXRlcy5FUlJPUiAqLyxcbiAgICBbXCJsXCIgLyogUGF0aENoYXJUeXBlcy5FTFNFICovXTogWzUgLyogU3RhdGVzLklOX1NJTkdMRV9RVU9URSAqLywgMCAvKiBBY3Rpb25zLkFQUEVORCAqL11cbn07XG5wYXRoU3RhdGVNYWNoaW5lWzYgLyogU3RhdGVzLklOX0RPVUJMRV9RVU9URSAqL10gPSB7XG4gICAgW1wiXFxcIlwiIC8qIFBhdGhDaGFyVHlwZXMuRE9VQkxFX1FVT1RFICovXTogWzQgLyogU3RhdGVzLklOX1NVQl9QQVRIICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXSxcbiAgICBbXCJvXCIgLyogUGF0aENoYXJUeXBlcy5FTkRfT0ZfRkFJTCAqL106IDggLyogU3RhdGVzLkVSUk9SICovLFxuICAgIFtcImxcIiAvKiBQYXRoQ2hhclR5cGVzLkVMU0UgKi9dOiBbNiAvKiBTdGF0ZXMuSU5fRE9VQkxFX1FVT1RFICovLCAwIC8qIEFjdGlvbnMuQVBQRU5EICovXVxufTtcbi8qKlxuICogQ2hlY2sgaWYgYW4gZXhwcmVzc2lvbiBpcyBhIGxpdGVyYWwgdmFsdWUuXG4gKi9cbmNvbnN0IGxpdGVyYWxWYWx1ZVJFID0gL15cXHM/KD86dHJ1ZXxmYWxzZXwtP1tcXGQuXSt8J1teJ10qJ3xcIlteXCJdKlwiKVxccz8kLztcbmZ1bmN0aW9uIGlzTGl0ZXJhbChleHApIHtcbiAgICByZXR1cm4gbGl0ZXJhbFZhbHVlUkUudGVzdChleHApO1xufVxuLyoqXG4gKiBTdHJpcCBxdW90ZXMgZnJvbSBhIHN0cmluZ1xuICovXG5mdW5jdGlvbiBzdHJpcFF1b3RlcyhzdHIpIHtcbiAgICBjb25zdCBhID0gc3RyLmNoYXJDb2RlQXQoMCk7XG4gICAgY29uc3QgYiA9IHN0ci5jaGFyQ29kZUF0KHN0ci5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gYSA9PT0gYiAmJiAoYSA9PT0gMHgyMiB8fCBhID09PSAweDI3KSA/IHN0ci5zbGljZSgxLCAtMSkgOiBzdHI7XG59XG4vKipcbiAqIERldGVybWluZSB0aGUgdHlwZSBvZiBhIGNoYXJhY3RlciBpbiBhIGtleXBhdGguXG4gKi9cbmZ1bmN0aW9uIGdldFBhdGhDaGFyVHlwZShjaCkge1xuICAgIGlmIChjaCA9PT0gdW5kZWZpbmVkIHx8IGNoID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIm9cIiAvKiBQYXRoQ2hhclR5cGVzLkVORF9PRl9GQUlMICovO1xuICAgIH1cbiAgICBjb25zdCBjb2RlID0gY2guY2hhckNvZGVBdCgwKTtcbiAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgICAgY2FzZSAweDViOiAvLyBbXG4gICAgICAgIGNhc2UgMHg1ZDogLy8gXVxuICAgICAgICBjYXNlIDB4MmU6IC8vIC5cbiAgICAgICAgY2FzZSAweDIyOiAvLyBcIlxuICAgICAgICBjYXNlIDB4Mjc6IC8vICdcbiAgICAgICAgICAgIHJldHVybiBjaDtcbiAgICAgICAgY2FzZSAweDVmOiAvLyBfXG4gICAgICAgIGNhc2UgMHgyNDogLy8gJFxuICAgICAgICBjYXNlIDB4MmQ6IC8vIC1cbiAgICAgICAgICAgIHJldHVybiBcImlcIiAvKiBQYXRoQ2hhclR5cGVzLklERU5UICovO1xuICAgICAgICBjYXNlIDB4MDk6IC8vIFRhYiAoSFQpXG4gICAgICAgIGNhc2UgMHgwYTogLy8gTmV3bGluZSAoTEYpXG4gICAgICAgIGNhc2UgMHgwZDogLy8gUmV0dXJuIChDUilcbiAgICAgICAgY2FzZSAweGEwOiAvLyBOby1icmVhayBzcGFjZSAoTkJTUClcbiAgICAgICAgY2FzZSAweGZlZmY6IC8vIEJ5dGUgT3JkZXIgTWFyayAoQk9NKVxuICAgICAgICBjYXNlIDB4MjAyODogLy8gTGluZSBTZXBhcmF0b3IgKExTKVxuICAgICAgICBjYXNlIDB4MjAyOTogLy8gUGFyYWdyYXBoIFNlcGFyYXRvciAoUFMpXG4gICAgICAgICAgICByZXR1cm4gXCJ3XCIgLyogUGF0aENoYXJUeXBlcy5XT1JLU1BBQ0UgKi87XG4gICAgfVxuICAgIHJldHVybiBcImlcIiAvKiBQYXRoQ2hhclR5cGVzLklERU5UICovO1xufVxuLyoqXG4gKiBGb3JtYXQgYSBzdWJQYXRoLCByZXR1cm4gaXRzIHBsYWluIGZvcm0gaWYgaXQgaXNcbiAqIGEgbGl0ZXJhbCBzdHJpbmcgb3IgbnVtYmVyLiBPdGhlcndpc2UgcHJlcGVuZCB0aGVcbiAqIGR5bmFtaWMgaW5kaWNhdG9yICgqKS5cbiAqL1xuZnVuY3Rpb24gZm9ybWF0U3ViUGF0aChwYXRoKSB7XG4gICAgY29uc3QgdHJpbW1lZCA9IHBhdGgudHJpbSgpO1xuICAgIC8vIGludmFsaWQgbGVhZGluZyAwXG4gICAgaWYgKHBhdGguY2hhckF0KDApID09PSAnMCcgJiYgaXNOYU4ocGFyc2VJbnQocGF0aCkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGlzTGl0ZXJhbCh0cmltbWVkKVxuICAgICAgICA/IHN0cmlwUXVvdGVzKHRyaW1tZWQpXG4gICAgICAgIDogXCIqXCIgLyogUGF0aENoYXJUeXBlcy5BU1RBUklTSyAqLyArIHRyaW1tZWQ7XG59XG4vKipcbiAqIFBhcnNlIGEgc3RyaW5nIHBhdGggaW50byBhbiBhcnJheSBvZiBzZWdtZW50c1xuICovXG5mdW5jdGlvbiBwYXJzZShwYXRoKSB7XG4gICAgY29uc3Qga2V5cyA9IFtdO1xuICAgIGxldCBpbmRleCA9IC0xO1xuICAgIGxldCBtb2RlID0gMCAvKiBTdGF0ZXMuQkVGT1JFX1BBVEggKi87XG4gICAgbGV0IHN1YlBhdGhEZXB0aCA9IDA7XG4gICAgbGV0IGM7XG4gICAgbGV0IGtleTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGxldCBuZXdDaGFyO1xuICAgIGxldCB0eXBlO1xuICAgIGxldCB0cmFuc2l0aW9uO1xuICAgIGxldCBhY3Rpb247XG4gICAgbGV0IHR5cGVNYXA7XG4gICAgY29uc3QgYWN0aW9ucyA9IFtdO1xuICAgIGFjdGlvbnNbMCAvKiBBY3Rpb25zLkFQUEVORCAqL10gPSAoKSA9PiB7XG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAga2V5ID0gbmV3Q2hhcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGtleSArPSBuZXdDaGFyO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBhY3Rpb25zWzEgLyogQWN0aW9ucy5QVVNIICovXSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIGtleSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgYWN0aW9uc1syIC8qIEFjdGlvbnMuSU5DX1NVQl9QQVRIX0RFUFRIICovXSA9ICgpID0+IHtcbiAgICAgICAgYWN0aW9uc1swIC8qIEFjdGlvbnMuQVBQRU5EICovXSgpO1xuICAgICAgICBzdWJQYXRoRGVwdGgrKztcbiAgICB9O1xuICAgIGFjdGlvbnNbMyAvKiBBY3Rpb25zLlBVU0hfU1VCX1BBVEggKi9dID0gKCkgPT4ge1xuICAgICAgICBpZiAoc3ViUGF0aERlcHRoID4gMCkge1xuICAgICAgICAgICAgc3ViUGF0aERlcHRoLS07XG4gICAgICAgICAgICBtb2RlID0gNCAvKiBTdGF0ZXMuSU5fU1VCX1BBVEggKi87XG4gICAgICAgICAgICBhY3Rpb25zWzAgLyogQWN0aW9ucy5BUFBFTkQgKi9dKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdWJQYXRoRGVwdGggPSAwO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5ID0gZm9ybWF0U3ViUGF0aChrZXkpO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zWzEgLyogQWN0aW9ucy5QVVNIICovXSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBmdW5jdGlvbiBtYXliZVVuZXNjYXBlUXVvdGUoKSB7XG4gICAgICAgIGNvbnN0IG5leHRDaGFyID0gcGF0aFtpbmRleCArIDFdO1xuICAgICAgICBpZiAoKG1vZGUgPT09IDUgLyogU3RhdGVzLklOX1NJTkdMRV9RVU9URSAqLyAmJlxuICAgICAgICAgICAgbmV4dENoYXIgPT09IFwiJ1wiIC8qIFBhdGhDaGFyVHlwZXMuU0lOR0xFX1FVT1RFICovKSB8fFxuICAgICAgICAgICAgKG1vZGUgPT09IDYgLyogU3RhdGVzLklOX0RPVUJMRV9RVU9URSAqLyAmJlxuICAgICAgICAgICAgICAgIG5leHRDaGFyID09PSBcIlxcXCJcIiAvKiBQYXRoQ2hhclR5cGVzLkRPVUJMRV9RVU9URSAqLykpIHtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICBuZXdDaGFyID0gJ1xcXFwnICsgbmV4dENoYXI7XG4gICAgICAgICAgICBhY3Rpb25zWzAgLyogQWN0aW9ucy5BUFBFTkQgKi9dKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3aGlsZSAobW9kZSAhPT0gbnVsbCkge1xuICAgICAgICBpbmRleCsrO1xuICAgICAgICBjID0gcGF0aFtpbmRleF07XG4gICAgICAgIGlmIChjID09PSAnXFxcXCcgJiYgbWF5YmVVbmVzY2FwZVF1b3RlKCkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHR5cGUgPSBnZXRQYXRoQ2hhclR5cGUoYyk7XG4gICAgICAgIHR5cGVNYXAgPSBwYXRoU3RhdGVNYWNoaW5lW21vZGVdO1xuICAgICAgICB0cmFuc2l0aW9uID0gdHlwZU1hcFt0eXBlXSB8fCB0eXBlTWFwW1wibFwiIC8qIFBhdGhDaGFyVHlwZXMuRUxTRSAqL10gfHwgOCAvKiBTdGF0ZXMuRVJST1IgKi87XG4gICAgICAgIC8vIGNoZWNrIHBhcnNlIGVycm9yXG4gICAgICAgIGlmICh0cmFuc2l0aW9uID09PSA4IC8qIFN0YXRlcy5FUlJPUiAqLykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG1vZGUgPSB0cmFuc2l0aW9uWzBdO1xuICAgICAgICBpZiAodHJhbnNpdGlvblsxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSBhY3Rpb25zW3RyYW5zaXRpb25bMV1dO1xuICAgICAgICAgICAgaWYgKGFjdGlvbikge1xuICAgICAgICAgICAgICAgIG5ld0NoYXIgPSBjO1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24oKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjaGVjayBwYXJzZSBmaW5pc2hcbiAgICAgICAgaWYgKG1vZGUgPT09IDcgLyogU3RhdGVzLkFGVEVSX1BBVEggKi8pIHtcbiAgICAgICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8gcGF0aCB0b2tlbiBjYWNoZVxuY29uc3QgY2FjaGUgPSBuZXcgTWFwKCk7XG4vKipcbiAqIGtleS12YWx1ZSBtZXNzYWdlIHJlc29sdmVyXG4gKlxuICogQHJlbWFya3NcbiAqIFJlc29sdmVzIG1lc3NhZ2VzIHdpdGggdGhlIGtleS12YWx1ZSBzdHJ1Y3R1cmUuIE5vdGUgdGhhdCBtZXNzYWdlcyB3aXRoIGEgaGllcmFyY2hpY2FsIHN0cnVjdHVyZSBzdWNoIGFzIG9iamVjdHMgY2Fubm90IGJlIHJlc29sdmVkXG4gKlxuICogQHBhcmFtIG9iaiAtIEEgdGFyZ2V0IG9iamVjdCB0byBiZSByZXNvbHZlZCB3aXRoIHBhdGhcbiAqIEBwYXJhbSBwYXRoIC0gQSB7QGxpbmsgUGF0aCB8IHBhdGh9IHRvIHJlc29sdmUgdGhlIHZhbHVlIG9mIG1lc3NhZ2VcbiAqXG4gKiBAcmV0dXJucyBBIHJlc29sdmVkIHtAbGluayBQYXRoVmFsdWUgfCBwYXRoIHZhbHVlfVxuICpcbiAqIEBWdWVJMThuR2VuZXJhbFxuICovXG5mdW5jdGlvbiByZXNvbHZlV2l0aEtleVZhbHVlKG9iaiwgcGF0aCkge1xuICAgIHJldHVybiBpc09iamVjdChvYmopID8gb2JqW3BhdGhdIDogbnVsbDtcbn1cbi8qKlxuICogbWVzc2FnZSByZXNvbHZlclxuICpcbiAqIEByZW1hcmtzXG4gKiBSZXNvbHZlcyBtZXNzYWdlcy4gbWVzc2FnZXMgd2l0aCBhIGhpZXJhcmNoaWNhbCBzdHJ1Y3R1cmUgc3VjaCBhcyBvYmplY3RzIGNhbiBiZSByZXNvbHZlZC4gVGhpcyByZXNvbHZlciBpcyB1c2VkIGluIFZ1ZUkxOG4gYXMgZGVmYXVsdC5cbiAqXG4gKiBAcGFyYW0gb2JqIC0gQSB0YXJnZXQgb2JqZWN0IHRvIGJlIHJlc29sdmVkIHdpdGggcGF0aFxuICogQHBhcmFtIHBhdGggLSBBIHtAbGluayBQYXRoIHwgcGF0aH0gdG8gcmVzb2x2ZSB0aGUgdmFsdWUgb2YgbWVzc2FnZVxuICpcbiAqIEByZXR1cm5zIEEgcmVzb2x2ZWQge0BsaW5rIFBhdGhWYWx1ZSB8IHBhdGggdmFsdWV9XG4gKlxuICogQFZ1ZUkxOG5HZW5lcmFsXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVWYWx1ZShvYmosIHBhdGgpIHtcbiAgICAvLyBjaGVjayBvYmplY3RcbiAgICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIHBhcnNlIHBhdGhcbiAgICBsZXQgaGl0ID0gY2FjaGUuZ2V0KHBhdGgpO1xuICAgIGlmICghaGl0KSB7XG4gICAgICAgIGhpdCA9IHBhcnNlKHBhdGgpO1xuICAgICAgICBpZiAoaGl0KSB7XG4gICAgICAgICAgICBjYWNoZS5zZXQocGF0aCwgaGl0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBjaGVjayBoaXRcbiAgICBpZiAoIWhpdCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8gcmVzb2x2ZSBwYXRoIHZhbHVlXG4gICAgY29uc3QgbGVuID0gaGl0Lmxlbmd0aDtcbiAgICBsZXQgbGFzdCA9IG9iajtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgY29uc3QgdmFsID0gbGFzdFtoaXRbaV1dO1xuICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxhc3QgPSB2YWw7XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIGxhc3Q7XG59XG5cbmNvbnN0IERFRkFVTFRfTU9ESUZJRVIgPSAoc3RyKSA9PiBzdHI7XG5jb25zdCBERUZBVUxUX01FU1NBR0UgPSAoY3R4KSA9PiAnJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuY29uc3QgREVGQVVMVF9NRVNTQUdFX0RBVEFfVFlQRSA9ICd0ZXh0JztcbmNvbnN0IERFRkFVTFRfTk9STUFMSVpFID0gKHZhbHVlcykgPT4gdmFsdWVzLmxlbmd0aCA9PT0gMCA/ICcnIDogam9pbih2YWx1ZXMpO1xuY29uc3QgREVGQVVMVF9JTlRFUlBPTEFURSA9IHRvRGlzcGxheVN0cmluZztcbmZ1bmN0aW9uIHBsdXJhbERlZmF1bHQoY2hvaWNlLCBjaG9pY2VzTGVuZ3RoKSB7XG4gICAgY2hvaWNlID0gTWF0aC5hYnMoY2hvaWNlKTtcbiAgICBpZiAoY2hvaWNlc0xlbmd0aCA9PT0gMikge1xuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGNob2ljZVxuICAgICAgICAgICAgPyBjaG9pY2UgPiAxXG4gICAgICAgICAgICAgICAgPyAxXG4gICAgICAgICAgICAgICAgOiAwXG4gICAgICAgICAgICA6IDE7XG4gICAgfVxuICAgIHJldHVybiBjaG9pY2UgPyBNYXRoLm1pbihjaG9pY2UsIDIpIDogMDtcbn1cbmZ1bmN0aW9uIGdldFBsdXJhbEluZGV4KG9wdGlvbnMpIHtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBpbmRleCA9IGlzTnVtYmVyKG9wdGlvbnMucGx1cmFsSW5kZXgpXG4gICAgICAgID8gb3B0aW9ucy5wbHVyYWxJbmRleFxuICAgICAgICA6IC0xO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIHJldHVybiBvcHRpb25zLm5hbWVkICYmIChpc051bWJlcihvcHRpb25zLm5hbWVkLmNvdW50KSB8fCBpc051bWJlcihvcHRpb25zLm5hbWVkLm4pKVxuICAgICAgICA/IGlzTnVtYmVyKG9wdGlvbnMubmFtZWQuY291bnQpXG4gICAgICAgICAgICA/IG9wdGlvbnMubmFtZWQuY291bnRcbiAgICAgICAgICAgIDogaXNOdW1iZXIob3B0aW9ucy5uYW1lZC5uKVxuICAgICAgICAgICAgICAgID8gb3B0aW9ucy5uYW1lZC5uXG4gICAgICAgICAgICAgICAgOiBpbmRleFxuICAgICAgICA6IGluZGV4O1xufVxuZnVuY3Rpb24gbm9ybWFsaXplTmFtZWQocGx1cmFsSW5kZXgsIHByb3BzKSB7XG4gICAgaWYgKCFwcm9wcy5jb3VudCkge1xuICAgICAgICBwcm9wcy5jb3VudCA9IHBsdXJhbEluZGV4O1xuICAgIH1cbiAgICBpZiAoIXByb3BzLm4pIHtcbiAgICAgICAgcHJvcHMubiA9IHBsdXJhbEluZGV4O1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZU1lc3NhZ2VDb250ZXh0KG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGxvY2FsZSA9IG9wdGlvbnMubG9jYWxlO1xuICAgIGNvbnN0IHBsdXJhbEluZGV4ID0gZ2V0UGx1cmFsSW5kZXgob3B0aW9ucyk7XG4gICAgY29uc3QgcGx1cmFsUnVsZSA9IGlzT2JqZWN0KG9wdGlvbnMucGx1cmFsUnVsZXMpICYmXG4gICAgICAgIGlzU3RyaW5nKGxvY2FsZSkgJiZcbiAgICAgICAgaXNGdW5jdGlvbihvcHRpb25zLnBsdXJhbFJ1bGVzW2xvY2FsZV0pXG4gICAgICAgID8gb3B0aW9ucy5wbHVyYWxSdWxlc1tsb2NhbGVdXG4gICAgICAgIDogcGx1cmFsRGVmYXVsdDtcbiAgICBjb25zdCBvcmdQbHVyYWxSdWxlID0gaXNPYmplY3Qob3B0aW9ucy5wbHVyYWxSdWxlcykgJiZcbiAgICAgICAgaXNTdHJpbmcobG9jYWxlKSAmJlxuICAgICAgICBpc0Z1bmN0aW9uKG9wdGlvbnMucGx1cmFsUnVsZXNbbG9jYWxlXSlcbiAgICAgICAgPyBwbHVyYWxEZWZhdWx0XG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHBsdXJhbCA9IChtZXNzYWdlcykgPT4ge1xuICAgICAgICByZXR1cm4gbWVzc2FnZXNbcGx1cmFsUnVsZShwbHVyYWxJbmRleCwgbWVzc2FnZXMubGVuZ3RoLCBvcmdQbHVyYWxSdWxlKV07XG4gICAgfTtcbiAgICBjb25zdCBfbGlzdCA9IG9wdGlvbnMubGlzdCB8fCBbXTtcbiAgICBjb25zdCBsaXN0ID0gKGluZGV4KSA9PiBfbGlzdFtpbmRleF07XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBjb25zdCBfbmFtZWQgPSBvcHRpb25zLm5hbWVkIHx8IHt9O1xuICAgIGlzTnVtYmVyKG9wdGlvbnMucGx1cmFsSW5kZXgpICYmIG5vcm1hbGl6ZU5hbWVkKHBsdXJhbEluZGV4LCBfbmFtZWQpO1xuICAgIGNvbnN0IG5hbWVkID0gKGtleSkgPT4gX25hbWVkW2tleV07XG4gICAgZnVuY3Rpb24gbWVzc2FnZShrZXkpIHtcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIGNvbnN0IG1zZyA9IGlzRnVuY3Rpb24ob3B0aW9ucy5tZXNzYWdlcylcbiAgICAgICAgICAgID8gb3B0aW9ucy5tZXNzYWdlcyhrZXkpXG4gICAgICAgICAgICA6IGlzT2JqZWN0KG9wdGlvbnMubWVzc2FnZXMpXG4gICAgICAgICAgICAgICAgPyBvcHRpb25zLm1lc3NhZ2VzW2tleV1cbiAgICAgICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICByZXR1cm4gIW1zZ1xuICAgICAgICAgICAgPyBvcHRpb25zLnBhcmVudFxuICAgICAgICAgICAgICAgID8gb3B0aW9ucy5wYXJlbnQubWVzc2FnZShrZXkpIC8vIHJlc29sdmUgZnJvbSBwYXJlbnQgbWVzc2FnZXNcbiAgICAgICAgICAgICAgICA6IERFRkFVTFRfTUVTU0FHRVxuICAgICAgICAgICAgOiBtc2c7XG4gICAgfVxuICAgIGNvbnN0IF9tb2RpZmllciA9IChuYW1lKSA9PiBvcHRpb25zLm1vZGlmaWVyc1xuICAgICAgICA/IG9wdGlvbnMubW9kaWZpZXJzW25hbWVdXG4gICAgICAgIDogREVGQVVMVF9NT0RJRklFUjtcbiAgICBjb25zdCBub3JtYWxpemUgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnMucHJvY2Vzc29yKSAmJiBpc0Z1bmN0aW9uKG9wdGlvbnMucHJvY2Vzc29yLm5vcm1hbGl6ZSlcbiAgICAgICAgPyBvcHRpb25zLnByb2Nlc3Nvci5ub3JtYWxpemVcbiAgICAgICAgOiBERUZBVUxUX05PUk1BTElaRTtcbiAgICBjb25zdCBpbnRlcnBvbGF0ZSA9IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5wcm9jZXNzb3IpICYmXG4gICAgICAgIGlzRnVuY3Rpb24ob3B0aW9ucy5wcm9jZXNzb3IuaW50ZXJwb2xhdGUpXG4gICAgICAgID8gb3B0aW9ucy5wcm9jZXNzb3IuaW50ZXJwb2xhdGVcbiAgICAgICAgOiBERUZBVUxUX0lOVEVSUE9MQVRFO1xuICAgIGNvbnN0IHR5cGUgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnMucHJvY2Vzc29yKSAmJiBpc1N0cmluZyhvcHRpb25zLnByb2Nlc3Nvci50eXBlKVxuICAgICAgICA/IG9wdGlvbnMucHJvY2Vzc29yLnR5cGVcbiAgICAgICAgOiBERUZBVUxUX01FU1NBR0VfREFUQV9UWVBFO1xuICAgIGNvbnN0IGxpbmtlZCA9IChrZXksIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgY29uc3QgW2FyZzEsIGFyZzJdID0gYXJncztcbiAgICAgICAgbGV0IHR5cGUgPSAndGV4dCc7XG4gICAgICAgIGxldCBtb2RpZmllciA9ICcnO1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGlmIChpc09iamVjdChhcmcxKSkge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gYXJnMS5tb2RpZmllciB8fCBtb2RpZmllcjtcbiAgICAgICAgICAgICAgICB0eXBlID0gYXJnMS50eXBlIHx8IHR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc1N0cmluZyhhcmcxKSkge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gYXJnMSB8fCBtb2RpZmllcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgaWYgKGlzU3RyaW5nKGFyZzEpKSB7XG4gICAgICAgICAgICAgICAgbW9kaWZpZXIgPSBhcmcxIHx8IG1vZGlmaWVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU3RyaW5nKGFyZzIpKSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9IGFyZzIgfHwgdHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXQgPSBtZXNzYWdlKGtleSkoY3R4KTtcbiAgICAgICAgY29uc3QgbXNnID0gXG4gICAgICAgIC8vIFRoZSBtZXNzYWdlIGluIHZub2RlIHJlc29sdmVkIHdpdGggbGlua2VkIGFyZSByZXR1cm5lZCBhcyBhbiBhcnJheSBieSBwcm9jZXNzb3Iubm9tYWxpemVcbiAgICAgICAgdHlwZSA9PT0gJ3Zub2RlJyAmJiBpc0FycmF5KHJldCkgJiYgbW9kaWZpZXJcbiAgICAgICAgICAgID8gcmV0WzBdXG4gICAgICAgICAgICA6IHJldDtcbiAgICAgICAgcmV0dXJuIG1vZGlmaWVyID8gX21vZGlmaWVyKG1vZGlmaWVyKShtc2csIHR5cGUpIDogbXNnO1xuICAgIH07XG4gICAgY29uc3QgY3R4ID0ge1xuICAgICAgICBbXCJsaXN0XCIgLyogSGVscGVyTmFtZU1hcC5MSVNUICovXTogbGlzdCxcbiAgICAgICAgW1wibmFtZWRcIiAvKiBIZWxwZXJOYW1lTWFwLk5BTUVEICovXTogbmFtZWQsXG4gICAgICAgIFtcInBsdXJhbFwiIC8qIEhlbHBlck5hbWVNYXAuUExVUkFMICovXTogcGx1cmFsLFxuICAgICAgICBbXCJsaW5rZWRcIiAvKiBIZWxwZXJOYW1lTWFwLkxJTktFRCAqL106IGxpbmtlZCxcbiAgICAgICAgW1wibWVzc2FnZVwiIC8qIEhlbHBlck5hbWVNYXAuTUVTU0FHRSAqL106IG1lc3NhZ2UsXG4gICAgICAgIFtcInR5cGVcIiAvKiBIZWxwZXJOYW1lTWFwLlRZUEUgKi9dOiB0eXBlLFxuICAgICAgICBbXCJpbnRlcnBvbGF0ZVwiIC8qIEhlbHBlck5hbWVNYXAuSU5URVJQT0xBVEUgKi9dOiBpbnRlcnBvbGF0ZSxcbiAgICAgICAgW1wibm9ybWFsaXplXCIgLyogSGVscGVyTmFtZU1hcC5OT1JNQUxJWkUgKi9dOiBub3JtYWxpemUsXG4gICAgICAgIFtcInZhbHVlc1wiIC8qIEhlbHBlck5hbWVNYXAuVkFMVUVTICovXTogYXNzaWduKHt9LCBfbGlzdCwgX25hbWVkKVxuICAgIH07XG4gICAgcmV0dXJuIGN0eDtcbn1cblxubGV0IGRldnRvb2xzID0gbnVsbDtcbmZ1bmN0aW9uIHNldERldlRvb2xzSG9vayhob29rKSB7XG4gICAgZGV2dG9vbHMgPSBob29rO1xufVxuZnVuY3Rpb24gZ2V0RGV2VG9vbHNIb29rKCkge1xuICAgIHJldHVybiBkZXZ0b29scztcbn1cbmZ1bmN0aW9uIGluaXRJMThuRGV2VG9vbHMoaTE4biwgdmVyc2lvbiwgbWV0YSkge1xuICAgIC8vIFRPRE86IHF1ZXVlIGlmIGRldnRvb2xzIGlzIHVuZGVmaW5lZFxuICAgIGRldnRvb2xzICYmXG4gICAgICAgIGRldnRvb2xzLmVtaXQoSW50bGlmeURldlRvb2xzSG9va3MuSTE4bkluaXQsIHtcbiAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIGkxOG4sXG4gICAgICAgICAgICB2ZXJzaW9uLFxuICAgICAgICAgICAgbWV0YVxuICAgICAgICB9KTtcbn1cbmNvbnN0IHRyYW5zbGF0ZURldlRvb2xzID0gLyogI19fUFVSRV9fKi8gY3JlYXRlRGV2VG9vbHNIb29rKEludGxpZnlEZXZUb29sc0hvb2tzLkZ1bmN0aW9uVHJhbnNsYXRlKTtcbmZ1bmN0aW9uIGNyZWF0ZURldlRvb2xzSG9vayhob29rKSB7XG4gICAgcmV0dXJuIChwYXlsb2FkcykgPT4gZGV2dG9vbHMgJiYgZGV2dG9vbHMuZW1pdChob29rLCBwYXlsb2Fkcyk7XG59XG5cbmNvbnN0IENvcmVXYXJuQ29kZXMgPSB7XG4gICAgTk9UX0ZPVU5EX0tFWTogMSxcbiAgICBGQUxMQkFDS19UT19UUkFOU0xBVEU6IDIsXG4gICAgQ0FOTk9UX0ZPUk1BVF9OVU1CRVI6IDMsXG4gICAgRkFMTEJBQ0tfVE9fTlVNQkVSX0ZPUk1BVDogNCxcbiAgICBDQU5OT1RfRk9STUFUX0RBVEU6IDUsXG4gICAgRkFMTEJBQ0tfVE9fREFURV9GT1JNQVQ6IDYsXG4gICAgRVhQRVJJTUVOVEFMX0NVU1RPTV9NRVNTQUdFX0NPTVBJTEVSOiA3LFxuICAgIF9fRVhURU5EX1BPSU5UX186IDhcbn07XG4vKiogQGludGVybmFsICovXG5jb25zdCB3YXJuTWVzc2FnZXMgPSB7XG4gICAgW0NvcmVXYXJuQ29kZXMuTk9UX0ZPVU5EX0tFWV06IGBOb3QgZm91bmQgJ3trZXl9JyBrZXkgaW4gJ3tsb2NhbGV9JyBsb2NhbGUgbWVzc2FnZXMuYCxcbiAgICBbQ29yZVdhcm5Db2Rlcy5GQUxMQkFDS19UT19UUkFOU0xBVEVdOiBgRmFsbCBiYWNrIHRvIHRyYW5zbGF0ZSAne2tleX0nIGtleSB3aXRoICd7dGFyZ2V0fScgbG9jYWxlLmAsXG4gICAgW0NvcmVXYXJuQ29kZXMuQ0FOTk9UX0ZPUk1BVF9OVU1CRVJdOiBgQ2Fubm90IGZvcm1hdCBhIG51bWJlciB2YWx1ZSBkdWUgdG8gbm90IHN1cHBvcnRlZCBJbnRsLk51bWJlckZvcm1hdC5gLFxuICAgIFtDb3JlV2FybkNvZGVzLkZBTExCQUNLX1RPX05VTUJFUl9GT1JNQVRdOiBgRmFsbCBiYWNrIHRvIG51bWJlciBmb3JtYXQgJ3trZXl9JyBrZXkgd2l0aCAne3RhcmdldH0nIGxvY2FsZS5gLFxuICAgIFtDb3JlV2FybkNvZGVzLkNBTk5PVF9GT1JNQVRfREFURV06IGBDYW5ub3QgZm9ybWF0IGEgZGF0ZSB2YWx1ZSBkdWUgdG8gbm90IHN1cHBvcnRlZCBJbnRsLkRhdGVUaW1lRm9ybWF0LmAsXG4gICAgW0NvcmVXYXJuQ29kZXMuRkFMTEJBQ0tfVE9fREFURV9GT1JNQVRdOiBgRmFsbCBiYWNrIHRvIGRhdGV0aW1lIGZvcm1hdCAne2tleX0nIGtleSB3aXRoICd7dGFyZ2V0fScgbG9jYWxlLmAsXG4gICAgW0NvcmVXYXJuQ29kZXMuRVhQRVJJTUVOVEFMX0NVU1RPTV9NRVNTQUdFX0NPTVBJTEVSXTogYFRoaXMgcHJvamVjdCBpcyB1c2luZyBDdXN0b20gTWVzc2FnZSBDb21waWxlciwgd2hpY2ggaXMgYW4gZXhwZXJpbWVudGFsIGZlYXR1cmUuIEl0IG1heSByZWNlaXZlIGJyZWFraW5nIGNoYW5nZXMgb3IgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlLmBcbn07XG5mdW5jdGlvbiBnZXRXYXJuTWVzc2FnZShjb2RlLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIGZvcm1hdCQxKHdhcm5NZXNzYWdlc1tjb2RlXSwgLi4uYXJncyk7XG59XG5cbi8qKlxuICogRmFsbGJhY2sgd2l0aCBzaW1wbGUgaW1wbGVtZW5hdGlvblxuICpcbiAqIEByZW1hcmtzXG4gKiBBIGZhbGxiYWNrIGxvY2FsZSBmdW5jdGlvbiBpbXBsZW1lbnRlZCB3aXRoIGEgc2ltcGxlIGZhbGxiYWNrIGFsZ29yaXRobS5cbiAqXG4gKiBCYXNpY2FsbHksIGl0IHJldHVybnMgdGhlIHZhbHVlIGFzIHNwZWNpZmllZCBpbiB0aGUgYGZhbGxiYWNrTG9jYWxlYCBwcm9wcywgYW5kIGlzIHByb2Nlc3NlZCB3aXRoIHRoZSBmYWxsYmFjayBpbnNpZGUgaW50bGlmeS5cbiAqXG4gKiBAcGFyYW0gY3R4IC0gQSB7QGxpbmsgQ29yZUNvbnRleHQgfCBjb250ZXh0fVxuICogQHBhcmFtIGZhbGxiYWNrIC0gQSB7QGxpbmsgRmFsbGJhY2tMb2NhbGUgfCBmYWxsYmFjayBsb2NhbGV9XG4gKiBAcGFyYW0gc3RhcnQgLSBBIHN0YXJ0aW5nIHtAbGluayBMb2NhbGUgfCBsb2NhbGV9XG4gKlxuICogQHJldHVybnMgRmFsbGJhY2sgbG9jYWxlc1xuICpcbiAqIEBWdWVJMThuR2VuZXJhbFxuICovXG5mdW5jdGlvbiBmYWxsYmFja1dpdGhTaW1wbGUoY3R4LCBmYWxsYmFjaywgc3RhcnQgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbikge1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIHJldHVybiBbLi4ubmV3IFNldChbXG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIC4uLihpc0FycmF5KGZhbGxiYWNrKVxuICAgICAgICAgICAgICAgID8gZmFsbGJhY2tcbiAgICAgICAgICAgICAgICA6IGlzT2JqZWN0KGZhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICA/IE9iamVjdC5rZXlzKGZhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICA6IGlzU3RyaW5nKGZhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBbZmFsbGJhY2tdXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFtzdGFydF0pXG4gICAgICAgIF0pXTtcbn1cbi8qKlxuICogRmFsbGJhY2sgd2l0aCBsb2NhbGUgY2hhaW5cbiAqXG4gKiBAcmVtYXJrc1xuICogQSBmYWxsYmFjayBsb2NhbGUgZnVuY3Rpb24gaW1wbGVtZW50ZWQgd2l0aCBhIGZhbGxiYWNrIGNoYWluIGFsZ29yaXRobS4gSXQncyB1c2VkIGluIFZ1ZUkxOG4gYXMgZGVmYXVsdC5cbiAqXG4gKiBAcGFyYW0gY3R4IC0gQSB7QGxpbmsgQ29yZUNvbnRleHQgfCBjb250ZXh0fVxuICogQHBhcmFtIGZhbGxiYWNrIC0gQSB7QGxpbmsgRmFsbGJhY2tMb2NhbGUgfCBmYWxsYmFjayBsb2NhbGV9XG4gKiBAcGFyYW0gc3RhcnQgLSBBIHN0YXJ0aW5nIHtAbGluayBMb2NhbGUgfCBsb2NhbGV9XG4gKlxuICogQHJldHVybnMgRmFsbGJhY2sgbG9jYWxlc1xuICpcbiAqIEBWdWVJMThuU2VlIFtGYWxsYmFja2luZ10oLi4vZ3VpZGUvZXNzZW50aWFscy9mYWxsYmFjaylcbiAqXG4gKiBAVnVlSTE4bkdlbmVyYWxcbiAqL1xuZnVuY3Rpb24gZmFsbGJhY2tXaXRoTG9jYWxlQ2hhaW4oY3R4LCBmYWxsYmFjaywgc3RhcnQpIHtcbiAgICBjb25zdCBzdGFydExvY2FsZSA9IGlzU3RyaW5nKHN0YXJ0KSA/IHN0YXJ0IDogREVGQVVMVF9MT0NBTEU7XG4gICAgY29uc3QgY29udGV4dCA9IGN0eDtcbiAgICBpZiAoIWNvbnRleHQuX19sb2NhbGVDaGFpbkNhY2hlKSB7XG4gICAgICAgIGNvbnRleHQuX19sb2NhbGVDaGFpbkNhY2hlID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBsZXQgY2hhaW4gPSBjb250ZXh0Ll9fbG9jYWxlQ2hhaW5DYWNoZS5nZXQoc3RhcnRMb2NhbGUpO1xuICAgIGlmICghY2hhaW4pIHtcbiAgICAgICAgY2hhaW4gPSBbXTtcbiAgICAgICAgLy8gZmlyc3QgYmxvY2sgZGVmaW5lZCBieSBzdGFydFxuICAgICAgICBsZXQgYmxvY2sgPSBbc3RhcnRdO1xuICAgICAgICAvLyB3aGlsZSBhbnkgaW50ZXJ2ZW5pbmcgYmxvY2sgZm91bmRcbiAgICAgICAgd2hpbGUgKGlzQXJyYXkoYmxvY2spKSB7XG4gICAgICAgICAgICBibG9jayA9IGFwcGVuZEJsb2NrVG9DaGFpbihjaGFpbiwgYmxvY2ssIGZhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgLy8gbGFzdCBibG9jayBkZWZpbmVkIGJ5IGRlZmF1bHRcbiAgICAgICAgY29uc3QgZGVmYXVsdHMgPSBpc0FycmF5KGZhbGxiYWNrKSB8fCAhaXNQbGFpbk9iamVjdChmYWxsYmFjaylcbiAgICAgICAgICAgID8gZmFsbGJhY2tcbiAgICAgICAgICAgIDogZmFsbGJhY2tbJ2RlZmF1bHQnXVxuICAgICAgICAgICAgICAgID8gZmFsbGJhY2tbJ2RlZmF1bHQnXVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgLy8gY29udmVydCBkZWZhdWx0cyB0byBhcnJheVxuICAgICAgICBibG9jayA9IGlzU3RyaW5nKGRlZmF1bHRzKSA/IFtkZWZhdWx0c10gOiBkZWZhdWx0cztcbiAgICAgICAgaWYgKGlzQXJyYXkoYmxvY2spKSB7XG4gICAgICAgICAgICBhcHBlbmRCbG9ja1RvQ2hhaW4oY2hhaW4sIGJsb2NrLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5fX2xvY2FsZUNoYWluQ2FjaGUuc2V0KHN0YXJ0TG9jYWxlLCBjaGFpbik7XG4gICAgfVxuICAgIHJldHVybiBjaGFpbjtcbn1cbmZ1bmN0aW9uIGFwcGVuZEJsb2NrVG9DaGFpbihjaGFpbiwgYmxvY2ssIGJsb2Nrcykge1xuICAgIGxldCBmb2xsb3cgPSB0cnVlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2subGVuZ3RoICYmIGlzQm9vbGVhbihmb2xsb3cpOyBpKyspIHtcbiAgICAgICAgY29uc3QgbG9jYWxlID0gYmxvY2tbaV07XG4gICAgICAgIGlmIChpc1N0cmluZyhsb2NhbGUpKSB7XG4gICAgICAgICAgICBmb2xsb3cgPSBhcHBlbmRMb2NhbGVUb0NoYWluKGNoYWluLCBibG9ja1tpXSwgYmxvY2tzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZm9sbG93O1xufVxuZnVuY3Rpb24gYXBwZW5kTG9jYWxlVG9DaGFpbihjaGFpbiwgbG9jYWxlLCBibG9ja3MpIHtcbiAgICBsZXQgZm9sbG93O1xuICAgIGNvbnN0IHRva2VucyA9IGxvY2FsZS5zcGxpdCgnLScpO1xuICAgIGRvIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdG9rZW5zLmpvaW4oJy0nKTtcbiAgICAgICAgZm9sbG93ID0gYXBwZW5kSXRlbVRvQ2hhaW4oY2hhaW4sIHRhcmdldCwgYmxvY2tzKTtcbiAgICAgICAgdG9rZW5zLnNwbGljZSgtMSwgMSk7XG4gICAgfSB3aGlsZSAodG9rZW5zLmxlbmd0aCAmJiBmb2xsb3cgPT09IHRydWUpO1xuICAgIHJldHVybiBmb2xsb3c7XG59XG5mdW5jdGlvbiBhcHBlbmRJdGVtVG9DaGFpbihjaGFpbiwgdGFyZ2V0LCBibG9ja3MpIHtcbiAgICBsZXQgZm9sbG93ID0gZmFsc2U7XG4gICAgaWYgKCFjaGFpbi5pbmNsdWRlcyh0YXJnZXQpKSB7XG4gICAgICAgIGZvbGxvdyA9IHRydWU7XG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgIGZvbGxvdyA9IHRhcmdldFt0YXJnZXQubGVuZ3RoIC0gMV0gIT09ICchJztcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsZSA9IHRhcmdldC5yZXBsYWNlKC8hL2csICcnKTtcbiAgICAgICAgICAgIGNoYWluLnB1c2gobG9jYWxlKTtcbiAgICAgICAgICAgIGlmICgoaXNBcnJheShibG9ja3MpIHx8IGlzUGxhaW5PYmplY3QoYmxvY2tzKSkgJiZcbiAgICAgICAgICAgICAgICBibG9ja3NbbG9jYWxlXSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgICAgZm9sbG93ID0gYmxvY2tzW2xvY2FsZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZvbGxvdztcbn1cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuLyoqXG4gKiBJbnRsaWZ5IGNvcmUtYmFzZSB2ZXJzaW9uXG4gKiBAaW50ZXJuYWxcbiAqL1xuY29uc3QgVkVSU0lPTiA9ICc5LjMuMCc7XG5jb25zdCBOT1RfUkVPU0xWRUQgPSAtMTtcbmNvbnN0IERFRkFVTFRfTE9DQUxFID0gJ2VuLVVTJztcbmNvbnN0IE1JU1NJTkdfUkVTT0xWRV9WQUxVRSA9ICcnO1xuY29uc3QgY2FwaXRhbGl6ZSA9IChzdHIpID0+IGAke3N0ci5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2UoKX0ke3N0ci5zdWJzdHIoMSl9YDtcbmZ1bmN0aW9uIGdldERlZmF1bHRMaW5rZWRNb2RpZmllcnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXBwZXI6ICh2YWwsIHR5cGUpID0+IHtcbiAgICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgcmV0dXJuIHR5cGUgPT09ICd0ZXh0JyAmJiBpc1N0cmluZyh2YWwpXG4gICAgICAgICAgICAgICAgPyB2YWwudG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgICAgIDogdHlwZSA9PT0gJ3Zub2RlJyAmJiBpc09iamVjdCh2YWwpICYmICdfX3ZfaXNWTm9kZScgaW4gdmFsXG4gICAgICAgICAgICAgICAgICAgID8gdmFsLmNoaWxkcmVuLnRvVXBwZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgOiB2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIGxvd2VyOiAodmFsLCB0eXBlKSA9PiB7XG4gICAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgIHJldHVybiB0eXBlID09PSAndGV4dCcgJiYgaXNTdHJpbmcodmFsKVxuICAgICAgICAgICAgICAgID8gdmFsLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICA6IHR5cGUgPT09ICd2bm9kZScgJiYgaXNPYmplY3QodmFsKSAmJiAnX192X2lzVk5vZGUnIGluIHZhbFxuICAgICAgICAgICAgICAgICAgICA/IHZhbC5jaGlsZHJlbi50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICAgIDogdmFsO1xuICAgICAgICB9LFxuICAgICAgICBjYXBpdGFsaXplOiAodmFsLCB0eXBlKSA9PiB7XG4gICAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgIHJldHVybiAodHlwZSA9PT0gJ3RleHQnICYmIGlzU3RyaW5nKHZhbClcbiAgICAgICAgICAgICAgICA/IGNhcGl0YWxpemUodmFsKVxuICAgICAgICAgICAgICAgIDogdHlwZSA9PT0gJ3Zub2RlJyAmJiBpc09iamVjdCh2YWwpICYmICdfX3ZfaXNWTm9kZScgaW4gdmFsXG4gICAgICAgICAgICAgICAgICAgID8gY2FwaXRhbGl6ZSh2YWwuY2hpbGRyZW4pXG4gICAgICAgICAgICAgICAgICAgIDogdmFsKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5sZXQgX2NvbXBpbGVyO1xuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlQ29tcGlsZXIoY29tcGlsZXIpIHtcbiAgICBfY29tcGlsZXIgPSBjb21waWxlcjtcbn1cbmxldCBfcmVzb2x2ZXI7XG4vKipcbiAqIFJlZ2lzdGVyIHRoZSBtZXNzYWdlIHJlc29sdmVyXG4gKlxuICogQHBhcmFtIHJlc29sdmVyIC0gQSB7QGxpbmsgTWVzc2FnZVJlc29sdmVyfSBmdW5jdGlvblxuICpcbiAqIEBWdWVJMThuR2VuZXJhbFxuICovXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VSZXNvbHZlcihyZXNvbHZlcikge1xuICAgIF9yZXNvbHZlciA9IHJlc29sdmVyO1xufVxubGV0IF9mYWxsYmFja2VyO1xuLyoqXG4gKiBSZWdpc3RlciB0aGUgbG9jYWxlIGZhbGxiYWNrZXJcbiAqXG4gKiBAcGFyYW0gZmFsbGJhY2tlciAtIEEge0BsaW5rIExvY2FsZUZhbGxiYWNrZXJ9IGZ1bmN0aW9uXG4gKlxuICogQFZ1ZUkxOG5HZW5lcmFsXG4gKi9cbmZ1bmN0aW9uIHJlZ2lzdGVyTG9jYWxlRmFsbGJhY2tlcihmYWxsYmFja2VyKSB7XG4gICAgX2ZhbGxiYWNrZXIgPSBmYWxsYmFja2VyO1xufVxuLy8gQWRkaXRpb25hbCBNZXRhIGZvciBJbnRsaWZ5IERldlRvb2xzXG5sZXQgX2FkZGl0aW9uYWxNZXRhID0gIG51bGw7XG5jb25zdCBzZXRBZGRpdGlvbmFsTWV0YSA9IC8qICNfX1BVUkVfXyovIChtZXRhKSA9PiB7XG4gICAgX2FkZGl0aW9uYWxNZXRhID0gbWV0YTtcbn07XG5jb25zdCBnZXRBZGRpdGlvbmFsTWV0YSA9IC8qICNfX1BVUkVfXyovICgpID0+IF9hZGRpdGlvbmFsTWV0YTtcbmxldCBfZmFsbGJhY2tDb250ZXh0ID0gbnVsbDtcbmNvbnN0IHNldEZhbGxiYWNrQ29udGV4dCA9IChjb250ZXh0KSA9PiB7XG4gICAgX2ZhbGxiYWNrQ29udGV4dCA9IGNvbnRleHQ7XG59O1xuY29uc3QgZ2V0RmFsbGJhY2tDb250ZXh0ID0gKCkgPT4gX2ZhbGxiYWNrQ29udGV4dDtcbi8vIElEIGZvciBDb3JlQ29udGV4dFxubGV0IF9jaWQgPSAwO1xuZnVuY3Rpb24gY3JlYXRlQ29yZUNvbnRleHQob3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gc2V0dXAgb3B0aW9uc1xuICAgIGNvbnN0IG9uV2FybiA9IGlzRnVuY3Rpb24ob3B0aW9ucy5vbldhcm4pID8gb3B0aW9ucy5vbldhcm4gOiB3YXJuO1xuICAgIGNvbnN0IHZlcnNpb24gPSBpc1N0cmluZyhvcHRpb25zLnZlcnNpb24pID8gb3B0aW9ucy52ZXJzaW9uIDogVkVSU0lPTjtcbiAgICBjb25zdCBsb2NhbGUgPSBpc1N0cmluZyhvcHRpb25zLmxvY2FsZSkgPyBvcHRpb25zLmxvY2FsZSA6IERFRkFVTFRfTE9DQUxFO1xuICAgIGNvbnN0IGZhbGxiYWNrTG9jYWxlID0gaXNBcnJheShvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxuICAgICAgICBpc1BsYWluT2JqZWN0KG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XG4gICAgICAgIGlzU3RyaW5nKG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XG4gICAgICAgIG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUgPT09IGZhbHNlXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja0xvY2FsZVxuICAgICAgICA6IGxvY2FsZTtcbiAgICBjb25zdCBtZXNzYWdlcyA9IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5tZXNzYWdlcylcbiAgICAgICAgPyBvcHRpb25zLm1lc3NhZ2VzXG4gICAgICAgIDogeyBbbG9jYWxlXToge30gfTtcbiAgICBjb25zdCBkYXRldGltZUZvcm1hdHMgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzKVxuICAgICAgICAgICAgPyBvcHRpb25zLmRhdGV0aW1lRm9ybWF0c1xuICAgICAgICAgICAgOiB7IFtsb2NhbGVdOiB7fSB9XG4gICAgICAgIDtcbiAgICBjb25zdCBudW1iZXJGb3JtYXRzID0gaXNQbGFpbk9iamVjdChvcHRpb25zLm51bWJlckZvcm1hdHMpXG4gICAgICAgICAgICA/IG9wdGlvbnMubnVtYmVyRm9ybWF0c1xuICAgICAgICAgICAgOiB7IFtsb2NhbGVdOiB7fSB9XG4gICAgICAgIDtcbiAgICBjb25zdCBtb2RpZmllcnMgPSBhc3NpZ24oe30sIG9wdGlvbnMubW9kaWZpZXJzIHx8IHt9LCBnZXREZWZhdWx0TGlua2VkTW9kaWZpZXJzKCkpO1xuICAgIGNvbnN0IHBsdXJhbFJ1bGVzID0gb3B0aW9ucy5wbHVyYWxSdWxlcyB8fCB7fTtcbiAgICBjb25zdCBtaXNzaW5nID0gaXNGdW5jdGlvbihvcHRpb25zLm1pc3NpbmcpID8gb3B0aW9ucy5taXNzaW5nIDogbnVsbDtcbiAgICBjb25zdCBtaXNzaW5nV2FybiA9IGlzQm9vbGVhbihvcHRpb25zLm1pc3NpbmdXYXJuKSB8fCBpc1JlZ0V4cChvcHRpb25zLm1pc3NpbmdXYXJuKVxuICAgICAgICA/IG9wdGlvbnMubWlzc2luZ1dhcm5cbiAgICAgICAgOiB0cnVlO1xuICAgIGNvbnN0IGZhbGxiYWNrV2FybiA9IGlzQm9vbGVhbihvcHRpb25zLmZhbGxiYWNrV2FybikgfHwgaXNSZWdFeHAob3B0aW9ucy5mYWxsYmFja1dhcm4pXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1dhcm5cbiAgICAgICAgOiB0cnVlO1xuICAgIGNvbnN0IGZhbGxiYWNrRm9ybWF0ID0gISFvcHRpb25zLmZhbGxiYWNrRm9ybWF0O1xuICAgIGNvbnN0IHVucmVzb2x2aW5nID0gISFvcHRpb25zLnVucmVzb2x2aW5nO1xuICAgIGNvbnN0IHBvc3RUcmFuc2xhdGlvbiA9IGlzRnVuY3Rpb24ob3B0aW9ucy5wb3N0VHJhbnNsYXRpb24pXG4gICAgICAgID8gb3B0aW9ucy5wb3N0VHJhbnNsYXRpb25cbiAgICAgICAgOiBudWxsO1xuICAgIGNvbnN0IHByb2Nlc3NvciA9IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5wcm9jZXNzb3IpID8gb3B0aW9ucy5wcm9jZXNzb3IgOiBudWxsO1xuICAgIGNvbnN0IHdhcm5IdG1sTWVzc2FnZSA9IGlzQm9vbGVhbihvcHRpb25zLndhcm5IdG1sTWVzc2FnZSlcbiAgICAgICAgPyBvcHRpb25zLndhcm5IdG1sTWVzc2FnZVxuICAgICAgICA6IHRydWU7XG4gICAgY29uc3QgZXNjYXBlUGFyYW1ldGVyID0gISFvcHRpb25zLmVzY2FwZVBhcmFtZXRlcjtcbiAgICBjb25zdCBtZXNzYWdlQ29tcGlsZXIgPSBpc0Z1bmN0aW9uKG9wdGlvbnMubWVzc2FnZUNvbXBpbGVyKVxuICAgICAgICA/IG9wdGlvbnMubWVzc2FnZUNvbXBpbGVyXG4gICAgICAgIDogX2NvbXBpbGVyO1xuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiZcbiAgICAgICAgIWZhbHNlICYmXG4gICAgICAgICFmYWxzZSAmJlxuICAgICAgICBpc0Z1bmN0aW9uKG9wdGlvbnMubWVzc2FnZUNvbXBpbGVyKSkge1xuICAgICAgICB3YXJuT25jZShnZXRXYXJuTWVzc2FnZShDb3JlV2FybkNvZGVzLkVYUEVSSU1FTlRBTF9DVVNUT01fTUVTU0FHRV9DT01QSUxFUikpO1xuICAgIH1cbiAgICBjb25zdCBtZXNzYWdlUmVzb2x2ZXIgPSBpc0Z1bmN0aW9uKG9wdGlvbnMubWVzc2FnZVJlc29sdmVyKVxuICAgICAgICA/IG9wdGlvbnMubWVzc2FnZVJlc29sdmVyXG4gICAgICAgIDogX3Jlc29sdmVyIHx8IHJlc29sdmVXaXRoS2V5VmFsdWU7XG4gICAgY29uc3QgbG9jYWxlRmFsbGJhY2tlciA9IGlzRnVuY3Rpb24ob3B0aW9ucy5sb2NhbGVGYWxsYmFja2VyKVxuICAgICAgICA/IG9wdGlvbnMubG9jYWxlRmFsbGJhY2tlclxuICAgICAgICA6IF9mYWxsYmFja2VyIHx8IGZhbGxiYWNrV2l0aFNpbXBsZTtcbiAgICBjb25zdCBmYWxsYmFja0NvbnRleHQgPSBpc09iamVjdChvcHRpb25zLmZhbGxiYWNrQ29udGV4dClcbiAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrQ29udGV4dFxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAvLyBzZXR1cCBpbnRlcm5hbCBvcHRpb25zXG4gICAgY29uc3QgaW50ZXJuYWxPcHRpb25zID0gb3B0aW9ucztcbiAgICBjb25zdCBfX2RhdGV0aW1lRm9ybWF0dGVycyA9IGlzT2JqZWN0KGludGVybmFsT3B0aW9ucy5fX2RhdGV0aW1lRm9ybWF0dGVycylcbiAgICAgICAgICAgID8gaW50ZXJuYWxPcHRpb25zLl9fZGF0ZXRpbWVGb3JtYXR0ZXJzXG4gICAgICAgICAgICA6IG5ldyBNYXAoKVxuICAgICAgICA7XG4gICAgY29uc3QgX19udW1iZXJGb3JtYXR0ZXJzID0gaXNPYmplY3QoaW50ZXJuYWxPcHRpb25zLl9fbnVtYmVyRm9ybWF0dGVycylcbiAgICAgICAgICAgID8gaW50ZXJuYWxPcHRpb25zLl9fbnVtYmVyRm9ybWF0dGVyc1xuICAgICAgICAgICAgOiBuZXcgTWFwKClcbiAgICAgICAgO1xuICAgIGNvbnN0IF9fbWV0YSA9IGlzT2JqZWN0KGludGVybmFsT3B0aW9ucy5fX21ldGEpID8gaW50ZXJuYWxPcHRpb25zLl9fbWV0YSA6IHt9O1xuICAgIF9jaWQrKztcbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgICB2ZXJzaW9uLFxuICAgICAgICBjaWQ6IF9jaWQsXG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgZmFsbGJhY2tMb2NhbGUsXG4gICAgICAgIG1lc3NhZ2VzLFxuICAgICAgICBtb2RpZmllcnMsXG4gICAgICAgIHBsdXJhbFJ1bGVzLFxuICAgICAgICBtaXNzaW5nLFxuICAgICAgICBtaXNzaW5nV2FybixcbiAgICAgICAgZmFsbGJhY2tXYXJuLFxuICAgICAgICBmYWxsYmFja0Zvcm1hdCxcbiAgICAgICAgdW5yZXNvbHZpbmcsXG4gICAgICAgIHBvc3RUcmFuc2xhdGlvbixcbiAgICAgICAgcHJvY2Vzc29yLFxuICAgICAgICB3YXJuSHRtbE1lc3NhZ2UsXG4gICAgICAgIGVzY2FwZVBhcmFtZXRlcixcbiAgICAgICAgbWVzc2FnZUNvbXBpbGVyLFxuICAgICAgICBtZXNzYWdlUmVzb2x2ZXIsXG4gICAgICAgIGxvY2FsZUZhbGxiYWNrZXIsXG4gICAgICAgIGZhbGxiYWNrQ29udGV4dCxcbiAgICAgICAgb25XYXJuLFxuICAgICAgICBfX21ldGFcbiAgICB9O1xuICAgIHtcbiAgICAgICAgY29udGV4dC5kYXRldGltZUZvcm1hdHMgPSBkYXRldGltZUZvcm1hdHM7XG4gICAgICAgIGNvbnRleHQubnVtYmVyRm9ybWF0cyA9IG51bWJlckZvcm1hdHM7XG4gICAgICAgIGNvbnRleHQuX19kYXRldGltZUZvcm1hdHRlcnMgPSBfX2RhdGV0aW1lRm9ybWF0dGVycztcbiAgICAgICAgY29udGV4dC5fX251bWJlckZvcm1hdHRlcnMgPSBfX251bWJlckZvcm1hdHRlcnM7XG4gICAgfVxuICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XG4gICAgICAgIGNvbnRleHQuX192X2VtaXR0ZXIgPVxuICAgICAgICAgICAgaW50ZXJuYWxPcHRpb25zLl9fdl9lbWl0dGVyICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IGludGVybmFsT3B0aW9ucy5fX3ZfZW1pdHRlclxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvLyBOT1RFOiBleHBlcmltZW50YWwgISFcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18pIHtcbiAgICAgICAgaW5pdEkxOG5EZXZUb29scyhjb250ZXh0LCB2ZXJzaW9uLCBfX21ldGEpO1xuICAgIH1cbiAgICByZXR1cm4gY29udGV4dDtcbn1cbi8qKiBAaW50ZXJuYWwgKi9cbmZ1bmN0aW9uIGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuKGZhbGxiYWNrLCBrZXkpIHtcbiAgICByZXR1cm4gZmFsbGJhY2sgaW5zdGFuY2VvZiBSZWdFeHAgPyBmYWxsYmFjay50ZXN0KGtleSkgOiBmYWxsYmFjaztcbn1cbi8qKiBAaW50ZXJuYWwgKi9cbmZ1bmN0aW9uIGlzVHJhbnNsYXRlTWlzc2luZ1dhcm4obWlzc2luZywga2V5KSB7XG4gICAgcmV0dXJuIG1pc3NpbmcgaW5zdGFuY2VvZiBSZWdFeHAgPyBtaXNzaW5nLnRlc3Qoa2V5KSA6IG1pc3Npbmc7XG59XG4vKiogQGludGVybmFsICovXG5mdW5jdGlvbiBoYW5kbGVNaXNzaW5nKGNvbnRleHQsIGtleSwgbG9jYWxlLCBtaXNzaW5nV2FybiwgdHlwZSkge1xuICAgIGNvbnN0IHsgbWlzc2luZywgb25XYXJuIH0gPSBjb250ZXh0O1xuICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XG4gICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjb250ZXh0Ll9fdl9lbWl0dGVyO1xuICAgICAgICBpZiAoZW1pdHRlcikge1xuICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwibWlzc2luZ1wiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuTUlTU0lORyAqLywge1xuICAgICAgICAgICAgICAgIGxvY2FsZSxcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICBncm91cElkOiBgJHt0eXBlfToke2tleX1gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobWlzc2luZyAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCByZXQgPSBtaXNzaW5nKGNvbnRleHQsIGxvY2FsZSwga2V5LCB0eXBlKTtcbiAgICAgICAgcmV0dXJuIGlzU3RyaW5nKHJldCkgPyByZXQgOiBrZXk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGlzVHJhbnNsYXRlTWlzc2luZ1dhcm4obWlzc2luZ1dhcm4sIGtleSkpIHtcbiAgICAgICAgICAgIG9uV2FybihnZXRXYXJuTWVzc2FnZShDb3JlV2FybkNvZGVzLk5PVF9GT1VORF9LRVksIHsga2V5LCBsb2NhbGUgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgfVxufVxuLyoqIEBpbnRlcm5hbCAqL1xuZnVuY3Rpb24gdXBkYXRlRmFsbGJhY2tMb2NhbGUoY3R4LCBsb2NhbGUsIGZhbGxiYWNrKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGN0eDtcbiAgICBjb250ZXh0Ll9fbG9jYWxlQ2hhaW5DYWNoZSA9IG5ldyBNYXAoKTtcbiAgICBjdHgubG9jYWxlRmFsbGJhY2tlcihjdHgsIGZhbGxiYWNrLCBsb2NhbGUpO1xufVxuLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5cbmZ1bmN0aW9uIGZvcm1hdChhc3QpIHtcbiAgICBjb25zdCBtc2cgPSAoY3R4KSA9PiBmb3JtYXRQYXJ0cyhjdHgsIGFzdCk7XG4gICAgcmV0dXJuIG1zZztcbn1cbmZ1bmN0aW9uIGZvcm1hdFBhcnRzKGN0eCwgYXN0KSB7XG4gICAgY29uc3QgYm9keSA9IGFzdC5iIHx8IGFzdC5ib2R5O1xuICAgIGlmICgoYm9keS50IHx8IGJvZHkudHlwZSkgPT09IDEgLyogTm9kZVR5cGVzLlBsdXJhbCAqLykge1xuICAgICAgICBjb25zdCBwbHVyYWwgPSBib2R5O1xuICAgICAgICBjb25zdCBjYXNlcyA9IHBsdXJhbC5jIHx8IHBsdXJhbC5jYXNlcztcbiAgICAgICAgcmV0dXJuIGN0eC5wbHVyYWwoY2FzZXMucmVkdWNlKChtZXNzYWdlcywgYykgPT4gW1xuICAgICAgICAgICAgLi4ubWVzc2FnZXMsXG4gICAgICAgICAgICBmb3JtYXRNZXNzYWdlUGFydHMoY3R4LCBjKVxuICAgICAgICBdLCBbXSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZvcm1hdE1lc3NhZ2VQYXJ0cyhjdHgsIGJvZHkpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2VQYXJ0cyhjdHgsIG5vZGUpIHtcbiAgICBjb25zdCBfc3RhdGljID0gbm9kZS5zIHx8IG5vZGUuc3RhdGljO1xuICAgIGlmIChfc3RhdGljKSB7XG4gICAgICAgIHJldHVybiBjdHgudHlwZSA9PT0gJ3RleHQnXG4gICAgICAgICAgICA/IF9zdGF0aWNcbiAgICAgICAgICAgIDogY3R4Lm5vcm1hbGl6ZShbX3N0YXRpY10pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZXMgPSAobm9kZS5pIHx8IG5vZGUuaXRlbXMpLnJlZHVjZSgoYWNtLCBjKSA9PiBbLi4uYWNtLCBmb3JtYXRNZXNzYWdlUGFydChjdHgsIGMpXSwgW10pO1xuICAgICAgICByZXR1cm4gY3R4Lm5vcm1hbGl6ZShtZXNzYWdlcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZm9ybWF0TWVzc2FnZVBhcnQoY3R4LCBub2RlKSB7XG4gICAgY29uc3QgdHlwZSA9IG5vZGUudCB8fCBub2RlLnR5cGU7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgMyAvKiBOb2RlVHlwZXMuVGV4dCAqLzpcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBub2RlO1xuICAgICAgICAgICAgcmV0dXJuICh0ZXh0LnYgfHwgdGV4dC52YWx1ZSk7XG4gICAgICAgIGNhc2UgOSAvKiBOb2RlVHlwZXMuTGl0ZXJhbCAqLzpcbiAgICAgICAgICAgIGNvbnN0IGxpdGVyYWwgPSBub2RlO1xuICAgICAgICAgICAgcmV0dXJuIChsaXRlcmFsLnYgfHwgbGl0ZXJhbC52YWx1ZSk7XG4gICAgICAgIGNhc2UgNCAvKiBOb2RlVHlwZXMuTmFtZWQgKi86XG4gICAgICAgICAgICBjb25zdCBuYW1lZCA9IG5vZGU7XG4gICAgICAgICAgICByZXR1cm4gY3R4LmludGVycG9sYXRlKGN0eC5uYW1lZChuYW1lZC5rIHx8IG5hbWVkLmtleSkpO1xuICAgICAgICBjYXNlIDUgLyogTm9kZVR5cGVzLkxpc3QgKi86XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gbm9kZTtcbiAgICAgICAgICAgIHJldHVybiBjdHguaW50ZXJwb2xhdGUoY3R4Lmxpc3QobGlzdC5pIHx8IGxpc3QuaW5kZXgpKTtcbiAgICAgICAgY2FzZSA2IC8qIE5vZGVUeXBlcy5MaW5rZWQgKi86XG4gICAgICAgICAgICBjb25zdCBsaW5rZWQgPSBub2RlO1xuICAgICAgICAgICAgY29uc3QgbW9kaWZpZXIgPSBsaW5rZWQubSB8fCBsaW5rZWQubW9kaWZpZXI7XG4gICAgICAgICAgICByZXR1cm4gY3R4LmxpbmtlZChmb3JtYXRNZXNzYWdlUGFydChjdHgsIGxpbmtlZC5rIHx8IGxpbmtlZC5rZXkpLCBtb2RpZmllciA/IGZvcm1hdE1lc3NhZ2VQYXJ0KGN0eCwgbW9kaWZpZXIpIDogdW5kZWZpbmVkLCBjdHgudHlwZSk7XG4gICAgICAgIGNhc2UgNyAvKiBOb2RlVHlwZXMuTGlua2VkS2V5ICovOlxuICAgICAgICAgICAgY29uc3QgbGlua2VkS2V5ID0gbm9kZTtcbiAgICAgICAgICAgIHJldHVybiAobGlua2VkS2V5LnYgfHwgbGlua2VkS2V5LnZhbHVlKTtcbiAgICAgICAgY2FzZSA4IC8qIE5vZGVUeXBlcy5MaW5rZWRNb2RpZmllciAqLzpcbiAgICAgICAgICAgIGNvbnN0IGxpbmtlZE1vZGlmaWVyID0gbm9kZTtcbiAgICAgICAgICAgIHJldHVybiAobGlua2VkTW9kaWZpZXIudiB8fCBsaW5rZWRNb2RpZmllci52YWx1ZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuaGFuZGxlZCBub2RlIHR5cGUgb24gZm9ybWF0IG1lc3NhZ2UgcGFydDogJHt0eXBlfWApO1xuICAgIH1cbn1cblxuY29uc3QgY29kZSA9IENvbXBpbGVFcnJvckNvZGVzLl9fRVhURU5EX1BPSU5UX187XG5jb25zdCBpbmMgPSBpbmNyZW1lbnRlcihjb2RlKTtcbmNvbnN0IENvcmVFcnJvckNvZGVzID0ge1xuICAgIElOVkFMSURfQVJHVU1FTlQ6IGNvZGUsXG4gICAgSU5WQUxJRF9EQVRFX0FSR1VNRU5UOiBpbmMoKSxcbiAgICBJTlZBTElEX0lTT19EQVRFX0FSR1VNRU5UOiBpbmMoKSxcbiAgICBOT1RfU1VQUE9SVF9OT05fU1RSSU5HX01FU1NBR0U6IGluYygpLFxuICAgIF9fRVhURU5EX1BPSU5UX186IGluYygpIC8vIDIyXG59O1xuZnVuY3Rpb24gY3JlYXRlQ29yZUVycm9yKGNvZGUpIHtcbiAgICByZXR1cm4gY3JlYXRlQ29tcGlsZUVycm9yKGNvZGUsIG51bGwsIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSA/IHsgbWVzc2FnZXM6IGVycm9yTWVzc2FnZXMgfSA6IHVuZGVmaW5lZCk7XG59XG4vKiogQGludGVybmFsICovXG5jb25zdCBlcnJvck1lc3NhZ2VzID0ge1xuICAgIFtDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0FSR1VNRU5UXTogJ0ludmFsaWQgYXJndW1lbnRzJyxcbiAgICBbQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9EQVRFX0FSR1VNRU5UXTogJ1RoZSBkYXRlIHByb3ZpZGVkIGlzIGFuIGludmFsaWQgRGF0ZSBvYmplY3QuJyArXG4gICAgICAgICdNYWtlIHN1cmUgeW91ciBEYXRlIHJlcHJlc2VudHMgYSB2YWxpZCBkYXRlLicsXG4gICAgW0NvcmVFcnJvckNvZGVzLklOVkFMSURfSVNPX0RBVEVfQVJHVU1FTlRdOiAnVGhlIGFyZ3VtZW50IHByb3ZpZGVkIGlzIG5vdCBhIHZhbGlkIElTTyBkYXRlIHN0cmluZycsXG4gICAgW0NvcmVFcnJvckNvZGVzLk5PVF9TVVBQT1JUX05PTl9TVFJJTkdfTUVTU0FHRV06ICdOb3Qgc3VwcG9ydCBub24tc3RyaW5nIG1lc3NhZ2UnXG59O1xuXG5jb25zdCBXQVJOX01FU1NBR0UgPSBgRGV0ZWN0ZWQgSFRNTCBpbiAne3NvdXJjZX0nIG1lc3NhZ2UuIFJlY29tbWVuZCBub3QgdXNpbmcgSFRNTCBtZXNzYWdlcyB0byBhdm9pZCBYU1MuYDtcbmZ1bmN0aW9uIGNoZWNrSHRtbE1lc3NhZ2Uoc291cmNlLCB3YXJuSHRtbE1lc3NhZ2UpIHtcbiAgICBpZiAod2Fybkh0bWxNZXNzYWdlICYmIGRldGVjdEh0bWxUYWcoc291cmNlKSkge1xuICAgICAgICB3YXJuKGZvcm1hdCQxKFdBUk5fTUVTU0FHRSwgeyBzb3VyY2UgfSkpO1xuICAgIH1cbn1cbmNvbnN0IGRlZmF1bHRPbkNhY2hlS2V5ID0gKG1lc3NhZ2UpID0+IG1lc3NhZ2U7XG5sZXQgY29tcGlsZUNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbmZ1bmN0aW9uIGNsZWFyQ29tcGlsZUNhY2hlKCkge1xuICAgIGNvbXBpbGVDYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG59XG5jb25zdCBpc01lc3NhZ2VBU1QgPSAodmFsKSA9PiBpc09iamVjdCh2YWwpICYmXG4gICAgKHZhbC50ID09PSAwIHx8IHZhbC50eXBlID09PSAwKSAmJlxuICAgICgnYicgaW4gdmFsIHx8ICdib2R5JyBpbiB2YWwpO1xuZnVuY3Rpb24gYmFzZUNvbXBpbGUobWVzc2FnZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgLy8gZXJyb3IgZGV0ZWN0aW5nIG9uIGNvbXBpbGVcbiAgICBsZXQgZGV0ZWN0RXJyb3IgPSBmYWxzZTtcbiAgICBjb25zdCBvbkVycm9yID0gb3B0aW9ucy5vbkVycm9yIHx8IGRlZmF1bHRPbkVycm9yO1xuICAgIG9wdGlvbnMub25FcnJvciA9IChlcnIpID0+IHtcbiAgICAgICAgZGV0ZWN0RXJyb3IgPSB0cnVlO1xuICAgICAgICBvbkVycm9yKGVycik7XG4gICAgfTtcbiAgICAvLyBjb21waWxlIHdpdGggbWVzYXNnZS1jb21waWxlclxuICAgIHJldHVybiB7IC4uLmJhc2VDb21waWxlJDEobWVzc2FnZSwgb3B0aW9ucyksIGRldGVjdEVycm9yIH07XG59XG5mdW5jdGlvbiBjb21waWxlVG9GdW5jdGlvbihtZXNzYWdlLCBjb250ZXh0KSB7XG4gICAgaWYgKCFpc1N0cmluZyhtZXNzYWdlKSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuTk9UX1NVUFBPUlRfTk9OX1NUUklOR19NRVNTQUdFKTtcbiAgICB9XG4gICAge1xuICAgICAgICAvLyBjaGVjayBIVE1MIG1lc3NhZ2VcbiAgICAgICAgY29uc3Qgd2Fybkh0bWxNZXNzYWdlID0gaXNCb29sZWFuKGNvbnRleHQud2Fybkh0bWxNZXNzYWdlKVxuICAgICAgICAgICAgPyBjb250ZXh0Lndhcm5IdG1sTWVzc2FnZVxuICAgICAgICAgICAgOiB0cnVlO1xuICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgY2hlY2tIdG1sTWVzc2FnZShtZXNzYWdlLCB3YXJuSHRtbE1lc3NhZ2UpO1xuICAgICAgICAvLyBjaGVjayBjYWNoZXNcbiAgICAgICAgY29uc3Qgb25DYWNoZUtleSA9IGNvbnRleHQub25DYWNoZUtleSB8fCBkZWZhdWx0T25DYWNoZUtleTtcbiAgICAgICAgY29uc3QgY2FjaGVLZXkgPSBvbkNhY2hlS2V5KG1lc3NhZ2UpO1xuICAgICAgICBjb25zdCBjYWNoZWQgPSBjb21waWxlQ2FjaGVbY2FjaGVLZXldO1xuICAgICAgICBpZiAoY2FjaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbXBpbGVcbiAgICAgICAgY29uc3QgeyBjb2RlLCBkZXRlY3RFcnJvciB9ID0gYmFzZUNvbXBpbGUobWVzc2FnZSwgY29udGV4dCk7XG4gICAgICAgIC8vIGV2YWx1YXRlIGZ1bmN0aW9uXG4gICAgICAgIGNvbnN0IG1zZyA9IG5ldyBGdW5jdGlvbihgcmV0dXJuICR7Y29kZX1gKSgpO1xuICAgICAgICAvLyBpZiBvY2N1cnJlZCBjb21waWxlIGVycm9yLCBkb24ndCBjYWNoZVxuICAgICAgICByZXR1cm4gIWRldGVjdEVycm9yXG4gICAgICAgICAgICA/IChjb21waWxlQ2FjaGVbY2FjaGVLZXldID0gbXNnKVxuICAgICAgICAgICAgOiBtc2c7XG4gICAgfVxufVxuZnVuY3Rpb24gY29tcGlsZShtZXNzYWdlLCBjb250ZXh0KSB7XG4gICAgaWYgKF9fSU5UTElGWV9KSVRfQ09NUElMQVRJT05fXyAmJlxuICAgICAgICAhX19JTlRMSUZZX0RST1BfTUVTU0FHRV9DT01QSUxFUl9fICYmXG4gICAgICAgIGlzU3RyaW5nKG1lc3NhZ2UpKSB7XG4gICAgICAgIC8vIGNoZWNrIEhUTUwgbWVzc2FnZVxuICAgICAgICBjb25zdCB3YXJuSHRtbE1lc3NhZ2UgPSBpc0Jvb2xlYW4oY29udGV4dC53YXJuSHRtbE1lc3NhZ2UpXG4gICAgICAgICAgICA/IGNvbnRleHQud2Fybkh0bWxNZXNzYWdlXG4gICAgICAgICAgICA6IHRydWU7XG4gICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBjaGVja0h0bWxNZXNzYWdlKG1lc3NhZ2UsIHdhcm5IdG1sTWVzc2FnZSk7XG4gICAgICAgIC8vIGNoZWNrIGNhY2hlc1xuICAgICAgICBjb25zdCBvbkNhY2hlS2V5ID0gY29udGV4dC5vbkNhY2hlS2V5IHx8IGRlZmF1bHRPbkNhY2hlS2V5O1xuICAgICAgICBjb25zdCBjYWNoZUtleSA9IG9uQ2FjaGVLZXkobWVzc2FnZSk7XG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IGNvbXBpbGVDYWNoZVtjYWNoZUtleV07XG4gICAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29tcGlsZSB3aXRoIEpJVCBtb2RlXG4gICAgICAgIGNvbnN0IHsgYXN0LCBkZXRlY3RFcnJvciB9ID0gYmFzZUNvbXBpbGUobWVzc2FnZSwge1xuICAgICAgICAgICAgLi4uY29udGV4dCxcbiAgICAgICAgICAgIGxvY2F0aW9uOiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyksXG4gICAgICAgICAgICBqaXQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGNvbXBvc2UgbWVzc2FnZSBmdW5jdGlvbiBmcm9tIEFTVFxuICAgICAgICBjb25zdCBtc2cgPSBmb3JtYXQoYXN0KTtcbiAgICAgICAgLy8gaWYgb2NjdXJyZWQgY29tcGlsZSBlcnJvciwgZG9uJ3QgY2FjaGVcbiAgICAgICAgcmV0dXJuICFkZXRlY3RFcnJvclxuICAgICAgICAgICAgPyAoY29tcGlsZUNhY2hlW2NhY2hlS2V5XSA9IG1zZylcbiAgICAgICAgICAgIDogbXNnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiAhaXNNZXNzYWdlQVNUKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICB3YXJuKGB0aGUgbWVzc2FnZSB0aGF0IGlzIHJlc29sdmUgd2l0aCBrZXkgJyR7Y29udGV4dC5rZXl9JyBpcyBub3Qgc3VwcG9ydGVkIGZvciBqaXQgY29tcGlsYXRpb25gKTtcbiAgICAgICAgICAgIHJldHVybiAoKCkgPT4gbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQVNUIGNhc2UgKHBhc3NlZCBmcm9tIGJ1bmRsZXIpXG4gICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gbWVzc2FnZS5jYWNoZUtleTtcbiAgICAgICAgaWYgKGNhY2hlS2V5KSB7XG4gICAgICAgICAgICBjb25zdCBjYWNoZWQgPSBjb21waWxlQ2FjaGVbY2FjaGVLZXldO1xuICAgICAgICAgICAgaWYgKGNhY2hlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb21wb3NlIG1lc3NhZ2UgZnVuY3Rpb24gZnJvbSBtZXNzYWdlIChBU1QpXG4gICAgICAgICAgICByZXR1cm4gKGNvbXBpbGVDYWNoZVtjYWNoZUtleV0gPVxuICAgICAgICAgICAgICAgIGZvcm1hdChtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0KG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCBOT09QX01FU1NBR0VfRlVOQ1RJT04gPSAoKSA9PiAnJztcbmNvbnN0IGlzTWVzc2FnZUZ1bmN0aW9uID0gKHZhbCkgPT4gaXNGdW5jdGlvbih2YWwpO1xuLy8gaW1wbGVtZW50YXRpb24gb2YgYHRyYW5zbGF0ZWAgZnVuY3Rpb25cbmZ1bmN0aW9uIHRyYW5zbGF0ZShjb250ZXh0LCAuLi5hcmdzKSB7XG4gICAgY29uc3QgeyBmYWxsYmFja0Zvcm1hdCwgcG9zdFRyYW5zbGF0aW9uLCB1bnJlc29sdmluZywgbWVzc2FnZUNvbXBpbGVyLCBmYWxsYmFja0xvY2FsZSwgbWVzc2FnZXMgfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgW2tleSwgb3B0aW9uc10gPSBwYXJzZVRyYW5zbGF0ZUFyZ3MoLi4uYXJncyk7XG4gICAgY29uc3QgbWlzc2luZ1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5taXNzaW5nV2FybilcbiAgICAgICAgPyBvcHRpb25zLm1pc3NpbmdXYXJuXG4gICAgICAgIDogY29udGV4dC5taXNzaW5nV2FybjtcbiAgICBjb25zdCBmYWxsYmFja1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5mYWxsYmFja1dhcm4pXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1dhcm5cbiAgICAgICAgOiBjb250ZXh0LmZhbGxiYWNrV2FybjtcbiAgICBjb25zdCBlc2NhcGVQYXJhbWV0ZXIgPSBpc0Jvb2xlYW4ob3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXIpXG4gICAgICAgID8gb3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXJcbiAgICAgICAgOiBjb250ZXh0LmVzY2FwZVBhcmFtZXRlcjtcbiAgICBjb25zdCByZXNvbHZlZE1lc3NhZ2UgPSAhIW9wdGlvbnMucmVzb2x2ZWRNZXNzYWdlO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IGRlZmF1bHRNc2dPcktleSA9IGlzU3RyaW5nKG9wdGlvbnMuZGVmYXVsdCkgfHwgaXNCb29sZWFuKG9wdGlvbnMuZGVmYXVsdCkgLy8gZGVmYXVsdCBieSBmdW5jdGlvbiBvcHRpb25cbiAgICAgICAgPyAhaXNCb29sZWFuKG9wdGlvbnMuZGVmYXVsdClcbiAgICAgICAgICAgID8gb3B0aW9ucy5kZWZhdWx0XG4gICAgICAgICAgICA6ICghbWVzc2FnZUNvbXBpbGVyID8gKCkgPT4ga2V5IDoga2V5KVxuICAgICAgICA6IGZhbGxiYWNrRm9ybWF0IC8vIGRlZmF1bHQgYnkgYGZhbGxiYWNrRm9ybWF0YCBvcHRpb25cbiAgICAgICAgICAgID8gKCFtZXNzYWdlQ29tcGlsZXIgPyAoKSA9PiBrZXkgOiBrZXkpXG4gICAgICAgICAgICA6ICcnO1xuICAgIGNvbnN0IGVuYWJsZURlZmF1bHRNc2cgPSBmYWxsYmFja0Zvcm1hdCB8fCBkZWZhdWx0TXNnT3JLZXkgIT09ICcnO1xuICAgIGNvbnN0IGxvY2FsZSA9IGlzU3RyaW5nKG9wdGlvbnMubG9jYWxlKSA/IG9wdGlvbnMubG9jYWxlIDogY29udGV4dC5sb2NhbGU7XG4gICAgLy8gZXNjYXBlIHBhcmFtc1xuICAgIGVzY2FwZVBhcmFtZXRlciAmJiBlc2NhcGVQYXJhbXMob3B0aW9ucyk7XG4gICAgLy8gcmVzb2x2ZSBtZXNzYWdlIGZvcm1hdFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3RcbiAgICBsZXQgW2Zvcm1hdFNjb3BlLCB0YXJnZXRMb2NhbGUsIG1lc3NhZ2VdID0gIXJlc29sdmVkTWVzc2FnZVxuICAgICAgICA/IHJlc29sdmVNZXNzYWdlRm9ybWF0KGNvbnRleHQsIGtleSwgbG9jYWxlLCBmYWxsYmFja0xvY2FsZSwgZmFsbGJhY2tXYXJuLCBtaXNzaW5nV2FybilcbiAgICAgICAgOiBbXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBsb2NhbGUsXG4gICAgICAgICAgICBtZXNzYWdlc1tsb2NhbGVdIHx8IHt9XG4gICAgICAgIF07XG4gICAgLy8gTk9URTpcbiAgICAvLyAgRml4IHRvIHdvcmsgYXJvdW5kIGBzc3JUcmFuc2Zyb21gIGJ1ZyBpbiBWaXRlLlxuICAgIC8vICBodHRwczovL2dpdGh1Yi5jb20vdml0ZWpzL3ZpdGUvaXNzdWVzLzQzMDZcbiAgICAvLyAgVG8gZ2V0IGFyb3VuZCB0aGlzLCB1c2UgdGVtcG9yYXJ5IHZhcmlhYmxlcy5cbiAgICAvLyAgaHR0cHM6Ly9naXRodWIuY29tL251eHQvZnJhbWV3b3JrL2lzc3Vlcy8xNDYxI2lzc3VlY29tbWVudC05NTQ2MDYyNDNcbiAgICBsZXQgZm9ybWF0ID0gZm9ybWF0U2NvcGU7XG4gICAgLy8gaWYgeW91IHVzZSBkZWZhdWx0IG1lc3NhZ2UsIHNldCBpdCBhcyBtZXNzYWdlIGZvcm1hdCFcbiAgICBsZXQgY2FjaGVCYXNlS2V5ID0ga2V5O1xuICAgIGlmICghcmVzb2x2ZWRNZXNzYWdlICYmXG4gICAgICAgICEoaXNTdHJpbmcoZm9ybWF0KSB8fFxuICAgICAgICAgICAgaXNNZXNzYWdlQVNUKGZvcm1hdCkgfHxcbiAgICAgICAgICAgIGlzTWVzc2FnZUZ1bmN0aW9uKGZvcm1hdCkpKSB7XG4gICAgICAgIGlmIChlbmFibGVEZWZhdWx0TXNnKSB7XG4gICAgICAgICAgICBmb3JtYXQgPSBkZWZhdWx0TXNnT3JLZXk7XG4gICAgICAgICAgICBjYWNoZUJhc2VLZXkgPSBmb3JtYXQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gY2hlY2tpbmcgbWVzc2FnZSBmb3JtYXQgYW5kIHRhcmdldCBsb2NhbGVcbiAgICBpZiAoIXJlc29sdmVkTWVzc2FnZSAmJlxuICAgICAgICAoIShpc1N0cmluZyhmb3JtYXQpIHx8XG4gICAgICAgICAgICBpc01lc3NhZ2VBU1QoZm9ybWF0KSB8fFxuICAgICAgICAgICAgaXNNZXNzYWdlRnVuY3Rpb24oZm9ybWF0KSkgfHxcbiAgICAgICAgICAgICFpc1N0cmluZyh0YXJnZXRMb2NhbGUpKSkge1xuICAgICAgICByZXR1cm4gdW5yZXNvbHZpbmcgPyBOT1RfUkVPU0xWRUQgOiBrZXk7XG4gICAgfVxuICAgIC8vIFRPRE86IHJlZmFjdG9yXG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpc1N0cmluZyhmb3JtYXQpICYmIGNvbnRleHQubWVzc2FnZUNvbXBpbGVyID09IG51bGwpIHtcbiAgICAgICAgd2FybihgVGhlIG1lc3NhZ2UgZm9ybWF0IGNvbXBpbGF0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBidWlsZC4gYCArXG4gICAgICAgICAgICBgQmVjYXVzZSBtZXNzYWdlIGNvbXBpbGVyIGlzbid0IGluY2x1ZGVkLiBgICtcbiAgICAgICAgICAgIGBZb3UgbmVlZCB0byBwcmUtY29tcGlsYXRpb24gYWxsIG1lc3NhZ2UgZm9ybWF0LiBgICtcbiAgICAgICAgICAgIGBTbyB0cmFuc2xhdGUgZnVuY3Rpb24gcmV0dXJuICcke2tleX0nLmApO1xuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgICAvLyBzZXR1cCBjb21waWxlIGVycm9yIGRldGVjdGluZ1xuICAgIGxldCBvY2N1cnJlZCA9IGZhbHNlO1xuICAgIGNvbnN0IG9uRXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIG9jY3VycmVkID0gdHJ1ZTtcbiAgICB9O1xuICAgIC8vIGNvbXBpbGUgbWVzc2FnZSBmb3JtYXRcbiAgICBjb25zdCBtc2cgPSAhaXNNZXNzYWdlRnVuY3Rpb24oZm9ybWF0KVxuICAgICAgICA/IGNvbXBpbGVNZXNzYWdlRm9ybWF0KGNvbnRleHQsIGtleSwgdGFyZ2V0TG9jYWxlLCBmb3JtYXQsIGNhY2hlQmFzZUtleSwgb25FcnJvcilcbiAgICAgICAgOiBmb3JtYXQ7XG4gICAgLy8gaWYgb2NjdXJyZWQgY29tcGlsZSBlcnJvciwgcmV0dXJuIHRoZSBtZXNzYWdlIGZvcm1hdFxuICAgIGlmIChvY2N1cnJlZCkge1xuICAgICAgICByZXR1cm4gZm9ybWF0O1xuICAgIH1cbiAgICAvLyBldmFsdWF0ZSBtZXNzYWdlIHdpdGggY29udGV4dFxuICAgIGNvbnN0IGN0eE9wdGlvbnMgPSBnZXRNZXNzYWdlQ29udGV4dE9wdGlvbnMoY29udGV4dCwgdGFyZ2V0TG9jYWxlLCBtZXNzYWdlLCBvcHRpb25zKTtcbiAgICBjb25zdCBtc2dDb250ZXh0ID0gY3JlYXRlTWVzc2FnZUNvbnRleHQoY3R4T3B0aW9ucyk7XG4gICAgY29uc3QgbWVzc2FnZWQgPSBldmFsdWF0ZU1lc3NhZ2UoY29udGV4dCwgbXNnLCBtc2dDb250ZXh0KTtcbiAgICAvLyBpZiB1c2UgcG9zdCB0cmFuc2xhdGlvbiBvcHRpb24sIHByb2NlZWQgaXQgd2l0aCBoYW5kbGVyXG4gICAgY29uc3QgcmV0ID0gcG9zdFRyYW5zbGF0aW9uXG4gICAgICAgID8gcG9zdFRyYW5zbGF0aW9uKG1lc3NhZ2VkLCBrZXkpXG4gICAgICAgIDogbWVzc2FnZWQ7XG4gICAgLy8gTk9URTogZXhwZXJpbWVudGFsICEhXG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX0lOVExJRllfUFJPRF9ERVZUT09MU19fKSB7XG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICBjb25zdCBwYXlsb2FkcyA9IHtcbiAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIGtleTogaXNTdHJpbmcoa2V5KVxuICAgICAgICAgICAgICAgID8ga2V5XG4gICAgICAgICAgICAgICAgOiBpc01lc3NhZ2VGdW5jdGlvbihmb3JtYXQpXG4gICAgICAgICAgICAgICAgICAgID8gZm9ybWF0LmtleVxuICAgICAgICAgICAgICAgICAgICA6ICcnLFxuICAgICAgICAgICAgbG9jYWxlOiB0YXJnZXRMb2NhbGUgfHwgKGlzTWVzc2FnZUZ1bmN0aW9uKGZvcm1hdClcbiAgICAgICAgICAgICAgICA/IGZvcm1hdC5sb2NhbGVcbiAgICAgICAgICAgICAgICA6ICcnKSxcbiAgICAgICAgICAgIGZvcm1hdDogaXNTdHJpbmcoZm9ybWF0KVxuICAgICAgICAgICAgICAgID8gZm9ybWF0XG4gICAgICAgICAgICAgICAgOiBpc01lc3NhZ2VGdW5jdGlvbihmb3JtYXQpXG4gICAgICAgICAgICAgICAgICAgID8gZm9ybWF0LnNvdXJjZVxuICAgICAgICAgICAgICAgICAgICA6ICcnLFxuICAgICAgICAgICAgbWVzc2FnZTogcmV0XG4gICAgICAgIH07XG4gICAgICAgIHBheWxvYWRzLm1ldGEgPSBhc3NpZ24oe30sIGNvbnRleHQuX19tZXRhLCBnZXRBZGRpdGlvbmFsTWV0YSgpIHx8IHt9KTtcbiAgICAgICAgdHJhbnNsYXRlRGV2VG9vbHMocGF5bG9hZHMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufVxuZnVuY3Rpb24gZXNjYXBlUGFyYW1zKG9wdGlvbnMpIHtcbiAgICBpZiAoaXNBcnJheShvcHRpb25zLmxpc3QpKSB7XG4gICAgICAgIG9wdGlvbnMubGlzdCA9IG9wdGlvbnMubGlzdC5tYXAoaXRlbSA9PiBpc1N0cmluZyhpdGVtKSA/IGVzY2FwZUh0bWwoaXRlbSkgOiBpdGVtKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYmplY3Qob3B0aW9ucy5uYW1lZCkpIHtcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucy5uYW1lZCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzU3RyaW5nKG9wdGlvbnMubmFtZWRba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLm5hbWVkW2tleV0gPSBlc2NhcGVIdG1sKG9wdGlvbnMubmFtZWRba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlc29sdmVNZXNzYWdlRm9ybWF0KGNvbnRleHQsIGtleSwgbG9jYWxlLCBmYWxsYmFja0xvY2FsZSwgZmFsbGJhY2tXYXJuLCBtaXNzaW5nV2Fybikge1xuICAgIGNvbnN0IHsgbWVzc2FnZXMsIG9uV2FybiwgbWVzc2FnZVJlc29sdmVyOiByZXNvbHZlVmFsdWUsIGxvY2FsZUZhbGxiYWNrZXIgfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgbG9jYWxlcyA9IGxvY2FsZUZhbGxiYWNrZXIoY29udGV4dCwgZmFsbGJhY2tMb2NhbGUsIGxvY2FsZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGxldCBtZXNzYWdlID0ge307XG4gICAgbGV0IHRhcmdldExvY2FsZTtcbiAgICBsZXQgZm9ybWF0ID0gbnVsbDtcbiAgICBsZXQgZnJvbSA9IGxvY2FsZTtcbiAgICBsZXQgdG8gPSBudWxsO1xuICAgIGNvbnN0IHR5cGUgPSAndHJhbnNsYXRlJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvY2FsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGFyZ2V0TG9jYWxlID0gdG8gPSBsb2NhbGVzW2ldO1xuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmXG4gICAgICAgICAgICBsb2NhbGUgIT09IHRhcmdldExvY2FsZSAmJlxuICAgICAgICAgICAgaXNUcmFuc2xhdGVGYWxsYmFja1dhcm4oZmFsbGJhY2tXYXJuLCBrZXkpKSB7XG4gICAgICAgICAgICBvbldhcm4oZ2V0V2Fybk1lc3NhZ2UoQ29yZVdhcm5Db2Rlcy5GQUxMQkFDS19UT19UUkFOU0xBVEUsIHtcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRMb2NhbGVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgbG9jYWxlICE9PSB0YXJnZXRMb2NhbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjb250ZXh0Ll9fdl9lbWl0dGVyO1xuICAgICAgICAgICAgaWYgKGVtaXR0ZXIpIHtcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoXCJmYWxsYmFja1wiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuRkFMQkFDSyAqLywge1xuICAgICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgICAgICAgICBncm91cElkOiBgJHt0eXBlfToke2tleX1gXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgICBtZXNzYWdlc1t0YXJnZXRMb2NhbGVdIHx8IHt9O1xuICAgICAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgICAgIGxldCBzdGFydCA9IG51bGw7XG4gICAgICAgIGxldCBzdGFydFRhZztcbiAgICAgICAgbGV0IGVuZFRhZztcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpbkJyb3dzZXIpIHtcbiAgICAgICAgICAgIHN0YXJ0ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgc3RhcnRUYWcgPSAnaW50bGlmeS1tZXNzYWdlLXJlc29sdmUtc3RhcnQnO1xuICAgICAgICAgICAgZW5kVGFnID0gJ2ludGxpZnktbWVzc2FnZS1yZXNvbHZlLWVuZCc7XG4gICAgICAgICAgICBtYXJrICYmIG1hcmsoc3RhcnRUYWcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoZm9ybWF0ID0gcmVzb2x2ZVZhbHVlKG1lc3NhZ2UsIGtleSkpID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBpZiBudWxsLCByZXNvbHZlIHdpdGggb2JqZWN0IGtleSBwYXRoXG4gICAgICAgICAgICBmb3JtYXQgPSBtZXNzYWdlW2tleV07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB9XG4gICAgICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpbkJyb3dzZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjb250ZXh0Ll9fdl9lbWl0dGVyO1xuICAgICAgICAgICAgaWYgKGVtaXR0ZXIgJiYgc3RhcnQgJiYgZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwibWVzc2FnZS1yZXNvbHZlXCIgLyogVnVlRGV2VG9vbHNUaW1lbGluZUV2ZW50cy5NRVNTQUdFX1JFU09MVkUgKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlLXJlc29sdmVcIiAvKiBWdWVEZXZUb29sc1RpbWVsaW5lRXZlbnRzLk1FU1NBR0VfUkVTT0xWRSAqLyxcbiAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBmb3JtYXQsXG4gICAgICAgICAgICAgICAgICAgIHRpbWU6IGVuZCAtIHN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBncm91cElkOiBgJHt0eXBlfToke2tleX1gXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhcnRUYWcgJiYgZW5kVGFnICYmIG1hcmsgJiYgbWVhc3VyZSkge1xuICAgICAgICAgICAgICAgIG1hcmsoZW5kVGFnKTtcbiAgICAgICAgICAgICAgICBtZWFzdXJlKCdpbnRsaWZ5IG1lc3NhZ2UgcmVzb2x2ZScsIHN0YXJ0VGFnLCBlbmRUYWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc1N0cmluZyhmb3JtYXQpIHx8IGlzTWVzc2FnZUFTVChmb3JtYXQpIHx8IGlzTWVzc2FnZUZ1bmN0aW9uKGZvcm1hdCkpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1pc3NpbmdSZXQgPSBoYW5kbGVNaXNzaW5nKGNvbnRleHQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBrZXksIHRhcmdldExvY2FsZSwgbWlzc2luZ1dhcm4sIHR5cGUpO1xuICAgICAgICBpZiAobWlzc2luZ1JldCAhPT0ga2V5KSB7XG4gICAgICAgICAgICBmb3JtYXQgPSBtaXNzaW5nUmV0O1xuICAgICAgICB9XG4gICAgICAgIGZyb20gPSB0bztcbiAgICB9XG4gICAgcmV0dXJuIFtmb3JtYXQsIHRhcmdldExvY2FsZSwgbWVzc2FnZV07XG59XG5mdW5jdGlvbiBjb21waWxlTWVzc2FnZUZvcm1hdChjb250ZXh0LCBrZXksIHRhcmdldExvY2FsZSwgZm9ybWF0LCBjYWNoZUJhc2VLZXksIG9uRXJyb3IpIHtcbiAgICBjb25zdCB7IG1lc3NhZ2VDb21waWxlciwgd2Fybkh0bWxNZXNzYWdlIH0gPSBjb250ZXh0O1xuICAgIGlmIChpc01lc3NhZ2VGdW5jdGlvbihmb3JtYXQpKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9IGZvcm1hdDtcbiAgICAgICAgbXNnLmxvY2FsZSA9IG1zZy5sb2NhbGUgfHwgdGFyZ2V0TG9jYWxlO1xuICAgICAgICBtc2cua2V5ID0gbXNnLmtleSB8fCBrZXk7XG4gICAgICAgIHJldHVybiBtc2c7XG4gICAgfVxuICAgIGlmIChtZXNzYWdlQ29tcGlsZXIgPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBtc2cgPSAoKCkgPT4gZm9ybWF0KTtcbiAgICAgICAgbXNnLmxvY2FsZSA9IHRhcmdldExvY2FsZTtcbiAgICAgICAgbXNnLmtleSA9IGtleTtcbiAgICAgICAgcmV0dXJuIG1zZztcbiAgICB9XG4gICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxuICAgIGxldCBzdGFydCA9IG51bGw7XG4gICAgbGV0IHN0YXJ0VGFnO1xuICAgIGxldCBlbmRUYWc7XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpbkJyb3dzZXIpIHtcbiAgICAgICAgc3RhcnQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIHN0YXJ0VGFnID0gJ2ludGxpZnktbWVzc2FnZS1jb21waWxhdGlvbi1zdGFydCc7XG4gICAgICAgIGVuZFRhZyA9ICdpbnRsaWZ5LW1lc3NhZ2UtY29tcGlsYXRpb24tZW5kJztcbiAgICAgICAgbWFyayAmJiBtYXJrKHN0YXJ0VGFnKTtcbiAgICB9XG4gICAgY29uc3QgbXNnID0gbWVzc2FnZUNvbXBpbGVyKGZvcm1hdCwgZ2V0Q29tcGlsZUNvbnRleHQoY29udGV4dCwgdGFyZ2V0TG9jYWxlLCBjYWNoZUJhc2VLZXksIGZvcm1hdCwgd2Fybkh0bWxNZXNzYWdlLCBvbkVycm9yKSk7XG4gICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgaW5Ccm93c2VyKSB7XG4gICAgICAgIGNvbnN0IGVuZCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgY29uc3QgZW1pdHRlciA9IGNvbnRleHQuX192X2VtaXR0ZXI7XG4gICAgICAgIGlmIChlbWl0dGVyICYmIHN0YXJ0KSB7XG4gICAgICAgICAgICBlbWl0dGVyLmVtaXQoXCJtZXNzYWdlLWNvbXBpbGF0aW9uXCIgLyogVnVlRGV2VG9vbHNUaW1lbGluZUV2ZW50cy5NRVNTQUdFX0NPTVBJTEFUSU9OICovLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlLWNvbXBpbGF0aW9uXCIgLyogVnVlRGV2VG9vbHNUaW1lbGluZUV2ZW50cy5NRVNTQUdFX0NPTVBJTEFUSU9OICovLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGZvcm1hdCxcbiAgICAgICAgICAgICAgICB0aW1lOiBlbmQgLSBzdGFydCxcbiAgICAgICAgICAgICAgICBncm91cElkOiBgJHsndHJhbnNsYXRlJ306JHtrZXl9YFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0VGFnICYmIGVuZFRhZyAmJiBtYXJrICYmIG1lYXN1cmUpIHtcbiAgICAgICAgICAgIG1hcmsoZW5kVGFnKTtcbiAgICAgICAgICAgIG1lYXN1cmUoJ2ludGxpZnkgbWVzc2FnZSBjb21waWxhdGlvbicsIHN0YXJ0VGFnLCBlbmRUYWcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1zZy5sb2NhbGUgPSB0YXJnZXRMb2NhbGU7XG4gICAgbXNnLmtleSA9IGtleTtcbiAgICBtc2cuc291cmNlID0gZm9ybWF0O1xuICAgIHJldHVybiBtc2c7XG59XG5mdW5jdGlvbiBldmFsdWF0ZU1lc3NhZ2UoY29udGV4dCwgbXNnLCBtc2dDdHgpIHtcbiAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgbGV0IHN0YXJ0ID0gbnVsbDtcbiAgICBsZXQgc3RhcnRUYWc7XG4gICAgbGV0IGVuZFRhZztcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGluQnJvd3Nlcikge1xuICAgICAgICBzdGFydCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgc3RhcnRUYWcgPSAnaW50bGlmeS1tZXNzYWdlLWV2YWx1YXRpb24tc3RhcnQnO1xuICAgICAgICBlbmRUYWcgPSAnaW50bGlmeS1tZXNzYWdlLWV2YWx1YXRpb24tZW5kJztcbiAgICAgICAgbWFyayAmJiBtYXJrKHN0YXJ0VGFnKTtcbiAgICB9XG4gICAgY29uc3QgbWVzc2FnZWQgPSBtc2cobXNnQ3R4KTtcbiAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpbkJyb3dzZXIpIHtcbiAgICAgICAgY29uc3QgZW5kID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICBjb25zdCBlbWl0dGVyID0gY29udGV4dC5fX3ZfZW1pdHRlcjtcbiAgICAgICAgaWYgKGVtaXR0ZXIgJiYgc3RhcnQpIHtcbiAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcIm1lc3NhZ2UtZXZhbHVhdGlvblwiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuTUVTU0FHRV9FVkFMVUFUSU9OICovLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlLWV2YWx1YXRpb25cIiAvKiBWdWVEZXZUb29sc1RpbWVsaW5lRXZlbnRzLk1FU1NBR0VfRVZBTFVBVElPTiAqLyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbWVzc2FnZWQsXG4gICAgICAgICAgICAgICAgdGltZTogZW5kIC0gc3RhcnQsXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogYCR7J3RyYW5zbGF0ZSd9OiR7bXNnLmtleX1gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRUYWcgJiYgZW5kVGFnICYmIG1hcmsgJiYgbWVhc3VyZSkge1xuICAgICAgICAgICAgbWFyayhlbmRUYWcpO1xuICAgICAgICAgICAgbWVhc3VyZSgnaW50bGlmeSBtZXNzYWdlIGV2YWx1YXRpb24nLCBzdGFydFRhZywgZW5kVGFnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWVzc2FnZWQ7XG59XG4vKiogQGludGVybmFsICovXG5mdW5jdGlvbiBwYXJzZVRyYW5zbGF0ZUFyZ3MoLi4uYXJncykge1xuICAgIGNvbnN0IFthcmcxLCBhcmcyLCBhcmczXSA9IGFyZ3M7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIGlmICghaXNTdHJpbmcoYXJnMSkgJiZcbiAgICAgICAgIWlzTnVtYmVyKGFyZzEpICYmXG4gICAgICAgICFpc01lc3NhZ2VGdW5jdGlvbihhcmcxKSAmJlxuICAgICAgICAhaXNNZXNzYWdlQVNUKGFyZzEpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUNvcmVFcnJvcihDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0FSR1VNRU5UKTtcbiAgICB9XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3Qga2V5ID0gaXNOdW1iZXIoYXJnMSlcbiAgICAgICAgPyBTdHJpbmcoYXJnMSlcbiAgICAgICAgOiBpc01lc3NhZ2VGdW5jdGlvbihhcmcxKVxuICAgICAgICAgICAgPyBhcmcxXG4gICAgICAgICAgICA6IGFyZzE7XG4gICAgaWYgKGlzTnVtYmVyKGFyZzIpKSB7XG4gICAgICAgIG9wdGlvbnMucGx1cmFsID0gYXJnMjtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoYXJnMikpIHtcbiAgICAgICAgb3B0aW9ucy5kZWZhdWx0ID0gYXJnMjtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmcyKSAmJiAhaXNFbXB0eU9iamVjdChhcmcyKSkge1xuICAgICAgICBvcHRpb25zLm5hbWVkID0gYXJnMjtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNBcnJheShhcmcyKSkge1xuICAgICAgICBvcHRpb25zLmxpc3QgPSBhcmcyO1xuICAgIH1cbiAgICBpZiAoaXNOdW1iZXIoYXJnMykpIHtcbiAgICAgICAgb3B0aW9ucy5wbHVyYWwgPSBhcmczO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1N0cmluZyhhcmczKSkge1xuICAgICAgICBvcHRpb25zLmRlZmF1bHQgPSBhcmczO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzMpKSB7XG4gICAgICAgIGFzc2lnbihvcHRpb25zLCBhcmczKTtcbiAgICB9XG4gICAgcmV0dXJuIFtrZXksIG9wdGlvbnNdO1xufVxuZnVuY3Rpb24gZ2V0Q29tcGlsZUNvbnRleHQoY29udGV4dCwgbG9jYWxlLCBrZXksIHNvdXJjZSwgd2Fybkh0bWxNZXNzYWdlLCBvbkVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9jYWxlLFxuICAgICAgICBrZXksXG4gICAgICAgIHdhcm5IdG1sTWVzc2FnZSxcbiAgICAgICAgb25FcnJvcjogKGVycikgPT4ge1xuICAgICAgICAgICAgb25FcnJvciAmJiBvbkVycm9yKGVycik7XG4gICAgICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgX3NvdXJjZSA9IGdldFNvdXJjZUZvckNvZGVGcmFtZShzb3VyY2UpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgTWVzc2FnZSBjb21waWxhdGlvbiBlcnJvcjogJHtlcnIubWVzc2FnZX1gO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvZGVGcmFtZSA9IGVyci5sb2NhdGlvbiAmJlxuICAgICAgICAgICAgICAgICAgICBfc291cmNlICYmXG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlQ29kZUZyYW1lKF9zb3VyY2UsIGVyci5sb2NhdGlvbi5zdGFydC5vZmZzZXQsIGVyci5sb2NhdGlvbi5lbmQub2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gY29udGV4dC5fX3ZfZW1pdHRlcjtcbiAgICAgICAgICAgICAgICBpZiAoZW1pdHRlciAmJiBfc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcImNvbXBpbGUtZXJyb3JcIiAvKiBWdWVEZXZUb29sc1RpbWVsaW5lRXZlbnRzLkNPTVBJTEVfRVJST1IgKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IF9zb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZXJyLmxvY2F0aW9uICYmIGVyci5sb2NhdGlvbi5zdGFydC5vZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IGVyci5sb2NhdGlvbiAmJiBlcnIubG9jYXRpb24uZW5kLm9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGAkeyd0cmFuc2xhdGUnfToke2tleX1gXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGNvZGVGcmFtZSA/IGAke21lc3NhZ2V9XFxuJHtjb2RlRnJhbWV9YCA6IG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbkNhY2hlS2V5OiAoc291cmNlKSA9PiBnZW5lcmF0ZUZvcm1hdENhY2hlS2V5KGxvY2FsZSwga2V5LCBzb3VyY2UpXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGdldFNvdXJjZUZvckNvZGVGcmFtZShzb3VyY2UpIHtcbiAgICBpZiAoaXNTdHJpbmcoc291cmNlKSkgO1xuICAgIGVsc2Uge1xuICAgICAgICBpZiAoc291cmNlLmxvYz8uc291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmxvYy5zb3VyY2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBnZXRNZXNzYWdlQ29udGV4dE9wdGlvbnMoY29udGV4dCwgbG9jYWxlLCBtZXNzYWdlLCBvcHRpb25zKSB7XG4gICAgY29uc3QgeyBtb2RpZmllcnMsIHBsdXJhbFJ1bGVzLCBtZXNzYWdlUmVzb2x2ZXI6IHJlc29sdmVWYWx1ZSwgZmFsbGJhY2tMb2NhbGUsIGZhbGxiYWNrV2FybiwgbWlzc2luZ1dhcm4sIGZhbGxiYWNrQ29udGV4dCB9ID0gY29udGV4dDtcbiAgICBjb25zdCByZXNvbHZlTWVzc2FnZSA9IChrZXkpID0+IHtcbiAgICAgICAgbGV0IHZhbCA9IHJlc29sdmVWYWx1ZShtZXNzYWdlLCBrZXkpO1xuICAgICAgICAvLyBmYWxsYmFjayB0byByb290IGNvbnRleHRcbiAgICAgICAgaWYgKHZhbCA9PSBudWxsICYmIGZhbGxiYWNrQ29udGV4dCkge1xuICAgICAgICAgICAgY29uc3QgWywgLCBtZXNzYWdlXSA9IHJlc29sdmVNZXNzYWdlRm9ybWF0KGZhbGxiYWNrQ29udGV4dCwga2V5LCBsb2NhbGUsIGZhbGxiYWNrTG9jYWxlLCBmYWxsYmFja1dhcm4sIG1pc3NpbmdXYXJuKTtcbiAgICAgICAgICAgIHZhbCA9IHJlc29sdmVWYWx1ZShtZXNzYWdlLCBrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1N0cmluZyh2YWwpIHx8IGlzTWVzc2FnZUFTVCh2YWwpKSB7XG4gICAgICAgICAgICBsZXQgb2NjdXJyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IG9uRXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgb2NjdXJyZWQgPSB0cnVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IGNvbXBpbGVNZXNzYWdlRm9ybWF0KGNvbnRleHQsIGtleSwgbG9jYWxlLCB2YWwsIGtleSwgb25FcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gIW9jY3VycmVkXG4gICAgICAgICAgICAgICAgPyBtc2dcbiAgICAgICAgICAgICAgICA6IE5PT1BfTUVTU0FHRV9GVU5DVElPTjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc01lc3NhZ2VGdW5jdGlvbih2YWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gVE9ETzogc2hvdWxkIGJlIGltcGxlbWVudGVkIHdhcm5pbmcgbWVzc2FnZVxuICAgICAgICAgICAgcmV0dXJuIE5PT1BfTUVTU0FHRV9GVU5DVElPTjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgY3R4T3B0aW9ucyA9IHtcbiAgICAgICAgbG9jYWxlLFxuICAgICAgICBtb2RpZmllcnMsXG4gICAgICAgIHBsdXJhbFJ1bGVzLFxuICAgICAgICBtZXNzYWdlczogcmVzb2x2ZU1lc3NhZ2VcbiAgICB9O1xuICAgIGlmIChjb250ZXh0LnByb2Nlc3Nvcikge1xuICAgICAgICBjdHhPcHRpb25zLnByb2Nlc3NvciA9IGNvbnRleHQucHJvY2Vzc29yO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5saXN0KSB7XG4gICAgICAgIGN0eE9wdGlvbnMubGlzdCA9IG9wdGlvbnMubGlzdDtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubmFtZWQpIHtcbiAgICAgICAgY3R4T3B0aW9ucy5uYW1lZCA9IG9wdGlvbnMubmFtZWQ7XG4gICAgfVxuICAgIGlmIChpc051bWJlcihvcHRpb25zLnBsdXJhbCkpIHtcbiAgICAgICAgY3R4T3B0aW9ucy5wbHVyYWxJbmRleCA9IG9wdGlvbnMucGx1cmFsO1xuICAgIH1cbiAgICByZXR1cm4gY3R4T3B0aW9ucztcbn1cblxuY29uc3QgaW50bERlZmluZWQgPSB0eXBlb2YgSW50bCAhPT0gJ3VuZGVmaW5lZCc7XG5jb25zdCBBdmFpbGFiaWxpdGllcyA9IHtcbiAgICBkYXRlVGltZUZvcm1hdDogaW50bERlZmluZWQgJiYgdHlwZW9mIEludGwuRGF0ZVRpbWVGb3JtYXQgIT09ICd1bmRlZmluZWQnLFxuICAgIG51bWJlckZvcm1hdDogaW50bERlZmluZWQgJiYgdHlwZW9mIEludGwuTnVtYmVyRm9ybWF0ICE9PSAndW5kZWZpbmVkJ1xufTtcblxuLy8gaW1wbGVtZW50YXRpb24gb2YgYGRhdGV0aW1lYCBmdW5jdGlvblxuZnVuY3Rpb24gZGF0ZXRpbWUoY29udGV4dCwgLi4uYXJncykge1xuICAgIGNvbnN0IHsgZGF0ZXRpbWVGb3JtYXRzLCB1bnJlc29sdmluZywgZmFsbGJhY2tMb2NhbGUsIG9uV2FybiwgbG9jYWxlRmFsbGJhY2tlciB9ID0gY29udGV4dDtcbiAgICBjb25zdCB7IF9fZGF0ZXRpbWVGb3JtYXR0ZXJzIH0gPSBjb250ZXh0O1xuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgIUF2YWlsYWJpbGl0aWVzLmRhdGVUaW1lRm9ybWF0KSB7XG4gICAgICAgIG9uV2FybihnZXRXYXJuTWVzc2FnZShDb3JlV2FybkNvZGVzLkNBTk5PVF9GT1JNQVRfREFURSkpO1xuICAgICAgICByZXR1cm4gTUlTU0lOR19SRVNPTFZFX1ZBTFVFO1xuICAgIH1cbiAgICBjb25zdCBba2V5LCB2YWx1ZSwgb3B0aW9ucywgb3ZlcnJpZGVzXSA9IHBhcnNlRGF0ZVRpbWVBcmdzKC4uLmFyZ3MpO1xuICAgIGNvbnN0IG1pc3NpbmdXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMubWlzc2luZ1dhcm4pXG4gICAgICAgID8gb3B0aW9ucy5taXNzaW5nV2FyblxuICAgICAgICA6IGNvbnRleHQubWlzc2luZ1dhcm47XG4gICAgY29uc3QgZmFsbGJhY2tXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tXYXJuKVxuICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tXYXJuXG4gICAgICAgIDogY29udGV4dC5mYWxsYmFja1dhcm47XG4gICAgY29uc3QgcGFydCA9ICEhb3B0aW9ucy5wYXJ0O1xuICAgIGNvbnN0IGxvY2FsZSA9IGlzU3RyaW5nKG9wdGlvbnMubG9jYWxlKSA/IG9wdGlvbnMubG9jYWxlIDogY29udGV4dC5sb2NhbGU7XG4gICAgY29uc3QgbG9jYWxlcyA9IGxvY2FsZUZhbGxiYWNrZXIoY29udGV4dCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgZmFsbGJhY2tMb2NhbGUsIGxvY2FsZSk7XG4gICAgaWYgKCFpc1N0cmluZyhrZXkpIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgb3ZlcnJpZGVzKS5mb3JtYXQodmFsdWUpO1xuICAgIH1cbiAgICAvLyByZXNvbHZlIGZvcm1hdFxuICAgIGxldCBkYXRldGltZUZvcm1hdCA9IHt9O1xuICAgIGxldCB0YXJnZXRMb2NhbGU7XG4gICAgbGV0IGZvcm1hdCA9IG51bGw7XG4gICAgbGV0IGZyb20gPSBsb2NhbGU7XG4gICAgbGV0IHRvID0gbnVsbDtcbiAgICBjb25zdCB0eXBlID0gJ2RhdGV0aW1lIGZvcm1hdCc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRhcmdldExvY2FsZSA9IHRvID0gbG9jYWxlc1tpXTtcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJlxuICAgICAgICAgICAgbG9jYWxlICE9PSB0YXJnZXRMb2NhbGUgJiZcbiAgICAgICAgICAgIGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuKGZhbGxiYWNrV2Fybiwga2V5KSkge1xuICAgICAgICAgICAgb25XYXJuKGdldFdhcm5NZXNzYWdlKENvcmVXYXJuQ29kZXMuRkFMTEJBQ0tfVE9fREFURV9GT1JNQVQsIHtcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRMb2NhbGVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgbG9jYWxlICE9PSB0YXJnZXRMb2NhbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjb250ZXh0Ll9fdl9lbWl0dGVyO1xuICAgICAgICAgICAgaWYgKGVtaXR0ZXIpIHtcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoXCJmYWxsYmFja1wiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuRkFMQkFDSyAqLywge1xuICAgICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgICAgICAgICBncm91cElkOiBgJHt0eXBlfToke2tleX1gXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGF0ZXRpbWVGb3JtYXQgPVxuICAgICAgICAgICAgZGF0ZXRpbWVGb3JtYXRzW3RhcmdldExvY2FsZV0gfHwge307XG4gICAgICAgIGZvcm1hdCA9IGRhdGV0aW1lRm9ybWF0W2tleV07XG4gICAgICAgIGlmIChpc1BsYWluT2JqZWN0KGZvcm1hdCkpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgaGFuZGxlTWlzc2luZyhjb250ZXh0LCBrZXksIHRhcmdldExvY2FsZSwgbWlzc2luZ1dhcm4sIHR5cGUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgZnJvbSA9IHRvO1xuICAgIH1cbiAgICAvLyBjaGVja2luZyBmb3JtYXQgYW5kIHRhcmdldCBsb2NhbGVcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QoZm9ybWF0KSB8fCAhaXNTdHJpbmcodGFyZ2V0TG9jYWxlKSkge1xuICAgICAgICByZXR1cm4gdW5yZXNvbHZpbmcgPyBOT1RfUkVPU0xWRUQgOiBrZXk7XG4gICAgfVxuICAgIGxldCBpZCA9IGAke3RhcmdldExvY2FsZX1fXyR7a2V5fWA7XG4gICAgaWYgKCFpc0VtcHR5T2JqZWN0KG92ZXJyaWRlcykpIHtcbiAgICAgICAgaWQgPSBgJHtpZH1fXyR7SlNPTi5zdHJpbmdpZnkob3ZlcnJpZGVzKX1gO1xuICAgIH1cbiAgICBsZXQgZm9ybWF0dGVyID0gX19kYXRldGltZUZvcm1hdHRlcnMuZ2V0KGlkKTtcbiAgICBpZiAoIWZvcm1hdHRlcikge1xuICAgICAgICBmb3JtYXR0ZXIgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0YXJnZXRMb2NhbGUsIGFzc2lnbih7fSwgZm9ybWF0LCBvdmVycmlkZXMpKTtcbiAgICAgICAgX19kYXRldGltZUZvcm1hdHRlcnMuc2V0KGlkLCBmb3JtYXR0ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gIXBhcnQgPyBmb3JtYXR0ZXIuZm9ybWF0KHZhbHVlKSA6IGZvcm1hdHRlci5mb3JtYXRUb1BhcnRzKHZhbHVlKTtcbn1cbi8qKiBAaW50ZXJuYWwgKi9cbmNvbnN0IERBVEVUSU1FX0ZPUk1BVF9PUFRJT05TX0tFWVMgPSBbXG4gICAgJ2xvY2FsZU1hdGNoZXInLFxuICAgICd3ZWVrZGF5JyxcbiAgICAnZXJhJyxcbiAgICAneWVhcicsXG4gICAgJ21vbnRoJyxcbiAgICAnZGF5JyxcbiAgICAnaG91cicsXG4gICAgJ21pbnV0ZScsXG4gICAgJ3NlY29uZCcsXG4gICAgJ3RpbWVab25lTmFtZScsXG4gICAgJ2Zvcm1hdE1hdGNoZXInLFxuICAgICdob3VyMTInLFxuICAgICd0aW1lWm9uZScsXG4gICAgJ2RhdGVTdHlsZScsXG4gICAgJ3RpbWVTdHlsZScsXG4gICAgJ2NhbGVuZGFyJyxcbiAgICAnZGF5UGVyaW9kJyxcbiAgICAnbnVtYmVyaW5nU3lzdGVtJyxcbiAgICAnaG91ckN5Y2xlJyxcbiAgICAnZnJhY3Rpb25hbFNlY29uZERpZ2l0cydcbl07XG4vKiogQGludGVybmFsICovXG5mdW5jdGlvbiBwYXJzZURhdGVUaW1lQXJncyguLi5hcmdzKSB7XG4gICAgY29uc3QgW2FyZzEsIGFyZzIsIGFyZzMsIGFyZzRdID0gYXJncztcbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgbGV0IG92ZXJyaWRlcyA9IHt9O1xuICAgIGxldCB2YWx1ZTtcbiAgICBpZiAoaXNTdHJpbmcoYXJnMSkpIHtcbiAgICAgICAgLy8gT25seSBhbGxvdyBJU08gc3RyaW5ncyAtIG90aGVyIGRhdGUgZm9ybWF0cyBhcmUgb2Z0ZW4gc3VwcG9ydGVkLFxuICAgICAgICAvLyBidXQgbWF5IGNhdXNlIGRpZmZlcmVudCByZXN1bHRzIGluIGRpZmZlcmVudCBicm93c2Vycy5cbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGFyZzEubWF0Y2goLyhcXGR7NH0tXFxkezJ9LVxcZHsyfSkoVHxcXHMpPyguKikvKTtcbiAgICAgICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9JU09fREFURV9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU29tZSBicm93c2VycyBjYW4gbm90IHBhcnNlIHRoZSBpc28gZGF0ZXRpbWUgc2VwYXJhdGVkIGJ5IHNwYWNlLFxuICAgICAgICAvLyB0aGlzIGlzIGEgY29tcHJvbWlzZSBzb2x1dGlvbiBieSByZXBsYWNlIHRoZSAnVCcvJyAnIHdpdGggJ1QnXG4gICAgICAgIGNvbnN0IGRhdGVUaW1lID0gbWF0Y2hlc1szXVxuICAgICAgICAgICAgPyBtYXRjaGVzWzNdLnRyaW0oKS5zdGFydHNXaXRoKCdUJylcbiAgICAgICAgICAgICAgICA/IGAke21hdGNoZXNbMV0udHJpbSgpfSR7bWF0Y2hlc1szXS50cmltKCl9YFxuICAgICAgICAgICAgICAgIDogYCR7bWF0Y2hlc1sxXS50cmltKCl9VCR7bWF0Y2hlc1szXS50cmltKCl9YFxuICAgICAgICAgICAgOiBtYXRjaGVzWzFdLnRyaW0oKTtcbiAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZShkYXRlVGltZSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBUaGlzIHdpbGwgZmFpbCBpZiB0aGUgZGF0ZSBpcyBub3QgdmFsaWRcbiAgICAgICAgICAgIHZhbHVlLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUNvcmVFcnJvcihDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0lTT19EQVRFX0FSR1VNRU5UKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc0RhdGUoYXJnMSkpIHtcbiAgICAgICAgaWYgKGlzTmFOKGFyZzEuZ2V0VGltZSgpKSkge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlQ29yZUVycm9yKENvcmVFcnJvckNvZGVzLklOVkFMSURfREFURV9BUkdVTUVOVCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgPSBhcmcxO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc051bWJlcihhcmcxKSkge1xuICAgICAgICB2YWx1ZSA9IGFyZzE7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9BUkdVTUVOVCk7XG4gICAgfVxuICAgIGlmIChpc1N0cmluZyhhcmcyKSkge1xuICAgICAgICBvcHRpb25zLmtleSA9IGFyZzI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMikpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoYXJnMikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKERBVEVUSU1FX0ZPUk1BVF9PUFRJT05TX0tFWVMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgICAgICAgIG92ZXJyaWRlc1trZXldID0gYXJnMltrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gYXJnMltrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGlzU3RyaW5nKGFyZzMpKSB7XG4gICAgICAgIG9wdGlvbnMubG9jYWxlID0gYXJnMztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmczKSkge1xuICAgICAgICBvdmVycmlkZXMgPSBhcmczO1xuICAgIH1cbiAgICBpZiAoaXNQbGFpbk9iamVjdChhcmc0KSkge1xuICAgICAgICBvdmVycmlkZXMgPSBhcmc0O1xuICAgIH1cbiAgICByZXR1cm4gW29wdGlvbnMua2V5IHx8ICcnLCB2YWx1ZSwgb3B0aW9ucywgb3ZlcnJpZGVzXTtcbn1cbi8qKiBAaW50ZXJuYWwgKi9cbmZ1bmN0aW9uIGNsZWFyRGF0ZVRpbWVGb3JtYXQoY3R4LCBsb2NhbGUsIGZvcm1hdCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjdHg7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybWF0KSB7XG4gICAgICAgIGNvbnN0IGlkID0gYCR7bG9jYWxlfV9fJHtrZXl9YDtcbiAgICAgICAgaWYgKCFjb250ZXh0Ll9fZGF0ZXRpbWVGb3JtYXR0ZXJzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuX19kYXRldGltZUZvcm1hdHRlcnMuZGVsZXRlKGlkKTtcbiAgICB9XG59XG5cbi8vIGltcGxlbWVudGF0aW9uIG9mIGBudW1iZXJgIGZ1bmN0aW9uXG5mdW5jdGlvbiBudW1iZXIoY29udGV4dCwgLi4uYXJncykge1xuICAgIGNvbnN0IHsgbnVtYmVyRm9ybWF0cywgdW5yZXNvbHZpbmcsIGZhbGxiYWNrTG9jYWxlLCBvbldhcm4sIGxvY2FsZUZhbGxiYWNrZXIgfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgeyBfX251bWJlckZvcm1hdHRlcnMgfSA9IGNvbnRleHQ7XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiAhQXZhaWxhYmlsaXRpZXMubnVtYmVyRm9ybWF0KSB7XG4gICAgICAgIG9uV2FybihnZXRXYXJuTWVzc2FnZShDb3JlV2FybkNvZGVzLkNBTk5PVF9GT1JNQVRfTlVNQkVSKSk7XG4gICAgICAgIHJldHVybiBNSVNTSU5HX1JFU09MVkVfVkFMVUU7XG4gICAgfVxuICAgIGNvbnN0IFtrZXksIHZhbHVlLCBvcHRpb25zLCBvdmVycmlkZXNdID0gcGFyc2VOdW1iZXJBcmdzKC4uLmFyZ3MpO1xuICAgIGNvbnN0IG1pc3NpbmdXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMubWlzc2luZ1dhcm4pXG4gICAgICAgID8gb3B0aW9ucy5taXNzaW5nV2FyblxuICAgICAgICA6IGNvbnRleHQubWlzc2luZ1dhcm47XG4gICAgY29uc3QgZmFsbGJhY2tXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tXYXJuKVxuICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tXYXJuXG4gICAgICAgIDogY29udGV4dC5mYWxsYmFja1dhcm47XG4gICAgY29uc3QgcGFydCA9ICEhb3B0aW9ucy5wYXJ0O1xuICAgIGNvbnN0IGxvY2FsZSA9IGlzU3RyaW5nKG9wdGlvbnMubG9jYWxlKSA/IG9wdGlvbnMubG9jYWxlIDogY29udGV4dC5sb2NhbGU7XG4gICAgY29uc3QgbG9jYWxlcyA9IGxvY2FsZUZhbGxiYWNrZXIoY29udGV4dCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgZmFsbGJhY2tMb2NhbGUsIGxvY2FsZSk7XG4gICAgaWYgKCFpc1N0cmluZyhrZXkpIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChsb2NhbGUsIG92ZXJyaWRlcykuZm9ybWF0KHZhbHVlKTtcbiAgICB9XG4gICAgLy8gcmVzb2x2ZSBmb3JtYXRcbiAgICBsZXQgbnVtYmVyRm9ybWF0ID0ge307XG4gICAgbGV0IHRhcmdldExvY2FsZTtcbiAgICBsZXQgZm9ybWF0ID0gbnVsbDtcbiAgICBsZXQgZnJvbSA9IGxvY2FsZTtcbiAgICBsZXQgdG8gPSBudWxsO1xuICAgIGNvbnN0IHR5cGUgPSAnbnVtYmVyIGZvcm1hdCc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRhcmdldExvY2FsZSA9IHRvID0gbG9jYWxlc1tpXTtcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJlxuICAgICAgICAgICAgbG9jYWxlICE9PSB0YXJnZXRMb2NhbGUgJiZcbiAgICAgICAgICAgIGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuKGZhbGxiYWNrV2Fybiwga2V5KSkge1xuICAgICAgICAgICAgb25XYXJuKGdldFdhcm5NZXNzYWdlKENvcmVXYXJuQ29kZXMuRkFMTEJBQ0tfVE9fTlVNQkVSX0ZPUk1BVCwge1xuICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldExvY2FsZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBsb2NhbGUgIT09IHRhcmdldExvY2FsZSkge1xuICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IGNvbnRleHQuX192X2VtaXR0ZXI7XG4gICAgICAgICAgICBpZiAoZW1pdHRlcikge1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcImZhbGxiYWNrXCIgLyogVnVlRGV2VG9vbHNUaW1lbGluZUV2ZW50cy5GQUxCQUNLICovLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGAke3R5cGV9OiR7a2V5fWBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBudW1iZXJGb3JtYXQgPVxuICAgICAgICAgICAgbnVtYmVyRm9ybWF0c1t0YXJnZXRMb2NhbGVdIHx8IHt9O1xuICAgICAgICBmb3JtYXQgPSBudW1iZXJGb3JtYXRba2V5XTtcbiAgICAgICAgaWYgKGlzUGxhaW5PYmplY3QoZm9ybWF0KSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBoYW5kbGVNaXNzaW5nKGNvbnRleHQsIGtleSwgdGFyZ2V0TG9jYWxlLCBtaXNzaW5nV2FybiwgdHlwZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBmcm9tID0gdG87XG4gICAgfVxuICAgIC8vIGNoZWNraW5nIGZvcm1hdCBhbmQgdGFyZ2V0IGxvY2FsZVxuICAgIGlmICghaXNQbGFpbk9iamVjdChmb3JtYXQpIHx8ICFpc1N0cmluZyh0YXJnZXRMb2NhbGUpKSB7XG4gICAgICAgIHJldHVybiB1bnJlc29sdmluZyA/IE5PVF9SRU9TTFZFRCA6IGtleTtcbiAgICB9XG4gICAgbGV0IGlkID0gYCR7dGFyZ2V0TG9jYWxlfV9fJHtrZXl9YDtcbiAgICBpZiAoIWlzRW1wdHlPYmplY3Qob3ZlcnJpZGVzKSkge1xuICAgICAgICBpZCA9IGAke2lkfV9fJHtKU09OLnN0cmluZ2lmeShvdmVycmlkZXMpfWA7XG4gICAgfVxuICAgIGxldCBmb3JtYXR0ZXIgPSBfX251bWJlckZvcm1hdHRlcnMuZ2V0KGlkKTtcbiAgICBpZiAoIWZvcm1hdHRlcikge1xuICAgICAgICBmb3JtYXR0ZXIgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGFyZ2V0TG9jYWxlLCBhc3NpZ24oe30sIGZvcm1hdCwgb3ZlcnJpZGVzKSk7XG4gICAgICAgIF9fbnVtYmVyRm9ybWF0dGVycy5zZXQoaWQsIGZvcm1hdHRlcik7XG4gICAgfVxuICAgIHJldHVybiAhcGFydCA/IGZvcm1hdHRlci5mb3JtYXQodmFsdWUpIDogZm9ybWF0dGVyLmZvcm1hdFRvUGFydHModmFsdWUpO1xufVxuLyoqIEBpbnRlcm5hbCAqL1xuY29uc3QgTlVNQkVSX0ZPUk1BVF9PUFRJT05TX0tFWVMgPSBbXG4gICAgJ2xvY2FsZU1hdGNoZXInLFxuICAgICdzdHlsZScsXG4gICAgJ2N1cnJlbmN5JyxcbiAgICAnY3VycmVuY3lEaXNwbGF5JyxcbiAgICAnY3VycmVuY3lTaWduJyxcbiAgICAndXNlR3JvdXBpbmcnLFxuICAgICdtaW5pbXVtSW50ZWdlckRpZ2l0cycsXG4gICAgJ21pbmltdW1GcmFjdGlvbkRpZ2l0cycsXG4gICAgJ21heGltdW1GcmFjdGlvbkRpZ2l0cycsXG4gICAgJ21pbmltdW1TaWduaWZpY2FudERpZ2l0cycsXG4gICAgJ21heGltdW1TaWduaWZpY2FudERpZ2l0cycsXG4gICAgJ2NvbXBhY3REaXNwbGF5JyxcbiAgICAnbm90YXRpb24nLFxuICAgICdzaWduRGlzcGxheScsXG4gICAgJ3VuaXQnLFxuICAgICd1bml0RGlzcGxheScsXG4gICAgJ3JvdW5kaW5nTW9kZScsXG4gICAgJ3JvdW5kaW5nUHJpb3JpdHknLFxuICAgICdyb3VuZGluZ0luY3JlbWVudCcsXG4gICAgJ3RyYWlsaW5nWmVyb0Rpc3BsYXknXG5dO1xuLyoqIEBpbnRlcm5hbCAqL1xuZnVuY3Rpb24gcGFyc2VOdW1iZXJBcmdzKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBbYXJnMSwgYXJnMiwgYXJnMywgYXJnNF0gPSBhcmdzO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBsZXQgb3ZlcnJpZGVzID0ge307XG4gICAgaWYgKCFpc051bWJlcihhcmcxKSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9BUkdVTUVOVCk7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gYXJnMTtcbiAgICBpZiAoaXNTdHJpbmcoYXJnMikpIHtcbiAgICAgICAgb3B0aW9ucy5rZXkgPSBhcmcyO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzIpKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGFyZzIpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGlmIChOVU1CRVJfRk9STUFUX09QVElPTlNfS0VZUy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgb3ZlcnJpZGVzW2tleV0gPSBhcmcyW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBhcmcyW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoaXNTdHJpbmcoYXJnMykpIHtcbiAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBhcmczO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzMpKSB7XG4gICAgICAgIG92ZXJyaWRlcyA9IGFyZzM7XG4gICAgfVxuICAgIGlmIChpc1BsYWluT2JqZWN0KGFyZzQpKSB7XG4gICAgICAgIG92ZXJyaWRlcyA9IGFyZzQ7XG4gICAgfVxuICAgIHJldHVybiBbb3B0aW9ucy5rZXkgfHwgJycsIHZhbHVlLCBvcHRpb25zLCBvdmVycmlkZXNdO1xufVxuLyoqIEBpbnRlcm5hbCAqL1xuZnVuY3Rpb24gY2xlYXJOdW1iZXJGb3JtYXQoY3R4LCBsb2NhbGUsIGZvcm1hdCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjdHg7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybWF0KSB7XG4gICAgICAgIGNvbnN0IGlkID0gYCR7bG9jYWxlfV9fJHtrZXl9YDtcbiAgICAgICAgaWYgKCFjb250ZXh0Ll9fbnVtYmVyRm9ybWF0dGVycy5oYXMoaWQpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0Ll9fbnVtYmVyRm9ybWF0dGVycy5kZWxldGUoaWQpO1xuICAgIH1cbn1cblxue1xuICAgIGluaXRGZWF0dXJlRmxhZ3MoKTtcbn1cblxuZXhwb3J0IHsgQ29yZUVycm9yQ29kZXMsIENvcmVXYXJuQ29kZXMsIERBVEVUSU1FX0ZPUk1BVF9PUFRJT05TX0tFWVMsIERFRkFVTFRfTE9DQUxFLCBERUZBVUxUX01FU1NBR0VfREFUQV9UWVBFLCBNSVNTSU5HX1JFU09MVkVfVkFMVUUsIE5PVF9SRU9TTFZFRCwgTlVNQkVSX0ZPUk1BVF9PUFRJT05TX0tFWVMsIFZFUlNJT04sIGNsZWFyQ29tcGlsZUNhY2hlLCBjbGVhckRhdGVUaW1lRm9ybWF0LCBjbGVhck51bWJlckZvcm1hdCwgY29tcGlsZSwgY29tcGlsZVRvRnVuY3Rpb24sIGNyZWF0ZUNvcmVDb250ZXh0LCBjcmVhdGVDb3JlRXJyb3IsIGNyZWF0ZU1lc3NhZ2VDb250ZXh0LCBkYXRldGltZSwgZmFsbGJhY2tXaXRoTG9jYWxlQ2hhaW4sIGZhbGxiYWNrV2l0aFNpbXBsZSwgZ2V0QWRkaXRpb25hbE1ldGEsIGdldERldlRvb2xzSG9vaywgZ2V0RmFsbGJhY2tDb250ZXh0LCBnZXRXYXJuTWVzc2FnZSwgaGFuZGxlTWlzc2luZywgaW5pdEkxOG5EZXZUb29scywgaXNNZXNzYWdlQVNULCBpc01lc3NhZ2VGdW5jdGlvbiwgaXNUcmFuc2xhdGVGYWxsYmFja1dhcm4sIGlzVHJhbnNsYXRlTWlzc2luZ1dhcm4sIG51bWJlciwgcGFyc2UsIHBhcnNlRGF0ZVRpbWVBcmdzLCBwYXJzZU51bWJlckFyZ3MsIHBhcnNlVHJhbnNsYXRlQXJncywgcmVnaXN0ZXJMb2NhbGVGYWxsYmFja2VyLCByZWdpc3Rlck1lc3NhZ2VDb21waWxlciwgcmVnaXN0ZXJNZXNzYWdlUmVzb2x2ZXIsIHJlc29sdmVWYWx1ZSwgcmVzb2x2ZVdpdGhLZXlWYWx1ZSwgc2V0QWRkaXRpb25hbE1ldGEsIHNldERldlRvb2xzSG9vaywgc2V0RmFsbGJhY2tDb250ZXh0LCB0cmFuc2xhdGUsIHRyYW5zbGF0ZURldlRvb2xzLCB1cGRhdGVGYWxsYmFja0xvY2FsZSB9O1xuIiwiLyohXG4gICogdnVlLWRldnRvb2xzIHY5LjMuMFxuICAqIChjKSAyMDIzIGthenV5YSBrYXdhZ3VjaGlcbiAgKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gICovXG5jb25zdCBWdWVEZXZUb29sc0xhYmVscyA9IHtcbiAgICBbXCJ2dWUtZGV2dG9vbHMtcGx1Z2luLXZ1ZS1pMThuXCIgLyogVnVlRGV2VG9vbHNJRHMuUExVR0lOICovXTogJ1Z1ZSBJMThuIGRldnRvb2xzJyxcbiAgICBbXCJ2dWUtaTE4bi1yZXNvdXJjZS1pbnNwZWN0b3JcIiAvKiBWdWVEZXZUb29sc0lEcy5DVVNUT01fSU5TUEVDVE9SICovXTogJ0kxOG4gUmVzb3VyY2VzJyxcbiAgICBbXCJ2dWUtaTE4bi10aW1lbGluZVwiIC8qIFZ1ZURldlRvb2xzSURzLlRJTUVMSU5FICovXTogJ1Z1ZSBJMThuJ1xufTtcbmNvbnN0IFZ1ZURldlRvb2xzUGxhY2Vob2xkZXJzID0ge1xuICAgIFtcInZ1ZS1pMThuLXJlc291cmNlLWluc3BlY3RvclwiIC8qIFZ1ZURldlRvb2xzSURzLkNVU1RPTV9JTlNQRUNUT1IgKi9dOiAnU2VhcmNoIGZvciBzY29wZXMgLi4uJ1xufTtcbmNvbnN0IFZ1ZURldlRvb2xzVGltZWxpbmVDb2xvcnMgPSB7XG4gICAgW1widnVlLWkxOG4tdGltZWxpbmVcIiAvKiBWdWVEZXZUb29sc0lEcy5USU1FTElORSAqL106IDB4ZmZjZDE5XG59O1xuXG5leHBvcnQgeyBWdWVEZXZUb29sc0xhYmVscywgVnVlRGV2VG9vbHNQbGFjZWhvbGRlcnMsIFZ1ZURldlRvb2xzVGltZWxpbmVDb2xvcnMgfTtcbiIsIi8qIVxuICAqIHZ1ZS1pMThuIHY5LjMuMFxuICAqIChjKSAyMDIzIGthenV5YSBrYXdhZ3VjaGlcbiAgKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gICovXG5pbXBvcnQgeyBnZXRHbG9iYWxUaGlzLCBpbmNyZW1lbnRlciwgZm9ybWF0LCBtYWtlU3ltYm9sLCBpc1BsYWluT2JqZWN0LCBpc0FycmF5LCBpc1N0cmluZywgaGFzT3duLCBpc09iamVjdCwgd2FybiwgaXNCb29sZWFuLCBpc1JlZ0V4cCwgaXNGdW5jdGlvbiwgaW5Ccm93c2VyLCBhc3NpZ24sIGlzTnVtYmVyLCBjcmVhdGVFbWl0dGVyLCBpc0VtcHR5T2JqZWN0IH0gZnJvbSAnQGludGxpZnkvc2hhcmVkJztcbmltcG9ydCB7IENvcmVXYXJuQ29kZXMsIENvcmVFcnJvckNvZGVzLCBjcmVhdGVDb21waWxlRXJyb3IsIERFRkFVTFRfTE9DQUxFLCB1cGRhdGVGYWxsYmFja0xvY2FsZSwgc2V0RmFsbGJhY2tDb250ZXh0LCBjcmVhdGVDb3JlQ29udGV4dCwgY2xlYXJEYXRlVGltZUZvcm1hdCwgY2xlYXJOdW1iZXJGb3JtYXQsIHNldEFkZGl0aW9uYWxNZXRhLCBnZXRGYWxsYmFja0NvbnRleHQsIE5PVF9SRU9TTFZFRCwgaXNUcmFuc2xhdGVGYWxsYmFja1dhcm4sIGlzVHJhbnNsYXRlTWlzc2luZ1dhcm4sIHBhcnNlVHJhbnNsYXRlQXJncywgdHJhbnNsYXRlLCBNSVNTSU5HX1JFU09MVkVfVkFMVUUsIHBhcnNlRGF0ZVRpbWVBcmdzLCBkYXRldGltZSwgcGFyc2VOdW1iZXJBcmdzLCBudW1iZXIsIGZhbGxiYWNrV2l0aExvY2FsZUNoYWluLCBOVU1CRVJfRk9STUFUX09QVElPTlNfS0VZUywgREFURVRJTUVfRk9STUFUX09QVElPTlNfS0VZUywgaXNNZXNzYWdlQVNULCByZWdpc3Rlck1lc3NhZ2VDb21waWxlciwgY29tcGlsZSwgcmVnaXN0ZXJNZXNzYWdlUmVzb2x2ZXIsIHJlc29sdmVWYWx1ZSwgcmVnaXN0ZXJMb2NhbGVGYWxsYmFja2VyLCBzZXREZXZUb29sc0hvb2sgfSBmcm9tICdAaW50bGlmeS9jb3JlLWJhc2UnO1xuaW1wb3J0IHsgY3JlYXRlVk5vZGUsIFRleHQsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBnZXRDdXJyZW50SW5zdGFuY2UsIEZyYWdtZW50LCBkZWZpbmVDb21wb25lbnQsIGgsIGVmZmVjdFNjb3BlLCBpbmplY3QsIG9uTW91bnRlZCwgb25Vbm1vdW50ZWQsIHNoYWxsb3dSZWYsIG9uQmVmb3JlTW91bnQsIGlzUmVmIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IHNldHVwRGV2dG9vbHNQbHVnaW4gfSBmcm9tICdAdnVlL2RldnRvb2xzLWFwaSc7XG5pbXBvcnQgeyBWdWVEZXZUb29sc0xhYmVscywgVnVlRGV2VG9vbHNQbGFjZWhvbGRlcnMsIFZ1ZURldlRvb2xzVGltZWxpbmVDb2xvcnMgfSBmcm9tICdAaW50bGlmeS92dWUtZGV2dG9vbHMnO1xuXG4vKipcbiAqIFZ1ZSBJMThuIFZlcnNpb25cbiAqXG4gKiBAcmVtYXJrc1xuICogU2VtdmVyIGZvcm1hdC4gU2FtZSBmb3JtYXQgYXMgdGhlIHBhY2thZ2UuanNvbiBgdmVyc2lvbmAgZmllbGQuXG4gKlxuICogQFZ1ZUkxOG5HZW5lcmFsXG4gKi9cbmNvbnN0IFZFUlNJT04gPSAnOS4zLjAnO1xuLyoqXG4gKiBUaGlzIGlzIG9ubHkgY2FsbGVkIGluIGVzbS1idW5kbGVyIGJ1aWxkcy5cbiAqIGlzdGFuYnVsLWlnbm9yZS1uZXh0XG4gKi9cbmZ1bmN0aW9uIGluaXRGZWF0dXJlRmxhZ3MoKSB7XG4gICAgaWYgKHR5cGVvZiBfX1ZVRV9JMThOX0ZVTExfSU5TVEFMTF9fICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fVlVFX0kxOE5fRlVMTF9JTlNUQUxMX18gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBfX0lOVExJRllfSklUX0NPTVBJTEFUSU9OX18gIT09ICdib29sZWFuJykge1xuICAgICAgICBnZXRHbG9iYWxUaGlzKCkuX19JTlRMSUZZX0pJVF9DT01QSUxBVElPTl9fID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgX19JTlRMSUZZX0RST1BfTUVTU0FHRV9DT01QSUxFUl9fICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fSU5UTElGWV9EUk9QX01FU1NBR0VfQ09NUElMRVJfXyA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIF9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18gIT09ICdib29sZWFuJykge1xuICAgICAgICBnZXRHbG9iYWxUaGlzKCkuX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXyA9IGZhbHNlO1xuICAgIH1cbn1cblxuY29uc3QgY29kZSQxID0gQ29yZVdhcm5Db2Rlcy5fX0VYVEVORF9QT0lOVF9fO1xuY29uc3QgaW5jJDEgPSBpbmNyZW1lbnRlcihjb2RlJDEpO1xuY29uc3QgSTE4bldhcm5Db2RlcyA9IHtcbiAgICBGQUxMQkFDS19UT19ST09UOiBjb2RlJDEsXG4gICAgTk9UX1NVUFBPUlRFRF9QUkVTRVJWRTogaW5jJDEoKSxcbiAgICBOT1RfU1VQUE9SVEVEX0ZPUk1BVFRFUjogaW5jJDEoKSxcbiAgICBOT1RfU1VQUE9SVEVEX1BSRVNFUlZFX0RJUkVDVElWRTogaW5jJDEoKSxcbiAgICBOT1RfU1VQUE9SVEVEX0dFVF9DSE9JQ0VfSU5ERVg6IGluYyQxKCksXG4gICAgQ09NUE9ORU5UX05BTUVfTEVHQUNZX0NPTVBBVElCTEU6IGluYyQxKCksXG4gICAgTk9UX0ZPVU5EX1BBUkVOVF9TQ09QRTogaW5jJDEoKSxcbiAgICBJR05PUkVfT0JKX0ZMQVRURU46IGluYyQxKCksXG4gICAgTk9USUNFX0RST1BfQUxMT1dfQ09NUE9TSVRJT046IGluYyQxKCkgLy8gMTdcbn07XG5jb25zdCB3YXJuTWVzc2FnZXMgPSB7XG4gICAgW0kxOG5XYXJuQ29kZXMuRkFMTEJBQ0tfVE9fUk9PVF06IGBGYWxsIGJhY2sgdG8ge3R5cGV9ICd7a2V5fScgd2l0aCByb290IGxvY2FsZS5gLFxuICAgIFtJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfUFJFU0VSVkVdOiBgTm90IHN1cHBvcnRlZCAncHJlc2VydmUnLmAsXG4gICAgW0kxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9GT1JNQVRURVJdOiBgTm90IHN1cHBvcnRlZCAnZm9ybWF0dGVyJy5gLFxuICAgIFtJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfUFJFU0VSVkVfRElSRUNUSVZFXTogYE5vdCBzdXBwb3J0ZWQgJ3ByZXNlcnZlRGlyZWN0aXZlQ29udGVudCcuYCxcbiAgICBbSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX0dFVF9DSE9JQ0VfSU5ERVhdOiBgTm90IHN1cHBvcnRlZCAnZ2V0Q2hvaWNlSW5kZXgnLmAsXG4gICAgW0kxOG5XYXJuQ29kZXMuQ09NUE9ORU5UX05BTUVfTEVHQUNZX0NPTVBBVElCTEVdOiBgQ29tcG9uZW50IG5hbWUgbGVnYWN5IGNvbXBhdGlibGU6ICd7bmFtZX0nIC0+ICdpMThuJ2AsXG4gICAgW0kxOG5XYXJuQ29kZXMuTk9UX0ZPVU5EX1BBUkVOVF9TQ09QRV06IGBOb3QgZm91bmQgcGFyZW50IHNjb3BlLiB1c2UgdGhlIGdsb2JhbCBzY29wZS5gLFxuICAgIFtJMThuV2FybkNvZGVzLklHTk9SRV9PQkpfRkxBVFRFTl06IGBJZ25vcmUgb2JqZWN0IGZsYXR0ZW46ICd7a2V5fScga2V5IGhhcyBhbiBzdHJpbmcgdmFsdWVgLFxuICAgIFtJMThuV2FybkNvZGVzLk5PVElDRV9EUk9QX0FMTE9XX0NPTVBPU0lUSU9OXTogYCdhbGxvd0NvbXBvc2l0aW9uJyBvcHRpb24gd2lsbCBiZSBkcm9wcGVkIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24uIEZvciBtb3JlIGluZm9ybWF0aW9uLCBwbGVhc2Ugc2VlIPCfkYkgaHR0cHM6Ly90aW55dXJsLmNvbS8ycDk3bWN6ZWBcbn07XG5mdW5jdGlvbiBnZXRXYXJuTWVzc2FnZShjb2RlLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIGZvcm1hdCh3YXJuTWVzc2FnZXNbY29kZV0sIC4uLmFyZ3MpO1xufVxuXG5jb25zdCBjb2RlID0gQ29yZUVycm9yQ29kZXMuX19FWFRFTkRfUE9JTlRfXztcbmNvbnN0IGluYyA9IGluY3JlbWVudGVyKGNvZGUpO1xuY29uc3QgSTE4bkVycm9yQ29kZXMgPSB7XG4gICAgLy8gY29tcG9zZXIgbW9kdWxlIGVycm9yc1xuICAgIFVORVhQRUNURURfUkVUVVJOX1RZUEU6IGNvZGUsXG4gICAgLy8gbGVnYWN5IG1vZHVsZSBlcnJvcnNcbiAgICBJTlZBTElEX0FSR1VNRU5UOiBpbmMoKSxcbiAgICAvLyBpMThuIG1vZHVsZSBlcnJvcnNcbiAgICBNVVNUX0JFX0NBTExfU0VUVVBfVE9QOiBpbmMoKSxcbiAgICBOT1RfSU5TVEFMTEVEOiBpbmMoKSxcbiAgICBOT1RfQVZBSUxBQkxFX0lOX0xFR0FDWV9NT0RFOiBpbmMoKSxcbiAgICAvLyBkaXJlY3RpdmUgbW9kdWxlIGVycm9yc1xuICAgIFJFUVVJUkVEX1ZBTFVFOiBpbmMoKSxcbiAgICBJTlZBTElEX1ZBTFVFOiBpbmMoKSxcbiAgICAvLyB2dWUtZGV2dG9vbHMgZXJyb3JzXG4gICAgQ0FOTk9UX1NFVFVQX1ZVRV9ERVZUT09MU19QTFVHSU46IGluYygpLFxuICAgIE5PVF9JTlNUQUxMRURfV0lUSF9QUk9WSURFOiBpbmMoKSxcbiAgICAvLyB1bmV4cGVjdGVkIGVycm9yXG4gICAgVU5FWFBFQ1RFRF9FUlJPUjogaW5jKCksXG4gICAgLy8gbm90IGNvbXBhdGlibGUgbGVnYWN5IHZ1ZS1pMThuIGNvbnN0cnVjdG9yXG4gICAgTk9UX0NPTVBBVElCTEVfTEVHQUNZX1ZVRV9JMThOOiBpbmMoKSxcbiAgICAvLyBicmlkZ2Ugc3VwcG9ydCB2dWUgMi54IG9ubHlcbiAgICBCUklER0VfU1VQUE9SVF9WVUVfMl9PTkxZOiBpbmMoKSxcbiAgICAvLyBuZWVkIHRvIGRlZmluZSBgaTE4bmAgb3B0aW9uIGluIGBhbGxvd0NvbXBvc2l0aW9uOiB0cnVlYCBhbmQgYHVzZVNjb3BlOiAnbG9jYWwnIGF0IGB1c2VJMThuYGBcbiAgICBNVVNUX0RFRklORV9JMThOX09QVElPTl9JTl9BTExPV19DT01QT1NJVElPTjogaW5jKCksXG4gICAgLy8gTm90IGF2YWlsYWJsZSBDb21wb3N0aW9uIEFQSSBpbiBMZWdhY3kgQVBJIG1vZGUuIFBsZWFzZSBtYWtlIHN1cmUgdGhhdCB0aGUgbGVnYWN5IEFQSSBtb2RlIGlzIHdvcmtpbmcgcHJvcGVybHlcbiAgICBOT1RfQVZBSUxBQkxFX0NPTVBPU0lUSU9OX0lOX0xFR0FDWTogaW5jKCksXG4gICAgLy8gZm9yIGVuaGFuY2VtZW50XG4gICAgX19FWFRFTkRfUE9JTlRfXzogaW5jKCkgLy8gMzdcbn07XG5mdW5jdGlvbiBjcmVhdGVJMThuRXJyb3IoY29kZSwgLi4uYXJncykge1xuICAgIHJldHVybiBjcmVhdGVDb21waWxlRXJyb3IoY29kZSwgbnVsbCwgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpID8geyBtZXNzYWdlczogZXJyb3JNZXNzYWdlcywgYXJncyB9IDogdW5kZWZpbmVkKTtcbn1cbmNvbnN0IGVycm9yTWVzc2FnZXMgPSB7XG4gICAgW0kxOG5FcnJvckNvZGVzLlVORVhQRUNURURfUkVUVVJOX1RZUEVdOiAnVW5leHBlY3RlZCByZXR1cm4gdHlwZSBpbiBjb21wb3NlcicsXG4gICAgW0kxOG5FcnJvckNvZGVzLklOVkFMSURfQVJHVU1FTlRdOiAnSW52YWxpZCBhcmd1bWVudCcsXG4gICAgW0kxOG5FcnJvckNvZGVzLk1VU1RfQkVfQ0FMTF9TRVRVUF9UT1BdOiAnTXVzdCBiZSBjYWxsZWQgYXQgdGhlIHRvcCBvZiBhIGBzZXR1cGAgZnVuY3Rpb24nLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5OT1RfSU5TVEFMTEVEXTogJ05lZWQgdG8gaW5zdGFsbCB3aXRoIGBhcHAudXNlYCBmdW5jdGlvbicsXG4gICAgW0kxOG5FcnJvckNvZGVzLlVORVhQRUNURURfRVJST1JdOiAnVW5leHBlY3RlZCBlcnJvcicsXG4gICAgW0kxOG5FcnJvckNvZGVzLk5PVF9BVkFJTEFCTEVfSU5fTEVHQUNZX01PREVdOiAnTm90IGF2YWlsYWJsZSBpbiBsZWdhY3kgbW9kZScsXG4gICAgW0kxOG5FcnJvckNvZGVzLlJFUVVJUkVEX1ZBTFVFXTogYFJlcXVpcmVkIGluIHZhbHVlOiB7MH1gLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5JTlZBTElEX1ZBTFVFXTogYEludmFsaWQgdmFsdWVgLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5DQU5OT1RfU0VUVVBfVlVFX0RFVlRPT0xTX1BMVUdJTl06IGBDYW5ub3Qgc2V0dXAgdnVlLWRldnRvb2xzIHBsdWdpbmAsXG4gICAgW0kxOG5FcnJvckNvZGVzLk5PVF9JTlNUQUxMRURfV0lUSF9QUk9WSURFXTogJ05lZWQgdG8gaW5zdGFsbCB3aXRoIGBwcm92aWRlYCBmdW5jdGlvbicsXG4gICAgW0kxOG5FcnJvckNvZGVzLk5PVF9DT01QQVRJQkxFX0xFR0FDWV9WVUVfSTE4Tl06ICdOb3QgY29tcGF0aWJsZSBsZWdhY3kgVnVlSTE4bi4nLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5CUklER0VfU1VQUE9SVF9WVUVfMl9PTkxZXTogJ3Z1ZS1pMThuLWJyaWRnZSBzdXBwb3J0IFZ1ZSAyLnggb25seScsXG4gICAgW0kxOG5FcnJvckNvZGVzLk1VU1RfREVGSU5FX0kxOE5fT1BUSU9OX0lOX0FMTE9XX0NPTVBPU0lUSU9OXTogJ011c3QgZGVmaW5lIOKAmGkxOG7igJkgb3B0aW9uIG9yIGN1c3RvbSBibG9jayBpbiBDb21wb3NpdGlvbiBBUEkgd2l0aCB1c2luZyBsb2NhbCBzY29wZSBpbiBMZWdhY3kgQVBJIG1vZGUnLFxuICAgIFtJMThuRXJyb3JDb2Rlcy5OT1RfQVZBSUxBQkxFX0NPTVBPU0lUSU9OX0lOX0xFR0FDWV06ICdOb3QgYXZhaWxhYmxlIENvbXBvc3Rpb24gQVBJIGluIExlZ2FjeSBBUEkgbW9kZS4gUGxlYXNlIG1ha2Ugc3VyZSB0aGF0IHRoZSBsZWdhY3kgQVBJIG1vZGUgaXMgd29ya2luZyBwcm9wZXJseSdcbn07XG5cbmNvbnN0IFRyYW5zbGF0ZVZOb2RlU3ltYm9sID0gXG4vKiAjX19QVVJFX18qLyBtYWtlU3ltYm9sKCdfX3RyYW5zbGF0ZVZOb2RlJyk7XG5jb25zdCBEYXRldGltZVBhcnRzU3ltYm9sID0gLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgnX19kYXRldGltZVBhcnRzJyk7XG5jb25zdCBOdW1iZXJQYXJ0c1N5bWJvbCA9IC8qICNfX1BVUkVfXyovIG1ha2VTeW1ib2woJ19fbnVtYmVyUGFydHMnKTtcbmNvbnN0IEVuYWJsZUVtaXR0ZXIgPSAvKiAjX19QVVJFX18qLyBtYWtlU3ltYm9sKCdfX2VuYWJsZUVtaXR0ZXInKTtcbmNvbnN0IERpc2FibGVFbWl0dGVyID0gLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgnX19kaXNhYmxlRW1pdHRlcicpO1xuY29uc3QgU2V0UGx1cmFsUnVsZXNTeW1ib2wgPSBtYWtlU3ltYm9sKCdfX3NldFBsdXJhbFJ1bGVzJyk7XG5tYWtlU3ltYm9sKCdfX2ludGxpZnlNZXRhJyk7XG5jb25zdCBJbmVqY3RXaXRoT3B0aW9uU3ltYm9sID0gXG4vKiAjX19QVVJFX18qLyBtYWtlU3ltYm9sKCdfX2luamVjdFdpdGhPcHRpb24nKTtcbmNvbnN0IERpc3Bvc2VTeW1ib2wgPSAvKiAjX19QVVJFX18qLyBtYWtlU3ltYm9sKCdfX2Rpc3Bvc2UnKTtcbmNvbnN0IF9fVlVFX0kxOE5fQlJJREdFX18gPSAgJ19fVlVFX0kxOE5fQlJJREdFX18nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4vKipcbiAqIFRyYW5zZm9ybSBmbGF0IGpzb24gaW4gb2JqIHRvIG5vcm1hbCBqc29uIGluIG9ialxuICovXG5mdW5jdGlvbiBoYW5kbGVGbGF0SnNvbihvYmopIHtcbiAgICAvLyBjaGVjayBvYmpcbiAgICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIC8vIGNoZWNrIGtleVxuICAgICAgICBpZiAoIWhhc093bihvYmosIGtleSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGhhbmRsZSBmb3Igbm9ybWFsIGpzb25cbiAgICAgICAgaWYgKCFrZXkuaW5jbHVkZXMoJy4nKSkge1xuICAgICAgICAgICAgLy8gcmVjdXJzaXZlIHByb2Nlc3MgdmFsdWUgaWYgdmFsdWUgaXMgYWxzbyBhIG9iamVjdFxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZUZsYXRKc29uKG9ialtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBoYW5kbGUgZm9yIGZsYXQganNvbiwgdHJhbnNmb3JtIHRvIG5vcm1hbCBqc29uXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZ28gdG8gdGhlIGxhc3Qgb2JqZWN0XG4gICAgICAgICAgICBjb25zdCBzdWJLZXlzID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBjb25zdCBsYXN0SW5kZXggPSBzdWJLZXlzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBsZXQgY3VycmVudE9iaiA9IG9iajtcbiAgICAgICAgICAgIGxldCBoYXNTdHJpbmdWYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXN0SW5kZXg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghKHN1YktleXNbaV0gaW4gY3VycmVudE9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE9ialtzdWJLZXlzW2ldXSA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWlzT2JqZWN0KGN1cnJlbnRPYmpbc3ViS2V5c1tpXV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLklHTk9SRV9PQkpfRkxBVFRFTiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogc3ViS2V5c1tpXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICBoYXNTdHJpbmdWYWx1ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqID0gY3VycmVudE9ialtzdWJLZXlzW2ldXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBsYXN0IG9iamVjdCB2YWx1ZSwgZGVsZXRlIG9sZCBwcm9wZXJ0eVxuICAgICAgICAgICAgaWYgKCFoYXNTdHJpbmdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmpbc3ViS2V5c1tsYXN0SW5kZXhdXSA9IG9ialtrZXldO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmpba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZSBwcm9jZXNzIHZhbHVlIGlmIHZhbHVlIGlzIGFsc28gYSBvYmplY3RcbiAgICAgICAgICAgIGlmIChpc09iamVjdChjdXJyZW50T2JqW3N1YktleXNbbGFzdEluZGV4XV0pKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlRmxhdEpzb24oY3VycmVudE9ialtzdWJLZXlzW2xhc3RJbmRleF1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuZnVuY3Rpb24gZ2V0TG9jYWxlTWVzc2FnZXMobG9jYWxlLCBvcHRpb25zKSB7XG4gICAgY29uc3QgeyBtZXNzYWdlcywgX19pMThuLCBtZXNzYWdlUmVzb2x2ZXIsIGZsYXRKc29uIH0gPSBvcHRpb25zO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IHJldCA9IChpc1BsYWluT2JqZWN0KG1lc3NhZ2VzKVxuICAgICAgICA/IG1lc3NhZ2VzXG4gICAgICAgIDogaXNBcnJheShfX2kxOG4pXG4gICAgICAgICAgICA/IHt9XG4gICAgICAgICAgICA6IHsgW2xvY2FsZV06IHt9IH0pO1xuICAgIC8vIG1lcmdlIGxvY2FsZSBtZXNzYWdlcyBvZiBpMThuIGN1c3RvbSBibG9ja1xuICAgIGlmIChpc0FycmF5KF9faTE4bikpIHtcbiAgICAgICAgX19pMThuLmZvckVhY2goY3VzdG9tID0+IHtcbiAgICAgICAgICAgIGlmICgnbG9jYWxlJyBpbiBjdXN0b20gJiYgJ3Jlc291cmNlJyBpbiBjdXN0b20pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGxvY2FsZSwgcmVzb3VyY2UgfSA9IGN1c3RvbTtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldFtsb2NhbGVdID0gcmV0W2xvY2FsZV0gfHwge307XG4gICAgICAgICAgICAgICAgICAgIGRlZXBDb3B5KHJlc291cmNlLCByZXRbbG9jYWxlXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWVwQ29weShyZXNvdXJjZSwgcmV0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpc1N0cmluZyhjdXN0b20pICYmIGRlZXBDb3B5KEpTT04ucGFyc2UoY3VzdG9tKSwgcmV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIGhhbmRsZSBtZXNzYWdlcyBmb3IgZmxhdCBqc29uXG4gICAgaWYgKG1lc3NhZ2VSZXNvbHZlciA9PSBudWxsICYmIGZsYXRKc29uKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHJldCkge1xuICAgICAgICAgICAgaWYgKGhhc093bihyZXQsIGtleSkpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVGbGF0SnNvbihyZXRba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn1cbmNvbnN0IGlzTm90T2JqZWN0T3JJc0FycmF5ID0gKHZhbCkgPT4gIWlzT2JqZWN0KHZhbCkgfHwgaXNBcnJheSh2YWwpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmZ1bmN0aW9uIGRlZXBDb3B5KHNyYywgZGVzKSB7XG4gICAgLy8gc3JjIGFuZCBkZXMgc2hvdWxkIGJvdGggYmUgb2JqZWN0cywgYW5kIG5vbiBvZiB0aGVuIGNhbiBiZSBhIGFycmF5XG4gICAgaWYgKGlzTm90T2JqZWN0T3JJc0FycmF5KHNyYykgfHwgaXNOb3RPYmplY3RPcklzQXJyYXkoZGVzKSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuSU5WQUxJRF9WQUxVRSk7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIHNyYykge1xuICAgICAgICBpZiAoaGFzT3duKHNyYywga2V5KSkge1xuICAgICAgICAgICAgaWYgKGlzTm90T2JqZWN0T3JJc0FycmF5KHNyY1trZXldKSB8fCBpc05vdE9iamVjdE9ySXNBcnJheShkZXNba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAvLyByZXBsYWNlIHdpdGggc3JjW2tleV0gd2hlbjpcbiAgICAgICAgICAgICAgICAvLyBzcmNba2V5XSBvciBkZXNba2V5XSBpcyBub3QgYSBvYmplY3QsIG9yXG4gICAgICAgICAgICAgICAgLy8gc3JjW2tleV0gb3IgZGVzW2tleV0gaXMgYSBhcnJheVxuICAgICAgICAgICAgICAgIGRlc1trZXldID0gc3JjW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBzcmNba2V5XSBhbmQgZGVzW2tleV0gYXJlIGJvdGggb2JqZWN0LCBtZXJnZSB0aGVtXG4gICAgICAgICAgICAgICAgZGVlcENvcHkoc3JjW2tleV0sIGRlc1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5mdW5jdGlvbiBnZXRDb21wb25lbnRPcHRpb25zKGluc3RhbmNlKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLnR5cGUgO1xufVxuZnVuY3Rpb24gYWRqdXN0STE4blJlc291cmNlcyhnbCwgb3B0aW9ucywgY29tcG9uZW50T3B0aW9ucyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbikge1xuICAgIGxldCBtZXNzYWdlcyA9IGlzT2JqZWN0KG9wdGlvbnMubWVzc2FnZXMpID8gb3B0aW9ucy5tZXNzYWdlcyA6IHt9O1xuICAgIGlmICgnX19pMThuR2xvYmFsJyBpbiBjb21wb25lbnRPcHRpb25zKSB7XG4gICAgICAgIG1lc3NhZ2VzID0gZ2V0TG9jYWxlTWVzc2FnZXMoZ2wubG9jYWxlLnZhbHVlLCB7XG4gICAgICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgICAgIF9faTE4bjogY29tcG9uZW50T3B0aW9ucy5fX2kxOG5HbG9iYWxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIG1lcmdlIGxvY2FsZSBtZXNzYWdlc1xuICAgIGNvbnN0IGxvY2FsZXMgPSBPYmplY3Qua2V5cyhtZXNzYWdlcyk7XG4gICAgaWYgKGxvY2FsZXMubGVuZ3RoKSB7XG4gICAgICAgIGxvY2FsZXMuZm9yRWFjaChsb2NhbGUgPT4ge1xuICAgICAgICAgICAgZ2wubWVyZ2VMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZXNbbG9jYWxlXSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB7XG4gICAgICAgIC8vIG1lcmdlIGRhdGV0aW1lIGZvcm1hdHNcbiAgICAgICAgaWYgKGlzT2JqZWN0KG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzKSkge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxlcyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzKTtcbiAgICAgICAgICAgIGlmIChsb2NhbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxvY2FsZXMuZm9yRWFjaChsb2NhbGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBnbC5tZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgb3B0aW9ucy5kYXRldGltZUZvcm1hdHNbbG9jYWxlXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gbWVyZ2UgbnVtYmVyIGZvcm1hdHNcbiAgICAgICAgaWYgKGlzT2JqZWN0KG9wdGlvbnMubnVtYmVyRm9ybWF0cykpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsZXMgPSBPYmplY3Qua2V5cyhvcHRpb25zLm51bWJlckZvcm1hdHMpO1xuICAgICAgICAgICAgaWYgKGxvY2FsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxlcy5mb3JFYWNoKGxvY2FsZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGdsLm1lcmdlTnVtYmVyRm9ybWF0KGxvY2FsZSwgb3B0aW9ucy5udW1iZXJGb3JtYXRzW2xvY2FsZV0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUoa2V5KSB7XG4gICAgcmV0dXJuIGNyZWF0ZVZOb2RlKFRleHQsIG51bGwsIGtleSwgMClcbiAgICAgICAgO1xufVxuLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbi8vIGV4dGVuZCBWTm9kZSBpbnRlcmZhY2VcbmNvbnN0IERFVlRPT0xTX01FVEEgPSAnX19JTlRMSUZZX01FVEFfXyc7XG5sZXQgY29tcG9zZXJJRCA9IDA7XG5mdW5jdGlvbiBkZWZpbmVDb3JlTWlzc2luZ0hhbmRsZXIobWlzc2luZykge1xuICAgIHJldHVybiAoKGN0eCwgbG9jYWxlLCBrZXksIHR5cGUpID0+IHtcbiAgICAgICAgcmV0dXJuIG1pc3NpbmcobG9jYWxlLCBrZXksIGdldEN1cnJlbnRJbnN0YW5jZSgpIHx8IHVuZGVmaW5lZCwgdHlwZSk7XG4gICAgfSk7XG59XG4vLyBmb3IgSW50bGlmeSBEZXZUb29sc1xuY29uc3QgZ2V0TWV0YUluZm8gPSAvKiAjX19QVVJFX18qLyAoKSA9PiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcbiAgICBsZXQgbWV0YSA9IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHJldHVybiBpbnN0YW5jZSAmJiAobWV0YSA9IGdldENvbXBvbmVudE9wdGlvbnMoaW5zdGFuY2UpW0RFVlRPT0xTX01FVEFdKVxuICAgICAgICA/IHsgW0RFVlRPT0xTX01FVEFdOiBtZXRhIH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIDogbnVsbDtcbn07XG4vKipcbiAqIENyZWF0ZSBjb21wb3NlciBpbnRlcmZhY2UgZmFjdG9yeVxuICpcbiAqIEBpbnRlcm5hbFxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuZnVuY3Rpb24gY3JlYXRlQ29tcG9zZXIob3B0aW9ucyA9IHt9LCBWdWVJMThuTGVnYWN5KSB7XG4gICAgY29uc3QgeyBfX3Jvb3QsIF9faW5qZWN0V2l0aE9wdGlvbiB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBfaXNHbG9iYWwgPSBfX3Jvb3QgPT09IHVuZGVmaW5lZDtcbiAgICBsZXQgX2luaGVyaXRMb2NhbGUgPSBpc0Jvb2xlYW4ob3B0aW9ucy5pbmhlcml0TG9jYWxlKVxuICAgICAgICA/IG9wdGlvbnMuaW5oZXJpdExvY2FsZVxuICAgICAgICA6IHRydWU7XG4gICAgY29uc3QgX2xvY2FsZSA9IHJlZihcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBfX3Jvb3QgJiYgX2luaGVyaXRMb2NhbGVcbiAgICAgICAgPyBfX3Jvb3QubG9jYWxlLnZhbHVlXG4gICAgICAgIDogaXNTdHJpbmcob3B0aW9ucy5sb2NhbGUpXG4gICAgICAgICAgICA/IG9wdGlvbnMubG9jYWxlXG4gICAgICAgICAgICA6IERFRkFVTFRfTE9DQUxFKTtcbiAgICBjb25zdCBfZmFsbGJhY2tMb2NhbGUgPSByZWYoXG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgX19yb290ICYmIF9pbmhlcml0TG9jYWxlXG4gICAgICAgID8gX19yb290LmZhbGxiYWNrTG9jYWxlLnZhbHVlXG4gICAgICAgIDogaXNTdHJpbmcob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcbiAgICAgICAgICAgIGlzQXJyYXkob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcbiAgICAgICAgICAgIGlzUGxhaW5PYmplY3Qob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcbiAgICAgICAgICAgIG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUgPT09IGZhbHNlXG4gICAgICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tMb2NhbGVcbiAgICAgICAgICAgIDogX2xvY2FsZS52YWx1ZSk7XG4gICAgY29uc3QgX21lc3NhZ2VzID0gcmVmKGdldExvY2FsZU1lc3NhZ2VzKF9sb2NhbGUudmFsdWUsIG9wdGlvbnMpKTtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBfZGF0ZXRpbWVGb3JtYXRzID0gcmVmKGlzUGxhaW5PYmplY3Qob3B0aW9ucy5kYXRldGltZUZvcm1hdHMpXG4gICAgICAgICAgICA/IG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzXG4gICAgICAgICAgICA6IHsgW19sb2NhbGUudmFsdWVdOiB7fSB9KVxuICAgICAgICA7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgX251bWJlckZvcm1hdHMgPSByZWYoaXNQbGFpbk9iamVjdChvcHRpb25zLm51bWJlckZvcm1hdHMpXG4gICAgICAgICAgICA/IG9wdGlvbnMubnVtYmVyRm9ybWF0c1xuICAgICAgICAgICAgOiB7IFtfbG9jYWxlLnZhbHVlXToge30gfSlcbiAgICAgICAgO1xuICAgIC8vIHdhcm5pbmcgc3VwcHJlc3Mgb3B0aW9uc1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGxldCBfbWlzc2luZ1dhcm4gPSBfX3Jvb3RcbiAgICAgICAgPyBfX3Jvb3QubWlzc2luZ1dhcm5cbiAgICAgICAgOiBpc0Jvb2xlYW4ob3B0aW9ucy5taXNzaW5nV2FybikgfHwgaXNSZWdFeHAob3B0aW9ucy5taXNzaW5nV2FybilcbiAgICAgICAgICAgID8gb3B0aW9ucy5taXNzaW5nV2FyblxuICAgICAgICAgICAgOiB0cnVlO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGxldCBfZmFsbGJhY2tXYXJuID0gX19yb290XG4gICAgICAgID8gX19yb290LmZhbGxiYWNrV2FyblxuICAgICAgICA6IGlzQm9vbGVhbihvcHRpb25zLmZhbGxiYWNrV2FybikgfHwgaXNSZWdFeHAob3B0aW9ucy5mYWxsYmFja1dhcm4pXG4gICAgICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tXYXJuXG4gICAgICAgICAgICA6IHRydWU7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgbGV0IF9mYWxsYmFja1Jvb3QgPSBfX3Jvb3RcbiAgICAgICAgPyBfX3Jvb3QuZmFsbGJhY2tSb290XG4gICAgICAgIDogaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tSb290KVxuICAgICAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrUm9vdFxuICAgICAgICAgICAgOiB0cnVlO1xuICAgIC8vIGNvbmZpZ3VyZSBmYWxsIGJhY2sgdG8gcm9vdFxuICAgIGxldCBfZmFsbGJhY2tGb3JtYXQgPSAhIW9wdGlvbnMuZmFsbGJhY2tGb3JtYXQ7XG4gICAgLy8gcnVudGltZSBtaXNzaW5nXG4gICAgbGV0IF9taXNzaW5nID0gaXNGdW5jdGlvbihvcHRpb25zLm1pc3NpbmcpID8gb3B0aW9ucy5taXNzaW5nIDogbnVsbDtcbiAgICBsZXQgX3J1bnRpbWVNaXNzaW5nID0gaXNGdW5jdGlvbihvcHRpb25zLm1pc3NpbmcpXG4gICAgICAgID8gZGVmaW5lQ29yZU1pc3NpbmdIYW5kbGVyKG9wdGlvbnMubWlzc2luZylcbiAgICAgICAgOiBudWxsO1xuICAgIC8vIHBvc3RUcmFuc2xhdGlvbiBoYW5kbGVyXG4gICAgbGV0IF9wb3N0VHJhbnNsYXRpb24gPSBpc0Z1bmN0aW9uKG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uKVxuICAgICAgICA/IG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uXG4gICAgICAgIDogbnVsbDtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBsZXQgX3dhcm5IdG1sTWVzc2FnZSA9IF9fcm9vdFxuICAgICAgICA/IF9fcm9vdC53YXJuSHRtbE1lc3NhZ2VcbiAgICAgICAgOiBpc0Jvb2xlYW4ob3B0aW9ucy53YXJuSHRtbE1lc3NhZ2UpXG4gICAgICAgICAgICA/IG9wdGlvbnMud2Fybkh0bWxNZXNzYWdlXG4gICAgICAgICAgICA6IHRydWU7XG4gICAgbGV0IF9lc2NhcGVQYXJhbWV0ZXIgPSAhIW9wdGlvbnMuZXNjYXBlUGFyYW1ldGVyO1xuICAgIC8vIGN1c3RvbSBsaW5rZWQgbW9kaWZpZXJzXG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgX21vZGlmaWVycyA9IF9fcm9vdFxuICAgICAgICA/IF9fcm9vdC5tb2RpZmllcnNcbiAgICAgICAgOiBpc1BsYWluT2JqZWN0KG9wdGlvbnMubW9kaWZpZXJzKVxuICAgICAgICAgICAgPyBvcHRpb25zLm1vZGlmaWVyc1xuICAgICAgICAgICAgOiB7fTtcbiAgICAvLyBwbHVyYWxSdWxlc1xuICAgIGxldCBfcGx1cmFsUnVsZXMgPSBvcHRpb25zLnBsdXJhbFJ1bGVzIHx8IChfX3Jvb3QgJiYgX19yb290LnBsdXJhbFJ1bGVzKTtcbiAgICAvLyBydW50aW1lIGNvbnRleHRcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWNvbnN0XG4gICAgbGV0IF9jb250ZXh0O1xuICAgIGNvbnN0IGdldENvcmVDb250ZXh0ID0gKCkgPT4ge1xuICAgICAgICBfaXNHbG9iYWwgJiYgc2V0RmFsbGJhY2tDb250ZXh0KG51bGwpO1xuICAgICAgICBjb25zdCBjdHhPcHRpb25zID0ge1xuICAgICAgICAgICAgdmVyc2lvbjogVkVSU0lPTixcbiAgICAgICAgICAgIGxvY2FsZTogX2xvY2FsZS52YWx1ZSxcbiAgICAgICAgICAgIGZhbGxiYWNrTG9jYWxlOiBfZmFsbGJhY2tMb2NhbGUudmFsdWUsXG4gICAgICAgICAgICBtZXNzYWdlczogX21lc3NhZ2VzLnZhbHVlLFxuICAgICAgICAgICAgbW9kaWZpZXJzOiBfbW9kaWZpZXJzLFxuICAgICAgICAgICAgcGx1cmFsUnVsZXM6IF9wbHVyYWxSdWxlcyxcbiAgICAgICAgICAgIG1pc3Npbmc6IF9ydW50aW1lTWlzc2luZyA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IF9ydW50aW1lTWlzc2luZyxcbiAgICAgICAgICAgIG1pc3NpbmdXYXJuOiBfbWlzc2luZ1dhcm4sXG4gICAgICAgICAgICBmYWxsYmFja1dhcm46IF9mYWxsYmFja1dhcm4sXG4gICAgICAgICAgICBmYWxsYmFja0Zvcm1hdDogX2ZhbGxiYWNrRm9ybWF0LFxuICAgICAgICAgICAgdW5yZXNvbHZpbmc6IHRydWUsXG4gICAgICAgICAgICBwb3N0VHJhbnNsYXRpb246IF9wb3N0VHJhbnNsYXRpb24gPT09IG51bGwgPyB1bmRlZmluZWQgOiBfcG9zdFRyYW5zbGF0aW9uLFxuICAgICAgICAgICAgd2Fybkh0bWxNZXNzYWdlOiBfd2Fybkh0bWxNZXNzYWdlLFxuICAgICAgICAgICAgZXNjYXBlUGFyYW1ldGVyOiBfZXNjYXBlUGFyYW1ldGVyLFxuICAgICAgICAgICAgbWVzc2FnZVJlc29sdmVyOiBvcHRpb25zLm1lc3NhZ2VSZXNvbHZlcixcbiAgICAgICAgICAgIG1lc3NhZ2VDb21waWxlcjogb3B0aW9ucy5tZXNzYWdlQ29tcGlsZXIsXG4gICAgICAgICAgICBfX21ldGE6IHsgZnJhbWV3b3JrOiAndnVlJyB9XG4gICAgICAgIH07XG4gICAgICAgIHtcbiAgICAgICAgICAgIGN0eE9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzID0gX2RhdGV0aW1lRm9ybWF0cy52YWx1ZTtcbiAgICAgICAgICAgIGN0eE9wdGlvbnMubnVtYmVyRm9ybWF0cyA9IF9udW1iZXJGb3JtYXRzLnZhbHVlO1xuICAgICAgICAgICAgY3R4T3B0aW9ucy5fX2RhdGV0aW1lRm9ybWF0dGVycyA9IGlzUGxhaW5PYmplY3QoX2NvbnRleHQpXG4gICAgICAgICAgICAgICAgPyBfY29udGV4dC5fX2RhdGV0aW1lRm9ybWF0dGVyc1xuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY3R4T3B0aW9ucy5fX251bWJlckZvcm1hdHRlcnMgPSBpc1BsYWluT2JqZWN0KF9jb250ZXh0KVxuICAgICAgICAgICAgICAgID8gX2NvbnRleHQuX19udW1iZXJGb3JtYXR0ZXJzXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgICAgICAgICAgY3R4T3B0aW9ucy5fX3ZfZW1pdHRlciA9IGlzUGxhaW5PYmplY3QoX2NvbnRleHQpXG4gICAgICAgICAgICAgICAgPyBfY29udGV4dC5fX3ZfZW1pdHRlclxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN0eCA9IGNyZWF0ZUNvcmVDb250ZXh0KGN0eE9wdGlvbnMpO1xuICAgICAgICBfaXNHbG9iYWwgJiYgc2V0RmFsbGJhY2tDb250ZXh0KGN0eCk7XG4gICAgICAgIHJldHVybiBjdHg7XG4gICAgfTtcbiAgICBfY29udGV4dCA9IGdldENvcmVDb250ZXh0KCk7XG4gICAgdXBkYXRlRmFsbGJhY2tMb2NhbGUoX2NvbnRleHQsIF9sb2NhbGUudmFsdWUsIF9mYWxsYmFja0xvY2FsZS52YWx1ZSk7XG4gICAgLy8gdHJhY2sgcmVhY3Rpdml0eVxuICAgIGZ1bmN0aW9uIHRyYWNrUmVhY3Rpdml0eVZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICBfbG9jYWxlLnZhbHVlLFxuICAgICAgICAgICAgICAgIF9mYWxsYmFja0xvY2FsZS52YWx1ZSxcbiAgICAgICAgICAgICAgICBfbWVzc2FnZXMudmFsdWUsXG4gICAgICAgICAgICAgICAgX2RhdGV0aW1lRm9ybWF0cy52YWx1ZSxcbiAgICAgICAgICAgICAgICBfbnVtYmVyRm9ybWF0cy52YWx1ZVxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgO1xuICAgIH1cbiAgICAvLyBsb2NhbGVcbiAgICBjb25zdCBsb2NhbGUgPSBjb21wdXRlZCh7XG4gICAgICAgIGdldDogKCkgPT4gX2xvY2FsZS52YWx1ZSxcbiAgICAgICAgc2V0OiB2YWwgPT4ge1xuICAgICAgICAgICAgX2xvY2FsZS52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgIF9jb250ZXh0LmxvY2FsZSA9IF9sb2NhbGUudmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBmYWxsYmFja0xvY2FsZVxuICAgIGNvbnN0IGZhbGxiYWNrTG9jYWxlID0gY29tcHV0ZWQoe1xuICAgICAgICBnZXQ6ICgpID0+IF9mYWxsYmFja0xvY2FsZS52YWx1ZSxcbiAgICAgICAgc2V0OiB2YWwgPT4ge1xuICAgICAgICAgICAgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgX2NvbnRleHQuZmFsbGJhY2tMb2NhbGUgPSBfZmFsbGJhY2tMb2NhbGUudmFsdWU7XG4gICAgICAgICAgICB1cGRhdGVGYWxsYmFja0xvY2FsZShfY29udGV4dCwgX2xvY2FsZS52YWx1ZSwgdmFsKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIG1lc3NhZ2VzXG4gICAgY29uc3QgbWVzc2FnZXMgPSBjb21wdXRlZCgoKSA9PiBfbWVzc2FnZXMudmFsdWUpO1xuICAgIC8vIGRhdGV0aW1lRm9ybWF0c1xuICAgIGNvbnN0IGRhdGV0aW1lRm9ybWF0cyA9IC8qICNfX1BVUkVfXyovIGNvbXB1dGVkKCgpID0+IF9kYXRldGltZUZvcm1hdHMudmFsdWUpO1xuICAgIC8vIG51bWJlckZvcm1hdHNcbiAgICBjb25zdCBudW1iZXJGb3JtYXRzID0gLyogI19fUFVSRV9fKi8gY29tcHV0ZWQoKCkgPT4gX251bWJlckZvcm1hdHMudmFsdWUpO1xuICAgIC8vIGdldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXJcbiAgICBmdW5jdGlvbiBnZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyKCkge1xuICAgICAgICByZXR1cm4gaXNGdW5jdGlvbihfcG9zdFRyYW5zbGF0aW9uKSA/IF9wb3N0VHJhbnNsYXRpb24gOiBudWxsO1xuICAgIH1cbiAgICAvLyBzZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyXG4gICAgZnVuY3Rpb24gc2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgICAgIF9wb3N0VHJhbnNsYXRpb24gPSBoYW5kbGVyO1xuICAgICAgICBfY29udGV4dC5wb3N0VHJhbnNsYXRpb24gPSBoYW5kbGVyO1xuICAgIH1cbiAgICAvLyBnZXRNaXNzaW5nSGFuZGxlclxuICAgIGZ1bmN0aW9uIGdldE1pc3NpbmdIYW5kbGVyKCkge1xuICAgICAgICByZXR1cm4gX21pc3Npbmc7XG4gICAgfVxuICAgIC8vIHNldE1pc3NpbmdIYW5kbGVyXG4gICAgZnVuY3Rpb24gc2V0TWlzc2luZ0hhbmRsZXIoaGFuZGxlcikge1xuICAgICAgICBpZiAoaGFuZGxlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgX3J1bnRpbWVNaXNzaW5nID0gZGVmaW5lQ29yZU1pc3NpbmdIYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIF9taXNzaW5nID0gaGFuZGxlcjtcbiAgICAgICAgX2NvbnRleHQubWlzc2luZyA9IF9ydW50aW1lTWlzc2luZztcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNSZXNvbHZlZFRyYW5zbGF0ZU1lc3NhZ2UodHlwZSwgYXJnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICkge1xuICAgICAgICByZXR1cm4gdHlwZSAhPT0gJ3RyYW5zbGF0ZScgfHwgIWFyZy5yZXNvbHZlZE1lc3NhZ2U7XG4gICAgfVxuICAgIGNvbnN0IHdyYXBXaXRoRGVwcyA9IChmbiwgYXJndW1lbnRQYXJzZXIsIHdhcm5UeXBlLCBmYWxsYmFja1N1Y2Nlc3MsIGZhbGxiYWNrRmFpbCwgc3VjY2Vzc0NvbmRpdGlvbikgPT4ge1xuICAgICAgICB0cmFja1JlYWN0aXZpdHlWYWx1ZXMoKTsgLy8gdHJhY2sgcmVhY3RpdmUgZGVwZW5kZW5jeVxuICAgICAgICAvLyBOT1RFOiBleHBlcmltZW50YWwgISFcbiAgICAgICAgbGV0IHJldDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXykge1xuICAgICAgICAgICAgICAgIHNldEFkZGl0aW9uYWxNZXRhKGdldE1ldGFJbmZvKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFfaXNHbG9iYWwpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dC5mYWxsYmFja0NvbnRleHQgPSBfX3Jvb3RcbiAgICAgICAgICAgICAgICAgICAgPyBnZXRGYWxsYmFja0NvbnRleHQoKVxuICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldCA9IGZuKF9jb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXykge1xuICAgICAgICAgICAgICAgIHNldEFkZGl0aW9uYWxNZXRhKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFfaXNHbG9iYWwpIHtcbiAgICAgICAgICAgICAgICBfY29udGV4dC5mYWxsYmFja0NvbnRleHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTnVtYmVyKHJldCkgJiYgcmV0ID09PSBOT1RfUkVPU0xWRUQpIHtcbiAgICAgICAgICAgIGNvbnN0IFtrZXksIGFyZzJdID0gYXJndW1lbnRQYXJzZXIoKTtcbiAgICAgICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiZcbiAgICAgICAgICAgICAgICBfX3Jvb3QgJiZcbiAgICAgICAgICAgICAgICBpc1N0cmluZyhrZXkpICYmXG4gICAgICAgICAgICAgICAgaXNSZXNvbHZlZFRyYW5zbGF0ZU1lc3NhZ2Uod2FyblR5cGUsIGFyZzIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9mYWxsYmFja1Jvb3QgJiZcbiAgICAgICAgICAgICAgICAgICAgKGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuKF9mYWxsYmFja1dhcm4sIGtleSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVHJhbnNsYXRlTWlzc2luZ1dhcm4oX21pc3NpbmdXYXJuLCBrZXkpKSkge1xuICAgICAgICAgICAgICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuRkFMTEJBQ0tfVE9fUk9PVCwge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogd2FyblR5cGVcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgICAgICAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IF9fdl9lbWl0dGVyOiBlbWl0dGVyIH0gPSBfY29udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVtaXR0ZXIgJiYgX2ZhbGxiYWNrUm9vdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwiZmFsbGJhY2tcIiAvKiBWdWVEZXZUb29sc1RpbWVsaW5lRXZlbnRzLkZBTEJBQ0sgKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB3YXJuVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86ICdnbG9iYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGAke3dhcm5UeXBlfToke2tleX1gXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfX3Jvb3QgJiYgX2ZhbGxiYWNrUm9vdFxuICAgICAgICAgICAgICAgID8gZmFsbGJhY2tTdWNjZXNzKF9fcm9vdClcbiAgICAgICAgICAgICAgICA6IGZhbGxiYWNrRmFpbChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN1Y2Nlc3NDb25kaXRpb24ocmV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuVU5FWFBFQ1RFRF9SRVRVUk5fVFlQRSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIHRcbiAgICBmdW5jdGlvbiB0KC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcyhjb250ZXh0ID0+IFJlZmxlY3QuYXBwbHkodHJhbnNsYXRlLCBudWxsLCBbY29udGV4dCwgLi4uYXJnc10pLCAoKSA9PiBwYXJzZVRyYW5zbGF0ZUFyZ3MoLi4uYXJncyksICd0cmFuc2xhdGUnLCByb290ID0+IFJlZmxlY3QuYXBwbHkocm9vdC50LCByb290LCBbLi4uYXJnc10pLCBrZXkgPT4ga2V5LCB2YWwgPT4gaXNTdHJpbmcodmFsKSk7XG4gICAgfVxuICAgIC8vIHJ0XG4gICAgZnVuY3Rpb24gcnQoLi4uYXJncykge1xuICAgICAgICBjb25zdCBbYXJnMSwgYXJnMiwgYXJnM10gPSBhcmdzO1xuICAgICAgICBpZiAoYXJnMyAmJiAhaXNPYmplY3QoYXJnMykpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5JTlZBTElEX0FSR1VNRU5UKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdCguLi5bYXJnMSwgYXJnMiwgYXNzaWduKHsgcmVzb2x2ZWRNZXNzYWdlOiB0cnVlIH0sIGFyZzMgfHwge30pXSk7XG4gICAgfVxuICAgIC8vIGRcbiAgICBmdW5jdGlvbiBkKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcyhjb250ZXh0ID0+IFJlZmxlY3QuYXBwbHkoZGF0ZXRpbWUsIG51bGwsIFtjb250ZXh0LCAuLi5hcmdzXSksICgpID0+IHBhcnNlRGF0ZVRpbWVBcmdzKC4uLmFyZ3MpLCAnZGF0ZXRpbWUgZm9ybWF0Jywgcm9vdCA9PiBSZWZsZWN0LmFwcGx5KHJvb3QuZCwgcm9vdCwgWy4uLmFyZ3NdKSwgKCkgPT4gTUlTU0lOR19SRVNPTFZFX1ZBTFVFLCB2YWwgPT4gaXNTdHJpbmcodmFsKSk7XG4gICAgfVxuICAgIC8vIG5cbiAgICBmdW5jdGlvbiBuKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcyhjb250ZXh0ID0+IFJlZmxlY3QuYXBwbHkobnVtYmVyLCBudWxsLCBbY29udGV4dCwgLi4uYXJnc10pLCAoKSA9PiBwYXJzZU51bWJlckFyZ3MoLi4uYXJncyksICdudW1iZXIgZm9ybWF0Jywgcm9vdCA9PiBSZWZsZWN0LmFwcGx5KHJvb3Qubiwgcm9vdCwgWy4uLmFyZ3NdKSwgKCkgPT4gTUlTU0lOR19SRVNPTFZFX1ZBTFVFLCB2YWwgPT4gaXNTdHJpbmcodmFsKSk7XG4gICAgfVxuICAgIC8vIGZvciBjdXN0b20gcHJvY2Vzc29yXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gdmFsdWVzLm1hcCh2YWwgPT4gaXNTdHJpbmcodmFsKSB8fCBpc051bWJlcih2YWwpIHx8IGlzQm9vbGVhbih2YWwpXG4gICAgICAgICAgICA/IGNyZWF0ZVRleHROb2RlKFN0cmluZyh2YWwpKVxuICAgICAgICAgICAgOiB2YWwpO1xuICAgIH1cbiAgICBjb25zdCBpbnRlcnBvbGF0ZSA9ICh2YWwpID0+IHZhbDtcbiAgICBjb25zdCBwcm9jZXNzb3IgPSB7XG4gICAgICAgIG5vcm1hbGl6ZSxcbiAgICAgICAgaW50ZXJwb2xhdGUsXG4gICAgICAgIHR5cGU6ICd2bm9kZSdcbiAgICB9O1xuICAgIC8vIHRyYW5zbGF0ZVZOb2RlLCB1c2luZyBmb3IgYGkxOG4tdGAgY29tcG9uZW50XG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlVk5vZGUoLi4uYXJncykge1xuICAgICAgICByZXR1cm4gd3JhcFdpdGhEZXBzKGNvbnRleHQgPT4ge1xuICAgICAgICAgICAgbGV0IHJldDtcbiAgICAgICAgICAgIGNvbnN0IF9jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgX2NvbnRleHQucHJvY2Vzc29yID0gcHJvY2Vzc29yO1xuICAgICAgICAgICAgICAgIHJldCA9IFJlZmxlY3QuYXBwbHkodHJhbnNsYXRlLCBudWxsLCBbX2NvbnRleHQsIC4uLmFyZ3NdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIF9jb250ZXh0LnByb2Nlc3NvciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9LCAoKSA9PiBwYXJzZVRyYW5zbGF0ZUFyZ3MoLi4uYXJncyksICd0cmFuc2xhdGUnLCBcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgcm9vdCA9PiByb290W1RyYW5zbGF0ZVZOb2RlU3ltYm9sXSguLi5hcmdzKSwga2V5ID0+IFtjcmVhdGVUZXh0Tm9kZShrZXkpXSwgdmFsID0+IGlzQXJyYXkodmFsKSk7XG4gICAgfVxuICAgIC8vIG51bWJlclBhcnRzLCB1c2luZyBmb3IgYGkxOG4tbmAgY29tcG9uZW50XG4gICAgZnVuY3Rpb24gbnVtYmVyUGFydHMoLi4uYXJncykge1xuICAgICAgICByZXR1cm4gd3JhcFdpdGhEZXBzKGNvbnRleHQgPT4gUmVmbGVjdC5hcHBseShudW1iZXIsIG51bGwsIFtjb250ZXh0LCAuLi5hcmdzXSksICgpID0+IHBhcnNlTnVtYmVyQXJncyguLi5hcmdzKSwgJ251bWJlciBmb3JtYXQnLCBcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgcm9vdCA9PiByb290W051bWJlclBhcnRzU3ltYm9sXSguLi5hcmdzKSwgKCkgPT4gW10sIHZhbCA9PiBpc1N0cmluZyh2YWwpIHx8IGlzQXJyYXkodmFsKSk7XG4gICAgfVxuICAgIC8vIGRhdGV0aW1lUGFydHMsIHVzaW5nIGZvciBgaTE4bi1kYCBjb21wb25lbnRcbiAgICBmdW5jdGlvbiBkYXRldGltZVBhcnRzKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcyhjb250ZXh0ID0+IFJlZmxlY3QuYXBwbHkoZGF0ZXRpbWUsIG51bGwsIFtjb250ZXh0LCAuLi5hcmdzXSksICgpID0+IHBhcnNlRGF0ZVRpbWVBcmdzKC4uLmFyZ3MpLCAnZGF0ZXRpbWUgZm9ybWF0JywgXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHJvb3QgPT4gcm9vdFtEYXRldGltZVBhcnRzU3ltYm9sXSguLi5hcmdzKSwgKCkgPT4gW10sIHZhbCA9PiBpc1N0cmluZyh2YWwpIHx8IGlzQXJyYXkodmFsKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFBsdXJhbFJ1bGVzKHJ1bGVzKSB7XG4gICAgICAgIF9wbHVyYWxSdWxlcyA9IHJ1bGVzO1xuICAgICAgICBfY29udGV4dC5wbHVyYWxSdWxlcyA9IF9wbHVyYWxSdWxlcztcbiAgICB9XG4gICAgLy8gdGVcbiAgICBmdW5jdGlvbiB0ZShrZXksIGxvY2FsZSkge1xuICAgICAgICBjb25zdCB0YXJnZXRMb2NhbGUgPSBpc1N0cmluZyhsb2NhbGUpID8gbG9jYWxlIDogX2xvY2FsZS52YWx1ZTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGdldExvY2FsZU1lc3NhZ2UodGFyZ2V0TG9jYWxlKTtcbiAgICAgICAgcmV0dXJuIF9jb250ZXh0Lm1lc3NhZ2VSZXNvbHZlcihtZXNzYWdlLCBrZXkpICE9PSBudWxsO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXNvbHZlTWVzc2FnZXMoa2V5KSB7XG4gICAgICAgIGxldCBtZXNzYWdlcyA9IG51bGw7XG4gICAgICAgIGNvbnN0IGxvY2FsZXMgPSBmYWxsYmFja1dpdGhMb2NhbGVDaGFpbihfY29udGV4dCwgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlLCBfbG9jYWxlLnZhbHVlKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRMb2NhbGVNZXNzYWdlcyA9IF9tZXNzYWdlcy52YWx1ZVtsb2NhbGVzW2ldXSB8fCB7fTtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VWYWx1ZSA9IF9jb250ZXh0Lm1lc3NhZ2VSZXNvbHZlcih0YXJnZXRMb2NhbGVNZXNzYWdlcywga2V5KTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlVmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VzID0gbWVzc2FnZVZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXNzYWdlcztcbiAgICB9XG4gICAgLy8gdG1cbiAgICBmdW5jdGlvbiB0bShrZXkpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZXMgPSByZXNvbHZlTWVzc2FnZXMoa2V5KTtcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIHJldHVybiBtZXNzYWdlcyAhPSBudWxsXG4gICAgICAgICAgICA/IG1lc3NhZ2VzXG4gICAgICAgICAgICA6IF9fcm9vdFxuICAgICAgICAgICAgICAgID8gX19yb290LnRtKGtleSkgfHwge31cbiAgICAgICAgICAgICAgICA6IHt9O1xuICAgIH1cbiAgICAvLyBnZXRMb2NhbGVNZXNzYWdlXG4gICAgZnVuY3Rpb24gZ2V0TG9jYWxlTWVzc2FnZShsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIChfbWVzc2FnZXMudmFsdWVbbG9jYWxlXSB8fCB7fSk7XG4gICAgfVxuICAgIC8vIHNldExvY2FsZU1lc3NhZ2VcbiAgICBmdW5jdGlvbiBzZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSkge1xuICAgICAgICBfbWVzc2FnZXMudmFsdWVbbG9jYWxlXSA9IG1lc3NhZ2U7XG4gICAgICAgIF9jb250ZXh0Lm1lc3NhZ2VzID0gX21lc3NhZ2VzLnZhbHVlO1xuICAgIH1cbiAgICAvLyBtZXJnZUxvY2FsZU1lc3NhZ2VcbiAgICBmdW5jdGlvbiBtZXJnZUxvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKSB7XG4gICAgICAgIF9tZXNzYWdlcy52YWx1ZVtsb2NhbGVdID0gX21lc3NhZ2VzLnZhbHVlW2xvY2FsZV0gfHwge307XG4gICAgICAgIGRlZXBDb3B5KG1lc3NhZ2UsIF9tZXNzYWdlcy52YWx1ZVtsb2NhbGVdKTtcbiAgICAgICAgX2NvbnRleHQubWVzc2FnZXMgPSBfbWVzc2FnZXMudmFsdWU7XG4gICAgfVxuICAgIC8vIGdldERhdGVUaW1lRm9ybWF0XG4gICAgZnVuY3Rpb24gZ2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlW2xvY2FsZV0gfHwge307XG4gICAgfVxuICAgIC8vIHNldERhdGVUaW1lRm9ybWF0XG4gICAgZnVuY3Rpb24gc2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcbiAgICAgICAgX2RhdGV0aW1lRm9ybWF0cy52YWx1ZVtsb2NhbGVdID0gZm9ybWF0O1xuICAgICAgICBfY29udGV4dC5kYXRldGltZUZvcm1hdHMgPSBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlO1xuICAgICAgICBjbGVhckRhdGVUaW1lRm9ybWF0KF9jb250ZXh0LCBsb2NhbGUsIGZvcm1hdCk7XG4gICAgfVxuICAgIC8vIG1lcmdlRGF0ZVRpbWVGb3JtYXRcbiAgICBmdW5jdGlvbiBtZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XG4gICAgICAgIF9kYXRldGltZUZvcm1hdHMudmFsdWVbbG9jYWxlXSA9IGFzc2lnbihfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlW2xvY2FsZV0gfHwge30sIGZvcm1hdCk7XG4gICAgICAgIF9jb250ZXh0LmRhdGV0aW1lRm9ybWF0cyA9IF9kYXRldGltZUZvcm1hdHMudmFsdWU7XG4gICAgICAgIGNsZWFyRGF0ZVRpbWVGb3JtYXQoX2NvbnRleHQsIGxvY2FsZSwgZm9ybWF0KTtcbiAgICB9XG4gICAgLy8gZ2V0TnVtYmVyRm9ybWF0XG4gICAgZnVuY3Rpb24gZ2V0TnVtYmVyRm9ybWF0KGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gX251bWJlckZvcm1hdHMudmFsdWVbbG9jYWxlXSB8fCB7fTtcbiAgICB9XG4gICAgLy8gc2V0TnVtYmVyRm9ybWF0XG4gICAgZnVuY3Rpb24gc2V0TnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XG4gICAgICAgIF9udW1iZXJGb3JtYXRzLnZhbHVlW2xvY2FsZV0gPSBmb3JtYXQ7XG4gICAgICAgIF9jb250ZXh0Lm51bWJlckZvcm1hdHMgPSBfbnVtYmVyRm9ybWF0cy52YWx1ZTtcbiAgICAgICAgY2xlYXJOdW1iZXJGb3JtYXQoX2NvbnRleHQsIGxvY2FsZSwgZm9ybWF0KTtcbiAgICB9XG4gICAgLy8gbWVyZ2VOdW1iZXJGb3JtYXRcbiAgICBmdW5jdGlvbiBtZXJnZU51bWJlckZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xuICAgICAgICBfbnVtYmVyRm9ybWF0cy52YWx1ZVtsb2NhbGVdID0gYXNzaWduKF9udW1iZXJGb3JtYXRzLnZhbHVlW2xvY2FsZV0gfHwge30sIGZvcm1hdCk7XG4gICAgICAgIF9jb250ZXh0Lm51bWJlckZvcm1hdHMgPSBfbnVtYmVyRm9ybWF0cy52YWx1ZTtcbiAgICAgICAgY2xlYXJOdW1iZXJGb3JtYXQoX2NvbnRleHQsIGxvY2FsZSwgZm9ybWF0KTtcbiAgICB9XG4gICAgLy8gZm9yIGRlYnVnXG4gICAgY29tcG9zZXJJRCsrO1xuICAgIC8vIHdhdGNoIHJvb3QgbG9jYWxlICYgZmFsbGJhY2tMb2NhbGVcbiAgICBpZiAoX19yb290ICYmIGluQnJvd3Nlcikge1xuICAgICAgICB3YXRjaChfX3Jvb3QubG9jYWxlLCAodmFsKSA9PiB7XG4gICAgICAgICAgICBpZiAoX2luaGVyaXRMb2NhbGUpIHtcbiAgICAgICAgICAgICAgICBfbG9jYWxlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgICAgIF9jb250ZXh0LmxvY2FsZSA9IHZhbDtcbiAgICAgICAgICAgICAgICB1cGRhdGVGYWxsYmFja0xvY2FsZShfY29udGV4dCwgX2xvY2FsZS52YWx1ZSwgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHdhdGNoKF9fcm9vdC5mYWxsYmFja0xvY2FsZSwgKHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKF9pbmhlcml0TG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgICAgIF9jb250ZXh0LmZhbGxiYWNrTG9jYWxlID0gdmFsO1xuICAgICAgICAgICAgICAgIHVwZGF0ZUZhbGxiYWNrTG9jYWxlKF9jb250ZXh0LCBfbG9jYWxlLnZhbHVlLCBfZmFsbGJhY2tMb2NhbGUudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gZGVmaW5lIGJhc2ljIGNvbXBvc2l0aW9uIEFQSSFcbiAgICBjb25zdCBjb21wb3NlciA9IHtcbiAgICAgICAgaWQ6IGNvbXBvc2VySUQsXG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgZmFsbGJhY2tMb2NhbGUsXG4gICAgICAgIGdldCBpbmhlcml0TG9jYWxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9pbmhlcml0TG9jYWxlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgaW5oZXJpdExvY2FsZSh2YWwpIHtcbiAgICAgICAgICAgIF9pbmhlcml0TG9jYWxlID0gdmFsO1xuICAgICAgICAgICAgaWYgKHZhbCAmJiBfX3Jvb3QpIHtcbiAgICAgICAgICAgICAgICBfbG9jYWxlLnZhbHVlID0gX19yb290LmxvY2FsZS52YWx1ZTtcbiAgICAgICAgICAgICAgICBfZmFsbGJhY2tMb2NhbGUudmFsdWUgPSBfX3Jvb3QuZmFsbGJhY2tMb2NhbGUudmFsdWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlRmFsbGJhY2tMb2NhbGUoX2NvbnRleHQsIF9sb2NhbGUudmFsdWUsIF9mYWxsYmFja0xvY2FsZS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBhdmFpbGFibGVMb2NhbGVzKCkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKF9tZXNzYWdlcy52YWx1ZSkuc29ydCgpO1xuICAgICAgICB9LFxuICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgZ2V0IG1vZGlmaWVycygpIHtcbiAgICAgICAgICAgIHJldHVybiBfbW9kaWZpZXJzO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgcGx1cmFsUnVsZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3BsdXJhbFJ1bGVzIHx8IHt9O1xuICAgICAgICB9LFxuICAgICAgICBnZXQgaXNHbG9iYWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2lzR2xvYmFsO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgbWlzc2luZ1dhcm4oKSB7XG4gICAgICAgICAgICByZXR1cm4gX21pc3NpbmdXYXJuO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgbWlzc2luZ1dhcm4odmFsKSB7XG4gICAgICAgICAgICBfbWlzc2luZ1dhcm4gPSB2YWw7XG4gICAgICAgICAgICBfY29udGV4dC5taXNzaW5nV2FybiA9IF9taXNzaW5nV2FybjtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGZhbGxiYWNrV2FybigpIHtcbiAgICAgICAgICAgIHJldHVybiBfZmFsbGJhY2tXYXJuO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgZmFsbGJhY2tXYXJuKHZhbCkge1xuICAgICAgICAgICAgX2ZhbGxiYWNrV2FybiA9IHZhbDtcbiAgICAgICAgICAgIF9jb250ZXh0LmZhbGxiYWNrV2FybiA9IF9mYWxsYmFja1dhcm47XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBmYWxsYmFja1Jvb3QoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2ZhbGxiYWNrUm9vdDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IGZhbGxiYWNrUm9vdCh2YWwpIHtcbiAgICAgICAgICAgIF9mYWxsYmFja1Jvb3QgPSB2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBmYWxsYmFja0Zvcm1hdCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfZmFsbGJhY2tGb3JtYXQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCBmYWxsYmFja0Zvcm1hdCh2YWwpIHtcbiAgICAgICAgICAgIF9mYWxsYmFja0Zvcm1hdCA9IHZhbDtcbiAgICAgICAgICAgIF9jb250ZXh0LmZhbGxiYWNrRm9ybWF0ID0gX2ZhbGxiYWNrRm9ybWF0O1xuICAgICAgICB9LFxuICAgICAgICBnZXQgd2Fybkh0bWxNZXNzYWdlKCkge1xuICAgICAgICAgICAgcmV0dXJuIF93YXJuSHRtbE1lc3NhZ2U7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCB3YXJuSHRtbE1lc3NhZ2UodmFsKSB7XG4gICAgICAgICAgICBfd2Fybkh0bWxNZXNzYWdlID0gdmFsO1xuICAgICAgICAgICAgX2NvbnRleHQud2Fybkh0bWxNZXNzYWdlID0gdmFsO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgZXNjYXBlUGFyYW1ldGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9lc2NhcGVQYXJhbWV0ZXI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCBlc2NhcGVQYXJhbWV0ZXIodmFsKSB7XG4gICAgICAgICAgICBfZXNjYXBlUGFyYW1ldGVyID0gdmFsO1xuICAgICAgICAgICAgX2NvbnRleHQuZXNjYXBlUGFyYW1ldGVyID0gdmFsO1xuICAgICAgICB9LFxuICAgICAgICB0LFxuICAgICAgICBnZXRMb2NhbGVNZXNzYWdlLFxuICAgICAgICBzZXRMb2NhbGVNZXNzYWdlLFxuICAgICAgICBtZXJnZUxvY2FsZU1lc3NhZ2UsXG4gICAgICAgIGdldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIsXG4gICAgICAgIHNldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIsXG4gICAgICAgIGdldE1pc3NpbmdIYW5kbGVyLFxuICAgICAgICBzZXRNaXNzaW5nSGFuZGxlcixcbiAgICAgICAgW1NldFBsdXJhbFJ1bGVzU3ltYm9sXTogc2V0UGx1cmFsUnVsZXNcbiAgICB9O1xuICAgIHtcbiAgICAgICAgY29tcG9zZXIuZGF0ZXRpbWVGb3JtYXRzID0gZGF0ZXRpbWVGb3JtYXRzO1xuICAgICAgICBjb21wb3Nlci5udW1iZXJGb3JtYXRzID0gbnVtYmVyRm9ybWF0cztcbiAgICAgICAgY29tcG9zZXIucnQgPSBydDtcbiAgICAgICAgY29tcG9zZXIudGUgPSB0ZTtcbiAgICAgICAgY29tcG9zZXIudG0gPSB0bTtcbiAgICAgICAgY29tcG9zZXIuZCA9IGQ7XG4gICAgICAgIGNvbXBvc2VyLm4gPSBuO1xuICAgICAgICBjb21wb3Nlci5nZXREYXRlVGltZUZvcm1hdCA9IGdldERhdGVUaW1lRm9ybWF0O1xuICAgICAgICBjb21wb3Nlci5zZXREYXRlVGltZUZvcm1hdCA9IHNldERhdGVUaW1lRm9ybWF0O1xuICAgICAgICBjb21wb3Nlci5tZXJnZURhdGVUaW1lRm9ybWF0ID0gbWVyZ2VEYXRlVGltZUZvcm1hdDtcbiAgICAgICAgY29tcG9zZXIuZ2V0TnVtYmVyRm9ybWF0ID0gZ2V0TnVtYmVyRm9ybWF0O1xuICAgICAgICBjb21wb3Nlci5zZXROdW1iZXJGb3JtYXQgPSBzZXROdW1iZXJGb3JtYXQ7XG4gICAgICAgIGNvbXBvc2VyLm1lcmdlTnVtYmVyRm9ybWF0ID0gbWVyZ2VOdW1iZXJGb3JtYXQ7XG4gICAgICAgIGNvbXBvc2VyW0luZWpjdFdpdGhPcHRpb25TeW1ib2xdID0gX19pbmplY3RXaXRoT3B0aW9uO1xuICAgICAgICBjb21wb3NlcltUcmFuc2xhdGVWTm9kZVN5bWJvbF0gPSB0cmFuc2xhdGVWTm9kZTtcbiAgICAgICAgY29tcG9zZXJbRGF0ZXRpbWVQYXJ0c1N5bWJvbF0gPSBkYXRldGltZVBhcnRzO1xuICAgICAgICBjb21wb3NlcltOdW1iZXJQYXJ0c1N5bWJvbF0gPSBudW1iZXJQYXJ0cztcbiAgICB9XG4gICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcbiAgICAgICAgY29tcG9zZXJbRW5hYmxlRW1pdHRlcl0gPSAoZW1pdHRlcikgPT4ge1xuICAgICAgICAgICAgX2NvbnRleHQuX192X2VtaXR0ZXIgPSBlbWl0dGVyO1xuICAgICAgICB9O1xuICAgICAgICBjb21wb3NlcltEaXNhYmxlRW1pdHRlcl0gPSAoKSA9PiB7XG4gICAgICAgICAgICBfY29udGV4dC5fX3ZfZW1pdHRlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvc2VyO1xufVxuLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbi8qKlxuICogQ29udmVydCB0byBJMThuIENvbXBvc2VyIE9wdGlvbnMgZnJvbSBWdWVJMThuIE9wdGlvbnNcbiAqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZnVuY3Rpb24gY29udmVydENvbXBvc2VyT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgY29uc3QgbG9jYWxlID0gaXNTdHJpbmcob3B0aW9ucy5sb2NhbGUpID8gb3B0aW9ucy5sb2NhbGUgOiBERUZBVUxUX0xPQ0FMRTtcbiAgICBjb25zdCBmYWxsYmFja0xvY2FsZSA9IGlzU3RyaW5nKG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XG4gICAgICAgIGlzQXJyYXkob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcbiAgICAgICAgaXNQbGFpbk9iamVjdChvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxuICAgICAgICBvcHRpb25zLmZhbGxiYWNrTG9jYWxlID09PSBmYWxzZVxuICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tMb2NhbGVcbiAgICAgICAgOiBsb2NhbGU7XG4gICAgY29uc3QgbWlzc2luZyA9IGlzRnVuY3Rpb24ob3B0aW9ucy5taXNzaW5nKSA/IG9wdGlvbnMubWlzc2luZyA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBtaXNzaW5nV2FybiA9IGlzQm9vbGVhbihvcHRpb25zLnNpbGVudFRyYW5zbGF0aW9uV2FybikgfHxcbiAgICAgICAgaXNSZWdFeHAob3B0aW9ucy5zaWxlbnRUcmFuc2xhdGlvbldhcm4pXG4gICAgICAgID8gIW9wdGlvbnMuc2lsZW50VHJhbnNsYXRpb25XYXJuXG4gICAgICAgIDogdHJ1ZTtcbiAgICBjb25zdCBmYWxsYmFja1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5zaWxlbnRGYWxsYmFja1dhcm4pIHx8XG4gICAgICAgIGlzUmVnRXhwKG9wdGlvbnMuc2lsZW50RmFsbGJhY2tXYXJuKVxuICAgICAgICA/ICFvcHRpb25zLnNpbGVudEZhbGxiYWNrV2FyblxuICAgICAgICA6IHRydWU7XG4gICAgY29uc3QgZmFsbGJhY2tSb290ID0gaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tSb290KVxuICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tSb290XG4gICAgICAgIDogdHJ1ZTtcbiAgICBjb25zdCBmYWxsYmFja0Zvcm1hdCA9ICEhb3B0aW9ucy5mb3JtYXRGYWxsYmFja01lc3NhZ2VzO1xuICAgIGNvbnN0IG1vZGlmaWVycyA9IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5tb2RpZmllcnMpID8gb3B0aW9ucy5tb2RpZmllcnMgOiB7fTtcbiAgICBjb25zdCBwbHVyYWxpemF0aW9uUnVsZXMgPSBvcHRpb25zLnBsdXJhbGl6YXRpb25SdWxlcztcbiAgICBjb25zdCBwb3N0VHJhbnNsYXRpb24gPSBpc0Z1bmN0aW9uKG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uKVxuICAgICAgICA/IG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHdhcm5IdG1sTWVzc2FnZSA9IGlzU3RyaW5nKG9wdGlvbnMud2Fybkh0bWxJbk1lc3NhZ2UpXG4gICAgICAgID8gb3B0aW9ucy53YXJuSHRtbEluTWVzc2FnZSAhPT0gJ29mZidcbiAgICAgICAgOiB0cnVlO1xuICAgIGNvbnN0IGVzY2FwZVBhcmFtZXRlciA9ICEhb3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXJIdG1sO1xuICAgIGNvbnN0IGluaGVyaXRMb2NhbGUgPSBpc0Jvb2xlYW4ob3B0aW9ucy5zeW5jKSA/IG9wdGlvbnMuc3luYyA6IHRydWU7XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBvcHRpb25zLmZvcm1hdHRlcikge1xuICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9GT1JNQVRURVIpKTtcbiAgICB9XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBvcHRpb25zLnByZXNlcnZlRGlyZWN0aXZlQ29udGVudCkge1xuICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9QUkVTRVJWRV9ESVJFQ1RJVkUpKTtcbiAgICB9XG4gICAgbGV0IG1lc3NhZ2VzID0gb3B0aW9ucy5tZXNzYWdlcztcbiAgICBpZiAoaXNQbGFpbk9iamVjdChvcHRpb25zLnNoYXJlZE1lc3NhZ2VzKSkge1xuICAgICAgICBjb25zdCBzaGFyZWRNZXNzYWdlcyA9IG9wdGlvbnMuc2hhcmVkTWVzc2FnZXM7XG4gICAgICAgIGNvbnN0IGxvY2FsZXMgPSBPYmplY3Qua2V5cyhzaGFyZWRNZXNzYWdlcyk7XG4gICAgICAgIG1lc3NhZ2VzID0gbG9jYWxlcy5yZWR1Y2UoKG1lc3NhZ2VzLCBsb2NhbGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlc1tsb2NhbGVdIHx8IChtZXNzYWdlc1tsb2NhbGVdID0ge30pO1xuICAgICAgICAgICAgYXNzaWduKG1lc3NhZ2UsIHNoYXJlZE1lc3NhZ2VzW2xvY2FsZV0pO1xuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2VzO1xuICAgICAgICB9LCAobWVzc2FnZXMgfHwge30pKTtcbiAgICB9XG4gICAgY29uc3QgeyBfX2kxOG4sIF9fcm9vdCwgX19pbmplY3RXaXRoT3B0aW9uIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGRhdGV0aW1lRm9ybWF0cyA9IG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzO1xuICAgIGNvbnN0IG51bWJlckZvcm1hdHMgPSBvcHRpb25zLm51bWJlckZvcm1hdHM7XG4gICAgY29uc3QgZmxhdEpzb24gPSBvcHRpb25zLmZsYXRKc29uO1xuICAgIHJldHVybiB7XG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgZmFsbGJhY2tMb2NhbGUsXG4gICAgICAgIG1lc3NhZ2VzLFxuICAgICAgICBmbGF0SnNvbixcbiAgICAgICAgZGF0ZXRpbWVGb3JtYXRzLFxuICAgICAgICBudW1iZXJGb3JtYXRzLFxuICAgICAgICBtaXNzaW5nLFxuICAgICAgICBtaXNzaW5nV2FybixcbiAgICAgICAgZmFsbGJhY2tXYXJuLFxuICAgICAgICBmYWxsYmFja1Jvb3QsXG4gICAgICAgIGZhbGxiYWNrRm9ybWF0LFxuICAgICAgICBtb2RpZmllcnMsXG4gICAgICAgIHBsdXJhbFJ1bGVzOiBwbHVyYWxpemF0aW9uUnVsZXMsXG4gICAgICAgIHBvc3RUcmFuc2xhdGlvbixcbiAgICAgICAgd2Fybkh0bWxNZXNzYWdlLFxuICAgICAgICBlc2NhcGVQYXJhbWV0ZXIsXG4gICAgICAgIG1lc3NhZ2VSZXNvbHZlcjogb3B0aW9ucy5tZXNzYWdlUmVzb2x2ZXIsXG4gICAgICAgIGluaGVyaXRMb2NhbGUsXG4gICAgICAgIF9faTE4bixcbiAgICAgICAgX19yb290LFxuICAgICAgICBfX2luamVjdFdpdGhPcHRpb25cbiAgICB9O1xufVxuLyoqXG4gKiBjcmVhdGUgVnVlSTE4biBpbnRlcmZhY2UgZmFjdG9yeVxuICpcbiAqIEBpbnRlcm5hbFxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuZnVuY3Rpb24gY3JlYXRlVnVlSTE4bihvcHRpb25zID0ge30sIFZ1ZUkxOG5MZWdhY3kpIHtcbiAgICB7XG4gICAgICAgIGNvbnN0IGNvbXBvc2VyID0gY3JlYXRlQ29tcG9zZXIoY29udmVydENvbXBvc2VyT3B0aW9ucyhvcHRpb25zKSk7XG4gICAgICAgIGNvbnN0IHsgX19leHRlbmRlciB9ID0gb3B0aW9ucztcbiAgICAgICAgLy8gZGVmaW5lcyBWdWVJMThuXG4gICAgICAgIGNvbnN0IHZ1ZUkxOG4gPSB7XG4gICAgICAgICAgICAvLyBpZFxuICAgICAgICAgICAgaWQ6IGNvbXBvc2VyLmlkLFxuICAgICAgICAgICAgLy8gbG9jYWxlXG4gICAgICAgICAgICBnZXQgbG9jYWxlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5sb2NhbGUudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IGxvY2FsZSh2YWwpIHtcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5sb2NhbGUudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZmFsbGJhY2tMb2NhbGVcbiAgICAgICAgICAgIGdldCBmYWxsYmFja0xvY2FsZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuZmFsbGJhY2tMb2NhbGUudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IGZhbGxiYWNrTG9jYWxlKHZhbCkge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLmZhbGxiYWNrTG9jYWxlLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG1lc3NhZ2VzXG4gICAgICAgICAgICBnZXQgbWVzc2FnZXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLm1lc3NhZ2VzLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGRhdGV0aW1lRm9ybWF0c1xuICAgICAgICAgICAgZ2V0IGRhdGV0aW1lRm9ybWF0cygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuZGF0ZXRpbWVGb3JtYXRzLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG51bWJlckZvcm1hdHNcbiAgICAgICAgICAgIGdldCBudW1iZXJGb3JtYXRzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5udW1iZXJGb3JtYXRzLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGF2YWlsYWJsZUxvY2FsZXNcbiAgICAgICAgICAgIGdldCBhdmFpbGFibGVMb2NhbGVzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5hdmFpbGFibGVMb2NhbGVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGZvcm1hdHRlclxuICAgICAgICAgICAgZ2V0IGZvcm1hdHRlcigpIHtcbiAgICAgICAgICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfRk9STUFUVEVSKSk7XG4gICAgICAgICAgICAgICAgLy8gZHVtbXlcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBpbnRlcnBvbGF0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IGZvcm1hdHRlcih2YWwpIHtcbiAgICAgICAgICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfRk9STUFUVEVSKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gbWlzc2luZ1xuICAgICAgICAgICAgZ2V0IG1pc3NpbmcoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmdldE1pc3NpbmdIYW5kbGVyKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IG1pc3NpbmcoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLnNldE1pc3NpbmdIYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNpbGVudFRyYW5zbGF0aW9uV2FyblxuICAgICAgICAgICAgZ2V0IHNpbGVudFRyYW5zbGF0aW9uV2FybigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNCb29sZWFuKGNvbXBvc2VyLm1pc3NpbmdXYXJuKVxuICAgICAgICAgICAgICAgICAgICA/ICFjb21wb3Nlci5taXNzaW5nV2FyblxuICAgICAgICAgICAgICAgICAgICA6IGNvbXBvc2VyLm1pc3NpbmdXYXJuO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBzaWxlbnRUcmFuc2xhdGlvbldhcm4odmFsKSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIubWlzc2luZ1dhcm4gPSBpc0Jvb2xlYW4odmFsKSA/ICF2YWwgOiB2YWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc2lsZW50RmFsbGJhY2tXYXJuXG4gICAgICAgICAgICBnZXQgc2lsZW50RmFsbGJhY2tXYXJuKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0Jvb2xlYW4oY29tcG9zZXIuZmFsbGJhY2tXYXJuKVxuICAgICAgICAgICAgICAgICAgICA/ICFjb21wb3Nlci5mYWxsYmFja1dhcm5cbiAgICAgICAgICAgICAgICAgICAgOiBjb21wb3Nlci5mYWxsYmFja1dhcm47XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IHNpbGVudEZhbGxiYWNrV2Fybih2YWwpIHtcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5mYWxsYmFja1dhcm4gPSBpc0Jvb2xlYW4odmFsKSA/ICF2YWwgOiB2YWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gbW9kaWZpZXJzXG4gICAgICAgICAgICBnZXQgbW9kaWZpZXJzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5tb2RpZmllcnM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZm9ybWF0RmFsbGJhY2tNZXNzYWdlc1xuICAgICAgICAgICAgZ2V0IGZvcm1hdEZhbGxiYWNrTWVzc2FnZXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmZhbGxiYWNrRm9ybWF0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBmb3JtYXRGYWxsYmFja01lc3NhZ2VzKHZhbCkge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLmZhbGxiYWNrRm9ybWF0ID0gdmFsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHBvc3RUcmFuc2xhdGlvblxuICAgICAgICAgICAgZ2V0IHBvc3RUcmFuc2xhdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuZ2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBwb3N0VHJhbnNsYXRpb24oaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLnNldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIoaGFuZGxlcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc3luY1xuICAgICAgICAgICAgZ2V0IHN5bmMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmluaGVyaXRMb2NhbGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IHN5bmModmFsKSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIuaW5oZXJpdExvY2FsZSA9IHZhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyB3YXJuSW5IdG1sTWVzc2FnZVxuICAgICAgICAgICAgZ2V0IHdhcm5IdG1sSW5NZXNzYWdlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci53YXJuSHRtbE1lc3NhZ2UgPyAnd2FybicgOiAnb2ZmJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgd2Fybkh0bWxJbk1lc3NhZ2UodmFsKSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIud2Fybkh0bWxNZXNzYWdlID0gdmFsICE9PSAnb2ZmJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBlc2NhcGVQYXJhbWV0ZXJIdG1sXG4gICAgICAgICAgICBnZXQgZXNjYXBlUGFyYW1ldGVySHRtbCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuZXNjYXBlUGFyYW1ldGVyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBlc2NhcGVQYXJhbWV0ZXJIdG1sKHZhbCkge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLmVzY2FwZVBhcmFtZXRlciA9IHZhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBwcmVzZXJ2ZURpcmVjdGl2ZUNvbnRlbnRcbiAgICAgICAgICAgIGdldCBwcmVzZXJ2ZURpcmVjdGl2ZUNvbnRlbnQoKSB7XG4gICAgICAgICAgICAgICAgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmXG4gICAgICAgICAgICAgICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX1BSRVNFUlZFX0RJUkVDVElWRSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBwcmVzZXJ2ZURpcmVjdGl2ZUNvbnRlbnQodmFsKSB7XG4gICAgICAgICAgICAgICAgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmXG4gICAgICAgICAgICAgICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX1BSRVNFUlZFX0RJUkVDVElWRSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHBsdXJhbGl6YXRpb25SdWxlc1xuICAgICAgICAgICAgZ2V0IHBsdXJhbGl6YXRpb25SdWxlcygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIucGx1cmFsUnVsZXMgfHwge307XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZm9yIGludGVybmFsXG4gICAgICAgICAgICBfX2NvbXBvc2VyOiBjb21wb3NlcixcbiAgICAgICAgICAgIC8vIHRcbiAgICAgICAgICAgIHQoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIGNvbnN0IFthcmcxLCBhcmcyLCBhcmczXSA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICghaXNTdHJpbmcoYXJnMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLklOVkFMSURfQVJHVU1FTlQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBhcmcxO1xuICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZyhhcmcyKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGFyZzI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzQXJyYXkoYXJnMikpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IGFyZzI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMikpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZWQgPSBhcmcyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNBcnJheShhcmczKSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gYXJnMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmczKSkge1xuICAgICAgICAgICAgICAgICAgICBuYW1lZCA9IGFyZzM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBjb21wb3Nlci50KGtleSwgKGxpc3QgfHwgbmFtZWQgfHwge30pIGFzIGFueSwgb3B0aW9ucylcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5hcHBseShjb21wb3Nlci50LCBjb21wb3NlciwgW1xuICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgIChsaXN0IHx8IG5hbWVkIHx8IHt9KSxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ0KC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5hcHBseShjb21wb3Nlci5ydCwgY29tcG9zZXIsIFsuLi5hcmdzXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gdGNcbiAgICAgICAgICAgIHRjKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBbYXJnMSwgYXJnMiwgYXJnM10gPSBhcmdzO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IHBsdXJhbDogMSB9O1xuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICghaXNTdHJpbmcoYXJnMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLklOVkFMSURfQVJHVU1FTlQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBhcmcxO1xuICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZyhhcmcyKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGFyZzI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzTnVtYmVyKGFyZzIpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucGx1cmFsID0gYXJnMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNBcnJheShhcmcyKSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gYXJnMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmcyKSkge1xuICAgICAgICAgICAgICAgICAgICBuYW1lZCA9IGFyZzI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZyhhcmczKSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGFyZzM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzQXJyYXkoYXJnMykpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IGFyZzM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMykpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZWQgPSBhcmczO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gY29tcG9zZXIudChrZXksIChsaXN0IHx8IG5hbWVkIHx8IHt9KSBhcyBhbnksIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuYXBwbHkoY29tcG9zZXIudCwgY29tcG9zZXIsIFtcbiAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICAobGlzdCB8fCBuYW1lZCB8fCB7fSksXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyB0ZVxuICAgICAgICAgICAgdGUoa2V5LCBsb2NhbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIudGUoa2V5LCBsb2NhbGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHRtXG4gICAgICAgICAgICB0bShrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIudG0oa2V5KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBnZXRMb2NhbGVNZXNzYWdlXG4gICAgICAgICAgICBnZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5nZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gc2V0TG9jYWxlTWVzc2FnZVxuICAgICAgICAgICAgc2V0TG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5zZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gbWVyZ2VMb2NhbGVNZXNzYWdlXG4gICAgICAgICAgICBtZXJnZUxvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIubWVyZ2VMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZFxuICAgICAgICAgICAgZCguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuYXBwbHkoY29tcG9zZXIuZCwgY29tcG9zZXIsIFsuLi5hcmdzXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZ2V0RGF0ZVRpbWVGb3JtYXRcbiAgICAgICAgICAgIGdldERhdGVUaW1lRm9ybWF0KGxvY2FsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5nZXREYXRlVGltZUZvcm1hdChsb2NhbGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNldERhdGVUaW1lRm9ybWF0XG4gICAgICAgICAgICBzZXREYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VyLnNldERhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBtZXJnZURhdGVUaW1lRm9ybWF0XG4gICAgICAgICAgICBtZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIubWVyZ2VEYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gblxuICAgICAgICAgICAgbiguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuYXBwbHkoY29tcG9zZXIubiwgY29tcG9zZXIsIFsuLi5hcmdzXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZ2V0TnVtYmVyRm9ybWF0XG4gICAgICAgICAgICBnZXROdW1iZXJGb3JtYXQobG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmdldE51bWJlckZvcm1hdChsb2NhbGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNldE51bWJlckZvcm1hdFxuICAgICAgICAgICAgc2V0TnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZXIuc2V0TnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBtZXJnZU51bWJlckZvcm1hdFxuICAgICAgICAgICAgbWVyZ2VOdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5tZXJnZU51bWJlckZvcm1hdChsb2NhbGUsIGZvcm1hdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZ2V0Q2hvaWNlSW5kZXhcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgICAgIGdldENob2ljZUluZGV4KGNob2ljZSwgY2hvaWNlc0xlbmd0aCkge1xuICAgICAgICAgICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJlxuICAgICAgICAgICAgICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9HRVRfQ0hPSUNFX0lOREVYKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2dWVJMThuLl9fZXh0ZW5kZXIgPSBfX2V4dGVuZGVyO1xuICAgICAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcbiAgICAgICAgICAgIHZ1ZUkxOG4uX19lbmFibGVFbWl0dGVyID0gKGVtaXR0ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBfX2NvbXBvc2VyID0gY29tcG9zZXI7XG4gICAgICAgICAgICAgICAgX19jb21wb3NlcltFbmFibGVFbWl0dGVyXSAmJiBfX2NvbXBvc2VyW0VuYWJsZUVtaXR0ZXJdKGVtaXR0ZXIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZ1ZUkxOG4uX19kaXNhYmxlRW1pdHRlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBfX2NvbXBvc2VyID0gY29tcG9zZXI7XG4gICAgICAgICAgICAgICAgX19jb21wb3NlcltEaXNhYmxlRW1pdHRlcl0gJiYgX19jb21wb3NlcltEaXNhYmxlRW1pdHRlcl0oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZ1ZUkxOG47XG4gICAgfVxufVxuLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5cbmNvbnN0IGJhc2VGb3JtYXRQcm9wcyA9IHtcbiAgICB0YWc6IHtcbiAgICAgICAgdHlwZTogW1N0cmluZywgT2JqZWN0XVxuICAgIH0sXG4gICAgbG9jYWxlOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgc2NvcGU6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAvLyBOT1RFOiBhdm9pZCBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L3J1c2hzdGFjay9pc3N1ZXMvMTA1MFxuICAgICAgICB2YWxpZGF0b3I6ICh2YWwgLyogQ29tcG9uZW50STE4blNjb3BlICovKSA9PiB2YWwgPT09ICdwYXJlbnQnIHx8IHZhbCA9PT0gJ2dsb2JhbCcsXG4gICAgICAgIGRlZmF1bHQ6ICdwYXJlbnQnIC8qIENvbXBvbmVudEkxOG5TY29wZSAqL1xuICAgIH0sXG4gICAgaTE4bjoge1xuICAgICAgICB0eXBlOiBPYmplY3RcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBnZXRJbnRlcnBvbGF0ZUFyZyhcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG57IHNsb3RzIH0sIC8vIFNldHVwQ29udGV4dCxcbmtleXMpIHtcbiAgICBpZiAoa2V5cy5sZW5ndGggPT09IDEgJiYga2V5c1swXSA9PT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgIC8vIGRlZmF1bHQgc2xvdCB3aXRoIGxpc3RcbiAgICAgICAgY29uc3QgcmV0ID0gc2xvdHMuZGVmYXVsdCA/IHNsb3RzLmRlZmF1bHQoKSA6IFtdO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICByZXR1cm4gcmV0LnJlZHVjZSgoc2xvdCwgY3VycmVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAuLi5zbG90LFxuICAgICAgICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICAgIC4uLihjdXJyZW50LnR5cGUgPT09IEZyYWdtZW50ID8gY3VycmVudC5jaGlsZHJlbiA6IFtjdXJyZW50XVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdO1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBuYW1lZCBzbG90c1xuICAgICAgICByZXR1cm4ga2V5cy5yZWR1Y2UoKGFyZywga2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzbG90ID0gc2xvdHNba2V5XTtcbiAgICAgICAgICAgIGlmIChzbG90KSB7XG4gICAgICAgICAgICAgICAgYXJnW2tleV0gPSBzbG90KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXJnO1xuICAgICAgICB9LCB7fSk7XG4gICAgfVxufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmZ1bmN0aW9uIGdldEZyYWdtZW50YWJsZVRhZyh0YWcpIHtcbiAgICByZXR1cm4gRnJhZ21lbnQgO1xufVxuXG5jb25zdCBUcmFuc2xhdGlvbkltcGwgPSAvKiNfX1BVUkVfXyovIGRlZmluZUNvbXBvbmVudCh7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICBuYW1lOiAnaTE4bi10JyxcbiAgICBwcm9wczogYXNzaWduKHtcbiAgICAgICAga2V5cGF0aDoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgcGx1cmFsOiB7XG4gICAgICAgICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIHZhbGlkYXRvcjogKHZhbCkgPT4gaXNOdW1iZXIodmFsKSB8fCAhaXNOYU4odmFsKVxuICAgICAgICB9XG4gICAgfSwgYmFzZUZvcm1hdFByb3BzKSxcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBzZXR1cChwcm9wcywgY29udGV4dCkge1xuICAgICAgICBjb25zdCB7IHNsb3RzLCBhdHRycyB9ID0gY29udGV4dDtcbiAgICAgICAgLy8gTk9URTogYXZvaWQgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9ydXNoc3RhY2svaXNzdWVzLzEwNTBcbiAgICAgICAgY29uc3QgaTE4biA9IHByb3BzLmkxOG4gfHxcbiAgICAgICAgICAgIHVzZUkxOG4oe1xuICAgICAgICAgICAgICAgIHVzZVNjb3BlOiBwcm9wcy5zY29wZSxcbiAgICAgICAgICAgICAgICBfX3VzZUNvbXBvbmVudDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc2xvdHMpLmZpbHRlcihrZXkgPT4ga2V5ICE9PSAnXycpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgaWYgKHByb3BzLmxvY2FsZSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubG9jYWxlID0gcHJvcHMubG9jYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb3BzLnBsdXJhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5wbHVyYWwgPSBpc1N0cmluZyhwcm9wcy5wbHVyYWwpID8gK3Byb3BzLnBsdXJhbCA6IHByb3BzLnBsdXJhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFyZyA9IGdldEludGVycG9sYXRlQXJnKGNvbnRleHQsIGtleXMpO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gaTE4bltUcmFuc2xhdGVWTm9kZVN5bWJvbF0ocHJvcHMua2V5cGF0aCwgYXJnLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnN0IGFzc2lnbmVkQXR0cnMgPSBhc3NpZ24oe30sIGF0dHJzKTtcbiAgICAgICAgICAgIGNvbnN0IHRhZyA9IGlzU3RyaW5nKHByb3BzLnRhZykgfHwgaXNPYmplY3QocHJvcHMudGFnKVxuICAgICAgICAgICAgICAgID8gcHJvcHMudGFnXG4gICAgICAgICAgICAgICAgOiBnZXRGcmFnbWVudGFibGVUYWcoKTtcbiAgICAgICAgICAgIHJldHVybiBoKHRhZywgYXNzaWduZWRBdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB9O1xuICAgIH1cbn0pO1xuLyoqXG4gKiBleHBvcnQgdGhlIHB1YmxpYyB0eXBlIGZvciBoL3RzeCBpbmZlcmVuY2VcbiAqIGFsc28gdG8gYXZvaWQgaW5saW5lIGltcG9ydCgpIGluIGdlbmVyYXRlZCBkLnRzIGZpbGVzXG4gKi9cbi8qKlxuICogVHJhbnNsYXRpb24gQ29tcG9uZW50XG4gKlxuICogQHJlbWFya3NcbiAqIFNlZSB0aGUgZm9sbG93aW5nIGl0ZW1zIGZvciBwcm9wZXJ0eSBhYm91dCBkZXRhaWxzXG4gKlxuICogQFZ1ZUkxOG5TZWUgW1RyYW5zbGF0aW9uUHJvcHNdKGNvbXBvbmVudCN0cmFuc2xhdGlvbnByb3BzKVxuICogQFZ1ZUkxOG5TZWUgW0Jhc2VGb3JtYXRQcm9wc10oY29tcG9uZW50I2Jhc2Vmb3JtYXRwcm9wcylcbiAqIEBWdWVJMThuU2VlIFtDb21wb25lbnQgSW50ZXJwb2xhdGlvbl0oLi4vZ3VpZGUvYWR2YW5jZWQvY29tcG9uZW50KVxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8ZGl2IGlkPVwiYXBwXCI+XG4gKiAgIDwhLS0gLi4uIC0tPlxuICogICA8aTE4biBrZXlwYXRoPVwidGVybVwiIHRhZz1cImxhYmVsXCIgZm9yPVwidG9zXCI+XG4gKiAgICAgPGEgOmhyZWY9XCJ1cmxcIiB0YXJnZXQ9XCJfYmxhbmtcIj57eyAkdCgndG9zJykgfX08L2E+XG4gKiAgIDwvaTE4bj5cbiAqICAgPCEtLSAuLi4gLS0+XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICogYGBganNcbiAqIGltcG9ydCB7IGNyZWF0ZUFwcCB9IGZyb20gJ3Z1ZSdcbiAqIGltcG9ydCB7IGNyZWF0ZUkxOG4gfSBmcm9tICd2dWUtaTE4bidcbiAqXG4gKiBjb25zdCBtZXNzYWdlcyA9IHtcbiAqICAgZW46IHtcbiAqICAgICB0b3M6ICdUZXJtIG9mIFNlcnZpY2UnLFxuICogICAgIHRlcm06ICdJIGFjY2VwdCB4eHggezB9LidcbiAqICAgfSxcbiAqICAgamE6IHtcbiAqICAgICB0b3M6ICfliKnnlKjopo/ntIQnLFxuICogICAgIHRlcm06ICfnp4Hjga8geHh4IOOBrnswfeOBq+WQjOaEj+OBl+OBvuOBmeOAgidcbiAqICAgfVxuICogfVxuICpcbiAqIGNvbnN0IGkxOG4gPSBjcmVhdGVJMThuKHtcbiAqICAgbG9jYWxlOiAnZW4nLFxuICogICBtZXNzYWdlc1xuICogfSlcbiAqXG4gKiBjb25zdCBhcHAgPSBjcmVhdGVBcHAoe1xuICogICBkYXRhOiB7XG4gKiAgICAgdXJsOiAnL3Rlcm0nXG4gKiAgIH1cbiAqIH0pLnVzZShpMThuKS5tb3VudCgnI2FwcCcpXG4gKiBgYGBcbiAqXG4gKiBAVnVlSTE4bkNvbXBvbmVudFxuICovXG5jb25zdCBUcmFuc2xhdGlvbiA9IFRyYW5zbGF0aW9uSW1wbDtcbmNvbnN0IEkxOG5UID0gVHJhbnNsYXRpb247XG5cbmZ1bmN0aW9uIGlzVk5vZGUodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGlzQXJyYXkodGFyZ2V0KSAmJiAhaXNTdHJpbmcodGFyZ2V0WzBdKTtcbn1cbmZ1bmN0aW9uIHJlbmRlckZvcm1hdHRlcihwcm9wcywgY29udGV4dCwgc2xvdEtleXMsIHBhcnRGb3JtYXR0ZXIpIHtcbiAgICBjb25zdCB7IHNsb3RzLCBhdHRycyB9ID0gY29udGV4dDtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25zID0geyBwYXJ0OiB0cnVlIH07XG4gICAgICAgIGxldCBvdmVycmlkZXMgPSB7fTtcbiAgICAgICAgaWYgKHByb3BzLmxvY2FsZSkge1xuICAgICAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBwcm9wcy5sb2NhbGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzU3RyaW5nKHByb3BzLmZvcm1hdCkpIHtcbiAgICAgICAgICAgIG9wdGlvbnMua2V5ID0gcHJvcHMuZm9ybWF0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzT2JqZWN0KHByb3BzLmZvcm1hdCkpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBpZiAoaXNTdHJpbmcocHJvcHMuZm9ybWF0LmtleSkpIHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICAgIG9wdGlvbnMua2V5ID0gcHJvcHMuZm9ybWF0LmtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgbnVtYmVyIGZvcm1hdCBvcHRpb25zIG9ubHlcbiAgICAgICAgICAgIG92ZXJyaWRlcyA9IE9iamVjdC5rZXlzKHByb3BzLmZvcm1hdCkucmVkdWNlKChvcHRpb25zLCBwcm9wKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNsb3RLZXlzLmluY2x1ZGVzKHByb3ApXG4gICAgICAgICAgICAgICAgICAgID8gYXNzaWduKHt9LCBvcHRpb25zLCB7IFtwcm9wXTogcHJvcHMuZm9ybWF0W3Byb3BdIH0pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICAgICAgICA6IG9wdGlvbnM7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFydHMgPSBwYXJ0Rm9ybWF0dGVyKC4uLltwcm9wcy52YWx1ZSwgb3B0aW9ucywgb3ZlcnJpZGVzXSk7XG4gICAgICAgIGxldCBjaGlsZHJlbiA9IFtvcHRpb25zLmtleV07XG4gICAgICAgIGlmIChpc0FycmF5KHBhcnRzKSkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBwYXJ0cy5tYXAoKHBhcnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2xvdCA9IHNsb3RzW3BhcnQudHlwZV07XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHNsb3RcbiAgICAgICAgICAgICAgICAgICAgPyBzbG90KHsgW3BhcnQudHlwZV06IHBhcnQudmFsdWUsIGluZGV4LCBwYXJ0cyB9KVxuICAgICAgICAgICAgICAgICAgICA6IFtwYXJ0LnZhbHVlXTtcbiAgICAgICAgICAgICAgICBpZiAoaXNWTm9kZShub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlWzBdLmtleSA9IGAke3BhcnQudHlwZX0tJHtpbmRleH1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzU3RyaW5nKHBhcnRzKSkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBbcGFydHNdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFzc2lnbmVkQXR0cnMgPSBhc3NpZ24oe30sIGF0dHJzKTtcbiAgICAgICAgY29uc3QgdGFnID0gaXNTdHJpbmcocHJvcHMudGFnKSB8fCBpc09iamVjdChwcm9wcy50YWcpXG4gICAgICAgICAgICA/IHByb3BzLnRhZ1xuICAgICAgICAgICAgOiBnZXRGcmFnbWVudGFibGVUYWcoKTtcbiAgICAgICAgcmV0dXJuIGgodGFnLCBhc3NpZ25lZEF0dHJzLCBjaGlsZHJlbik7XG4gICAgfTtcbn1cblxuY29uc3QgTnVtYmVyRm9ybWF0SW1wbCA9IC8qI19fUFVSRV9fKi8gZGVmaW5lQ29tcG9uZW50KHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgIG5hbWU6ICdpMThuLW4nLFxuICAgIHByb3BzOiBhc3NpZ24oe1xuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0OiB7XG4gICAgICAgICAgICB0eXBlOiBbU3RyaW5nLCBPYmplY3RdXG4gICAgICAgIH1cbiAgICB9LCBiYXNlRm9ybWF0UHJvcHMpLFxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHNldHVwKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IGkxOG4gPSBwcm9wcy5pMThuIHx8XG4gICAgICAgICAgICB1c2VJMThuKHtcbiAgICAgICAgICAgICAgICB1c2VTY29wZTogJ3BhcmVudCcsXG4gICAgICAgICAgICAgICAgX191c2VDb21wb25lbnQ6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVuZGVyRm9ybWF0dGVyKHByb3BzLCBjb250ZXh0LCBOVU1CRVJfRk9STUFUX09QVElPTlNfS0VZUywgKC4uLmFyZ3MpID0+IFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBpMThuW051bWJlclBhcnRzU3ltYm9sXSguLi5hcmdzKSk7XG4gICAgfVxufSk7XG4vKipcbiAqIGV4cG9ydCB0aGUgcHVibGljIHR5cGUgZm9yIGgvdHN4IGluZmVyZW5jZVxuICogYWxzbyB0byBhdm9pZCBpbmxpbmUgaW1wb3J0KCkgaW4gZ2VuZXJhdGVkIGQudHMgZmlsZXNcbiAqL1xuLyoqXG4gKiBOdW1iZXIgRm9ybWF0IENvbXBvbmVudFxuICpcbiAqIEByZW1hcmtzXG4gKiBTZWUgdGhlIGZvbGxvd2luZyBpdGVtcyBmb3IgcHJvcGVydHkgYWJvdXQgZGV0YWlsc1xuICpcbiAqIEBWdWVJMThuU2VlIFtGb3JtYXR0YWJsZVByb3BzXShjb21wb25lbnQjZm9ybWF0dGFibGVwcm9wcylcbiAqIEBWdWVJMThuU2VlIFtCYXNlRm9ybWF0UHJvcHNdKGNvbXBvbmVudCNiYXNlZm9ybWF0cHJvcHMpXG4gKiBAVnVlSTE4blNlZSBbQ3VzdG9tIEZvcm1hdHRpbmddKC4uL2d1aWRlL2Vzc2VudGlhbHMvbnVtYmVyI2N1c3RvbS1mb3JtYXR0aW5nKVxuICpcbiAqIEBWdWVJMThuRGFuZ2VyXG4gKiBOb3Qgc3VwcG9ydGVkIElFLCBkdWUgdG8gbm8gc3VwcG9ydCBgSW50bC5OdW1iZXJGb3JtYXQjZm9ybWF0VG9QYXJ0c2AgaW4gW0lFXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9JbnRsL051bWJlckZvcm1hdC9mb3JtYXRUb1BhcnRzKVxuICpcbiAqIElmIHlvdSB3YW50IHRvIHVzZSBpdCwgeW91IG5lZWQgdG8gdXNlIFtwb2x5ZmlsbF0oaHR0cHM6Ly9naXRodWIuY29tL2Zvcm1hdGpzL2Zvcm1hdGpzL3RyZWUvbWFpbi9wYWNrYWdlcy9pbnRsLW51bWJlcmZvcm1hdClcbiAqXG4gKiBAVnVlSTE4bkNvbXBvbmVudFxuICovXG5jb25zdCBOdW1iZXJGb3JtYXQgPSBOdW1iZXJGb3JtYXRJbXBsO1xuY29uc3QgSTE4bk4gPSBOdW1iZXJGb3JtYXQ7XG5cbmNvbnN0IERhdGV0aW1lRm9ybWF0SW1wbCA9IC8qICNfX1BVUkVfXyovIGRlZmluZUNvbXBvbmVudCh7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICBuYW1lOiAnaTE4bi1kJyxcbiAgICBwcm9wczogYXNzaWduKHtcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIHR5cGU6IFtOdW1iZXIsIERhdGVdLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0OiB7XG4gICAgICAgICAgICB0eXBlOiBbU3RyaW5nLCBPYmplY3RdXG4gICAgICAgIH1cbiAgICB9LCBiYXNlRm9ybWF0UHJvcHMpLFxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIHNldHVwKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IGkxOG4gPSBwcm9wcy5pMThuIHx8XG4gICAgICAgICAgICB1c2VJMThuKHtcbiAgICAgICAgICAgICAgICB1c2VTY29wZTogJ3BhcmVudCcsXG4gICAgICAgICAgICAgICAgX191c2VDb21wb25lbnQ6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVuZGVyRm9ybWF0dGVyKHByb3BzLCBjb250ZXh0LCBEQVRFVElNRV9GT1JNQVRfT1BUSU9OU19LRVlTLCAoLi4uYXJncykgPT4gXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGkxOG5bRGF0ZXRpbWVQYXJ0c1N5bWJvbF0oLi4uYXJncykpO1xuICAgIH1cbn0pO1xuLyoqXG4gKiBEYXRldGltZSBGb3JtYXQgQ29tcG9uZW50XG4gKlxuICogQHJlbWFya3NcbiAqIFNlZSB0aGUgZm9sbG93aW5nIGl0ZW1zIGZvciBwcm9wZXJ0eSBhYm91dCBkZXRhaWxzXG4gKlxuICogQFZ1ZUkxOG5TZWUgW0Zvcm1hdHRhYmxlUHJvcHNdKGNvbXBvbmVudCNmb3JtYXR0YWJsZXByb3BzKVxuICogQFZ1ZUkxOG5TZWUgW0Jhc2VGb3JtYXRQcm9wc10oY29tcG9uZW50I2Jhc2Vmb3JtYXRwcm9wcylcbiAqIEBWdWVJMThuU2VlIFtDdXN0b20gRm9ybWF0dGluZ10oLi4vZ3VpZGUvZXNzZW50aWFscy9kYXRldGltZSNjdXN0b20tZm9ybWF0dGluZylcbiAqXG4gKiBAVnVlSTE4bkRhbmdlclxuICogTm90IHN1cHBvcnRlZCBJRSwgZHVlIHRvIG5vIHN1cHBvcnQgYEludGwuRGF0ZVRpbWVGb3JtYXQjZm9ybWF0VG9QYXJ0c2AgaW4gW0lFXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9JbnRsL0RhdGVUaW1lRm9ybWF0L2Zvcm1hdFRvUGFydHMpXG4gKlxuICogSWYgeW91IHdhbnQgdG8gdXNlIGl0LCB5b3UgbmVlZCB0byB1c2UgW3BvbHlmaWxsXShodHRwczovL2dpdGh1Yi5jb20vZm9ybWF0anMvZm9ybWF0anMvdHJlZS9tYWluL3BhY2thZ2VzL2ludGwtZGF0ZXRpbWVmb3JtYXQpXG4gKlxuICogQFZ1ZUkxOG5Db21wb25lbnRcbiAqL1xuY29uc3QgRGF0ZXRpbWVGb3JtYXQgPSBEYXRldGltZUZvcm1hdEltcGw7XG5jb25zdCBJMThuRCA9IERhdGV0aW1lRm9ybWF0O1xuXG5mdW5jdGlvbiBnZXRDb21wb3NlciQyKGkxOG4sIGluc3RhbmNlKSB7XG4gICAgY29uc3QgaTE4bkludGVybmFsID0gaTE4bjtcbiAgICBpZiAoaTE4bi5tb2RlID09PSAnY29tcG9zaXRpb24nKSB7XG4gICAgICAgIHJldHVybiAoaTE4bkludGVybmFsLl9fZ2V0SW5zdGFuY2UoaW5zdGFuY2UpIHx8IGkxOG4uZ2xvYmFsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHZ1ZUkxOG4gPSBpMThuSW50ZXJuYWwuX19nZXRJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgICAgIHJldHVybiB2dWVJMThuICE9IG51bGxcbiAgICAgICAgICAgID8gdnVlSTE4bi5fX2NvbXBvc2VyXG4gICAgICAgICAgICA6IGkxOG4uZ2xvYmFsLl9fY29tcG9zZXI7XG4gICAgfVxufVxuZnVuY3Rpb24gdlREaXJlY3RpdmUoaTE4bikge1xuICAgIGNvbnN0IF9wcm9jZXNzID0gKGJpbmRpbmcpID0+IHtcbiAgICAgICAgY29uc3QgeyBpbnN0YW5jZSwgbW9kaWZpZXJzLCB2YWx1ZSB9ID0gYmluZGluZztcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICghaW5zdGFuY2UgfHwgIWluc3RhbmNlLiQpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VSUk9SKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb21wb3NlciA9IGdldENvbXBvc2VyJDIoaTE4biwgaW5zdGFuY2UuJCk7XG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgbW9kaWZpZXJzLnByZXNlcnZlKSB7XG4gICAgICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9QUkVTRVJWRSkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcnNlZFZhbHVlID0gcGFyc2VWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBSZWZsZWN0LmFwcGx5KGNvbXBvc2VyLnQsIGNvbXBvc2VyLCBbLi4ubWFrZVBhcmFtcyhwYXJzZWRWYWx1ZSldKSxcbiAgICAgICAgICAgIGNvbXBvc2VyXG4gICAgICAgIF07XG4gICAgfTtcbiAgICBjb25zdCByZWdpc3RlciA9IChlbCwgYmluZGluZykgPT4ge1xuICAgICAgICBjb25zdCBbdGV4dENvbnRlbnQsIGNvbXBvc2VyXSA9IF9wcm9jZXNzKGJpbmRpbmcpO1xuICAgICAgICBpZiAoaW5Ccm93c2VyICYmIGkxOG4uZ2xvYmFsID09PSBjb21wb3Nlcikge1xuICAgICAgICAgICAgLy8gZ2xvYmFsIHNjb3BlIG9ubHlcbiAgICAgICAgICAgIGVsLl9faTE4bldhdGNoZXIgPSB3YXRjaChjb21wb3Nlci5sb2NhbGUsICgpID0+IHtcbiAgICAgICAgICAgICAgICBiaW5kaW5nLmluc3RhbmNlICYmIGJpbmRpbmcuaW5zdGFuY2UuJGZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbC5fX2NvbXBvc2VyID0gY29tcG9zZXI7XG4gICAgICAgIGVsLnRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XG4gICAgfTtcbiAgICBjb25zdCB1bnJlZ2lzdGVyID0gKGVsKSA9PiB7XG4gICAgICAgIGlmIChpbkJyb3dzZXIgJiYgZWwuX19pMThuV2F0Y2hlcikge1xuICAgICAgICAgICAgZWwuX19pMThuV2F0Y2hlcigpO1xuICAgICAgICAgICAgZWwuX19pMThuV2F0Y2hlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGRlbGV0ZSBlbC5fX2kxOG5XYXRjaGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbC5fX2NvbXBvc2VyKSB7XG4gICAgICAgICAgICBlbC5fX2NvbXBvc2VyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgZGVsZXRlIGVsLl9fY29tcG9zZXI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHVwZGF0ZSA9IChlbCwgeyB2YWx1ZSB9KSA9PiB7XG4gICAgICAgIGlmIChlbC5fX2NvbXBvc2VyKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb3NlciA9IGVsLl9fY29tcG9zZXI7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IHBhcnNlVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSBSZWZsZWN0LmFwcGx5KGNvbXBvc2VyLnQsIGNvbXBvc2VyLCBbXG4gICAgICAgICAgICAgICAgLi4ubWFrZVBhcmFtcyhwYXJzZWRWYWx1ZSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBnZXRTU1JQcm9wcyA9IChiaW5kaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IFt0ZXh0Q29udGVudF0gPSBfcHJvY2VzcyhiaW5kaW5nKTtcbiAgICAgICAgcmV0dXJuIHsgdGV4dENvbnRlbnQgfTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZWQ6IHJlZ2lzdGVyLFxuICAgICAgICB1bm1vdW50ZWQ6IHVucmVnaXN0ZXIsXG4gICAgICAgIGJlZm9yZVVwZGF0ZTogdXBkYXRlLFxuICAgICAgICBnZXRTU1JQcm9wc1xuICAgIH07XG59XG5mdW5jdGlvbiBwYXJzZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4geyBwYXRoOiB2YWx1ZSB9O1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICBpZiAoISgncGF0aCcgaW4gdmFsdWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuUkVRVUlSRURfVkFMVUUsICdwYXRoJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLklOVkFMSURfVkFMVUUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG1ha2VQYXJhbXModmFsdWUpIHtcbiAgICBjb25zdCB7IHBhdGgsIGxvY2FsZSwgYXJncywgY2hvaWNlLCBwbHVyYWwgfSA9IHZhbHVlO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBjb25zdCBuYW1lZCA9IGFyZ3MgfHwge307XG4gICAgaWYgKGlzU3RyaW5nKGxvY2FsZSkpIHtcbiAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBsb2NhbGU7XG4gICAgfVxuICAgIGlmIChpc051bWJlcihjaG9pY2UpKSB7XG4gICAgICAgIG9wdGlvbnMucGx1cmFsID0gY2hvaWNlO1xuICAgIH1cbiAgICBpZiAoaXNOdW1iZXIocGx1cmFsKSkge1xuICAgICAgICBvcHRpb25zLnBsdXJhbCA9IHBsdXJhbDtcbiAgICB9XG4gICAgcmV0dXJuIFtwYXRoLCBuYW1lZCwgb3B0aW9uc107XG59XG5cbmZ1bmN0aW9uIGFwcGx5KGFwcCwgaTE4biwgLi4ub3B0aW9ucykge1xuICAgIGNvbnN0IHBsdWdpbk9wdGlvbnMgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnNbMF0pXG4gICAgICAgID8gb3B0aW9uc1swXVxuICAgICAgICA6IHt9O1xuICAgIGNvbnN0IHVzZUkxOG5Db21wb25lbnROYW1lID0gISFwbHVnaW5PcHRpb25zLnVzZUkxOG5Db21wb25lbnROYW1lO1xuICAgIGNvbnN0IGdsb2JhbEluc3RhbGwgPSBpc0Jvb2xlYW4ocGx1Z2luT3B0aW9ucy5nbG9iYWxJbnN0YWxsKVxuICAgICAgICA/IHBsdWdpbk9wdGlvbnMuZ2xvYmFsSW5zdGFsbFxuICAgICAgICA6IHRydWU7XG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBnbG9iYWxJbnN0YWxsICYmIHVzZUkxOG5Db21wb25lbnROYW1lKSB7XG4gICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5DT01QT05FTlRfTkFNRV9MRUdBQ1lfQ09NUEFUSUJMRSwge1xuICAgICAgICAgICAgbmFtZTogVHJhbnNsYXRpb24ubmFtZVxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChnbG9iYWxJbnN0YWxsKSB7XG4gICAgICAgIFshdXNlSTE4bkNvbXBvbmVudE5hbWUgPyBUcmFuc2xhdGlvbi5uYW1lIDogJ2kxOG4nLCAnSTE4blQnXS5mb3JFYWNoKG5hbWUgPT4gYXBwLmNvbXBvbmVudChuYW1lLCBUcmFuc2xhdGlvbikpO1xuICAgICAgICBbTnVtYmVyRm9ybWF0Lm5hbWUsICdJMThuTiddLmZvckVhY2gobmFtZSA9PiBhcHAuY29tcG9uZW50KG5hbWUsIE51bWJlckZvcm1hdCkpO1xuICAgICAgICBbRGF0ZXRpbWVGb3JtYXQubmFtZSwgJ0kxOG5EJ10uZm9yRWFjaChuYW1lID0+IGFwcC5jb21wb25lbnQobmFtZSwgRGF0ZXRpbWVGb3JtYXQpKTtcbiAgICB9XG4gICAgLy8gaW5zdGFsbCBkaXJlY3RpdmVcbiAgICB7XG4gICAgICAgIGFwcC5kaXJlY3RpdmUoJ3QnLCB2VERpcmVjdGl2ZShpMThuKSk7XG4gICAgfVxufVxuXG5jb25zdCBWVUVfSTE4Tl9DT01QT05FTlRfVFlQRVMgPSAndnVlLWkxOG46IGNvbXBvc2VyIHByb3BlcnRpZXMnO1xubGV0IGRldnRvb2xzQXBpO1xuYXN5bmMgZnVuY3Rpb24gZW5hYmxlRGV2VG9vbHMoYXBwLCBpMThuKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNldHVwRGV2dG9vbHNQbHVnaW4oe1xuICAgICAgICAgICAgICAgIGlkOiBcInZ1ZS1kZXZ0b29scy1wbHVnaW4tdnVlLWkxOG5cIiAvKiBWdWVEZXZUb29sc0lEcy5QTFVHSU4gKi8sXG4gICAgICAgICAgICAgICAgbGFiZWw6IFZ1ZURldlRvb2xzTGFiZWxzW1widnVlLWRldnRvb2xzLXBsdWdpbi12dWUtaTE4blwiIC8qIFZ1ZURldlRvb2xzSURzLlBMVUdJTiAqL10sXG4gICAgICAgICAgICAgICAgcGFja2FnZU5hbWU6ICd2dWUtaTE4bicsXG4gICAgICAgICAgICAgICAgaG9tZXBhZ2U6ICdodHRwczovL3Z1ZS1pMThuLmludGxpZnkuZGV2JyxcbiAgICAgICAgICAgICAgICBsb2dvOiAnaHR0cHM6Ly92dWUtaTE4bi5pbnRsaWZ5LmRldi92dWUtaTE4bi1kZXZ0b29scy1sb2dvLnBuZycsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50U3RhdGVUeXBlczogW1ZVRV9JMThOX0NPTVBPTkVOVF9UWVBFU10sXG4gICAgICAgICAgICAgICAgYXBwOiBhcHAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICB9LCBhcGkgPT4ge1xuICAgICAgICAgICAgICAgIGRldnRvb2xzQXBpID0gYXBpO1xuICAgICAgICAgICAgICAgIGFwaS5vbi52aXNpdENvbXBvbmVudFRyZWUoKHsgY29tcG9uZW50SW5zdGFuY2UsIHRyZWVOb2RlIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ29tcG9uZW50VHJlZVRhZ3MoY29tcG9uZW50SW5zdGFuY2UsIHRyZWVOb2RlLCBpMThuKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBhcGkub24uaW5zcGVjdENvbXBvbmVudCgoeyBjb21wb25lbnRJbnN0YW5jZSwgaW5zdGFuY2VEYXRhIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudEluc3RhbmNlLnZub2RlLmVsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZS52bm9kZS5lbC5fX1ZVRV9JMThOX18gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkxOG4ubW9kZSA9PT0gJ2xlZ2FjeScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgZ2xvYmFsIHNjb3BlIG9uIGxlZ2FjeSBtb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudEluc3RhbmNlLnZub2RlLmVsLl9fVlVFX0kxOE5fXyAhPT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaTE4bi5nbG9iYWwuX19jb21wb3Nlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNwZWN0Q29tcG9zZXIoaW5zdGFuY2VEYXRhLCBjb21wb25lbnRJbnN0YW5jZS52bm9kZS5lbC5fX1ZVRV9JMThOX18pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3BlY3RDb21wb3NlcihpbnN0YW5jZURhdGEsIGNvbXBvbmVudEluc3RhbmNlLnZub2RlLmVsLl9fVlVFX0kxOE5fXyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBhcGkuYWRkSW5zcGVjdG9yKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwidnVlLWkxOG4tcmVzb3VyY2UtaW5zcGVjdG9yXCIgLyogVnVlRGV2VG9vbHNJRHMuQ1VTVE9NX0lOU1BFQ1RPUiAqLyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFZ1ZURldlRvb2xzTGFiZWxzW1widnVlLWkxOG4tcmVzb3VyY2UtaW5zcGVjdG9yXCIgLyogVnVlRGV2VG9vbHNJRHMuQ1VTVE9NX0lOU1BFQ1RPUiAqL10sXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdsYW5ndWFnZScsXG4gICAgICAgICAgICAgICAgICAgIHRyZWVGaWx0ZXJQbGFjZWhvbGRlcjogVnVlRGV2VG9vbHNQbGFjZWhvbGRlcnNbXCJ2dWUtaTE4bi1yZXNvdXJjZS1pbnNwZWN0b3JcIiAvKiBWdWVEZXZUb29sc0lEcy5DVVNUT01fSU5TUEVDVE9SICovXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGFwaS5vbi5nZXRJbnNwZWN0b3JUcmVlKHBheWxvYWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5hcHAgPT09IGFwcCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5pbnNwZWN0b3JJZCA9PT0gXCJ2dWUtaTE4bi1yZXNvdXJjZS1pbnNwZWN0b3JcIiAvKiBWdWVEZXZUb29sc0lEcy5DVVNUT01fSU5TUEVDVE9SICovKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdpc3RlclNjb3BlKHBheWxvYWQsIGkxOG4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm9vdHMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgYXBpLm9uLmdldEluc3BlY3RvclN0YXRlKGFzeW5jIChwYXlsb2FkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLmFwcCA9PT0gYXBwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLmluc3BlY3RvcklkID09PSBcInZ1ZS1pMThuLXJlc291cmNlLWluc3BlY3RvclwiIC8qIFZ1ZURldlRvb2xzSURzLkNVU1RPTV9JTlNQRUNUT1IgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS51bmhpZ2hsaWdodEVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3BlY3RTY29wZShwYXlsb2FkLCBpMThuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLm5vZGVJZCA9PT0gJ2dsb2JhbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJvb3RzLmhhcyhwYXlsb2FkLmFwcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3Jvb3RdID0gYXdhaXQgYXBpLmdldENvbXBvbmVudEluc3RhbmNlcyhwYXlsb2FkLmFwcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RzLnNldChwYXlsb2FkLmFwcCwgcm9vdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5oaWdobGlnaHRFbGVtZW50KHJvb3RzLmdldChwYXlsb2FkLmFwcCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBnZXRDb21wb25lbnRJbnN0YW5jZShwYXlsb2FkLm5vZGVJZCwgaTE4bik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgJiYgYXBpLmhpZ2hsaWdodEVsZW1lbnQoaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYXBpLm9uLmVkaXRJbnNwZWN0b3JTdGF0ZShwYXlsb2FkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuYXBwID09PSBhcHAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQuaW5zcGVjdG9ySWQgPT09IFwidnVlLWkxOG4tcmVzb3VyY2UtaW5zcGVjdG9yXCIgLyogVnVlRGV2VG9vbHNJRHMuQ1VTVE9NX0lOU1BFQ1RPUiAqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdFNjb3BlKHBheWxvYWQsIGkxOG4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYXBpLmFkZFRpbWVsaW5lTGF5ZXIoe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJ2dWUtaTE4bi10aW1lbGluZVwiIC8qIFZ1ZURldlRvb2xzSURzLlRJTUVMSU5FICovLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogVnVlRGV2VG9vbHNMYWJlbHNbXCJ2dWUtaTE4bi10aW1lbGluZVwiIC8qIFZ1ZURldlRvb2xzSURzLlRJTUVMSU5FICovXSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFZ1ZURldlRvb2xzVGltZWxpbmVDb2xvcnNbXCJ2dWUtaTE4bi10aW1lbGluZVwiIC8qIFZ1ZURldlRvb2xzSURzLlRJTUVMSU5FICovXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5mdW5jdGlvbiBnZXRJMThuU2NvcGVMYWJsZShpbnN0YW5jZSkge1xuICAgIHJldHVybiAoaW5zdGFuY2UudHlwZS5uYW1lIHx8XG4gICAgICAgIGluc3RhbmNlLnR5cGUuZGlzcGxheU5hbWUgfHxcbiAgICAgICAgaW5zdGFuY2UudHlwZS5fX2ZpbGUgfHxcbiAgICAgICAgJ0Fub255bW91cycpO1xufVxuZnVuY3Rpb24gdXBkYXRlQ29tcG9uZW50VHJlZVRhZ3MoaW5zdGFuY2UsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxudHJlZU5vZGUsIGkxOG4pIHtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBnbG9iYWwgPSBpMThuLm1vZGUgPT09ICdjb21wb3NpdGlvbidcbiAgICAgICAgPyBpMThuLmdsb2JhbFxuICAgICAgICA6IGkxOG4uZ2xvYmFsLl9fY29tcG9zZXI7XG4gICAgaWYgKGluc3RhbmNlICYmIGluc3RhbmNlLnZub2RlLmVsICYmIGluc3RhbmNlLnZub2RlLmVsLl9fVlVFX0kxOE5fXykge1xuICAgICAgICAvLyBhZGQgY3VzdG9tIHRhZ3MgbG9jYWwgc2NvcGUgb25seVxuICAgICAgICBpZiAoaW5zdGFuY2Uudm5vZGUuZWwuX19WVUVfSTE4Tl9fICE9PSBnbG9iYWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhZyA9IHtcbiAgICAgICAgICAgICAgICBsYWJlbDogYGkxOG4gKCR7Z2V0STE4blNjb3BlTGFibGUoaW5zdGFuY2UpfSBTY29wZSlgLFxuICAgICAgICAgICAgICAgIHRleHRDb2xvcjogMHgwMDAwMDAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAweGZmY2QxOVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRyZWVOb2RlLnRhZ3MucHVzaCh0YWcpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gaW5zcGVjdENvbXBvc2VyKGluc3RhbmNlRGF0YSwgY29tcG9zZXIpIHtcbiAgICBjb25zdCB0eXBlID0gVlVFX0kxOE5fQ09NUE9ORU5UX1RZUEVTO1xuICAgIGluc3RhbmNlRGF0YS5zdGF0ZS5wdXNoKHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAga2V5OiAnbG9jYWxlJyxcbiAgICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBjb21wb3Nlci5sb2NhbGUudmFsdWVcbiAgICB9KTtcbiAgICBpbnN0YW5jZURhdGEuc3RhdGUucHVzaCh7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGtleTogJ2F2YWlsYWJsZUxvY2FsZXMnLFxuICAgICAgICBlZGl0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBjb21wb3Nlci5hdmFpbGFibGVMb2NhbGVzXG4gICAgfSk7XG4gICAgaW5zdGFuY2VEYXRhLnN0YXRlLnB1c2goe1xuICAgICAgICB0eXBlLFxuICAgICAgICBrZXk6ICdmYWxsYmFja0xvY2FsZScsXG4gICAgICAgIGVkaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogY29tcG9zZXIuZmFsbGJhY2tMb2NhbGUudmFsdWVcbiAgICB9KTtcbiAgICBpbnN0YW5jZURhdGEuc3RhdGUucHVzaCh7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGtleTogJ2luaGVyaXRMb2NhbGUnLFxuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGNvbXBvc2VyLmluaGVyaXRMb2NhbGVcbiAgICB9KTtcbiAgICBpbnN0YW5jZURhdGEuc3RhdGUucHVzaCh7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGtleTogJ21lc3NhZ2VzJyxcbiAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogZ2V0TG9jYWxlTWVzc2FnZVZhbHVlKGNvbXBvc2VyLm1lc3NhZ2VzLnZhbHVlKVxuICAgIH0pO1xuICAgIHtcbiAgICAgICAgaW5zdGFuY2VEYXRhLnN0YXRlLnB1c2goe1xuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIGtleTogJ2RhdGV0aW1lRm9ybWF0cycsXG4gICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIuZGF0ZXRpbWVGb3JtYXRzLnZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICBpbnN0YW5jZURhdGEuc3RhdGUucHVzaCh7XG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAga2V5OiAnbnVtYmVyRm9ybWF0cycsXG4gICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIubnVtYmVyRm9ybWF0cy52YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZnVuY3Rpb24gZ2V0TG9jYWxlTWVzc2FnZVZhbHVlKG1lc3NhZ2VzKSB7XG4gICAgY29uc3QgdmFsdWUgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhtZXNzYWdlcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHYgPSBtZXNzYWdlc1trZXldO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih2KSAmJiAnc291cmNlJyBpbiB2KSB7XG4gICAgICAgICAgICB2YWx1ZVtrZXldID0gZ2V0TWVzc2FnZUZ1bmN0aW9uRGV0YWlscyh2KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc01lc3NhZ2VBU1QodikgJiYgdi5sb2MgJiYgdi5sb2Muc291cmNlKSB7XG4gICAgICAgICAgICB2YWx1ZVtrZXldID0gdi5sb2Muc291cmNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgICB2YWx1ZVtrZXldID0gZ2V0TG9jYWxlTWVzc2FnZVZhbHVlKHYpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVba2V5XSA9IHY7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5jb25zdCBFU0MgPSB7XG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgJyYnOiAnJmFtcDsnXG59O1xuZnVuY3Rpb24gZXNjYXBlKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKC9bPD5cIiZdL2csIGVzY2FwZUNoYXIpO1xufVxuZnVuY3Rpb24gZXNjYXBlQ2hhcihhKSB7XG4gICAgcmV0dXJuIEVTQ1thXSB8fCBhO1xufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmZ1bmN0aW9uIGdldE1lc3NhZ2VGdW5jdGlvbkRldGFpbHMoZnVuYykge1xuICAgIGNvbnN0IGFyZ1N0cmluZyA9IGZ1bmMuc291cmNlID8gYChcIiR7ZXNjYXBlKGZ1bmMuc291cmNlKX1cIilgIDogYCg/KWA7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgX2N1c3RvbToge1xuICAgICAgICAgICAgdHlwZTogJ2Z1bmN0aW9uJyxcbiAgICAgICAgICAgIGRpc3BsYXk6IGA8c3Bhbj7Gkjwvc3Bhbj4gJHthcmdTdHJpbmd9YFxuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyU2NvcGUocGF5bG9hZCwgaTE4bikge1xuICAgIHBheWxvYWQucm9vdE5vZGVzLnB1c2goe1xuICAgICAgICBpZDogJ2dsb2JhbCcsXG4gICAgICAgIGxhYmVsOiAnR2xvYmFsIFNjb3BlJ1xuICAgIH0pO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IGdsb2JhbCA9IGkxOG4ubW9kZSA9PT0gJ2NvbXBvc2l0aW9uJ1xuICAgICAgICA/IGkxOG4uZ2xvYmFsXG4gICAgICAgIDogaTE4bi5nbG9iYWwuX19jb21wb3NlcjtcbiAgICBmb3IgKGNvbnN0IFtrZXlJbnN0YW5jZSwgaW5zdGFuY2VdIG9mIGkxOG4uX19pbnN0YW5jZXMpIHtcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIGNvbnN0IGNvbXBvc2VyID0gaTE4bi5tb2RlID09PSAnY29tcG9zaXRpb24nXG4gICAgICAgICAgICA/IGluc3RhbmNlXG4gICAgICAgICAgICA6IGluc3RhbmNlLl9fY29tcG9zZXI7XG4gICAgICAgIGlmIChnbG9iYWwgPT09IGNvbXBvc2VyKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBwYXlsb2FkLnJvb3ROb2Rlcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBjb21wb3Nlci5pZC50b1N0cmluZygpLFxuICAgICAgICAgICAgbGFiZWw6IGAke2dldEkxOG5TY29wZUxhYmxlKGtleUluc3RhbmNlKX0gU2NvcGVgXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldENvbXBvbmVudEluc3RhbmNlKG5vZGVJZCwgaTE4bikge1xuICAgIGxldCBpbnN0YW5jZSA9IG51bGw7XG4gICAgaWYgKG5vZGVJZCAhPT0gJ2dsb2JhbCcpIHtcbiAgICAgICAgZm9yIChjb25zdCBbY29tcG9uZW50LCBjb21wb3Nlcl0gb2YgaTE4bi5fX2luc3RhbmNlcy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChjb21wb3Nlci5pZC50b1N0cmluZygpID09PSBub2RlSWQpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSA9IGNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5zdGFuY2U7XG59XG5mdW5jdGlvbiBnZXRDb21wb3NlciQxKG5vZGVJZCwgaTE4bikge1xuICAgIGlmIChub2RlSWQgPT09ICdnbG9iYWwnKSB7XG4gICAgICAgIHJldHVybiBpMThuLm1vZGUgPT09ICdjb21wb3NpdGlvbidcbiAgICAgICAgICAgID8gaTE4bi5nbG9iYWxcbiAgICAgICAgICAgIDogaTE4bi5nbG9iYWwuX19jb21wb3NlcjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gQXJyYXkuZnJvbShpMThuLl9faW5zdGFuY2VzLnZhbHVlcygpKS5maW5kKGl0ZW0gPT4gaXRlbS5pZC50b1N0cmluZygpID09PSBub2RlSWQpO1xuICAgICAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBpMThuLm1vZGUgPT09ICdjb21wb3NpdGlvbidcbiAgICAgICAgICAgICAgICA/IGluc3RhbmNlXG4gICAgICAgICAgICAgICAgOiBpbnN0YW5jZS5fX2NvbXBvc2VyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBpbnNwZWN0U2NvcGUocGF5bG9hZCwgaTE4blxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbikge1xuICAgIGNvbnN0IGNvbXBvc2VyID0gZ2V0Q29tcG9zZXIkMShwYXlsb2FkLm5vZGVJZCwgaTE4bik7XG4gICAgaWYgKGNvbXBvc2VyKSB7XG4gICAgICAgIC8vIFRPRE86XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHBheWxvYWQuc3RhdGUgPSBtYWtlU2NvcGVJbnNwZWN0U3RhdGUoY29tcG9zZXIpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIG1ha2VTY29wZUluc3BlY3RTdGF0ZShjb21wb3Nlcikge1xuICAgIGNvbnN0IHN0YXRlID0ge307XG4gICAgY29uc3QgbG9jYWxlVHlwZSA9ICdMb2NhbGUgcmVsYXRlZCBpbmZvJztcbiAgICBjb25zdCBsb2NhbGVTdGF0ZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IGxvY2FsZVR5cGUsXG4gICAgICAgICAgICBrZXk6ICdsb2NhbGUnLFxuICAgICAgICAgICAgZWRpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIubG9jYWxlLnZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IGxvY2FsZVR5cGUsXG4gICAgICAgICAgICBrZXk6ICdmYWxsYmFja0xvY2FsZScsXG4gICAgICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBjb21wb3Nlci5mYWxsYmFja0xvY2FsZS52YWx1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBsb2NhbGVUeXBlLFxuICAgICAgICAgICAga2V5OiAnYXZhaWxhYmxlTG9jYWxlcycsXG4gICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIuYXZhaWxhYmxlTG9jYWxlc1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBsb2NhbGVUeXBlLFxuICAgICAgICAgICAga2V5OiAnaW5oZXJpdExvY2FsZScsXG4gICAgICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBjb21wb3Nlci5pbmhlcml0TG9jYWxlXG4gICAgICAgIH1cbiAgICBdO1xuICAgIHN0YXRlW2xvY2FsZVR5cGVdID0gbG9jYWxlU3RhdGVzO1xuICAgIGNvbnN0IGxvY2FsZU1lc3NhZ2VzVHlwZSA9ICdMb2NhbGUgbWVzc2FnZXMgaW5mbyc7XG4gICAgY29uc3QgbG9jYWxlTWVzc2FnZXNTdGF0ZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IGxvY2FsZU1lc3NhZ2VzVHlwZSxcbiAgICAgICAgICAgIGtleTogJ21lc3NhZ2VzJyxcbiAgICAgICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiBnZXRMb2NhbGVNZXNzYWdlVmFsdWUoY29tcG9zZXIubWVzc2FnZXMudmFsdWUpXG4gICAgICAgIH1cbiAgICBdO1xuICAgIHN0YXRlW2xvY2FsZU1lc3NhZ2VzVHlwZV0gPSBsb2NhbGVNZXNzYWdlc1N0YXRlcztcbiAgICB7XG4gICAgICAgIGNvbnN0IGRhdGV0aW1lRm9ybWF0c1R5cGUgPSAnRGF0ZXRpbWUgZm9ybWF0cyBpbmZvJztcbiAgICAgICAgY29uc3QgZGF0ZXRpbWVGb3JtYXRzU3RhdGVzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IGRhdGV0aW1lRm9ybWF0c1R5cGUsXG4gICAgICAgICAgICAgICAga2V5OiAnZGF0ZXRpbWVGb3JtYXRzJyxcbiAgICAgICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGNvbXBvc2VyLmRhdGV0aW1lRm9ybWF0cy52YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgICAgICBzdGF0ZVtkYXRldGltZUZvcm1hdHNUeXBlXSA9IGRhdGV0aW1lRm9ybWF0c1N0YXRlcztcbiAgICAgICAgY29uc3QgbnVtYmVyRm9ybWF0c1R5cGUgPSAnRGF0ZXRpbWUgZm9ybWF0cyBpbmZvJztcbiAgICAgICAgY29uc3QgbnVtYmVyRm9ybWF0c1N0YXRlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBudW1iZXJGb3JtYXRzVHlwZSxcbiAgICAgICAgICAgICAgICBrZXk6ICdudW1iZXJGb3JtYXRzJyxcbiAgICAgICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGNvbXBvc2VyLm51bWJlckZvcm1hdHMudmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgICAgc3RhdGVbbnVtYmVyRm9ybWF0c1R5cGVdID0gbnVtYmVyRm9ybWF0c1N0YXRlcztcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlO1xufVxuZnVuY3Rpb24gYWRkVGltZWxpbmVFdmVudChldmVudCwgcGF5bG9hZCkge1xuICAgIGlmIChkZXZ0b29sc0FwaSkge1xuICAgICAgICBsZXQgZ3JvdXBJZDtcbiAgICAgICAgaWYgKHBheWxvYWQgJiYgJ2dyb3VwSWQnIGluIHBheWxvYWQpIHtcbiAgICAgICAgICAgIGdyb3VwSWQgPSBwYXlsb2FkLmdyb3VwSWQ7XG4gICAgICAgICAgICBkZWxldGUgcGF5bG9hZC5ncm91cElkO1xuICAgICAgICB9XG4gICAgICAgIGRldnRvb2xzQXBpLmFkZFRpbWVsaW5lRXZlbnQoe1xuICAgICAgICAgICAgbGF5ZXJJZDogXCJ2dWUtaTE4bi10aW1lbGluZVwiIC8qIFZ1ZURldlRvb2xzSURzLlRJTUVMSU5FICovLFxuICAgICAgICAgICAgZXZlbnQ6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogZXZlbnQsXG4gICAgICAgICAgICAgICAgZ3JvdXBJZCxcbiAgICAgICAgICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgIG1ldGE6IHt9LFxuICAgICAgICAgICAgICAgIGRhdGE6IHBheWxvYWQgfHwge30sXG4gICAgICAgICAgICAgICAgbG9nVHlwZTogZXZlbnQgPT09IFwiY29tcGlsZS1lcnJvclwiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuQ09NUElMRV9FUlJPUiAqL1xuICAgICAgICAgICAgICAgICAgICA/ICdlcnJvcidcbiAgICAgICAgICAgICAgICAgICAgOiBldmVudCA9PT0gXCJmYWxsYmFja1wiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuRkFMQkFDSyAqLyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgPT09IFwibWlzc2luZ1wiIC8qIFZ1ZURldlRvb2xzVGltZWxpbmVFdmVudHMuTUlTU0lORyAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnd2FybmluZydcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ2RlZmF1bHQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGVkaXRTY29wZShwYXlsb2FkLCBpMThuKSB7XG4gICAgY29uc3QgY29tcG9zZXIgPSBnZXRDb21wb3NlciQxKHBheWxvYWQubm9kZUlkLCBpMThuKTtcbiAgICBpZiAoY29tcG9zZXIpIHtcbiAgICAgICAgY29uc3QgW2ZpZWxkXSA9IHBheWxvYWQucGF0aDtcbiAgICAgICAgaWYgKGZpZWxkID09PSAnbG9jYWxlJyAmJiBpc1N0cmluZyhwYXlsb2FkLnN0YXRlLnZhbHVlKSkge1xuICAgICAgICAgICAgY29tcG9zZXIubG9jYWxlLnZhbHVlID0gcGF5bG9hZC5zdGF0ZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PT0gJ2ZhbGxiYWNrTG9jYWxlJyAmJlxuICAgICAgICAgICAgKGlzU3RyaW5nKHBheWxvYWQuc3RhdGUudmFsdWUpIHx8XG4gICAgICAgICAgICAgICAgaXNBcnJheShwYXlsb2FkLnN0YXRlLnZhbHVlKSB8fFxuICAgICAgICAgICAgICAgIGlzT2JqZWN0KHBheWxvYWQuc3RhdGUudmFsdWUpKSkge1xuICAgICAgICAgICAgY29tcG9zZXIuZmFsbGJhY2tMb2NhbGUudmFsdWUgPSBwYXlsb2FkLnN0YXRlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09PSAnaW5oZXJpdExvY2FsZScgJiYgaXNCb29sZWFuKHBheWxvYWQuc3RhdGUudmFsdWUpKSB7XG4gICAgICAgICAgICBjb21wb3Nlci5pbmhlcml0TG9jYWxlID0gcGF5bG9hZC5zdGF0ZS52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBTdXBwb3J0cyBjb21wYXRpYmlsaXR5IGZvciBsZWdhY3kgdnVlLWkxOG4gQVBJc1xuICogVGhpcyBtaXhpbiBpcyB1c2VkIHdoZW4gd2UgdXNlIHZ1ZS1pMThuQHY5Lnggb3IgbGF0ZXJcbiAqL1xuZnVuY3Rpb24gZGVmaW5lTWl4aW4odnVlaTE4biwgY29tcG9zZXIsIGkxOG4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBiZWZvcmVDcmVhdGUoKSB7XG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLlVORVhQRUNURURfRVJST1IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnM7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pMThuKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uc0kxOG4gPSBvcHRpb25zLmkxOG47XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuX19pMThuKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNJMThuLl9faTE4biA9IG9wdGlvbnMuX19pMThuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvcHRpb25zSTE4bi5fX3Jvb3QgPSBjb21wb3NlcjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcyA9PT0gdGhpcy4kcm9vdCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBtZXJnZSBvcHRpb24gYW5kIGd0dGFjaCBnbG9iYWxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaTE4biA9IG1lcmdlVG9HbG9iYWwodnVlaTE4biwgb3B0aW9uc0kxOG4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0kxOG4uX19pbmplY3RXaXRoT3B0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0kxOG4uX19leHRlbmRlciA9IGkxOG4uX192dWVJMThuRXh0ZW5kO1xuICAgICAgICAgICAgICAgICAgICAvLyBhdHR0YWNoIGxvY2FsIFZ1ZUkxOG4gaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaTE4biA9IGNyZWF0ZVZ1ZUkxOG4ob3B0aW9uc0kxOG4pO1xuICAgICAgICAgICAgICAgICAgICAvLyBleHRlbmQgVnVlSTE4biBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBfdnVlSTE4biA9IHRoaXMuJGkxOG47XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdnVlSTE4bi5fX2V4dGVuZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdnVlSTE4bi5fX2Rpc3Bvc2VyID0gX3Z1ZUkxOG4uX19leHRlbmRlcih0aGlzLiRpMThuKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuX19pMThuKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMgPT09IHRoaXMuJHJvb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWVyZ2Ugb3B0aW9uIGFuZCBndHRhY2ggZ2xvYmFsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGkxOG4gPSBtZXJnZVRvR2xvYmFsKHZ1ZWkxOG4sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXR0dGFjaCBsb2NhbCBWdWVJMThuIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGkxOG4gPSBjcmVhdGVWdWVJMThuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9faTE4bjogb3B0aW9ucy5fX2kxOG4sXG4gICAgICAgICAgICAgICAgICAgICAgICBfX2luamVjdFdpdGhPcHRpb246IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBfX2V4dGVuZGVyOiBpMThuLl9fdnVlSTE4bkV4dGVuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fcm9vdDogY29tcG9zZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dGVuZCBWdWVJMThuIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IF92dWVJMThuID0gdGhpcy4kaTE4bjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF92dWVJMThuLl9fZXh0ZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92dWVJMThuLl9fZGlzcG9zZXIgPSBfdnVlSTE4bi5fX2V4dGVuZGVyKHRoaXMuJGkxOG4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYXR0YWNoIGdsb2JhbCBWdWVJMThuIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgdGhpcy4kaTE4biA9IHZ1ZWkxOG47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5fX2kxOG5HbG9iYWwpIHtcbiAgICAgICAgICAgICAgICBhZGp1c3RJMThuUmVzb3VyY2VzKGNvbXBvc2VyLCBvcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRlZmluZXMgdnVlLWkxOG4gbGVnYWN5IEFQSXNcbiAgICAgICAgICAgIHRoaXMuJHQgPSAoLi4uYXJncykgPT4gdGhpcy4kaTE4bi50KC4uLmFyZ3MpO1xuICAgICAgICAgICAgdGhpcy4kcnQgPSAoLi4uYXJncykgPT4gdGhpcy4kaTE4bi5ydCguLi5hcmdzKTtcbiAgICAgICAgICAgIHRoaXMuJHRjID0gKC4uLmFyZ3MpID0+IHRoaXMuJGkxOG4udGMoLi4uYXJncyk7XG4gICAgICAgICAgICB0aGlzLiR0ZSA9IChrZXksIGxvY2FsZSkgPT4gdGhpcy4kaTE4bi50ZShrZXksIGxvY2FsZSk7XG4gICAgICAgICAgICB0aGlzLiRkID0gKC4uLmFyZ3MpID0+IHRoaXMuJGkxOG4uZCguLi5hcmdzKTtcbiAgICAgICAgICAgIHRoaXMuJG4gPSAoLi4uYXJncykgPT4gdGhpcy4kaTE4bi5uKC4uLmFyZ3MpO1xuICAgICAgICAgICAgdGhpcy4kdG0gPSAoa2V5KSA9PiB0aGlzLiRpMThuLnRtKGtleSk7XG4gICAgICAgICAgICBpMThuLl9fc2V0SW5zdGFuY2UoaW5zdGFuY2UsIHRoaXMuJGkxOG4pO1xuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAoKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pICYmXG4gICAgICAgICAgICAgICAgIWZhbHNlICYmXG4gICAgICAgICAgICAgICAgdGhpcy4kZWwgJiZcbiAgICAgICAgICAgICAgICB0aGlzLiRpMThuKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgX3Z1ZUkxOG4gPSB0aGlzLiRpMThuO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsLl9fVlVFX0kxOE5fXyA9IF92dWVJMThuLl9fY29tcG9zZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9ICh0aGlzLl9fdl9lbWl0dGVyID1cbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRW1pdHRlcigpKTtcbiAgICAgICAgICAgICAgICBfdnVlSTE4bi5fX2VuYWJsZUVtaXR0ZXIgJiYgX3Z1ZUkxOG4uX19lbmFibGVFbWl0dGVyKGVtaXR0ZXIpO1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIub24oJyonLCBhZGRUaW1lbGluZUV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdW5tb3VudGVkKCkge1xuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKCFpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VSUk9SKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IF92dWVJMThuID0gdGhpcy4kaTE4bjtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKCgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSAmJlxuICAgICAgICAgICAgICAgICFmYWxzZSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuJGVsICYmXG4gICAgICAgICAgICAgICAgdGhpcy4kZWwuX19WVUVfSTE4Tl9fKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX192X2VtaXR0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3ZfZW1pdHRlci5vZmYoJyonLCBhZGRUaW1lbGluZUV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX192X2VtaXR0ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRpMThuKSB7XG4gICAgICAgICAgICAgICAgICAgIF92dWVJMThuLl9fZGlzYWJsZUVtaXR0ZXIgJiYgX3Z1ZUkxOG4uX19kaXNhYmxlRW1pdHRlcigpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy4kZWwuX19WVUVfSTE4Tl9fO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiR0O1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHJ0O1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHRjO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHRlO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJGQ7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kbjtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiR0bTtcbiAgICAgICAgICAgIGlmIChfdnVlSTE4bi5fX2Rpc3Bvc2VyKSB7XG4gICAgICAgICAgICAgICAgX3Z1ZUkxOG4uX19kaXNwb3NlcigpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBfdnVlSTE4bi5fX2Rpc3Bvc2VyO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBfdnVlSTE4bi5fX2V4dGVuZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaTE4bi5fX2RlbGV0ZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiRpMThuO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIG1lcmdlVG9HbG9iYWwoZywgb3B0aW9ucykge1xuICAgIGcubG9jYWxlID0gb3B0aW9ucy5sb2NhbGUgfHwgZy5sb2NhbGU7XG4gICAgZy5mYWxsYmFja0xvY2FsZSA9IG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUgfHwgZy5mYWxsYmFja0xvY2FsZTtcbiAgICBnLm1pc3NpbmcgPSBvcHRpb25zLm1pc3NpbmcgfHwgZy5taXNzaW5nO1xuICAgIGcuc2lsZW50VHJhbnNsYXRpb25XYXJuID1cbiAgICAgICAgb3B0aW9ucy5zaWxlbnRUcmFuc2xhdGlvbldhcm4gfHwgZy5zaWxlbnRGYWxsYmFja1dhcm47XG4gICAgZy5zaWxlbnRGYWxsYmFja1dhcm4gPSBvcHRpb25zLnNpbGVudEZhbGxiYWNrV2FybiB8fCBnLnNpbGVudEZhbGxiYWNrV2FybjtcbiAgICBnLmZvcm1hdEZhbGxiYWNrTWVzc2FnZXMgPVxuICAgICAgICBvcHRpb25zLmZvcm1hdEZhbGxiYWNrTWVzc2FnZXMgfHwgZy5mb3JtYXRGYWxsYmFja01lc3NhZ2VzO1xuICAgIGcucG9zdFRyYW5zbGF0aW9uID0gb3B0aW9ucy5wb3N0VHJhbnNsYXRpb24gfHwgZy5wb3N0VHJhbnNsYXRpb247XG4gICAgZy53YXJuSHRtbEluTWVzc2FnZSA9IG9wdGlvbnMud2Fybkh0bWxJbk1lc3NhZ2UgfHwgZy53YXJuSHRtbEluTWVzc2FnZTtcbiAgICBnLmVzY2FwZVBhcmFtZXRlckh0bWwgPSBvcHRpb25zLmVzY2FwZVBhcmFtZXRlckh0bWwgfHwgZy5lc2NhcGVQYXJhbWV0ZXJIdG1sO1xuICAgIGcuc3luYyA9IG9wdGlvbnMuc3luYyB8fCBnLnN5bmM7XG4gICAgZy5fX2NvbXBvc2VyW1NldFBsdXJhbFJ1bGVzU3ltYm9sXShvcHRpb25zLnBsdXJhbGl6YXRpb25SdWxlcyB8fCBnLnBsdXJhbGl6YXRpb25SdWxlcyk7XG4gICAgY29uc3QgbWVzc2FnZXMgPSBnZXRMb2NhbGVNZXNzYWdlcyhnLmxvY2FsZSwge1xuICAgICAgICBtZXNzYWdlczogb3B0aW9ucy5tZXNzYWdlcyxcbiAgICAgICAgX19pMThuOiBvcHRpb25zLl9faTE4blxuICAgIH0pO1xuICAgIE9iamVjdC5rZXlzKG1lc3NhZ2VzKS5mb3JFYWNoKGxvY2FsZSA9PiBnLm1lcmdlTG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2VzW2xvY2FsZV0pKTtcbiAgICBpZiAob3B0aW9ucy5kYXRldGltZUZvcm1hdHMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucy5kYXRldGltZUZvcm1hdHMpLmZvckVhY2gobG9jYWxlID0+IGcubWVyZ2VEYXRlVGltZUZvcm1hdChsb2NhbGUsIG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzW2xvY2FsZV0pKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubnVtYmVyRm9ybWF0cykge1xuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zLm51bWJlckZvcm1hdHMpLmZvckVhY2gobG9jYWxlID0+IGcubWVyZ2VOdW1iZXJGb3JtYXQobG9jYWxlLCBvcHRpb25zLm51bWJlckZvcm1hdHNbbG9jYWxlXSkpO1xuICAgIH1cbiAgICByZXR1cm4gZztcbn1cblxuLyoqXG4gKiBJbmplY3Rpb24ga2V5IGZvciB7QGxpbmsgdXNlSTE4bn1cbiAqXG4gKiBAcmVtYXJrc1xuICogVGhlIGdsb2JhbCBpbmplY3Rpb24ga2V5IGZvciBJMThuIGluc3RhbmNlcyB3aXRoIGB1c2VJMThuYC4gdGhpcyBpbmplY3Rpb24ga2V5IGlzIHVzZWQgaW4gV2ViIENvbXBvbmVudHMuXG4gKiBTcGVjaWZ5IHRoZSBpMThuIGluc3RhbmNlIGNyZWF0ZWQgYnkge0BsaW5rIGNyZWF0ZUkxOG59IHRvZ2V0aGVyIHdpdGggYHByb3ZpZGVgIGZ1bmN0aW9uLlxuICpcbiAqIEBWdWVJMThuR2VuZXJhbFxuICovXG5jb25zdCBJMThuSW5qZWN0aW9uS2V5ID0gXG4vKiAjX19QVVJFX18qLyBtYWtlU3ltYm9sKCdnbG9iYWwtdnVlLWkxOG4nKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5mdW5jdGlvbiBjcmVhdGVJMThuKG9wdGlvbnMgPSB7fSwgVnVlSTE4bkxlZ2FjeSkge1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IF9fbGVnYWN5TW9kZSA9IF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fICYmIGlzQm9vbGVhbihvcHRpb25zLmxlZ2FjeSlcbiAgICAgICAgICAgID8gb3B0aW9ucy5sZWdhY3lcbiAgICAgICAgICAgIDogX19WVUVfSTE4Tl9MRUdBQ1lfQVBJX187XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgX19nbG9iYWxJbmplY3Rpb24gPSBpc0Jvb2xlYW4ob3B0aW9ucy5nbG9iYWxJbmplY3Rpb24pXG4gICAgICAgID8gb3B0aW9ucy5nbG9iYWxJbmplY3Rpb25cbiAgICAgICAgOiB0cnVlO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IF9fYWxsb3dDb21wb3NpdGlvbiA9IF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fICYmIF9fbGVnYWN5TW9kZVxuICAgICAgICAgICAgPyAhIW9wdGlvbnMuYWxsb3dDb21wb3NpdGlvblxuICAgICAgICAgICAgOiB0cnVlO1xuICAgIGNvbnN0IF9faW5zdGFuY2VzID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IFtnbG9iYWxTY29wZSwgX19nbG9iYWxdID0gY3JlYXRlR2xvYmFsKG9wdGlvbnMsIF9fbGVnYWN5TW9kZSk7XG4gICAgY29uc3Qgc3ltYm9sID0gLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgPyAndnVlLWkxOG4nIDogJycpO1xuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcbiAgICAgICAgaWYgKF9fbGVnYWN5TW9kZSAmJiBfX2FsbG93Q29tcG9zaXRpb24pIHtcbiAgICAgICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RJQ0VfRFJPUF9BTExPV19DT01QT1NJVElPTikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIF9fZ2V0SW5zdGFuY2UoY29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybiBfX2luc3RhbmNlcy5nZXQoY29tcG9uZW50KSB8fCBudWxsO1xuICAgIH1cbiAgICBmdW5jdGlvbiBfX3NldEluc3RhbmNlKGNvbXBvbmVudCwgaW5zdGFuY2UpIHtcbiAgICAgICAgX19pbnN0YW5jZXMuc2V0KGNvbXBvbmVudCwgaW5zdGFuY2UpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBfX2RlbGV0ZUluc3RhbmNlKGNvbXBvbmVudCkge1xuICAgICAgICBfX2luc3RhbmNlcy5kZWxldGUoY29tcG9uZW50KTtcbiAgICB9XG4gICAge1xuICAgICAgICBjb25zdCBpMThuID0ge1xuICAgICAgICAgICAgLy8gbW9kZVxuICAgICAgICAgICAgZ2V0IG1vZGUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fICYmIF9fbGVnYWN5TW9kZVxuICAgICAgICAgICAgICAgICAgICA/ICdsZWdhY3knXG4gICAgICAgICAgICAgICAgICAgIDogJ2NvbXBvc2l0aW9uJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBhbGxvd0NvbXBvc2l0aW9uXG4gICAgICAgICAgICBnZXQgYWxsb3dDb21wb3NpdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX19hbGxvd0NvbXBvc2l0aW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIGluc3RhbGwgcGx1Z2luXG4gICAgICAgICAgICBhc3luYyBpbnN0YWxsKGFwcCwgLi4ub3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICgoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykgJiZcbiAgICAgICAgICAgICAgICAgICAgIWZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5fX1ZVRV9JMThOX18gPSBpMThuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBzZXR1cCBnbG9iYWwgcHJvdmlkZXJcbiAgICAgICAgICAgICAgICBhcHAuX19WVUVfSTE4Tl9TWU1CT0xfXyA9IHN5bWJvbDtcbiAgICAgICAgICAgICAgICBhcHAucHJvdmlkZShhcHAuX19WVUVfSTE4Tl9TWU1CT0xfXywgaTE4bik7XG4gICAgICAgICAgICAgICAgLy8gc2V0IGNvbXBvc2VyICYgdnVlaTE4biBleHRlbmQgaG9vayBvcHRpb25zIGZyb20gcGx1Z2luIG9wdGlvbnNcbiAgICAgICAgICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChvcHRpb25zWzBdKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHRzID0gb3B0aW9uc1swXTtcbiAgICAgICAgICAgICAgICAgICAgaTE4bi5fX2NvbXBvc2VyRXh0ZW5kID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuX19jb21wb3NlckV4dGVuZDtcbiAgICAgICAgICAgICAgICAgICAgaTE4bi5fX3Z1ZUkxOG5FeHRlbmQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5fX3Z1ZUkxOG5FeHRlbmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGdsb2JhbCBtZXRob2QgYW5kIHByb3BlcnRpZXMgaW5qZWN0aW9uIGZvciBDb21wb3NpdGlvbiBBUElcbiAgICAgICAgICAgICAgICBsZXQgZ2xvYmFsUmVsZWFzZUhhbmRsZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICghX19sZWdhY3lNb2RlICYmIF9fZ2xvYmFsSW5qZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbFJlbGVhc2VIYW5kbGVyID0gaW5qZWN0R2xvYmFsRmllbGRzKGFwcCwgaTE4bi5nbG9iYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpbnN0YWxsIGJ1aWx0LWluIGNvbXBvbmVudHMgYW5kIGRpcmVjdGl2ZVxuICAgICAgICAgICAgICAgIGlmIChfX1ZVRV9JMThOX0ZVTExfSU5TVEFMTF9fKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5KGFwcCwgaTE4biwgLi4ub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHNldHVwIG1peGluIGZvciBMZWdhY3kgQVBJXG4gICAgICAgICAgICAgICAgaWYgKF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fICYmIF9fbGVnYWN5TW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBhcHAubWl4aW4oZGVmaW5lTWl4aW4oX19nbG9iYWwsIF9fZ2xvYmFsLl9fY29tcG9zZXIsIGkxOG4pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gcmVsZWFzZSBnbG9iYWwgc2NvcGVcbiAgICAgICAgICAgICAgICBjb25zdCB1bm1vdW50QXBwID0gYXBwLnVubW91bnQ7XG4gICAgICAgICAgICAgICAgYXBwLnVubW91bnQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbFJlbGVhc2VIYW5kbGVyICYmIGdsb2JhbFJlbGVhc2VIYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGkxOG4uZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB1bm1vdW50QXBwKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvLyBzZXR1cCB2dWUtZGV2dG9vbHMgcGx1Z2luXG4gICAgICAgICAgICAgICAgaWYgKCgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSAmJiAhZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgZW5hYmxlRGV2VG9vbHMoYXBwLCBpMThuKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5DQU5OT1RfU0VUVVBfVlVFX0RFVlRPT0xTX1BMVUdJTik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IGNyZWF0ZUVtaXR0ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9fbGVnYWN5TW9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgX3Z1ZUkxOG4gPSBfX2dsb2JhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92dWVJMThuLl9fZW5hYmxlRW1pdHRlciAmJiBfdnVlSTE4bi5fX2VuYWJsZUVtaXR0ZXIoZW1pdHRlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgX2NvbXBvc2VyID0gX19nbG9iYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICBfY29tcG9zZXJbRW5hYmxlRW1pdHRlcl0gJiYgX2NvbXBvc2VyW0VuYWJsZUVtaXR0ZXJdKGVtaXR0ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIub24oJyonLCBhZGRUaW1lbGluZUV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZ2xvYmFsIGFjY2Vzc29yXG4gICAgICAgICAgICBnZXQgZ2xvYmFsKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfX2dsb2JhbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXNwb3NlKCkge1xuICAgICAgICAgICAgICAgIGdsb2JhbFNjb3BlLnN0b3AoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBAaW50ZXJuYWxcbiAgICAgICAgICAgIF9faW5zdGFuY2VzLFxuICAgICAgICAgICAgLy8gQGludGVybmFsXG4gICAgICAgICAgICBfX2dldEluc3RhbmNlLFxuICAgICAgICAgICAgLy8gQGludGVybmFsXG4gICAgICAgICAgICBfX3NldEluc3RhbmNlLFxuICAgICAgICAgICAgLy8gQGludGVybmFsXG4gICAgICAgICAgICBfX2RlbGV0ZUluc3RhbmNlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBpMThuO1xuICAgIH1cbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG5mdW5jdGlvbiB1c2VJMThuKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGluc3RhbmNlID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG4gICAgaWYgKGluc3RhbmNlID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLk1VU1RfQkVfQ0FMTF9TRVRVUF9UT1ApO1xuICAgIH1cbiAgICBpZiAoIWluc3RhbmNlLmlzQ0UgJiZcbiAgICAgICAgaW5zdGFuY2UuYXBwQ29udGV4dC5hcHAgIT0gbnVsbCAmJlxuICAgICAgICAhaW5zdGFuY2UuYXBwQ29udGV4dC5hcHAuX19WVUVfSTE4Tl9TWU1CT0xfXykge1xuICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuTk9UX0lOU1RBTExFRCk7XG4gICAgfVxuICAgIGNvbnN0IGkxOG4gPSBnZXRJMThuSW5zdGFuY2UoaW5zdGFuY2UpO1xuICAgIGNvbnN0IGdsID0gZ2V0R2xvYmFsQ29tcG9zZXIoaTE4bik7XG4gICAgY29uc3QgY29tcG9uZW50T3B0aW9ucyA9IGdldENvbXBvbmVudE9wdGlvbnMoaW5zdGFuY2UpO1xuICAgIGNvbnN0IHNjb3BlID0gZ2V0U2NvcGUob3B0aW9ucywgY29tcG9uZW50T3B0aW9ucyk7XG4gICAgaWYgKF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGlmIChpMThuLm1vZGUgPT09ICdsZWdhY3knICYmICFvcHRpb25zLl9fdXNlQ29tcG9uZW50KSB7XG4gICAgICAgICAgICBpZiAoIWkxOG4uYWxsb3dDb21wb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5OT1RfQVZBSUxBQkxFX0lOX0xFR0FDWV9NT0RFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1c2VJMThuRm9yTGVnYWN5KGluc3RhbmNlLCBzY29wZSwgZ2wsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzY29wZSA9PT0gJ2dsb2JhbCcpIHtcbiAgICAgICAgYWRqdXN0STE4blJlc291cmNlcyhnbCwgb3B0aW9ucywgY29tcG9uZW50T3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBnbDtcbiAgICB9XG4gICAgaWYgKHNjb3BlID09PSAncGFyZW50Jykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBsZXQgY29tcG9zZXIgPSBnZXRDb21wb3NlcihpMThuLCBpbnN0YW5jZSwgb3B0aW9ucy5fX3VzZUNvbXBvbmVudCk7XG4gICAgICAgIGlmIChjb21wb3NlciA9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLk5PVF9GT1VORF9QQVJFTlRfU0NPUEUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbXBvc2VyID0gZ2w7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBvc2VyO1xuICAgIH1cbiAgICBjb25zdCBpMThuSW50ZXJuYWwgPSBpMThuO1xuICAgIGxldCBjb21wb3NlciA9IGkxOG5JbnRlcm5hbC5fX2dldEluc3RhbmNlKGluc3RhbmNlKTtcbiAgICBpZiAoY29tcG9zZXIgPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjb21wb3Nlck9wdGlvbnMgPSBhc3NpZ24oe30sIG9wdGlvbnMpO1xuICAgICAgICBpZiAoJ19faTE4bicgaW4gY29tcG9uZW50T3B0aW9ucykge1xuICAgICAgICAgICAgY29tcG9zZXJPcHRpb25zLl9faTE4biA9IGNvbXBvbmVudE9wdGlvbnMuX19pMThuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnbCkge1xuICAgICAgICAgICAgY29tcG9zZXJPcHRpb25zLl9fcm9vdCA9IGdsO1xuICAgICAgICB9XG4gICAgICAgIGNvbXBvc2VyID0gY3JlYXRlQ29tcG9zZXIoY29tcG9zZXJPcHRpb25zKTtcbiAgICAgICAgaWYgKGkxOG5JbnRlcm5hbC5fX2NvbXBvc2VyRXh0ZW5kKSB7XG4gICAgICAgICAgICBjb21wb3NlcltEaXNwb3NlU3ltYm9sXSA9XG4gICAgICAgICAgICAgICAgaTE4bkludGVybmFsLl9fY29tcG9zZXJFeHRlbmQoY29tcG9zZXIpO1xuICAgICAgICB9XG4gICAgICAgIHNldHVwTGlmZUN5Y2xlKGkxOG5JbnRlcm5hbCwgaW5zdGFuY2UsIGNvbXBvc2VyKTtcbiAgICAgICAgaTE4bkludGVybmFsLl9fc2V0SW5zdGFuY2UoaW5zdGFuY2UsIGNvbXBvc2VyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvc2VyO1xufVxuLyoqXG4gKiBDYXN0IHRvIFZ1ZUkxOG4gbGVnYWN5IGNvbXBhdGlibGUgdHlwZVxuICpcbiAqIEByZW1hcmtzXG4gKiBUaGlzIEFQSSBpcyBwcm92aWRlZCBvbmx5IHdpdGggW3Z1ZS1pMThuLWJyaWRnZV0oaHR0cHM6Ly92dWUtaTE4bi5pbnRsaWZ5LmRldi9ndWlkZS9taWdyYXRpb24vd2F5cy5odG1sI3doYXQtaXMtdnVlLWkxOG4tYnJpZGdlKS5cbiAqXG4gKiBUaGUgcHVycG9zZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGNvbnZlcnQgYW4ge0BsaW5rIEkxOG59IGluc3RhbmNlIGNyZWF0ZWQgd2l0aCB7QGxpbmsgY3JlYXRlSTE4biB8IGNyZWF0ZUkxOG4obGVnYWN5OiB0cnVlKX0gaW50byBhIGB2dWUtaTE4bkB2OC54YCBjb21wYXRpYmxlIGluc3RhbmNlIG9mIGBuZXcgVnVlSTE4bmAgaW4gYSBUeXBlU2NyaXB0IGVudmlyb25tZW50LlxuICpcbiAqIEBwYXJhbSBpMThuIC0gQW4gaW5zdGFuY2Ugb2Yge0BsaW5rIEkxOG59XG4gKiBAcmV0dXJucyBBIGkxOG4gaW5zdGFuY2Ugd2hpY2ggaXMgY2FzdGVkIHRvIHtAbGluayBWdWVJMThufSB0eXBlXG4gKlxuICogQFZ1ZUkxOG5UaXBcbiAqIDpuZXc6IHByb3ZpZGVkIGJ5ICoqdnVlLWkxOG4tYnJpZGdlIG9ubHkqKlxuICpcbiAqIEBWdWVJMThuR2VuZXJhbFxuICovXG5jb25zdCBjYXN0VG9WdWVJMThuID0gLyogI19fUFVSRV9fKi8gKGkxOG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4pID0+IHtcbiAgICBpZiAoIShfX1ZVRV9JMThOX0JSSURHRV9fIGluIGkxOG4pKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5OT1RfQ09NUEFUSUJMRV9MRUdBQ1lfVlVFX0kxOE4pO1xuICAgIH1cbiAgICByZXR1cm4gaTE4bjtcbn07XG5mdW5jdGlvbiBjcmVhdGVHbG9iYWwob3B0aW9ucywgbGVnYWN5TW9kZSwgVnVlSTE4bkxlZ2FjeSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbikge1xuICAgIGNvbnN0IHNjb3BlID0gZWZmZWN0U2NvcGUoKTtcbiAgICB7XG4gICAgICAgIGNvbnN0IG9iaiA9IF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fICYmIGxlZ2FjeU1vZGVcbiAgICAgICAgICAgID8gc2NvcGUucnVuKCgpID0+IGNyZWF0ZVZ1ZUkxOG4ob3B0aW9ucykpXG4gICAgICAgICAgICA6IHNjb3BlLnJ1bigoKSA9PiBjcmVhdGVDb21wb3NlcihvcHRpb25zKSk7XG4gICAgICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLlVORVhQRUNURURfRVJST1IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbc2NvcGUsIG9ial07XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0STE4bkluc3RhbmNlKGluc3RhbmNlKSB7XG4gICAge1xuICAgICAgICBjb25zdCBpMThuID0gaW5qZWN0KCFpbnN0YW5jZS5pc0NFXG4gICAgICAgICAgICA/IGluc3RhbmNlLmFwcENvbnRleHQuYXBwLl9fVlVFX0kxOE5fU1lNQk9MX19cbiAgICAgICAgICAgIDogSTE4bkluamVjdGlvbktleSk7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoIWkxOG4pIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcighaW5zdGFuY2UuaXNDRVxuICAgICAgICAgICAgICAgID8gSTE4bkVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FUlJPUlxuICAgICAgICAgICAgICAgIDogSTE4bkVycm9yQ29kZXMuTk9UX0lOU1RBTExFRF9XSVRIX1BST1ZJREUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpMThuO1xuICAgIH1cbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5mdW5jdGlvbiBnZXRTY29wZShvcHRpb25zLCBjb21wb25lbnRPcHRpb25zKSB7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgcmV0dXJuIGlzRW1wdHlPYmplY3Qob3B0aW9ucylcbiAgICAgICAgPyAoJ19faTE4bicgaW4gY29tcG9uZW50T3B0aW9ucylcbiAgICAgICAgICAgID8gJ2xvY2FsJ1xuICAgICAgICAgICAgOiAnZ2xvYmFsJ1xuICAgICAgICA6ICFvcHRpb25zLnVzZVNjb3BlXG4gICAgICAgICAgICA/ICdsb2NhbCdcbiAgICAgICAgICAgIDogb3B0aW9ucy51c2VTY29wZTtcbn1cbmZ1bmN0aW9uIGdldEdsb2JhbENvbXBvc2VyKGkxOG4pIHtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICByZXR1cm4gaTE4bi5tb2RlID09PSAnY29tcG9zaXRpb24nXG4gICAgICAgICAgICA/IGkxOG4uZ2xvYmFsXG4gICAgICAgICAgICA6IGkxOG4uZ2xvYmFsLl9fY29tcG9zZXJcbiAgICAgICAgO1xufVxuZnVuY3Rpb24gZ2V0Q29tcG9zZXIoaTE4biwgdGFyZ2V0LCB1c2VDb21wb25lbnQgPSBmYWxzZSkge1xuICAgIGxldCBjb21wb3NlciA9IG51bGw7XG4gICAgY29uc3Qgcm9vdCA9IHRhcmdldC5yb290O1xuICAgIGxldCBjdXJyZW50ID0gZ2V0UGFyZW50Q29tcG9uZW50SW5zdGFuY2UodGFyZ2V0LCB1c2VDb21wb25lbnQpO1xuICAgIHdoaWxlIChjdXJyZW50ICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgaTE4bkludGVybmFsID0gaTE4bjtcbiAgICAgICAgaWYgKGkxOG4ubW9kZSA9PT0gJ2NvbXBvc2l0aW9uJykge1xuICAgICAgICAgICAgY29tcG9zZXIgPSBpMThuSW50ZXJuYWwuX19nZXRJbnN0YW5jZShjdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChfX1ZVRV9JMThOX0xFR0FDWV9BUElfXykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZ1ZUkxOG4gPSBpMThuSW50ZXJuYWwuX19nZXRJbnN0YW5jZShjdXJyZW50KTtcbiAgICAgICAgICAgICAgICBpZiAodnVlSTE4biAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvc2VyID0gdnVlSTE4blxuICAgICAgICAgICAgICAgICAgICAgICAgLl9fY29tcG9zZXI7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VDb21wb25lbnQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvc2VyICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhY29tcG9zZXJbSW5lamN0V2l0aE9wdGlvblN5bWJvbF0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9zZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb21wb3NlciAhPSBudWxsKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAocm9vdCA9PT0gY3VycmVudCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9zZXI7XG59XG5mdW5jdGlvbiBnZXRQYXJlbnRDb21wb25lbnRJbnN0YW5jZSh0YXJnZXQsIHVzZUNvbXBvbmVudCA9IGZhbHNlKSB7XG4gICAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB7XG4gICAgICAgIC8vIGlmIGB1c2VDb21wb25lbnQ6IHRydWVgIHdpbGwgYmUgc3BlY2lmaWVkLCB3ZSBnZXQgbGV4aWNhbCBzY29wZSBvd25lciBpbnN0YW5jZSBmb3IgdXNlLWNhc2Ugc2xvdHNcbiAgICAgICAgcmV0dXJuICF1c2VDb21wb25lbnRcbiAgICAgICAgICAgID8gdGFyZ2V0LnBhcmVudFxuICAgICAgICAgICAgOiB0YXJnZXQudm5vZGUuY3R4IHx8IHRhcmdldC5wYXJlbnQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIH1cbn1cbmZ1bmN0aW9uIHNldHVwTGlmZUN5Y2xlKGkxOG4sIHRhcmdldCwgY29tcG9zZXIpIHtcbiAgICBsZXQgZW1pdHRlciA9IG51bGw7XG4gICAge1xuICAgICAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgICAgICAgLy8gaW5qZWN0IGNvbXBvc2VyIGluc3RhbmNlIHRvIERPTSBmb3IgaW50bGlmeS1kZXZ0b29sc1xuICAgICAgICAgICAgaWYgKCgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSAmJlxuICAgICAgICAgICAgICAgICFmYWxzZSAmJlxuICAgICAgICAgICAgICAgIHRhcmdldC52bm9kZS5lbCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC52bm9kZS5lbC5fX1ZVRV9JMThOX18gPSBjb21wb3NlcjtcbiAgICAgICAgICAgICAgICBlbWl0dGVyID0gY3JlYXRlRW1pdHRlcigpO1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgICAgY29uc3QgX2NvbXBvc2VyID0gY29tcG9zZXI7XG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyW0VuYWJsZUVtaXR0ZXJdICYmIF9jb21wb3NlcltFbmFibGVFbWl0dGVyXShlbWl0dGVyKTtcbiAgICAgICAgICAgICAgICBlbWl0dGVyLm9uKCcqJywgYWRkVGltZWxpbmVFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRhcmdldCk7XG4gICAgICAgIG9uVW5tb3VudGVkKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBjb25zdCBfY29tcG9zZXIgPSBjb21wb3NlcjtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBjb21wb3NlciBpbnN0YW5jZSBmcm9tIERPTSBmb3IgaW50bGlmeS1kZXZ0b29sc1xuICAgICAgICAgICAgaWYgKCgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSAmJlxuICAgICAgICAgICAgICAgICFmYWxzZSAmJlxuICAgICAgICAgICAgICAgIHRhcmdldC52bm9kZS5lbCAmJlxuICAgICAgICAgICAgICAgIHRhcmdldC52bm9kZS5lbC5fX1ZVRV9JMThOX18pIHtcbiAgICAgICAgICAgICAgICBlbWl0dGVyICYmIGVtaXR0ZXIub2ZmKCcqJywgYWRkVGltZWxpbmVFdmVudCk7XG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyW0Rpc2FibGVFbWl0dGVyXSAmJiBfY29tcG9zZXJbRGlzYWJsZUVtaXR0ZXJdKCk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRhcmdldC52bm9kZS5lbC5fX1ZVRV9JMThOX187XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpMThuLl9fZGVsZXRlSW5zdGFuY2UodGFyZ2V0KTtcbiAgICAgICAgICAgIC8vIGRpc3Bvc2UgZXh0ZW5kZWQgcmVzb3VyY2VzXG4gICAgICAgICAgICBjb25zdCBkaXNwb3NlID0gX2NvbXBvc2VyW0Rpc3Bvc2VTeW1ib2xdO1xuICAgICAgICAgICAgaWYgKGRpc3Bvc2UpIHtcbiAgICAgICAgICAgICAgICBkaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIF9jb21wb3NlcltEaXNwb3NlU3ltYm9sXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGFyZ2V0KTtcbiAgICB9XG59XG5mdW5jdGlvbiB1c2VJMThuRm9yTGVnYWN5KGluc3RhbmNlLCBzY29wZSwgcm9vdCwgb3B0aW9ucyA9IHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuKSB7XG4gICAgY29uc3QgaXNMb2NhbFNjb3BlID0gc2NvcGUgPT09ICdsb2NhbCc7XG4gICAgY29uc3QgX2NvbXBvc2VyID0gc2hhbGxvd1JlZihudWxsKTtcbiAgICBpZiAoaXNMb2NhbFNjb3BlICYmXG4gICAgICAgIGluc3RhbmNlLnByb3h5ICYmXG4gICAgICAgICEoaW5zdGFuY2UucHJveHkuJG9wdGlvbnMuaTE4biB8fCBpbnN0YW5jZS5wcm94eS4kb3B0aW9ucy5fX2kxOG4pKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5NVVNUX0RFRklORV9JMThOX09QVElPTl9JTl9BTExPV19DT01QT1NJVElPTik7XG4gICAgfVxuICAgIGNvbnN0IF9pbmhlcml0TG9jYWxlID0gaXNCb29sZWFuKG9wdGlvbnMuaW5oZXJpdExvY2FsZSlcbiAgICAgICAgPyBvcHRpb25zLmluaGVyaXRMb2NhbGVcbiAgICAgICAgOiAhaXNTdHJpbmcob3B0aW9ucy5sb2NhbGUpO1xuICAgIGNvbnN0IF9sb2NhbGUgPSByZWYoXG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgIWlzTG9jYWxTY29wZSB8fCBfaW5oZXJpdExvY2FsZVxuICAgICAgICA/IHJvb3QubG9jYWxlLnZhbHVlXG4gICAgICAgIDogaXNTdHJpbmcob3B0aW9ucy5sb2NhbGUpXG4gICAgICAgICAgICA/IG9wdGlvbnMubG9jYWxlXG4gICAgICAgICAgICA6IERFRkFVTFRfTE9DQUxFKTtcbiAgICBjb25zdCBfZmFsbGJhY2tMb2NhbGUgPSByZWYoXG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgIWlzTG9jYWxTY29wZSB8fCBfaW5oZXJpdExvY2FsZVxuICAgICAgICA/IHJvb3QuZmFsbGJhY2tMb2NhbGUudmFsdWVcbiAgICAgICAgOiBpc1N0cmluZyhvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxuICAgICAgICAgICAgaXNBcnJheShvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxuICAgICAgICAgICAgaXNQbGFpbk9iamVjdChvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxuICAgICAgICAgICAgb3B0aW9ucy5mYWxsYmFja0xvY2FsZSA9PT0gZmFsc2VcbiAgICAgICAgICAgID8gb3B0aW9ucy5mYWxsYmFja0xvY2FsZVxuICAgICAgICAgICAgOiBfbG9jYWxlLnZhbHVlKTtcbiAgICBjb25zdCBfbWVzc2FnZXMgPSByZWYoZ2V0TG9jYWxlTWVzc2FnZXMoX2xvY2FsZS52YWx1ZSwgb3B0aW9ucykpO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGNvbnN0IF9kYXRldGltZUZvcm1hdHMgPSByZWYoaXNQbGFpbk9iamVjdChvcHRpb25zLmRhdGV0aW1lRm9ybWF0cylcbiAgICAgICAgPyBvcHRpb25zLmRhdGV0aW1lRm9ybWF0c1xuICAgICAgICA6IHsgW19sb2NhbGUudmFsdWVdOiB7fSB9KTtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBfbnVtYmVyRm9ybWF0cyA9IHJlZihpc1BsYWluT2JqZWN0KG9wdGlvbnMubnVtYmVyRm9ybWF0cylcbiAgICAgICAgPyBvcHRpb25zLm51bWJlckZvcm1hdHNcbiAgICAgICAgOiB7IFtfbG9jYWxlLnZhbHVlXToge30gfSk7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgX21pc3NpbmdXYXJuID0gaXNMb2NhbFNjb3BlXG4gICAgICAgID8gcm9vdC5taXNzaW5nV2FyblxuICAgICAgICA6IGlzQm9vbGVhbihvcHRpb25zLm1pc3NpbmdXYXJuKSB8fCBpc1JlZ0V4cChvcHRpb25zLm1pc3NpbmdXYXJuKVxuICAgICAgICAgICAgPyBvcHRpb25zLm1pc3NpbmdXYXJuXG4gICAgICAgICAgICA6IHRydWU7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgX2ZhbGxiYWNrV2FybiA9IGlzTG9jYWxTY29wZVxuICAgICAgICA/IHJvb3QuZmFsbGJhY2tXYXJuXG4gICAgICAgIDogaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tXYXJuKSB8fCBpc1JlZ0V4cChvcHRpb25zLmZhbGxiYWNrV2FybilcbiAgICAgICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1dhcm5cbiAgICAgICAgICAgIDogdHJ1ZTtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBfZmFsbGJhY2tSb290ID0gaXNMb2NhbFNjb3BlXG4gICAgICAgID8gcm9vdC5mYWxsYmFja1Jvb3RcbiAgICAgICAgOiBpc0Jvb2xlYW4ob3B0aW9ucy5mYWxsYmFja1Jvb3QpXG4gICAgICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tSb290XG4gICAgICAgICAgICA6IHRydWU7XG4gICAgLy8gY29uZmlndXJlIGZhbGwgYmFjayB0byByb290XG4gICAgY29uc3QgX2ZhbGxiYWNrRm9ybWF0ID0gISFvcHRpb25zLmZhbGxiYWNrRm9ybWF0O1xuICAgIC8vIHJ1bnRpbWUgbWlzc2luZ1xuICAgIGNvbnN0IF9taXNzaW5nID0gaXNGdW5jdGlvbihvcHRpb25zLm1pc3NpbmcpID8gb3B0aW9ucy5taXNzaW5nIDogbnVsbDtcbiAgICAvLyBwb3N0VHJhbnNsYXRpb24gaGFuZGxlclxuICAgIGNvbnN0IF9wb3N0VHJhbnNsYXRpb24gPSBpc0Z1bmN0aW9uKG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uKVxuICAgICAgICA/IG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uXG4gICAgICAgIDogbnVsbDtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBjb25zdCBfd2Fybkh0bWxNZXNzYWdlID0gaXNMb2NhbFNjb3BlXG4gICAgICAgID8gcm9vdC53YXJuSHRtbE1lc3NhZ2VcbiAgICAgICAgOiBpc0Jvb2xlYW4ob3B0aW9ucy53YXJuSHRtbE1lc3NhZ2UpXG4gICAgICAgICAgICA/IG9wdGlvbnMud2Fybkh0bWxNZXNzYWdlXG4gICAgICAgICAgICA6IHRydWU7XG4gICAgY29uc3QgX2VzY2FwZVBhcmFtZXRlciA9ICEhb3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXI7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgY29uc3QgX21vZGlmaWVycyA9IGlzTG9jYWxTY29wZVxuICAgICAgICA/IHJvb3QubW9kaWZpZXJzXG4gICAgICAgIDogaXNQbGFpbk9iamVjdChvcHRpb25zLm1vZGlmaWVycylcbiAgICAgICAgICAgID8gb3B0aW9ucy5tb2RpZmllcnNcbiAgICAgICAgICAgIDoge307XG4gICAgLy8gcGx1cmFsUnVsZXNcbiAgICBjb25zdCBfcGx1cmFsUnVsZXMgPSBvcHRpb25zLnBsdXJhbFJ1bGVzIHx8IChpc0xvY2FsU2NvcGUgJiYgcm9vdC5wbHVyYWxSdWxlcyk7XG4gICAgLy8gdHJhY2sgcmVhY3Rpdml0eVxuICAgIGZ1bmN0aW9uIHRyYWNrUmVhY3Rpdml0eVZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIF9sb2NhbGUudmFsdWUsXG4gICAgICAgICAgICBfZmFsbGJhY2tMb2NhbGUudmFsdWUsXG4gICAgICAgICAgICBfbWVzc2FnZXMudmFsdWUsXG4gICAgICAgICAgICBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlLFxuICAgICAgICAgICAgX251bWJlckZvcm1hdHMudmFsdWVcbiAgICAgICAgXTtcbiAgICB9XG4gICAgLy8gbG9jYWxlXG4gICAgY29uc3QgbG9jYWxlID0gY29tcHV0ZWQoe1xuICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUubG9jYWxlLnZhbHVlIDogX2xvY2FsZS52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiB2YWwgPT4ge1xuICAgICAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5sb2NhbGUudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfbG9jYWxlLnZhbHVlID0gdmFsO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gZmFsbGJhY2tMb2NhbGVcbiAgICBjb25zdCBmYWxsYmFja0xvY2FsZSA9IGNvbXB1dGVkKHtcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlXG4gICAgICAgICAgICAgICAgPyBfY29tcG9zZXIudmFsdWUuZmFsbGJhY2tMb2NhbGUudmFsdWVcbiAgICAgICAgICAgICAgICA6IF9mYWxsYmFja0xvY2FsZS52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiB2YWwgPT4ge1xuICAgICAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5mYWxsYmFja0xvY2FsZS52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9mYWxsYmFja0xvY2FsZS52YWx1ZSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIG1lc3NhZ2VzXG4gICAgY29uc3QgbWVzc2FnZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlLm1lc3NhZ2VzLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIHJldHVybiBfbWVzc2FnZXMudmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBkYXRldGltZUZvcm1hdHMgPSBjb21wdXRlZCgoKSA9PiBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlKTtcbiAgICBjb25zdCBudW1iZXJGb3JtYXRzID0gY29tcHV0ZWQoKCkgPT4gX251bWJlckZvcm1hdHMudmFsdWUpO1xuICAgIGZ1bmN0aW9uIGdldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWVcbiAgICAgICAgICAgID8gX2NvbXBvc2VyLnZhbHVlLmdldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIoKVxuICAgICAgICAgICAgOiBfcG9zdFRyYW5zbGF0aW9uO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyKGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLnNldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIoaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0TWlzc2luZ0hhbmRsZXIoKSB7XG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuZ2V0TWlzc2luZ0hhbmRsZXIoKSA6IF9taXNzaW5nO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRNaXNzaW5nSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5zZXRNaXNzaW5nSGFuZGxlcihoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB3YXJwV2l0aERlcHMoZm4pIHtcbiAgICAgICAgdHJhY2tSZWFjdGl2aXR5VmFsdWVzKCk7XG4gICAgICAgIHJldHVybiBmbigpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0KC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxuICAgICAgICAgICAgPyB3YXJwV2l0aERlcHMoKCkgPT4gUmVmbGVjdC5hcHBseShfY29tcG9zZXIudmFsdWUudCwgbnVsbCwgWy4uLmFyZ3NdKSlcbiAgICAgICAgICAgIDogd2FycFdpdGhEZXBzKCgpID0+ICcnKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcnQoLi4uYXJncykge1xuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlXG4gICAgICAgICAgICA/IFJlZmxlY3QuYXBwbHkoX2NvbXBvc2VyLnZhbHVlLnJ0LCBudWxsLCBbLi4uYXJnc10pXG4gICAgICAgICAgICA6ICcnO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxuICAgICAgICAgICAgPyB3YXJwV2l0aERlcHMoKCkgPT4gUmVmbGVjdC5hcHBseShfY29tcG9zZXIudmFsdWUuZCwgbnVsbCwgWy4uLmFyZ3NdKSlcbiAgICAgICAgICAgIDogd2FycFdpdGhEZXBzKCgpID0+ICcnKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbiguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWVcbiAgICAgICAgICAgID8gd2FycFdpdGhEZXBzKCgpID0+IFJlZmxlY3QuYXBwbHkoX2NvbXBvc2VyLnZhbHVlLm4sIG51bGwsIFsuLi5hcmdzXSkpXG4gICAgICAgICAgICA6IHdhcnBXaXRoRGVwcygoKSA9PiAnJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRtKGtleSkge1xuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLnRtKGtleSkgOiB7fTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdGUoa2V5LCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS50ZShrZXksIGxvY2FsZSkgOiBmYWxzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0TG9jYWxlTWVzc2FnZShsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5nZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSkgOiB7fTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0TG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLnNldExvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIF9tZXNzYWdlcy52YWx1ZVtsb2NhbGVdID0gbWVzc2FnZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBtZXJnZUxvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5tZXJnZUxvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZXREYXRlVGltZUZvcm1hdChsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5nZXREYXRlVGltZUZvcm1hdChsb2NhbGUpIDoge307XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldERhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5zZXREYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCk7XG4gICAgICAgICAgICBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlW2xvY2FsZV0gPSBmb3JtYXQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gbWVyZ2VEYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xuICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICBfY29tcG9zZXIudmFsdWUubWVyZ2VEYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0TnVtYmVyRm9ybWF0KGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmdldE51bWJlckZvcm1hdChsb2NhbGUpIDoge307XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldE51bWJlckZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xuICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuc2V0TnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KTtcbiAgICAgICAgICAgIF9udW1iZXJGb3JtYXRzLnZhbHVlW2xvY2FsZV0gPSBmb3JtYXQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gbWVyZ2VOdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcbiAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLm1lcmdlTnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB3cmFwcGVyID0ge1xuICAgICAgICBnZXQgaWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmlkIDogLTE7XG4gICAgICAgIH0sXG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgZmFsbGJhY2tMb2NhbGUsXG4gICAgICAgIG1lc3NhZ2VzLFxuICAgICAgICBkYXRldGltZUZvcm1hdHMsXG4gICAgICAgIG51bWJlckZvcm1hdHMsXG4gICAgICAgIGdldCBpbmhlcml0TG9jYWxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5pbmhlcml0TG9jYWxlIDogX2luaGVyaXRMb2NhbGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCBpbmhlcml0TG9jYWxlKHZhbCkge1xuICAgICAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5pbmhlcml0TG9jYWxlID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXQgYXZhaWxhYmxlTG9jYWxlcygpIHtcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWVcbiAgICAgICAgICAgICAgICA/IF9jb21wb3Nlci52YWx1ZS5hdmFpbGFibGVMb2NhbGVzXG4gICAgICAgICAgICAgICAgOiBPYmplY3Qua2V5cyhfbWVzc2FnZXMudmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgbW9kaWZpZXJzKCkge1xuICAgICAgICAgICAgcmV0dXJuIChfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUubW9kaWZpZXJzIDogX21vZGlmaWVycyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBwbHVyYWxSdWxlcygpIHtcbiAgICAgICAgICAgIHJldHVybiAoX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLnBsdXJhbFJ1bGVzIDogX3BsdXJhbFJ1bGVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGlzR2xvYmFsKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5pc0dsb2JhbCA6IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgbWlzc2luZ1dhcm4oKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLm1pc3NpbmdXYXJuIDogX21pc3NpbmdXYXJuO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgbWlzc2luZ1dhcm4odmFsKSB7XG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLm1pc3NpbmdXYXJuID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXQgZmFsbGJhY2tXYXJuKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5mYWxsYmFja1dhcm4gOiBfZmFsbGJhY2tXYXJuO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgZmFsbGJhY2tXYXJuKHZhbCkge1xuICAgICAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xuICAgICAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5taXNzaW5nV2FybiA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGZhbGxiYWNrUm9vdCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuZmFsbGJhY2tSb290IDogX2ZhbGxiYWNrUm9vdDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IGZhbGxiYWNrUm9vdCh2YWwpIHtcbiAgICAgICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuZmFsbGJhY2tSb290ID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXQgZmFsbGJhY2tGb3JtYXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmZhbGxiYWNrRm9ybWF0IDogX2ZhbGxiYWNrRm9ybWF0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQgZmFsbGJhY2tGb3JtYXQodmFsKSB7XG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLmZhbGxiYWNrRm9ybWF0ID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXQgd2Fybkh0bWxNZXNzYWdlKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxuICAgICAgICAgICAgICAgID8gX2NvbXBvc2VyLnZhbHVlLndhcm5IdG1sTWVzc2FnZVxuICAgICAgICAgICAgICAgIDogX3dhcm5IdG1sTWVzc2FnZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IHdhcm5IdG1sTWVzc2FnZSh2YWwpIHtcbiAgICAgICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUud2Fybkh0bWxNZXNzYWdlID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXQgZXNjYXBlUGFyYW1ldGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxuICAgICAgICAgICAgICAgID8gX2NvbXBvc2VyLnZhbHVlLmVzY2FwZVBhcmFtZXRlclxuICAgICAgICAgICAgICAgIDogX2VzY2FwZVBhcmFtZXRlcjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IGVzY2FwZVBhcmFtZXRlcih2YWwpIHtcbiAgICAgICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuZXNjYXBlUGFyYW1ldGVyID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0LFxuICAgICAgICBnZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyLFxuICAgICAgICBzZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyLFxuICAgICAgICBnZXRNaXNzaW5nSGFuZGxlcixcbiAgICAgICAgc2V0TWlzc2luZ0hhbmRsZXIsXG4gICAgICAgIHJ0LFxuICAgICAgICBkLFxuICAgICAgICBuLFxuICAgICAgICB0bSxcbiAgICAgICAgdGUsXG4gICAgICAgIGdldExvY2FsZU1lc3NhZ2UsXG4gICAgICAgIHNldExvY2FsZU1lc3NhZ2UsXG4gICAgICAgIG1lcmdlTG9jYWxlTWVzc2FnZSxcbiAgICAgICAgZ2V0RGF0ZVRpbWVGb3JtYXQsXG4gICAgICAgIHNldERhdGVUaW1lRm9ybWF0LFxuICAgICAgICBtZXJnZURhdGVUaW1lRm9ybWF0LFxuICAgICAgICBnZXROdW1iZXJGb3JtYXQsXG4gICAgICAgIHNldE51bWJlckZvcm1hdCxcbiAgICAgICAgbWVyZ2VOdW1iZXJGb3JtYXRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHN5bmMoY29tcG9zZXIpIHtcbiAgICAgICAgY29tcG9zZXIubG9jYWxlLnZhbHVlID0gX2xvY2FsZS52YWx1ZTtcbiAgICAgICAgY29tcG9zZXIuZmFsbGJhY2tMb2NhbGUudmFsdWUgPSBfZmFsbGJhY2tMb2NhbGUudmFsdWU7XG4gICAgICAgIE9iamVjdC5rZXlzKF9tZXNzYWdlcy52YWx1ZSkuZm9yRWFjaChsb2NhbGUgPT4ge1xuICAgICAgICAgICAgY29tcG9zZXIubWVyZ2VMb2NhbGVNZXNzYWdlKGxvY2FsZSwgX21lc3NhZ2VzLnZhbHVlW2xvY2FsZV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmtleXMoX2RhdGV0aW1lRm9ybWF0cy52YWx1ZSkuZm9yRWFjaChsb2NhbGUgPT4ge1xuICAgICAgICAgICAgY29tcG9zZXIubWVyZ2VEYXRlVGltZUZvcm1hdChsb2NhbGUsIF9kYXRldGltZUZvcm1hdHMudmFsdWVbbG9jYWxlXSk7XG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3Qua2V5cyhfbnVtYmVyRm9ybWF0cy52YWx1ZSkuZm9yRWFjaChsb2NhbGUgPT4ge1xuICAgICAgICAgICAgY29tcG9zZXIubWVyZ2VOdW1iZXJGb3JtYXQobG9jYWxlLCBfbnVtYmVyRm9ybWF0cy52YWx1ZVtsb2NhbGVdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbXBvc2VyLmVzY2FwZVBhcmFtZXRlciA9IF9lc2NhcGVQYXJhbWV0ZXI7XG4gICAgICAgIGNvbXBvc2VyLmZhbGxiYWNrRm9ybWF0ID0gX2ZhbGxiYWNrRm9ybWF0O1xuICAgICAgICBjb21wb3Nlci5mYWxsYmFja1Jvb3QgPSBfZmFsbGJhY2tSb290O1xuICAgICAgICBjb21wb3Nlci5mYWxsYmFja1dhcm4gPSBfZmFsbGJhY2tXYXJuO1xuICAgICAgICBjb21wb3Nlci5taXNzaW5nV2FybiA9IF9taXNzaW5nV2FybjtcbiAgICAgICAgY29tcG9zZXIud2Fybkh0bWxNZXNzYWdlID0gX3dhcm5IdG1sTWVzc2FnZTtcbiAgICB9XG4gICAgb25CZWZvcmVNb3VudCgoKSA9PiB7XG4gICAgICAgIGlmIChpbnN0YW5jZS5wcm94eSA9PSBudWxsIHx8IGluc3RhbmNlLnByb3h5LiRpMThuID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5OT1RfQVZBSUxBQkxFX0NPTVBPU0lUSU9OX0lOX0xFR0FDWSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgY29uc3QgY29tcG9zZXIgPSAoX2NvbXBvc2VyLnZhbHVlID0gaW5zdGFuY2UucHJveHkuJGkxOG5cbiAgICAgICAgICAgIC5fX2NvbXBvc2VyKTtcbiAgICAgICAgaWYgKHNjb3BlID09PSAnZ2xvYmFsJykge1xuICAgICAgICAgICAgX2xvY2FsZS52YWx1ZSA9IGNvbXBvc2VyLmxvY2FsZS52YWx1ZTtcbiAgICAgICAgICAgIF9mYWxsYmFja0xvY2FsZS52YWx1ZSA9IGNvbXBvc2VyLmZhbGxiYWNrTG9jYWxlLnZhbHVlO1xuICAgICAgICAgICAgX21lc3NhZ2VzLnZhbHVlID0gY29tcG9zZXIubWVzc2FnZXMudmFsdWU7XG4gICAgICAgICAgICBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlID0gY29tcG9zZXIuZGF0ZXRpbWVGb3JtYXRzLnZhbHVlO1xuICAgICAgICAgICAgX251bWJlckZvcm1hdHMudmFsdWUgPSBjb21wb3Nlci5udW1iZXJGb3JtYXRzLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzTG9jYWxTY29wZSkge1xuICAgICAgICAgICAgc3luYyhjb21wb3Nlcik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gd3JhcHBlcjtcbn1cbmNvbnN0IGdsb2JhbEV4cG9ydFByb3BzID0gW1xuICAgICdsb2NhbGUnLFxuICAgICdmYWxsYmFja0xvY2FsZScsXG4gICAgJ2F2YWlsYWJsZUxvY2FsZXMnXG5dO1xuY29uc3QgZ2xvYmFsRXhwb3J0TWV0aG9kcyA9IFsndCcsICdydCcsICdkJywgJ24nLCAndG0nLCAndGUnXVxuICAgIDtcbmZ1bmN0aW9uIGluamVjdEdsb2JhbEZpZWxkcyhhcHAsIGNvbXBvc2VyKSB7XG4gICAgY29uc3QgaTE4biA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgZ2xvYmFsRXhwb3J0UHJvcHMuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29tcG9zZXIsIHByb3ApO1xuICAgICAgICBpZiAoIWRlc2MpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VSUk9SKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3cmFwID0gaXNSZWYoZGVzYy52YWx1ZSkgLy8gY2hlY2sgY29tcHV0ZWQgcHJvcHNcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlc2MudmFsdWUudmFsdWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICAgIHNldCh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVzYy52YWx1ZS52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZXNjLmdldCAmJiBkZXNjLmdldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpMThuLCBwcm9wLCB3cmFwKTtcbiAgICB9KTtcbiAgICBhcHAuY29uZmlnLmdsb2JhbFByb3BlcnRpZXMuJGkxOG4gPSBpMThuO1xuICAgIGdsb2JhbEV4cG9ydE1ldGhvZHMuZm9yRWFjaChtZXRob2QgPT4ge1xuICAgICAgICBjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb21wb3NlciwgbWV0aG9kKTtcbiAgICAgICAgaWYgKCFkZXNjIHx8ICFkZXNjLnZhbHVlKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FUlJPUik7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFwcC5jb25maWcuZ2xvYmFsUHJvcGVydGllcywgYCQke21ldGhvZH1gLCBkZXNjKTtcbiAgICB9KTtcbiAgICBjb25zdCBkaXNwb3NlID0gKCkgPT4ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBkZWxldGUgYXBwLmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLiRpMThuO1xuICAgICAgICBnbG9iYWxFeHBvcnRNZXRob2RzLmZvckVhY2gobWV0aG9kID0+IHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICBkZWxldGUgYXBwLmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzW2AkJHttZXRob2R9YF07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIGRpc3Bvc2U7XG59XG5cbntcbiAgICBpbml0RmVhdHVyZUZsYWdzKCk7XG59XG4vLyByZWdpc3RlciBtZXNzYWdlIGNvbXBpbGVyIGZvciBqaXQgY29tcGlsYXRpb25cbmlmIChfX0lOVExJRllfSklUX0NPTVBJTEFUSU9OX18pIHtcbiAgICByZWdpc3Rlck1lc3NhZ2VDb21waWxlcihjb21waWxlKTtcbn1cbi8vIHJlZ2lzdGVyIG1lc3NhZ2UgcmVzb2x2ZXIgYXQgdnVlLWkxOG5cbnJlZ2lzdGVyTWVzc2FnZVJlc29sdmVyKHJlc29sdmVWYWx1ZSk7XG4vLyByZWdpc3RlciBmYWxsYmFjayBsb2NhbGUgYXQgdnVlLWkxOG5cbnJlZ2lzdGVyTG9jYWxlRmFsbGJhY2tlcihmYWxsYmFja1dpdGhMb2NhbGVDaGFpbik7XG4vLyBOT1RFOiBleHBlcmltZW50YWwgISFcbmlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXykge1xuICAgIGNvbnN0IHRhcmdldCA9IGdldEdsb2JhbFRoaXMoKTtcbiAgICB0YXJnZXQuX19JTlRMSUZZX18gPSB0cnVlO1xuICAgIHNldERldlRvb2xzSG9vayh0YXJnZXQuX19JTlRMSUZZX0RFVlRPT0xTX0dMT0JBTF9IT09LX18pO1xufVxuaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkgO1xuXG5leHBvcnQgeyBEYXRldGltZUZvcm1hdCwgSTE4bkQsIEkxOG5JbmplY3Rpb25LZXksIEkxOG5OLCBJMThuVCwgTnVtYmVyRm9ybWF0LCBUcmFuc2xhdGlvbiwgVkVSU0lPTiwgY2FzdFRvVnVlSTE4biwgY3JlYXRlSTE4biwgdXNlSTE4biwgdlREaXJlY3RpdmUgfTtcbiIsIi8vIFRoaXMgaXMganVzdCBhbiBleGFtcGxlLFxuLy8gc28geW91IGNhbiBzYWZlbHkgZGVsZXRlIGFsbCBkZWZhdWx0IHByb3BzIGJlbG93XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZmFpbGVkOiAnQWN0aW9uIGZhaWxlZCcsXG4gIHN1Y2Nlc3M6ICdBY3Rpb24gd2FzIHN1Y2Nlc3NmdWwnXG59O1xuIiwiaW1wb3J0IGVuVVMgZnJvbSAnLi9lbi1VUyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgJ2VuLVVTJzogZW5VU1xufTtcbiIsImltcG9ydCB7IGJvb3QgfSBmcm9tICdxdWFzYXIvd3JhcHBlcnMnO1xuaW1wb3J0IHsgY3JlYXRlSTE4biB9IGZyb20gJ3Z1ZS1pMThuJztcblxuaW1wb3J0IG1lc3NhZ2VzIGZyb20gJ3NyYy9pMThuJztcblxuZXhwb3J0IHR5cGUgTWVzc2FnZUxhbmd1YWdlcyA9IGtleW9mIHR5cGVvZiBtZXNzYWdlcztcbi8vIFR5cGUtZGVmaW5lICdlbi1VUycgYXMgdGhlIG1hc3RlciBzY2hlbWEgZm9yIHRoZSByZXNvdXJjZVxuZXhwb3J0IHR5cGUgTWVzc2FnZVNjaGVtYSA9IHR5cGVvZiBtZXNzYWdlc1snZW4tVVMnXTtcblxuLy8gU2VlIGh0dHBzOi8vdnVlLWkxOG4uaW50bGlmeS5kZXYvZ3VpZGUvYWR2YW5jZWQvdHlwZXNjcmlwdC5odG1sI2dsb2JhbC1yZXNvdXJjZS1zY2hlbWEtdHlwZS1kZWZpbml0aW9uXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktaW50ZXJmYWNlICovXG5kZWNsYXJlIG1vZHVsZSAndnVlLWkxOG4nIHtcbiAgLy8gZGVmaW5lIHRoZSBsb2NhbGUgbWVzc2FnZXMgc2NoZW1hXG4gIGV4cG9ydCBpbnRlcmZhY2UgRGVmaW5lTG9jYWxlTWVzc2FnZSBleHRlbmRzIE1lc3NhZ2VTY2hlbWEge31cblxuICAvLyBkZWZpbmUgdGhlIGRhdGV0aW1lIGZvcm1hdCBzY2hlbWFcbiAgZXhwb3J0IGludGVyZmFjZSBEZWZpbmVEYXRlVGltZUZvcm1hdCB7fVxuXG4gIC8vIGRlZmluZSB0aGUgbnVtYmVyIGZvcm1hdCBzY2hlbWFcbiAgZXhwb3J0IGludGVyZmFjZSBEZWZpbmVOdW1iZXJGb3JtYXQge31cbn1cbi8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWludGVyZmFjZSAqL1xuXG5leHBvcnQgZGVmYXVsdCBib290KCh7IGFwcCB9KSA9PiB7XG4gIGNvbnN0IGkxOG4gPSBjcmVhdGVJMThuKHtcbiAgICBsb2NhbGU6ICdlbi1VUycsXG4gICAgbGVnYWN5OiBmYWxzZSxcbiAgICBtZXNzYWdlcyxcbiAgfSk7XG5cbiAgLy8gU2V0IGkxOG4gaW5zdGFuY2Ugb24gYXBwXG4gIGFwcC51c2UoaTE4bik7XG59KTtcbiJdLCJuYW1lcyI6WyJhc3NpZ24iLCJpc1N0cmluZyIsImlzT2JqZWN0Iiwiam9pbiIsImNvZGUiLCJmb3JtYXQiLCJtZXNzYWdlcyIsImluZGV4IiwiY29udGV4dCIsImNoIiwicGFyc2UiLCJiYXNlQ29tcGlsZSIsImluaXRGZWF0dXJlRmxhZ3MiLCJ0eXBlIiwiaTE4biIsIlZFUlNJT04iLCJpbmMiLCJyZXNvbHZlVmFsdWUiLCJtc2ciLCJzb3VyY2UiLCJtZXNzYWdlIiwibG9jYWxlIiwibG9jYWxlcyIsIl9jb250ZXh0Iiwib3B0aW9ucyIsImdsb2JhbCIsImNv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
