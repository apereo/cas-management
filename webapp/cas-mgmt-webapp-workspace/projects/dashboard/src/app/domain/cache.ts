export class Cache {
  status: string;
  details: Details = new Details()
}

export class Details {
  name: string;
  sessionCount: number;
  ticketCount: number;
  message: string;
  maps: Map<String, MapDetails> = new Map();
}

export class MapDetails {
  name: string;
  memory: number;
  size: number;
  capacity: number;

}
