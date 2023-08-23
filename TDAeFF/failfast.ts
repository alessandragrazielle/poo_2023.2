enum Status {
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
        if(this.status != Status.DRAFT){
            throw new Error ('Only drafts can be posted');
        }
        if(this.text.trim().length == 0){
            throw new Error('A post must have at least one character')
        }

        this.status = Status.PUBLISHED;
    }
}


class RedeSocial{
    post: Post = new Post(1, ' ', Status.DRAFT);

    constructor(){
        this.post.publish();
        console.log('Successfully published text');
    }
}

new RedeSocial(); 
