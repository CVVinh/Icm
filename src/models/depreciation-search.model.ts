interface DepreciationSearch {
  assetStatus?: number;
  type?: string;
  assetClass?: string;
  depreciationRule?: number;
  depreciationBaseYear?: number;
  assetPeriodFrom?: string;
  assetPeriodTo?: string;
}

interface ExpandedDepreciationSearch {
  intergratedAssetId?: number;
  preocurementId?: number;
  companyId?: number;
  userId?: number;
  itemId?: number;
  serialNumber?: number;
  janCode?: number;
  manufacturerName: number;
  os?: number;
}
