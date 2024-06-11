import { walletData } from "../data/WalletData";
import { EventBase } from "./EventBase";

export class EventWalletAccountChanged extends EventBase {
  public static readonly event: string = "logic.EventWalletAccountChanged";

  public get subject(): string {
    return EventWalletAccountChanged.event;
  }

  public async exec(account: string) {
    Promise.resolve();
  }
}
