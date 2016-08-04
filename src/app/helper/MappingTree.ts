import { IPropertyMapping } from "../model/Mapping";

/**
 * MappingTree is a helper class for generating a tree from a IPropertyMapping
 */
export class MappingTree {

    private name: string;

    private parent: MappingTree;

    private children: Array<MappingTree>;

    private value: Array<IPropertyMapping>;

    constructor(name: string, value: Array<IPropertyMapping> = null, parent: MappingTree = null) {
        this.name = name;
        this.value = value;
        this.parent = parent;
        this.children = [];
    }

    static createFromPath(path: string, value: Array<IPropertyMapping> = null) {
        let idx = path.indexOf('/');
        let name = idx === -1 ? path : path.substr(0, idx);
        // create root node
        let root: MappingTree = null;
        if (idx === -1) {
            root = new MappingTree(name, value);
        } else {
            root = new MappingTree(name);
            root.insert(path.substr(idx+1), value);
        }
        return root;
    }

    getName() {
        return this.name;
    }

    getValue() {
        return this.value;
    }

    getChildren() {
        return this.children;
    }

    updateValue(value: Array<IPropertyMapping>) {
        if (this.value !== null) {
            this.value = this.value.concat(value);
        } else {
            this.value = value;
        }
    }

    upsertChild(name: string, value: Array<IPropertyMapping>) {
        let create = true;
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].name === name) {
                if (this.children[i].value !== null) {
                    this.children[i].value = this.children[i].value.concat(value);
                } else {
                    this.children[i].value = value;
                }
                create = false;
                break;
            }
        }
        if (create) {
            this.children.push(new MappingTree(name, value, this));
        }
    }

    insert(path: string, value: Array<IPropertyMapping>, updateValue: boolean = false) {
        // update self
        let idx = path.indexOf('/');
        if (idx === -1) {
            if (path === this.name || updateValue) {
                this.updateValue(value);
            } else {
                this.upsertChild(path, value);
            }

        } else {
            // current path
            let cPath = path.substr(0, idx);
            // is cpath current node?
            if (this.name === cPath) {
                this.insert(path.substr(idx+1), value);
            } else {
                let create = true;
                // try to update existing
                for (let i = 0; i < this.children.length; i++) {
                    if (this.children[i].name === cPath) {
                        this.children[i].insert(path.substr(idx+1), value);
                        create = false;
                        break;
                    }
                }
                // create a new node?
                if (create) {
                    let child = new MappingTree(cPath, null, this);
                    child.insert(path.substr(idx+1), value);
                    this.children.push(child);
                }
            }
        }
    }
    toJSON(): any {
        return {
            "name": this.name,
            "value": this.value,
            "children": this.children
        }
    }
}
