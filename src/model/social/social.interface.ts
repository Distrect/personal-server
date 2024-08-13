export interface ICreateSocial {
  socialID: number;
  name: string;
  link: string;
}

export interface IUpdateSocial {
  socialID: number;
  name?: string;
  link?: string;
}
