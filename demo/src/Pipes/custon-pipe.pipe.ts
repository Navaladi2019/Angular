import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custonPipe'
})
export class CustonPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return 'HI' + " "+ value;
  }

}
