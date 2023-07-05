import { ApiProperty } from '@nestjs/swagger';

export class Response {
  @ApiProperty({ example: 0 })
  private readonly code: number;
  @ApiProperty({ example: {} })
  private readonly data?: any | any[];
  @ApiProperty({ example: '' })
  private readonly message?: string;

  constructor(code: number, data: any | any[], message: string) {
    this.code = code;
    this.data = data;
    this.message = message;
  }
}

export class ResponseEntity<T> {
  @ApiProperty({ example: 0 })
  private code: number;
  @ApiProperty()
  private data: T | T[];
  @ApiProperty({ example: '' })
  private message?: string;
  @ApiProperty({ description: 'pagination meta data' })
  private meta?: any;
  public ok(): ResponseEntity<T> {
    this.code = 0;
    return this;
  }

  public error(code = 999, message = 'Error'): ResponseEntity<T> {
    this.code = code;
    this.message = message;
    return this;
  }

  public body(data: T | T[]): ResponseEntity<T> {
    this.data = data;
    return this;
  }
  public build(): Response {
    return new Response(this.code, this.data, this.message);
  }
  public setPageMeta(pageMeta: any): ResponseEntity<T> {
    this.meta = pageMeta;
    return this;
  }
}
