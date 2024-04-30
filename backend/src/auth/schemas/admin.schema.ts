import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { Service } from "src/services/schemas/services.schema";
// import { Role } from "src/role/enums/role.enum";



// Company sınıfı, Company sınıfı, Mongoose için SchemaFactory sınıfını extend eden sınıf.
@Schema({  
    timestamps: true  
})
export class Admin {
    @Prop({ type: String, required: true })
    _id: string;

    
    @Prop()
    name: string;

    @Prop({ unique: [true, 'Email already exists']})
    email: string;

    @Prop()
    password: string;

    // @Prop({type:"string",ref:"Comment"})
    // comment:string

    // @Prop({ type: [String], ref: "Service" })
    // services: string[]
    
    // @Prop()
    // roles: Role[];
    

}
export const AdminSchema = SchemaFactory.createForClass(Admin);