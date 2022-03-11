export type ServerStatus = 'UP' | 'WARN' | 'DOWN';


/**
 * Server model.
 */
export interface Server {
  name: string;
  health: SystemHealth;
}

/**
 * SystemHealth model.
 */
export interface SystemHealth {
  status: ServerStatus;
  components: Components | null;
}

/**
 * Details model.
 */
export interface Components {
  memory: MemoryComponent;
  ping: {
    status: ServerStatus;
  }
  refreshScope: {
    status: ServerStatus;
  }
  session: SessionComponent;
  system: SystemComponent;
}

export interface MemoryComponent {
  status: ServerStatus;
  details: {
    freeMemory: number;
    totalMemory: number;
  }
}

export interface SessionComponent {
  status: ServerStatus;
  details: {
    name: string;
    sessionCount: 0;
    ticketCount: 0;
    message: string;
  }
}

export interface SystemComponent {
  status: ServerStatus;
  details: {
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
  };
}

/*

[
  {
    name: "CAS Local",
    health: {
      status: "UP",
      components: {
        memory: {
          status: "UP",
          details: { freeMemory: 1817246480, totalMemory: 2147483648 },
        },
        ping: { status: "UP" },
        refreshScope: { status: "UP" },
        session: {
          status: "UP",
          details: {
            name: "TicketRegistryHealthIndicator",
            sessionCount: 0,
            ticketCount: 0,
            message: "OK",
          },
        },
      },
    },
  },
  { name: "CAS on Heroku", health: { status: "UP" } },
];

*/
