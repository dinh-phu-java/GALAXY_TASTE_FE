export class User{
    // public firstName:string;
    // public lastName:string;
    // public userName:string;
    // public email:string;
    // public password:string;
    // public profileImageUrl:string;
    // public role:string;
    // public authorities:[]
    // constructor(){
    //     this.firstName='';
    //     this.lastName='';
    //     this.userName='';
    //     this.email='';
    //     this.password='';
    //     this.profileImageUrl='';
    //     this.role='';
    //     this.authorities=[];
    // }
    constructor(
        public firstName?:string,
        public lastName?:string,
        public username?:string,
        public email?:string,
        public password?:string,
        public profileImageUrl?:string,
        public role?:string,
        public authorities?:[]){

    }
        
}