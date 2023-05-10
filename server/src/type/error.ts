export enum ErrorCode {
  GUEST_BOOK_IS_EMPTY = 'GUEST_BOOK_IS_EMPTY',
  GUEST_BOOK_NAME_IS_EMPTY = 'GUEST_BOOK_NAME_IS_EMPTY',
  GUEST_BOOK_MESSAGE_IS_EMPTY = 'GUEST_BOOK_MESSAGE_IS_EMPTY',
}

export type Error = {
  message: string;
  error_code: ErrorCode;
};
