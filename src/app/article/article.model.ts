export class Article{
    title:string;
    link:string;
    votes:number;

    data:string[] = ['Alice Green', 'Paul Pfifer', 'Louis Blakenship'];

    evens:number[] = [2,4,6,8];

    firstName = 'Nate';

    lastName = 'Murray';

    greeting:string = `Hello ${this.firstName} ${this.lastName}`


    constructor(title:string, link:string, votes?:number){
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }
    voteUp():boolean{
        this.votes += 1;
        this.data.forEach(element => {
            console.log(element.toUpperCase())
        });
        console.log(this.greeting);
        return false;
    }

    voteDown():boolean{
        this.votes -= 1;
        console.log(this.evens.map(v=>v+1));
        return false;
    }

    domain():string{
        try{
            const link: string = this.link.split('//')[1];
            return link.split('.')[0];
        }catch(err){
            return null;
        }
    }
}