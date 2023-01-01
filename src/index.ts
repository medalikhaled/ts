import z, { number, object } from "zod";
import { v4 as uuidv4 } from "uuid";
import { type } from "os";
//import { randomUUID } from "crypto";

// Creating the Validation schema using zod
const useSchema = object({
  name: z.string().min(2).max(20),
  age: z.number(),
  phoneNumber: z.string(),
});

//Creating the user Type
interface User {
  name: string;
  age: number;
  phoneNumber: string;
  isSingle?: boolean;
}

//Creating new user with validation against the schema
const john: User = useSchema.parse({
  name: "John",
  age: 20,
  phoneNumber: "1234567890",
});

//console.log(JSON.stringify(john));

type numbersArray = Array<string | number>;

let numbers: numbersArray = new Array(5, 2);

numbers = [...numbers, 1, 2, 23, 2, 5, 8, "Mon ami", 9, 6, "Hello"];

//console.log(numbers);

// Removing Duplicates from an array by using a set
const depdupedNumbers: Set<number> = new Set();
numbers.forEach((nb) => typeof nb === "number" && depdupedNumbers.add(nb));

//console.log(depdupedNumbers);

const newMap = new Map<string, number>();

numbers.forEach((nb) => {
  newMap.set(uuidv4(), typeof nb === "number" ? nb : 0);
});

//console.log(newMap);

// Interfaces are used to define the shape of an object (can be used for functions also)
interface Animal {
  name: string;
  age: number;
  isAlive: boolean;
}

//interfaces can be extended
interface Dog extends Animal {
  breed: string;
  color: string;
}

// You can fake an extend using types, using the intersection "&"
type AnimalEx = {
  name: string;
  age: number;
};
type DogEx = AnimalEx & {
  breed: string;
};

//enum is a way to create a list of constants
enum AnimalType {
  CARNIVORE = "carnivore",
  HERBIVORE = "herbivore",
  OMNIVORE = "omnivore",
}

// Interfaces with the same name are merged
interface Animal {
  type: AnimalType;
}

const user2 = {} as User; // Force a Type on another that does not complies with it using "as" it is called type assertion

const somone = "Matt" as unknown as number; //you cannot force type conversion between data types unless you use unknown => now you can break from typescript in this particular constant

const action = "add" as const; // this will infer the type of action as "add"

type Person = string | number;

function PutPersonInAnArray(person: Person): string[] {
  if (typeof person === "string") {
    const newPerson = person.toLowerCase(); //you get autocomplete for all the string functions
    return [person];
  }

  return [person.toString().concat("ID")]; //same here for number functions
}

//console.log(PutPersonInAnArray("Matt"));

const johnDoe = "John Doe"; // Constant infered as literal type, means the type of this const is literaly "John Doe" because constants are read only and they cannot be reassigned

let juliaDoe = "Julia Doe"; // variables declared with let or var get infered as the general data type, means the type of this variable is a string

// You can make object Read Only isong Object.freeze()
const ImmutUser = Object.freeze({
  name: "Matt",
  age: 20,
  phoneNumber: "1234567890",
});

//ImmutUser.name = "John"; // This will throw an error because the object is frozen

const users = Object.freeze(
  new Array<string>(
    "Mohamed Admin",
    "Ali",
    "Khaled Admin",
    "Nour",
    "Saleh",
    "Hassen"
  )
);
//users.push("John"); // This will throw an error because the array is frozen

enum Privelage {
  ADMIN = "admin",
  USER = "user",
}

type usersObjectType = {
  name: string | undefined;
  privelage: Privelage;
};

const userObjects = Object.freeze(
  users.map((user: string) => {
    if (user.split(" ")[1] === "Admin") {
      return {
        name: user.split(" ")[0],
        privelage: Privelage.ADMIN,
      };
    }
    return {
      name: user,
      privelage: Privelage.USER,
    };
  })
);

//console.log(userObjects);

// Ways to extract user names from the userObjects Array of objects
const realUsers = userObjects.map((user) => {
  return user.name;
});

let realUsers2: Array<string> = [];
for (let i in Object.keys(userObjects)) {
  realUsers2.push(userObjects[i]?.name as string);
}

//You can use litteral types to generate cool autocomplete features Ex:
const canPerformAction = (
  username: string,
  action: "create" | "update" | "delete",
  entity: "user" | "post"
) => {
  let isAuthorized: boolean = false;
  let privelaged: Privelage | undefined;
  if (realUsers.includes(username)) {
    isAuthorized = true;

    for (let i in Object.keys(userObjects)) {
      if (userObjects[i]?.name === username) {
        privelaged = userObjects[i]?.privelage;
      }
    }
  }

  if (isAuthorized && privelaged === Privelage.ADMIN) {
    switch (action) {
      case "create":
        if (entity === "user") {
          console.log("You can create a new user");
          //do something
        } else {
          console.log("You can create a new post");
          //do something
        }
        break;
      case "update":
        if (entity === "user") {
          console.log("You can update a user");
          //do something
          break;
        } else {
          console.log("You can update a post");
          //do something
        }
        break;
      case "delete":
        if (entity === "user") {
          console.log("You can delete a user");
          //do something
          break;
        }
        console.log("You can delete a post");
        break;

      default:
        console.log("There is No Action");
    }
  }

  if (isAuthorized && privelaged === Privelage.USER) {
    switch (action) {
      case "create":
        if (entity == "user") {
          console.error("you are not allowed to do that");
        }
        console.log("You can create a new post");
    }
  }
};

canPerformAction("Mohamed", "create", "user"); // This will get you auto complete

// Three Things advanced in here: Genrics, "in" keyword and "keyof" keyword
interface Person2 {
  name: string;
  age: number;
}

type Animal2 = {
  name: string;
  age: number;
  type: string;
};

type Partial<T> = {
  [P in keyof T]?: T[P]; // P will be each key of T
};

type PersonPartial = Partial<Person2>; // same as { name?: string;  age?: number; }
type AnimalPartial = Partial<Animal2>; // same as {name?: string, age?: number, type?: string }

const cat: AnimalPartial = {};

type breed = Animal2["type"];
