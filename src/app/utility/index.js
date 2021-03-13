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


export function validateEmail(email){
   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}