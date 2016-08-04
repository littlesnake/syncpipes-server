import 'reflect-metadata';
import { Kernel } from "inversify";
// services
import { IServiceManager, ServiceManager } from './provider/ServiceManager';
import { IJobScheduler, JobScheduler } from './provider/JobScheduler';
// create IoC kernel
var Container = new Kernel();
// define services
Container.bind<IServiceManager>('services').to(ServiceManager).inSingletonScope();
Container.bind<IJobScheduler>('scheduler').to(JobScheduler).inSingletonScope();

export { Container };
