export class Server {
  name: string;
  system: System
}

export class System {
  status: string;
  details: Details;
}

export class Details {
  systemUsage: number;
  systemLoad: number;
  processUsage: number;
  jvmUsed: number;
  jvmCommitted: number;
  heapUsed: number;
  heapCommitted: number;
  uptime: number;
  requests: number;
  maxRequest: number;
}
