export interface UserAuth {
  password: string | null;
  companyId: String;
  username: string | null;
  desdeMs: Boolean;
  token?: String;
  usuario?: {
    usuario: string;
  };
}
