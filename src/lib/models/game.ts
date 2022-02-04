export enum GameStatus {
  Unknown = 'unknown',
  InProgress = 'in_progress',
  Win = 'win',
  Fail = 'fail',
}

export enum RowStatus {
  Ok = 'ok',
  Invalid = 'invalid',
  Win = 'win',
}

export enum GameMode {
  Daily = 'daily',
  Random = 'random',
}

export enum EvaluationResult {
  Present = 'present',
  Correct = 'correct',
  Absent = 'absent',
}

export interface RowState {
  letters: string;
  evaluation?: EvaluationResult[];
  status?: RowStatus;
}

export interface GameState {
  mode: GameMode;
  gameNumber: number;
  board: RowState[];
  rowIndex: number;
  solution: string;
  status: GameStatus;
  lastPlayedTs: number | null;
  lastCompletedTs: number | null;
}

export interface Settings {
  hardMode: boolean | null;
  darkTheme: boolean | null;
  colorBlindTheme: boolean | null;
}
