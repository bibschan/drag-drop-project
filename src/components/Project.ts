// Project class and Status custom enum
export module Project {
  export enum ProjectStatus {
    active,
    finished,
  }

  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ) {}
  }
}
