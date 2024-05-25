export interface IApp<T> {
  readonly server: T;
  readonly port: number;

  run: () => void;
}
