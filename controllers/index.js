const User = require('../models/user')




exports.signUp=(req, res)=>{
    const { username } = req.body
    User.findOne({ username: username})
        .then((response)=>{
            if(!response){ 
                User.create({username: username}, (err, obj)=>{
                    if(!err){
                        return res.status(200).json(obj)
                    }else{
                        res.status(500).json(err)
                    }

                })
                
            }else{
                res.status(409).json({err:'User already exists'})
            }
        })
}

exports.createSchedule = (req, res)=>{
    const {username, data} = req.body
    User.findOne({ username: username}).then(()=>{
        
        const schedule = {
            daysActive:data.daysActive,
            from:data.from,
            to:data.to
        }
        User.findOneAndUpdate({ username: username}, {
            $push:{
                schedule:schedule
            }
        }).then(async()=>{
            let data = await User.findOne({ username: username})
            res.status(200).json({status:true, schedule:data.schedule})
        })
    })
}

exports.getSchedule = (req, res)=>{
    User.findOne({ username: req.body.username}).then((data)=>{
        if(!data){
            return res.status(403).json({err:'user not found'})
        }
        res.status(200).json({schedule:data.schedule})
    })
}

exports.createRestrictions=(req, res)=>{
    const {username, blocked, limited} = req.body;
    if(!blocked && !limited){ res.status(401).json({status:false, err:'blocked and limited apps list is not provided'})}
    User.updateOne({username: username}, {
        $set: {blocked:blocked, limited: limited}
    }).then((data)=>{
        if(!data){return res.status(502).json({status: false})}
        return res.status(200).json({status: true})
    })
}

exports.getRestrictions =(req, res)=>{
    User.findOne({ username: req.body.username}).then((data)=>{
        if(!data){
            return res.status(403).json({err:'user not found'})
        }
        res.status(200).json({blocked:data.blocked, limited:data.limited})
    })
}