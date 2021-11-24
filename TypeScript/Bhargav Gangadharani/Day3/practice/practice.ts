// Generic

function prints<T>(value: T): T { 
    return value
}

console.log(
prints(1),
prints("one"),
prints({one:1})
)


// generic class

class KeyValuePair1<T,U>
{ 
    private key: T;
    private val: U;

    setKeyValue(key: T, val: U): void { 
        this.key = key;
        this.val = val;
    }

    display():void { 
        console.log(`Key = ${this.key}, val = ${this.val}`);
    }
}

let kvp1 = new KeyValuePair1<number, string>();
kvp1.setKeyValue(111, "John");
kvp1.display(); 


// Generic Interface
interface KeyValueProcessor<T, U>
{
    (key: T, val: U): void;
};

function processKeyPairs<T, U>(key:T, value:U):void { 
    console.log(`processKeyPairs: key = ${key}, value = ${value}`)
}

let numKVProcessor: KeyValueProcessor<number, number> = processKeyPairs;
numKVProcessor(1, 1111);


// Module
import { StringValidator } from "./module";
export const numberRegexp = /^[0-9]+$/;
export class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

// Namespace
namespace Numbers{
    export function add(x:number, y:number){
        return x + y;
    }
}

namespace Strings{
    export function add(x:string, y:string){
        return x + y;
    }
}

console.log(
Numbers.add(1,2),
Strings.add("2","3")
)