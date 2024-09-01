import { Fingerprint } from "./fingerprint"
import { Subscription } from "./subscription"

export type Member = {
  id: string
  fullName: string
  phoneNumber: string
  currentStatus: MemberStatus
  dni: string,
  isActive: boolean
  subscriptions?: Subscription[]
  fingerprint?: Fingerprint
  createdAt?: string
  updatedAt?: string
}

export type MemberStatus = 'Inactivo' | 'Día' | 'Semana' | 'Mes'

export type MemberField = keyof Member
export type MemberFieldValue<K extends MemberField> = Member[K]