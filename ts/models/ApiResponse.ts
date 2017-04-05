export class ApiResponse<T> {
    public static OK:number=200;
    public status:number;
    public message:String;
    public model:T;

    deserialize(input:any):ApiResponse<T> {
        if(input) {
            this.status = input.status
            this.message = input.message
            this.model = input.model
        }

        return this;
    }
}