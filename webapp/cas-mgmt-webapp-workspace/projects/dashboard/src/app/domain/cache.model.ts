export class MapDetails {
  name: string;
  memory: number;
  size: number;
  capacity: number;
}

export class Details {
  name: string;
  sessionCount: number;
  ticketCount: number;
  message: string;
  maps: Map<string, MapDetails> = new Map();
}

export class Cache {
  status: string;
  details: Details = new Details();
}
