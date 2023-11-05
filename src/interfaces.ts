export interface IShip {
  title: string;
  description: string;
  level: number;
  nation: {
    title: string;
    name: string;
  };
  type: {
    title: string;
    name: string;
  };
  icons: {
    medium: string;
  };
}
