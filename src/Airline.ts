export default class Airline {
  private readonly maxCustomers: number;
  private readonly boardingWaitingLine: string[]; // 탑승 대기 줄
  private readonly _customersOnBoard: string[]; // 탑습 고객
  private available: boolean;

  constructor(maxCustomers?: number) {
    const max =
      typeof maxCustomers === "number" && maxCustomers >= 0
        ? maxCustomers
        : Number.MAX_SAFE_INTEGER;

    this.maxCustomers = max;
    this.boardingWaitingLine = []; // 탑승 대기 줄 초기화
    this._customersOnBoard = []; // 탑승 고객 초기화
    this.available = true;
  }

  done(peopleId: string) {
    if (this._customersOnBoard.length >= this.maxCustomers) {
      console.log("탑승을 거부합니다. 자리가 없습니다.");
      return;
    }
    console.log(`${peopleId} - 탑승이 시작했습니다.`);
    this.addCustomerOnBoard(peopleId); // 탑승 완료 시키기
  }

  // 탑승한 고객 가져오기
  get customersOnBoard() {
    return this._customersOnBoard;
  }

  checkInStart() {
    console.log("체크인 프로세스를 시작합니다.");
    this.available = false;
  }

  // 탑승 대기 줄에 줄 서기
  addToLine(peopleId: string) {
    console.log(`${peopleId} - 줄서기를 했습니다.`);
    this.boardingWaitingLine.push(peopleId); // 줄서기

    // 체크인 하기
    this.checkIn((peopleId) => this.done(peopleId));
  }

  // 탑승한 인원으로 추가하기
  addCustomerOnBoard(peopleId: string) {
    setTimeout(() => {
      this._customersOnBoard.push(peopleId);
    }, 0);
  }

  // 출국 심사를 진행합니다.
  // 출국 심사는 출국심사원에 따라서 랜덤한 시간을 가집니다.
  immigration(callback: Function) {
    setTimeout(() => {
      callback();
      this.available = true;
      console.log("출국 심사 중...");
      this.checkIn((peopleId) => this.done(peopleId));
    }, Math.floor(Math.random() * 3 * 1000));
  }

  // 체크인 하기
  // 체크인은 시간이 걸립니다.
  checkIn(done: (peopleId: string) => void) {
    if (!this.available) {
      console.log("체인크인이 가능한 상태가 아닙니다.");
      return;
    }

    if (!this.boardingWaitingLine.length) {
      console.log("탑승 가능한 인원이 없습니다.");
      return;
    }

    this.checkInStart();

    const peopleId = this.boardingWaitingLine.shift(); // 대기줄에서 첫번째 사람을 탑승자로 지정한다.

    peopleId && this.immigration(() => done(peopleId));
  }
}
