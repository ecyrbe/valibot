import type { BaseSchema, ErrorMessage } from '../../types/index.ts';
import { getSchemaIssues, getOutput } from '../../utils/index.ts';

/**
 * Enum type.
 */
export type Enum = {
  [key: string]: string | number;
  [key: number]: string;
};

/**
 * Native enum schema type.
 */
export type EnumSchema<
  TEnum extends Enum,
  TOutput = TEnum[keyof TEnum]
> = BaseSchema<TEnum[keyof TEnum], TOutput> & {
  /**
   * The schema type.
   */
  type: 'enum';
  /**
   * The enum value.
   */
  enum: TEnum;
  /**
   * The error message.
   */
  message: ErrorMessage;
};

/**
 * Creates a enum schema.
 *
 * @param enum_ The enum value.
 * @param message The error message.
 *
 * @returns A enum schema.
 */
export function enum_<TEnum extends Enum>(
  enum_: TEnum,
  message: ErrorMessage = 'Invalid type'
): EnumSchema<TEnum> {
  return {
    type: 'enum',
    async: false,
    enum: enum_,
    message,
    _parse(input, info) {
      // Check type of input
      if (!Object.values(this.enum).includes(input as any)) {
        return getSchemaIssues(info, 'type', 'enum', this.message, input);
      }

      // Return input as output
      return getOutput(input as TEnum[keyof TEnum]);
    },
  };
}

/**
 * See {@link enum_}
 *
 * @deprecated Use `enum_` instead.
 */
export const nativeEnum = enum_;
