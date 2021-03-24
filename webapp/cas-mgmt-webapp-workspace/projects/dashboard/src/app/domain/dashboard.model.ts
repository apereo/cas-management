/**
 * Server model.
 */
export class Server {
  name: string;
  system: SystemHealth;
}

/**
 * SystemHealth model.
 */
export class SystemHealth {
  status: string;
  details: Details;
}

/**
 * Details model.
 */
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
