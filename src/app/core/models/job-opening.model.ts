export interface ViJobOpeningModel {
  id: number;
  title: string;
  description: null;
  noOfApplicants: number;
  startOn: null | string;
  endOn: null | string;
  companyId: string;
  companyName: string;
  branchId: number;
  branchName: string;
  deptId: number;
  deptName: string;
  positionId: number;
  positionName: string;
  openingStatus: boolean;
  createdOn: string | null;
  createdBy: null | string;
  updatedOn: string | null;
  updatedBy: null | string;
  deletedOn: null | string;
  deletedBy: null | string;
  remark: null | string;
}

export interface JobOpeningModel {
  id: number;
  title: string;
  description: string;
  noOfApplicants: number;
  startOn: null | string;
  endOn: null | string;
  companyId: string;
  branchId: number;
  deptId: number;
  positionId: number;
  openingStatus: boolean;
  createdOn: null | string;
  createdBy: null | string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null | string;
  deletedBy: null | string;
  remark: null | string;
}
