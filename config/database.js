const mongoose=require('mongoose');

const fileSchema=mongoose.Schema({
    name:{

    },
    tags:{

    },
    email:{

    },
    file:{

    }
})

module.exports=mongoose.model("fileUp",fileSchema)