export enum EducationStatus {
  INPROGRESS = 'In Progress',
  GRADUATED = 'Graduated',
  DROPPED = 'Dropped',
}
export interface ICreateEducation {
  educationID: number;
  institution: string;
  startDate: Date;
  endDate: Date;
  gpa: number;
  status?: EducationStatus;
}

export interface IUpdateEducation {
  educationID: number;
  institution?: string;
  startDate?: Date;
  endDate?: Date;
  gpa?: number;
  status?: EducationStatus;
}
