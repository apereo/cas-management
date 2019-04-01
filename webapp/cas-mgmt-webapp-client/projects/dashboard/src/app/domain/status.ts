export class Status {
  status: string;
  details: Details;
}

export class Details {
  duoSecurity: DuoSecurity;
  memory: Memory;
  session: Session;
  cpuMonitor: Cpu;
  hazelcast: Hazelcast;
}

export class DuoSecurity {
  status: string;
  details: DuoDetails;
}

export class DuoDetails {
  duoApiHost: string;
}

export class Memory {
  status: string;
  details: MemoryDetails;
}

export class MemoryDetails {
  freeMemory: number;
  totalMemory: number;
}

export class Cpu {
  status: string;
  details: CpuDetails;
}

export class CpuDetails {
  systemLoad: number;
  systemUsage: number;
  processUsage: number;
  jvmUsed: number;
  jvmCommitted: number;
  uptime: number;
  maxRequest: number;
  busyThreads: number;
}

export class Session {
  status: string;
  details: SessionDetails;
}

export class SessionDetails {
  sessionCount: number;
  ticketCount: number;
  message: string;
}

export class Server {
  name: string;
  status: Status;
}

export class Hazelcast {
  status: string;
  details: HazelcastDetails;
}

export class HazelcastDetails {
  master: boolean;
  clusterSize: number;
  maps: Map<String, MapDetails>;
}

export class MapDetails {
  memory: number;
  size: number;
  percentFree: number;
  evictions: number;
  localCount: number;
  backupCount: number;
  putLatency: number;
  getLatency: number;
  capacity: number;
}

export class Ldap {
  status: string;
  details: LdapDetails;
}

export class LdapDetails {
  message: string;
  activeCount: number;
  idleCount: number;
}

export class Disk {
  status: string;
  details: DiskDetails;
}

export class DiskDetails {
  total: number;
  free: number;
}


