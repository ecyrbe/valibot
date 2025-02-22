import type { BaseValidation, ErrorMessage } from '../../types/index.ts';
import { getOutput, getPipeIssues } from '../../utils/index.ts';

/**
 * Equal validation type.
 */
export type EqualValidation<
  TInput extends string | number | bigint | boolean,
  TRequirement extends TInput
> = BaseValidation<TInput> & {
  /**
   * The validation type.
   */
  type: 'equal';
  /**
   * The required value.
   */
  requirement: TRequirement;
};

/**
 * Creates a validation function that checks the value for equality.
 *
 * @deprecated Function has been renamed to `value`.
 *
 * @param requirement The required value.
 * @param message The error message.
 *
 * @returns A validation function.
 */
export function equal<
  TInput extends string | number | bigint | boolean,
  TRequirement extends TInput
>(
  requirement: TRequirement,
  message: ErrorMessage = 'Invalid input'
): EqualValidation<TInput, TRequirement> {
  return {
    type: 'equal',
    async: false,
    message,
    requirement,
    _parse(input) {
      return input !== this.requirement
        ? getPipeIssues(this.type, this.message, input, this.requirement)
        : getOutput(input);
    },
  };
}
