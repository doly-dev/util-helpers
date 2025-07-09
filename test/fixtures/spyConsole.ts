export function createSpyConsole(type: keyof Console = 'error') {
  return jest.spyOn(globalThis.console, type).mockImplementation(() => {});
}
