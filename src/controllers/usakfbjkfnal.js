// const getuserdetail = async function (req, res) {
//     let identity = req.params.userid
//         if (req.decodetoken._id ==  req.params.userid) {
//             let detail = await accountModel.findOne({ _id: identity, isdeleted: false })
//             if (detail) {
//                 res.send({ status: true, data: detail })
//             } else {
//                 res.send({ status: false, data: "user not found" })
//             }
//         }
// /// FOURTH API LOGIC
// const updatedetails = async function (req, res) {
//     let identity = req.params.userid
//     let emailupdate = req.body.email
//     if(req.decodetoken._id === identity){
//         let detail = await accountModel.findOneAndUpdate({ _id: identity }, { $set: { email: emailupdate } }, { new: true })
//         if (detail) {
//             res.send({ status: true, data: detail })
//         } else {
//             res.send({ status: false, data: "user not found" })
//         }
   
//     }else{
// res.send({msg:"token id and param id does not match"})
//     }
   
// }