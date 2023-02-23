export default class UserModel {
  constructor(json) {
    this.id = json?.id;
    this.uid = json?.uid;
    this.nama = json?.nama;
    this.email = json?.email;
    this.token = json?.token;
    this.level = json?.level;
    this.mgr_id = json?.mgr_id;
  }
}
