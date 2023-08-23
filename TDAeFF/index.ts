/* enum Status {
    DRAFT,
    PUBLISHED,
    DELETED
}

class Post{
    private _id: number;
    private _text: string;
    private _status: Status;

    constructor(id:number, text:string, status: Status){
        this._id = id;
        this._text = text;
        this._status = status;
    }

    get id(): number{
        return this._id;
    }

    get text(): string{
        return this._text;
    }

    get status(): Status{
        return this._status;
    }

    set status(status: Status){
        this._status = status;
    }

    publish(): void{
        this.status = Status.PUBLISHED;
    }
}


class RedeSocial{
    post: Post = new Post(1, 'new post', Status.DRAFT);
    
    constructor(){  // quando o if está na aplicação, é necessário haver um constructor
        if(this.post.status == Status.DRAFT){
            if(this.post.text.trim().length > 0){ // o trim() remove os espaços em branco
                this.post.publish();
                console.log('Successfully published text');
            } else{
                throw new Error('A post must have at least one character');
            }
        } else{
            throw new Error('Only drafts can be posted');
        }
    }
}

const redeSocialInstance: RedeSocial = new RedeSocial(); // necessário, por causa do constryctor

/*obs:
- No TypeScript (e em JavaScript em geral), o código executável deve estar dentro de funções ou métodos */