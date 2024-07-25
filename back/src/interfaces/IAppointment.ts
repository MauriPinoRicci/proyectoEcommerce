export type StatusType = "active" | "cancelled";

export interface IAppointment {
   id: number;
    date: string;
    time: string;
    userId: number;
    status: StatusType;
}