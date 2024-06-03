import { walletData } from "../data/WalletData";
import { EventBase } from "./EventBase";

export class GameEventWalletAccountChanged extends EventBase {
  public static readonly event: string = "logic.EventWalletAccountChanged";

  public get subject(): string {
    return GameEventWalletAccountChanged.event;
  }

  public async exec(account: string) {
    Promise.resolve();
  }
}
