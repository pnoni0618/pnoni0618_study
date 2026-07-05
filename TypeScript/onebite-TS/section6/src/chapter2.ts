/**
 * 접근 제어자
 * access modifier
 * => public private proteced
 */

class Employee {
  // 필드

  // 생성자
  constructor(
    private name: string,
    protected age: number,
    public position: string,
  ) {}

  // 메서드
  work() {
    console.log(`${this.name} 일함`);
  }
}

class ExecutiveOfficer extends Employee {
  // 필드
  officeNumber: number;

  // 생성자
  constructor(
    name: string,
    age: number,
    position: string,
    officeNumber: number,
  ) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }

  // 메서드
  func() {
    this.age;
    // this.name;
  }
}

const employee = new Employee('승환', 40, 'developer');
// employee.name = '홍길동';
// employee.age = 24;
employee.position = 'designer';

console.log(employee);
