/**
 * Status model.
 */
export class Status {
  status: string;
  details: Details;
}

/**
 * Details model.
 */
export class Details {
  duoSecurity: DuoSecurity;
  memory: Memory;
  session: Session;
  cpuMonitor: Cpu;
  hazelcast: Hazelcast;
}

/**
 * DuoSecurity model.
 */
export class DuoSecurity {
  status: string;
  details: DuoDetails;
}

/**
 * DuoDetails model.
 */
export class DuoDetails {
  duoApiHost: string;
}

/**
 * Memory model.
 */
export class Memory {
  status: string;
  details: MemoryDetails;
}

/**
 * MemoryDetails model.
 */
export class MemoryDetails {
  freeMemory: number;
  totalMemory: number;
}

/**
 * CPU model.
 */
export class Cpu {
  status: string;
  details: CpuDetails;
}

/**
 * CpuDetails model.
 */
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

/**
 * Session model.
 */
export class Session {
  status: string;
  details: SessionDetails;
}

/**
 * SessionDetails model.
 */
export class SessionDetails {
  sessionCount: number;
  ticketCount: number;
  message: string;
}

/**
 * Server model.
 */
export class Server {
  name: string;
  status: Status;
}

/**
 * Hazelcast model.
 */
export class Hazelcast {
  status: string;
  details: HazelcastDetails;
}

/**
 * HazelcastDetails model.
 */
export class HazelcastDetails {
  master: boolean;
  clusterSize: number;
  maps: Map<string, MapDetails>;
}

/**
 * MapDetails model.
 */
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

/**
 * Ldap model.
 */
export class Ldap {
  status: string;
  details: LdapDetails;
}

/**
 * LdapDetails model.
 */
export class LdapDetails {
  message: string;
  activeCount: number;
  idleCount: number;
}

/**
 * Disk model.
 */
export class Disk {
  status: string;
  details: DiskDetails;
}

/**
 * DiskDetails model.
 */
export class DiskDetails {
  total: number;
  free: number;
}


