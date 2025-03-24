// import bcrypt from "bcrypt"
// let adminCode = "9734"
// let userCode ="1437"

// function hashRole (){
//     const adminHashed = bcrypt.hashSync(adminCode, 10)
//     const userHashed = bcrypt.hashSync(userCode, 10)

//     console.log("ADMINHASHEDCODE: ",adminHashed, 
//         " USERHASHEDCODE : ", userHashed
//     )
// }

// hashRole()

const date = new Date()
const fullDateAndTime = date.toLocaleString()
const fullDate = date.toLocaleDateString()
const year = date.getFullYear()
const today = date.getDate()
const dayOftheweek = date.getDay()
const hour= date.getHours()
const min= date.getMinutes()
const time = date.getTime()


 
console.log(time)
