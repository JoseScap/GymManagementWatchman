import { Member } from "./members";

export type Subscription = {
  id: string;
  idMember: string;
  amount: number;
  dateFrom: string;
  dateTo: string;
  isCanceled: boolean;
  paymentMethod: PaymentMethod;
  member?: Member;
};

export type PaymentMethod = "Efectivo" | "Transferencia";

export type SubscriptionField = keyof Subscription
export type SubscriptionFieldValue<K extends SubscriptionField> = Subscription[K]