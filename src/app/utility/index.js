import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

export function groupMeasurementByName(measurements){
   const source = from(measurements);
  //  let group =[];
   const mesurementList = source.pipe(
      groupBy(measurement => measurement.name),
      // return each item in group as array
      mergeMap(group => group.pipe(toArray()))
    );  
   return mesurementList;
}