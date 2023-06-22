export const extraCommands = ['--help', '--editor-vsc'];
export const validCommands = [
  '-a', // 0
  '-add', // 1
  '-m', // 2
  '-message', // 3
  '-p', // 4
  '-push', // 5
  '-f', // 6
  '-force', // 7
  '-rh', // 8
  '-reset-head', // 9
  '-r', // 10
  '-rebase', // 11
  '-c', // 12
  '-checkout', //13
  '-cb', // 14
  '-checkout-branch', //15
  '-cd', //16
  '-pull', //17
];
export const commitType = ['--ft', '--fx', '--e', '--c', '--d'];
export const rebaseFlags = ['--rc', '--continue', '--ra', '--abort', '--rs', '--skip'];
export const types = {
  [commitType[0]]: 'feat',
  [commitType[1]]: 'fix',
  [commitType[2]]: 'enhance',
  [commitType[3]]: 'chore',
  [commitType[4]]: 'docs',
};

export const mapFlag = {
  '--rc': '--continue',
  '--ra': '--abort',
  '--rs': '--skip',
  '--continue': '--continue',
  '--abort': '--abort',
  '--skip': '--skip',
};
