const mid1=async function(req,res,next){
    //console.log("we are inside mid1")
    let headerValue=req.headers['isfreeapp']
    let isAppfree
    //console.log(headerValue)
    if(!headerValue){
        return res.send({msg:"mandatory header missing"})
    }

        //console.log("we are inside if block now")
    if(headerValue==='false'){
        isAppfree=false
    }else{
        isAppfree=true
    }
    req.isFreeAppUser=headerValue
        next();
}
module.exports.mid1=mid1