const moduleLoader = require('module') as {
  _load: (
    request: string,
    parent: NodeModule,
    isMain: boolean
  ) => unknown;
};
const originalLoad = moduleLoader._load;

const vscodeMock = {
  window: {
    createOutputChannel: () => ({
      append: () => {},
      appendLine: () => {},
      clear: () => {},
      show: () => {},
      hide: () => {},
      dispose: () => {},
      replace: () => {},
    }),
    showWarningMessage: async () => undefined,
  },
  workspace: {
    getConfiguration: () => ({ get: () => undefined }),
    workspaceFolders: undefined,
    findFiles: async () => [],
  },
  ProgressLocation: { Notification: 15 },
};

moduleLoader._load = function (request, parent, isMain) {
  return request === 'vscode'
    ? vscodeMock
    : originalLoad.call(this, request, parent, isMain);
};
