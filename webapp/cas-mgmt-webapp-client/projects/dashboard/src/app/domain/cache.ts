export class Cache {
  status: string;
  details: Details = new Details()
}

export class Details {
  maps: Map<String, MapDetails> = new Map();
}

export class MapDetails {
  memory: number;
  size: number;
  capacity: number;
}
