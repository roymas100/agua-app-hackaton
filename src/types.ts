export enum SeedStatus {
    ALERT,
    DANGER,
    WORKING
}

export interface Seed {
    name: string;
    status: SeedStatus;
    pressure: number;
    waterFlow: number;
    airPerArea: number;
    noise: number;
}