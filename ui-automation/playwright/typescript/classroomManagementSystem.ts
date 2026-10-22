/*
Scenario: Classroom Management SystemCreate a base class named SchoolGroup that holds a private studentNames: string[] array.

    1. Add a method addStudent(name: string) that inserts the name at the front of the list using unshift.
    2. Create a subclass named GraduatingClass that extends SchoolGroup and adds a configuration parameter maxSize with a default fallback value of 5.
    3. Override the addStudent method in the subclass to enforce that no more students can be added if the array length reaches maxSize.

*/
export interface SchoolStudents {
    type: 'STUDENTS' | 'GRADUATION';
    addStudents: string;
}

// Base class for all groups of students.
export class SchoolGroup {

    // Keeps a separate record list for each student addition.
    private schoolStudents: SchoolStudents[];
    // 2. Accept an array of string names in the constructor
    constructor(private studentNames: string[]) {

        this.schoolStudents = [];
    }

    // Adds a new student to the front of the list.
    public students(addStudent: string): void {
        this.studentNames.unshift(addStudent);
        this.schoolStudents.unshift({ type: 'STUDENTS', addStudents: addStudent });
        console.log(`Added new Student Name at front of list in  SchoolStudent(SchoolGroup & GraduatingClass) is :  ${addStudent}`);
    }

    // Returns how many students are currently in the list.
    public getCurrentSize(): number {
        return this.studentNames.length;
    }
}

// Subclass that restricts the number of students by a maximum size.
export class GraduatingClass extends SchoolGroup {
    constructor(
        initialStudents: string[],
        private maxSize: number = 5
    ) {
        super(initialStudents);
    }

    // Only allows adding students if the class is not full.
    public override students(studentsName: string): void {
        if (this.getCurrentSize() >= this.maxSize) {
            console.log(`Reached max limit of adding students: ${this.maxSize}`);
            return;
        }
        super.students(studentsName);
    }
}

//Classroom Management System refactored to use formal TypeScript getters and setters.

/*
export interface SchoolStudents {
    type: 'STUDENTS' | 'GRADUATION';
    addStudents: string;
}

export abstract class SchoolGroup {
    private schoolStudents: SchoolStudents[] = [];

    // The shorthand constructor automatically creates and populates this.studentNames
    constructor(private studentNames: string[]) {}

    // 1. GETTER: Replaces getCurrentSize(). Acts like a property, not a method.
    public get studentCount(): number {
        return this.studentNames.length;
    }

    // Helper for subclasses to safely view the raw array data
    protected get namesList(): string[] {
        return this.studentNames;
    }

    // 2. SETTER: Intercepts names being added to run common core logic
    public set enrollStudent(name: string) {
        this.studentNames.unshift(name);
        this.schoolStudents.unshift({ type: 'STUDENTS', addStudents: name });
        console.log(`Added new Student Name at front of list: ${name}`);
    }
}

export class GraduatingClass extends SchoolGroup {
    constructor(
        initialStudents: string[],
        private maxSize: number = 5
    ) {
        super(initialStudents);
    }

    // 3. OVERRIDING THE SETTER: intercepts assignment to enforce the subclass capacity limit
    public override set enrollStudent(name: string) {
        // We use our getter 'this.studentCount' seamlessly here!
        if (this.studentCount >= this.maxSize) {
            console.log(`❌ Rejection: reached max limit of adding students ${this.maxSize}`);
            return;
        }
        // Calls the setter logic inside the parent class
        super.enrollStudent = name;
    }
}

*/
