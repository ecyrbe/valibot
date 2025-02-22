import { ULID_REGEX } from '../../regex.ts';
import type { BaseValidation, ErrorMessage } from '../../types/index.ts';
import { getOutput, getPipeIssues } from '../../utils/index.ts';

/**
 * ULID validation type.
 */
export type UlidValidation<TInput extends string> = BaseValidation<TInput> & {
  /**
   * The validation type.
   */
  type: 'ulid';
  /**
   * The ULID regex.
   */
  requirement: RegExp;
};

/**
 * Creates a validation function that validates a [ULID](https://github.com/ulid/spec).
 *
 * @param message The error message.
 *
 * @returns A validation function.
 */
export function ulid<TInput extends string>(
  message: ErrorMessage = 'Invalid ULID'
): UlidValidation<TInput> {
  return {
    type: 'ulid',
    async: false,
    message,
    requirement: ULID_REGEX,
    _parse(input) {
      return !this.requirement.test(input)
        ? getPipeIssues(this.type, this.message, input, this.requirement)
        : getOutput(input);
    },
  };
}
