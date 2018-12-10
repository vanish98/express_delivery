var mongoose = require('./ds');

var adminSchema = new mongoose.Schema({
    adminId:String,
    adminName:String,
    adminPassWord:String,
    joinUsApplyList:[
        {
            userName:String,
            gender:{type:Number,default:1},
            grade:{type:Number,default:0},
            phoneNum:String,
            address:String,
            lastLoginTime:String,
            regDate:String,
            userId:String,
            passwordQuestion : String, 
            questionAnswer : String,
            OrderNUm:String,
            applyTime:String,//申请时间
            applycount:{type:Number,default:0},//申请次数
            isHandle:{type:Boolean,default:false},
            handleTime:String,
            isJoinUsOk:{type:Boolean,default:false}
        }
    ],
    suggestList:[
        {
            userName:String,
            phoneNum:String,
            suggestText:String,
            submitTime:String
        }
    ]
});

module.exports = mongoose.model("Admin",adminSchema);
