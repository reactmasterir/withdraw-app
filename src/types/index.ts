type withdrawsType = {
  id: number;
  user_id: number;
  paid_at: Date;
  created_at: Date;
  tx: string | null;
  wallet: string;
  amount: number;
  status:
    | "pending"
    | "proccessing"
    | "paid"
    | "suspicious"
    | "suspended";
};

type userType = {
  balance: number;
  refid: string;
  upline: number;
  team: number;
  commission: number;
  claimed: number;
  totalw: number;
  totalt: number;
  uid: string | null;
  id: number;
  nid: number;
  name: string | null;
  wallet: string | null;
  activeTnx: number;
  tasks: any;
  activeRef: number;
  totalRef: number;
};
