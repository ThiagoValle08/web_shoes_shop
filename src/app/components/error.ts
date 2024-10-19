import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) {
    // Ignorar los errores de ExpressionChangedAfterItHasBeenCheckedError
    if (
      error instanceof Error &&
      error.message.includes('ExpressionChangedAfterItHasBeenCheckedError')
    ) {
      return;
    }
    // Manejar otros errores
    console.error('An error occurred:', error);
  }
}
