function isObject(subject) {
  return typeof subject == "object";
}
  
function isArray(subject) {
  return Array.isArray(subject);
}

function deepCopy(subject) {
  let copySubject;

  const subjectIsObject = isObject(subject);
  const subjectIsArray = isArray(subject);

  if (subjectIsArray) {
    copySubject = [];
  } else if (subjectIsObject) {
    copySubject = {};
  } else {
    return subject;
  }

  for (key in subject) {
    const keyIsObject = isObject(subject[key]);

    if (keyIsObject) {
      copySubject[key] = deepCopy(subject[key]);
    } else {
      if (subjectIsArray) {
        copySubject.push(subject[key]);
      } else {
        copySubject[key] = subject[key];
      }
    }
  }

  return copySubject;
}

/*const studentBase = {
  name: undefined,
  email: undefined,
  age: undefined,
  approvedCourses: undefined,
  learningPaths: undefined,
  socialMedia: {
    twitter: undefined,
    facebook: undefined,
    instagram: undefined,
  },
};*/

function requiredParam(param) {
  throw new Error(param+ " Es obligatorio");
}

function createStudent({
  name = requiredParam("name"),
  age,
  email = requiredParam("email"),
  twitter,
  instagram,
  facebook,
  approvedCourses = [],
  learningPaths = [],
}={}) {
  const private = {
    "_name": name,
  };
  
  const public = {
    email,
    age,
    approvedCourses,
    learningPaths,
    socialMedia: {
      twitter,
      instagram,
      facebook,
    },
    changeName(newName){
      private["_name"] = newName;
    },
    readName(){
      return private["_name"];
    },
  };

Object.defineProperty(public, "readName", {
  configurable: false,
  writable: false,
});

  return public;
}

const juan = createStudent({name: "Juanito", email: "repo@gas.com"});


