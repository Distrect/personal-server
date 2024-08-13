export interface ICreateSkill {
  skill: string;
  profiency: number;
}

export interface IUpdateSkill {
  skillID: number;
  skill?: string;
  profiency?: number;
}
