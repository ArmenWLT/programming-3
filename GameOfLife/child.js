class Child extends Parents{
    constructor(name,surname, age){
        super(name,surname, age)
        this.school = '14 mijn dproc';
    }



    speak(){
        super.speak();
        console.log(this.school);
    }

}