// Team.ts

export interface Team {
    id: number;
    name: string;
    drivers: Driver[];
    constructors: Constructor[];
}

export interface Driver {
    name: string;
    cost: number;
}

export interface Constructor {
    name: string;
    cost: number;
}
