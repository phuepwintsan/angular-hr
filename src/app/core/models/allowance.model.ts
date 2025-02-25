export interface AllowanceModel {
  allowanceId: number;
  companyId: string;
  branchId: number;
  deptId: number;
  positionId: number;
  allowanceName: string;
  description: string;
  status: boolean;
  createdOn: null | string;
  createdBy: null | string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null | string;
  deletedBy: null | string;
  remark: null | string;
}
