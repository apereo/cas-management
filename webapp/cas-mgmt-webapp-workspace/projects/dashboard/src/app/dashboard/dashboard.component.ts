import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DashboardService} from '../core/dashboard-service';
import {Server, SystemHealth} from '../domain/dashboard.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

/**
 * Component for displaying status of each CAS server in the cluster.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  servers: Server[];

  timers;

  readonly SECONDS_IN_A_DAY = 24.0 * 60.0 * 60.0;
  readonly SECONDS_IN_A_HOUR = 60.0 * 60.0;
  readonly SECONDS_IN_A_MINUTE = 60;

  constructor(
    private service: DashboardService,
    private ref: ChangeDetectorRef
  ) {}

  /**
   * Starts the component by calling to get the status of servers.
   */
  ngOnInit(): void {
    this.service.getStatus().subscribe(s => {
      this.servers = s;
      this.timers = [];
      for (const server of this.servers) {
        this.timers.push(null);
      }
      this.ref.detectChanges();
    });
  }

  /**
   * Returns css value for the status indicator light.
   *
   * @param server - server status
   */
  statusLight(server: Server): string {
    const status = server.health ? server.health.status : 'DOWN';
    if (status === 'UP') {
      return 'led-green';
    }
    if (status === 'WARN') {
      return 'led-yellow';
    }
    return 'led-red';
  }

  /**
   * Formats the memory for display in MB.
   *
   * @param system - server health
   */
  memory(system: SystemHealth): number {
    return (
      (system.components?.system?.details.heapUsed /
        system.components?.system?.details.heapCommitted) *
        100.0 ?? 0
    );
  }

  /**
   * Returns memory used as a percent.
   *
   * @param system - server health
   */
  percent(system: SystemHealth): string {
    return this.memory(system).toFixed(0);
  }

  /**
   * Formats the jvm memory for display in MB.
   *
   * @param system - server health
   */
  memoryJvm(system: SystemHealth): number {
    return (
      (system.components?.system?.details.jvmUsed /
        system.components?.system?.details.jvmCommitted) *
        100.0 ?? 0
    );
  }

  /**
   * Returns jvm memory used as a percent.
   *
   * @param system - server health
   */
  percentJvm(system: SystemHealth): string {
    return this.memoryJvm(system).toFixed(0);
  }

  /**
   * Returns the CPU usage as a percentage.
   *
   * @param system - server health
   */
  percentCpu(system: SystemHealth): string {
    return this.cpu(system).toFixed(0);
  }

  /**
   * Pulls out the CPU status from the server.
   *
   * @param system - server health
   */
  cpu(system: SystemHealth): number {
    return system.components?.system?.details.systemUsage * 100.0 ?? 0;
  }

  /**
   * Returns the CPU process usage as percentage.
   *
   * @param system - server health
   */
  percentCpuProcess(system: SystemHealth): string {
    return this.cpuProcess(system).toFixed(0);
  }

  /**
   * Extracts cpu useage from the server stats.
   *
   * @param system - server health
   */
  cpuProcess(system: SystemHealth): number {
    return system.components?.system?.details.processUsage * 100.0 ?? 0;
  }

  /**
   * Formats bytes to mb.
   *
   * @param mem - memory in bytes
   */
  mbs(mem: number): string {
    return (mem * 0.00000095367432).toFixed(2);
  }

  /**
   * Display system load for a server.
   *
   * @param system - server health
   */
  load(system: SystemHealth): string {
    return system.components?.system?.details.systemLoad.toFixed(2);
  }

  /**
   * Displays the max request time on the server.
   *
   * @param system - server health
   */
  maxRequest(system: SystemHealth): string {
    return system.components?.system?.details.maxRequest.toFixed(2);
  }

  /**
   * Display number of active threads on server.
   *
   * @param system - server health
   */
  threads(system: SystemHealth): string {
    return system.components?.system?.details.requests.toFixed(2);
  }

  /**
   * Displays the uptime of a server.
   *
   * @param system - server health
   */
  uptime(system: SystemHealth): string {
    const up = system.components?.system?.details.uptime ?? 0;
    const days = up / (this.SECONDS_IN_A_DAY);
    const hours = (up % (this.SECONDS_IN_A_DAY)) / (this.SECONDS_IN_A_HOUR);
    const minutes = (up % (this.SECONDS_IN_A_HOUR)) / this.SECONDS_IN_A_MINUTE;
    const seconds = up % this.SECONDS_IN_A_MINUTE;
    return days.toFixed(0) + ':'
      + hours.toFixed(0) + ':'
      + minutes.toFixed(0) + ':'
      + seconds.toFixed(0);
  }

  /**
   * Sets up a timer to pull stats on the passed CAS server every second.
   *
   * @param event - toggle change event.
   * @param index - index of server in the cluster
   */
  update(event: MatSlideToggleChange, index: number) {
    if (this.timers[index] === null) {
      this.timers[index] = () => {
        this.service.getUpdate(index).subscribe(server => {
          this.servers[index] = server;
          if (this.timers[index]) {
            setTimeout(this.timers[index], 1000);
          }
        });
      };
      setTimeout(this.timers[index], 1000);
    } else {
      this.timers[index] = null;
    }
  }

}

