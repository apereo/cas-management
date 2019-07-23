import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../core/dashboard-service';
import {Server, System} from '../domain/dashboard';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  servers: Server[];

  timers: Function[];

  constructor(private service: DashboardService) {}

  ngOnInit(): void {

    this.service.getStatus().subscribe(s => {
      this.servers = s;
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

  memory(system: System): number {
    return system.details.heapUsed / system.details.heapCommitted * 100.0;
  }

  percent(system: System): string {
    return this.memory(system).toFixed(0);
  }

  memoryJvm(system: System): number {
    return system.details.jvmUsed / system.details.jvmCommitted * 100.0;
  }

  percentJvm(system: System): string {
    return this.memoryJvm(system).toFixed(0);
  }

  percentCpu(system: System): string {
    return this.cpu(system).toFixed(0);
  }

  cpu(system: System): number {
    return system.details.systemUsage * 100.0;
  }

  percentCpuProcess(system: System): string {
    return this.cpuProcess(system).toFixed(0);
  }

  cpuProcess(system: System): number {
    return system.details.processUsage * 100.0;
  }

  mbs(mem: number): string {
    return (mem * 0.00000095367432).toFixed(2);
  }

  load(system: System): string {
    return system.details.systemLoad.toFixed(2);
  }

  maxRequest(system: System): string {
    return system.details.maxRequest.toFixed(2);
  }

  threads(system: System): string {
    return system.details.requests.toFixed(2);
  }

  uptime(system: System): string {
    const up = system.details.uptime;
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


}

