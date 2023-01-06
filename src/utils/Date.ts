import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/es";

export class Dayjs {
  private static instance: Dayjs;
  private _userTimezone: string;

  private constructor() {
    dayjs.extend(timezone);

    this._userTimezone = "America/Lima";
    dayjs.locale("es");
    dayjs.tz.setDefault(this._userTimezone);
  }

  public static getInstance(): Dayjs {
    if (!Dayjs.instance) {
      Dayjs.instance = new Dayjs();
    }

    return Dayjs.instance;
  }

  public dayjs = dayjs;
}
