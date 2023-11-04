class Parents {
    constructor(name, surname, age) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }


    speak() {
        console.log(this.name + " is speak");
    }

    run() {
        console.log(this.name + " " + this.surname + " is runing")
    }
}