export const ITEM_IS_ARRAY=(item) => typeof item === "object" && item.length !== undefined;

export const ITEM_IS_STRING=(item)=> typeof item === "string";

export const ITEM_IS_NUMBER=(item) => typeof item === "number";

export const ITEM_IS_OBJECT=(item) => typeof item === "object";

export const ITEM_IS_BIGINT=(item) => typeof item === "bigint";

export const ITEM_IS_BOOLEAN=(item) => typeof item === "boolean";

export const ITEM_IS_FUNCTION=(item) => typeof item === "function";

export const ITEM_IS_SYMBOL=(item) => typeof item === "symbol";

export const ITEM_IS_UNDEFINED=(item) => typeof item === "undefined";