import { IKernel as Container } from "inversify";
import {Response} from 'express';

/**
 * RoutePrefix decorator
 * @param {string} prefix
 * @return {function(Function): void}
 */
export function RoutePrefix(prefix: string) {
    return function (target: Function): void {
        Reflect.defineMetadata('route:prefix', prefix, target);
    };
}

/**
 *
 * @param route
 * @param method
 * @return {function(Object, string, TypedPropertyDescriptor<any>): undefined}
 * @constructor
 */
export function Route(route: string, method: string) {
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        Reflect.defineMetadata('route:path', route, target, propertyKey);
        Reflect.defineMetadata('route:method', method, target, propertyKey);
    };
}

export abstract class AbstractController {

    protected container: Container;

    public setContainer(container: Container) {
        this.container = container;
    }

    protected getService<T>(name: string): T {
        return this.container.get<T>(name);
    }

    protected notFound(response: Response) {
        response.status(404).json({"error": "not found"});
    }

    static copyPropertyValues(source, target) {
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                target[prop] = source[prop];
            }
        }
        return target;
    }
}
