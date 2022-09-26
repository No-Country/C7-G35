class ErrorHandler {
  public async handleError(error: Error): Promise<void> {
    console.error(error);
  }
}
export const errorHandler = new ErrorHandler();
