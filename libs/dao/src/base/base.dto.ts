export class BaseDto {
  public static fromEntity<T>(entity: T): any {
    throw new Error('Method not implemented.');
  }

  public static fromEntities<T>(entities: T[]): any | any[] {
    throw new Error('Method not implemented.');
  }
}