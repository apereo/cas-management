import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {DashboardService} from '../core/dashboard-service';
import {Observable} from 'rxjs';
import {MapDetails, Server, Status} from '../domain/status';
import {MatSlideToggleChange} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-2.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  servers: Server[];
  health: Server;
  healthTimer: Function;
  timers: Function[];

  constructor(private breakpointObserver: BreakpointObserver, private service: DashboardService) {}

  ngOnInit(): void {
    this.service.getStatus().subscribe(s => {
      this.servers = s;
      this.health = s[0];
      this.timers = [];
      for (const server of this.servers) {
        this.timers.push(null);
      }
    });
  }

  statusLight(status: string): string {
    if (status === 'UP') {
      return 'led-green';
    }
    if (status === 'WARN') {
      return 'led-yellow';
    }
    return 'led-red';
  }

  memory(server: Server): number {
    return server.status.details.memory.details.freeMemory / server.status.details.memory.details.totalMemory * 100.0;
  }

  percent(server: Server): string {
    return this.memory(server).toFixed(0);
  }

  memoryJvm(server: Server): number {
    return server.status.details.cpuMonitor.details.jvmUsed / server.status.details.cpuMonitor.details.jvmCommitted * 100.0;
  }

  percentJvm(server: Server): string {
    return this.memoryJvm(server).toFixed(0);
  }

  percentCpu(server: Server): string {
    return this.cpu(server).toFixed(0);
  }

  cpu(server: Server): number {
    return server.status.details.cpuMonitor.details.systemUsage * 100.0;
  }

  percentCpuProcess(server: Server): string {
    return this.cpuProcess(server).toFixed(0);
  }

  cpuProcess(server: Server): number {
    return server.status.details.cpuMonitor.details.processUsage * 100.0;
  }

  mbs(mem: number): string {
    return (mem * 0.00000095367432).toFixed(2);
  }

  load(server: Server): string {
    return server.status.details.cpuMonitor.details.systemLoad.toFixed(2);
  }

  maxRequest(server: Server): string {
    return server.status.details.cpuMonitor.details.maxRequest.toFixed(2);
  }

  threads(server: Server): string {
    return server.status.details.cpuMonitor.details.busyThreads.toFixed(2);
  }

  uptime(server: Server): string {
    const up = server.status.details.cpuMonitor.details.uptime;
    const days = up / (24.0 * 60.0 * 60.0);
    const hours = (up % (24.0 * 60.0 * 60.0)) / (60.0 * 60.0);
    const minutes = (up % (60.0 * 60.0)) / 60;
    const seconds = up % 60;
    return days.toFixed(0) + ':'
      + hours.toFixed(0) + ':'
      + minutes.toFixed(0) + ':'
      + seconds.toFixed(0);
  }

  update(event: MatSlideToggleChange, index: number) {
    if (event.checked) {
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

  updateHealth(event: MatSlideToggleChange) {
    if (event.checked) {
      this.healthTimer = () => {
        this.service.getUpdate(0).subscribe(server => {
          this.health = server;
          if (this.healthTimer) {
            setTimeout(this.healthTimer, 1000);
          }
        });
      };
      setTimeout(this.healthTimer, 1000);
    } else {
      this.healthTimer = null;
    }
  }

  mapMemory(key: string): string {
    if (this.health) {
      return this.mapDetails(key).memory.toFixed(0);
    }
    return '';
  }

  mapSize(key: string): string {
    if (this.health) {
      return this.mapDetails(key).size.toFixed(0);
    }
    return '';
  }

  mapUsed(key: string): string {
    if (this.health) {
      return ((this.mapDetails(key).memory / this.mapDetails(key).capacity) * 100.0).toFixed(4);
    }
    return '';
  }

  mapDetails(key: string): MapDetails {
    return this.health.status.details.hazelcast.details.maps[key] as MapDetails;
  }

  master(): string {
    if (this.servers) {
      for (const server of this.servers) {
        if (server.status.details.hazelcast.details.master) {
          return server.name;
        }
      }
    }
    return '';
  }

  duoStatus(): string {
    if (this.health) {
      return this.health.status.details.duoSecurity.status;
    }
    return '';
  }

  hzHealth(): string {
    if (this.health) {
      return this.health.status.details.hazelcast.status;
    }
    return '';
  }
}

