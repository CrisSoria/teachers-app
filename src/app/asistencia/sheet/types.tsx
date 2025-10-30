export interface IVerticalSheet {
  student: string;
  Vp: string;
  Vi: string;
  Mp: string;
  Mi: string;
}

export interface IHorizontalSheet {
  row: string;
  [key: number]: number | "-";
}
