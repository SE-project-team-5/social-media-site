import mongoose from "mongoose";



//schema for the database
const PostSchema = new mongoose.Schema({  
    
// post:{

    // pic:String,

    // likes:[{
    //     names:{
    //         type:String
    //     },
    //     likeCount:{
    //         type:Number
    //     }
    // }],

    // comments:
    //    [{
    //         name:{
    //             type:String
    //         },

    //         comment:{
    //             type:String
    //         },

    //         likeCount:[{
                
    //             names:{
    //                 type:String
    //             },

    //             likes:{
    //                 type:Number
    //             }
    //         }
    //         ]
                
            
    //    }]

    // post_id:{
    //     type:String,
    //     required:true
    // },

    user_details:{
        name:{
            type:String
        },
        profile_pic:{
            type:String
        }
    },
    desc:{
        type:String,
    },

    pic:{
        type:String
    },

    comments:[{

        name:{
            type:String
        },
        profile_pic:{
            type:String
        },
        comment:{
            type:String
        }
    
    }],

    likes_count:{
        type:Number
    },

    comments_count:{
        type:Number
    }
    }

     
// }

)

export default mongoose.model("posts",PostSchema);