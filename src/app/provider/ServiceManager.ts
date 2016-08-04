/**
 * IoC Service for handling extensions
 */
import { IService } from '../service/Service';
import { injectable } from "inversify";

export interface IServiceManager {
    isLoaded(name: string): boolean;
    get(name: string): IService;
    all(): IterableIterator<IService>;
    unload(name: string): void;
    load(service: IService): void;
}

@injectable()
export class ServiceManager implements IServiceManager {

    private services: Map<string, IService>;

    constructor() {
        this.services = new Map<string, IService>();
    }

    /**
     * Returns true if the extension is loaded
     * @param name
     * @returns {boolean}
     */
    isLoaded(name: string): boolean {
        return this.services.has(name);
    }

    /**
     * Gets a extensions identified by name
     * @param name
     * @returns {IService}
     */
    get(name: string): IService {
        return this.services.get(name);
    }

    /**
     * Returns a list of all extensions
     *
     * @returns {Map<string, IService>}
     */
    all(): IterableIterator<IService> {
        return this.services.values();
    }

    /**
     * Unloads an extension
     *
     * @param name
     */
    unload(name: string): void {
        this.services.delete(name);
    }

    /**
     * Loads an extension
     *
     * @param extension
     */
    load(service: IService): void {
        this.services.set(service.getName(), service);
    }
}
