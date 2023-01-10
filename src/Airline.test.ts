jest.useFakeTimers();
import Airline from "./Airline";

/**
 * 간단한 비행기 탑승 시뮬레이션입니다.
 * 비행기 탑승은 1명씩 체크인 할 수 있습니다. 다른 한명이 체크인 진행 중이면 체크인을 막아야합니다.
 * 우리는 탑승 고객을 순서대로 받아야합니다.(_customersOnBoard)
 * 체크인은 출국 심사관에 따라서 랜덤한 시간을 가집니다.
 */

describe("Airline", () => {
  it("첫번째 문제", () => {
    /**
     * 타임라인의 순서를 보장해주세요.
     */

    const gabiaAirline = new Airline();

    gabiaAirline.addToLine("Lime1");
    gabiaAirline.addToLine("Ellie2");
    gabiaAirline.addToLine("Wally3");
    gabiaAirline.addToLine("Mory4");

    jest.runAllTimers();

    expect(gabiaAirline.customersOnBoard).toStrictEqual([
      "Lime1",
      "Ellie2",
      "Wally3",
      "Mory4",
    ]);
  });

  it("두번째 문제", () => {
    /**
     * 비행기 사정으로 인해서 선착순으로 도착한 2명만 탑승이 가능합니다.
     */

    const gabiaAirline = new Airline(2);

    gabiaAirline.addToLine("Lime1");
    gabiaAirline.addToLine("Ellie2");
    gabiaAirline.addToLine("Wally3");
    gabiaAirline.addToLine("Mory4");

    jest.runAllTimers();

    expect(gabiaAirline.customersOnBoard).toStrictEqual(["Lime1", "Ellie2"]);
  });

  // 세번째 문제는 일단 제외하도록 해요. 1번 2번부터
  // it("세번째 문제", () => {
  //   /**
  //    * 비행사에서 고객이 탑승할 때마다 로그를 가지려고합니다.
  //    * 탑승고객을 콘솔로 찍어주세요.
  //    * log-{탑승고객명} 으로 출력해주세요.
  //    * addCustomerOnBoard 에서 Log를 찍어야합니다.
  //    */
  //   const consoleWarnMock = jest.spyOn(console, "log").mockImplementation();
  //
  //   const gabiaAirline = new Airline();
  //
  //   gabiaAirline.addToLine("Lime1");
  //   gabiaAirline.addToLine("Ellie2");
  //
  //   jest.runAllTimers();
  //
  //   expect(consoleWarnMock.mock.calls).toEqual(
  //     expect.arrayContaining([["log-Lime1"], ["log-Ellie2"]])
  //   );
  //
  //   consoleWarnMock.mockRestore();
  // });
});
