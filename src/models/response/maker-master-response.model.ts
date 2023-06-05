import MakerMaster from "../MakerMaster";

export default interface MakerMasterResponse {
  data: {
    message: string,
    mstMakerMaster: MakerMaster[],
    total: number,
    status: number
  },
  status: number
}
