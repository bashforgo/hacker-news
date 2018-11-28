export enum StatefulPromiseState {
  PENDING,
  RESOLVED,
  REJECTED,
}

export const {
  PENDING,
  REJECTED,
  RESOLVED,
}: typeof StatefulPromiseState = StatefulPromiseState

export class StatefulPromise<T> {
  public state: StatefulPromiseState = StatefulPromiseState.PENDING
  constructor(public value: Promise<T>) {
    value
      .then(() => {
        this.state = StatefulPromiseState.RESOLVED
      })
      .catch(() => {
        this.state = StatefulPromiseState.REJECTED
      })
  }
}
